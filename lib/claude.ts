import Anthropic from '@anthropic-ai/sdk';
import { Citation, ChatMessage, ChatResponse, PageContext, Part } from './types';
import { buildSystemPrompt } from './prompt';
import { getContext } from './catalog-search';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const respondTool: Anthropic.Tool = {
  name: 'respond',
  description: 'Return your reply and the ids of any AB Carter parts you cited.',
  input_schema: {
    type: 'object',
    properties: {
      reply: { type: 'string', description: "Your concise reply, in the user's language." },
      citationIds: {
        type: 'array',
        items: { type: 'string' },
        description: 'Exact ids of cited parts; empty array if none.',
      },
    },
    required: ['reply', 'citationIds'],
  },
};

function resolveCitations(ids: string[], items: Part[]): Citation[] {
  return ids
    .map((id) => items.find((it) => it.id === id))
    .filter((p): p is Part => Boolean(p))
    .map((p): Citation => ({
      type: 'part',
      id: p.id,
      title: p.name,
      detail:
        [p.attributes.size, p.attributes.profile, p.attributes.finish, p.attributes.application]
          .filter(Boolean)
          .join(' · ') || p.selectionLogic,
      source: p.source,
      url: p.source,
    }));
}

export async function ask(
  messages: ChatMessage[],
  lang: string,
  page?: PageContext,
): Promise<ChatResponse> {
  const items = getContext();
  const apiMessages: Anthropic.MessageParam[] = messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const res = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1500,
    system: [
      {
        type: 'text',
        text: buildSystemPrompt(items, lang, page?.label),
        cache_control: { type: 'ephemeral' },
      },
    ],
    tools: [respondTool],
    tool_choice: { type: 'tool', name: 'respond' },
    messages: apiMessages,
  });

  const toolUse = res.content.find((c) => c.type === 'tool_use');
  if (!toolUse || toolUse.type !== 'tool_use') {
    throw new Error('Claude did not return a structured response');
  }
  // Claude can omit fields even on a forced/required tool call, so parse defensively.
  const input = (toolUse.input ?? {}) as { reply?: string; citationIds?: string[] };
  const citationIds = Array.isArray(input.citationIds) ? input.citationIds : [];
  const reply =
    typeof input.reply === 'string' && input.reply.trim().length > 0
      ? input.reply
      : 'I want to get this right — please confirm the exact part with an AB Carter engineer at sales@abcarter.com.';
  return { reply, citations: resolveCitations(citationIds, items) };
}

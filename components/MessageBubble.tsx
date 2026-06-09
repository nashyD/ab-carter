import { ChatMessage } from '@/lib/types';
import CitationCard from './CitationCard';

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
          isUser ? 'rounded-br-md bg-carter-600 text-white' : 'rounded-bl-md bg-carter-100 text-carter-900'
        }`}
      >
        {message.content}
      </div>
      {message.citations?.map((c) => (
        <div key={c.id} className="w-[85%]">
          <CitationCard citation={c} />
        </div>
      ))}
    </div>
  );
}

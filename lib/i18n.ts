import { Lang } from './types';

export interface UIStrings {
  greeting: string;
  placeholder: string;
  send: string;
  thinking: string;
  chips: string[];
}

// Vetted starter questions per language so the live demo never misfires.
// Each chip maps to a question the travelers/rings catalog can actually answer.
export const I18N: Record<Lang, UIStrings> = {
  en: {
    greeting:
      "I'm the AB Carter Assistant. Tell me your spinning setup and I'll help you pick the right traveler or ring.",
    placeholder: 'Ask about travelers, rings, sizes…',
    send: 'Send',
    thinking: 'Thinking…',
    chips: [
      'Which traveler for fine cotton on a short-staple ring?',
      'What wire profile suits heavy wool counts?',
      'I need ~50% longer traveler life — what finish?',
    ],
  },
  es: {
    greeting:
      'Soy el Asistente de AB Carter. Cuénteme su configuración de hilatura y le ayudo a elegir el cursor o anillo correcto.',
    placeholder: 'Pregunte por cursores, anillos, tamaños…',
    send: 'Enviar',
    thinking: 'Pensando…',
    chips: [
      '¿Qué cursor para algodón fino en anillo de fibra corta?',
      '¿Qué perfil de alambre para títulos de lana gruesa?',
      'Necesito ~50% más vida del cursor, ¿qué acabado?',
    ],
  },
  zh: {
    greeting: '我是 AB Carter 助手。告诉我您的纺纱配置，我来帮您选择合适的钢丝圈或钢领。',
    placeholder: '咨询钢丝圈、钢领、尺寸…',
    send: '发送',
    thinking: '思考中…',
    chips: ['短纤维钢领纺细支棉纱用哪种钢丝圈？', '粗支毛纱适合哪种钢丝截面？', '需要钢丝圈寿命延长约50%，用什么表面处理？'],
  },
};

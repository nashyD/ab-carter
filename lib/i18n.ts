import { Lang } from './types';

export interface UIStrings {
  greeting: string;
  placeholder: string;
  send: string;
  thinking: string;
  chips: string[];
}

// Vetted, specific starter questions per language — each maps to a part the catalog
// answers crisply, so the live demo lands a sharp, cited recommendation every time.
export const I18N: Record<Lang, UIStrings> = {
  en: {
    greeting:
      "I'm the AB Carter Assistant. Tell me your spinning setup and I'll help you pick the right traveler or ring.",
    placeholder: 'Ask about travelers, rings, sizes…',
    send: 'Send',
    thinking: 'Thinking…',
    chips: [
      'Spinning 40s compact cotton at high speed on a Flange 1 ring — which traveler and finish?',
      'Which wire profile reduces yarn hairiness on 100% fine cotton?',
      'Long-staple wool on an HZ-type ring — which traveler and size?',
    ],
  },
  es: {
    greeting:
      'Soy el Asistente de AB Carter. Cuénteme su configuración de hilatura y le ayudo a elegir el cursor o anillo correcto.',
    placeholder: 'Pregunte por cursores, anillos, tamaños…',
    send: 'Enviar',
    thinking: 'Pensando…',
    chips: [
      'Hilando algodón compacto 40s a alta velocidad en anillo de brida 1, ¿qué cursor y acabado?',
      '¿Qué perfil de alambre reduce la pelosidad del hilo en algodón 100% fino?',
      'Lana de fibra larga en anillo tipo HZ, ¿qué cursor y qué tamaño?',
    ],
  },
  zh: {
    greeting: '我是 AB Carter 助手。告诉我您的纺纱配置，我来帮您选择合适的钢丝圈或钢领。',
    placeholder: '咨询钢丝圈、钢领、尺寸…',
    send: '发送',
    thinking: '思考中…',
    chips: [
      '在 Flange 1 钢领上高速纺 40 支紧密纺棉纱，应选哪种钢丝圈和表面处理？',
      '哪种钢丝截面能降低 100% 细支棉纱的毛羽？',
      'HZ 型钢领纺长纤维毛纱，应选哪种钢丝圈和尺寸？',
    ],
  },
};

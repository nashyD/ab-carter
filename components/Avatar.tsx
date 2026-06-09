type AvatarState = 'idle' | 'thinking' | 'talking';

// Optional assistant mascot — a thread spool/bobbin, a nod to AB Carter's line.
// Off by default; toggled on from the header when the room wants a friendlier face.
export default function Avatar({ state, size = 128 }: { state: AvatarState; size?: number }) {
  return (
    <svg
      className={`carter-${state}`}
      width={size}
      viewBox="0 0 200 220"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The AB Carter assistant"
    >
      <ellipse cx="100" cy="204" rx="50" ry="10" fill="#0f1b2d" opacity="0.12" />
      {/* bottom flange */}
      <ellipse cx="100" cy="158" rx="48" ry="13" fill="#233a5e" />
      {/* thread body */}
      <path
        d="M58 66 Q58 61 64 61 L136 61 Q142 61 142 66 L142 154 Q142 159 136 159 L64 159 Q58 159 58 154 Z"
        fill="#e6d5b8"
      />
      <path d="M58 86 Q100 94 142 86" stroke="#d4bf99" strokeWidth="3" fill="none" opacity="0.7" />
      <path d="M58 134 Q100 142 142 134" stroke="#d4bf99" strokeWidth="3" fill="none" opacity="0.7" />
      <line x1="60" y1="110" x2="140" y2="110" stroke="#d4bf99" strokeWidth="2" opacity="0.3" />
      {/* top flange */}
      <ellipse cx="100" cy="64" rx="48" ry="13" fill="#233a5e" />
      <ellipse cx="100" cy="62" rx="30" ry="7" fill="#1a2c47" />
      {/* cheeks */}
      <circle cx="74" cy="118" r="8" fill="#b1232b" opacity="0.16" />
      <circle cx="126" cy="118" r="8" fill="#b1232b" opacity="0.16" />
      {/* eyes (blink) */}
      <ellipse className="carter-eye" cx="86" cy="106" rx="6.5" ry="8.5" fill="#1a2c47" />
      <ellipse className="carter-eye" cx="114" cy="106" rx="6.5" ry="8.5" fill="#1a2c47" />
      <circle cx="88.3" cy="102.6" r="2.3" fill="#fff" />
      <circle cx="116.3" cy="102.6" r="2.3" fill="#fff" />
      {/* mouth — smile when idle, flaps open when talking */}
      <path
        className="carter-mouth-smile"
        d="M88 121 Q100 131 112 121"
        stroke="#1a2c47"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse className="carter-mouth-open" cx="100" cy="124" rx="8" ry="6" fill="#1a2c47" />
    </svg>
  );
}

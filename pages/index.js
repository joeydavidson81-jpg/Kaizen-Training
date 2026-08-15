import SpeechTranslator from '@/app/components/SpeechTranslator';

export default function Home() {
  return (
    <div className="container">
      <div className="header">
        {/* Pickleball Logo SVG */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          style={{ margin: '0 auto 12px', display: 'inline-block' }}
        >
          {/* Outer circle - red pickleball */}
          <circle cx="24" cy="24" r="22" fill="#C6533F" />

          {/* Waffle pattern (dimples) */}
          <g fill="none" stroke="#F3EBDD" strokeWidth="1.5" opacity="0.6">
            {/* Vertical lines */}
            <line x1="12" y1="10" x2="12" y2="38" />
            <line x1="18" y1="8" x2="18" y2="40" />
            <line x1="24" y1="8" x2="24" y2="40" />
            <line x1="30" y1="8" x2="30" y2="40" />
            <line x1="36" y1="10" x2="36" y2="38" />

            {/* Horizontal lines */}
            <line x1="10" y1="12" x2="38" y2="12" />
            <line x1="8" y1="18" x2="40" y2="18" />
            <line x1="8" y1="24" x2="40" y2="24" />
            <line x1="8" y1="30" x2="40" y2="30" />
            <line x1="10" y1="36" x2="38" y2="36" />
          </g>

          {/* Highlight for dimension */}
          <ellipse cx="18" cy="14" rx="6" ry="5" fill="#F3EBDD" opacity="0.3" />
        </svg>

        <h1>Real-Time Speech Translator</h1>
        <p>English ↔ Mandarin Chinese</p>
      </div>

      <SpeechTranslator />
    </div>
  );
}

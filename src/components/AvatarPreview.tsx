'use client';

import { ForwardedRef, forwardRef, useId } from 'react';

type AvatarPreviewProps = {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  tagline: string;
  showSparkline: boolean;
  showCar: boolean;
};

const AvatarPreview = forwardRef(function AvatarPreview(
  { primaryColor, accentColor, backgroundColor, tagline, showSparkline, showCar }: AvatarPreviewProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const gradientId = useId();
  const glowId = useId();
  const ringId = useId();

  const candles = [
    { x: 160, top: 210, bottom: 430, width: 36, wickTop: 160, wickBottom: 450, fill: accentColor },
    { x: 230, top: 170, bottom: 420, width: 32, wickTop: 120, wickBottom: 440, fill: primaryColor },
    { x: 300, top: 190, bottom: 370, width: 32, wickTop: 150, wickBottom: 390, fill: accentColor },
    { x: 370, top: 140, bottom: 400, width: 34, wickTop: 90, wickBottom: 420, fill: primaryColor },
    { x: 440, top: 220, bottom: 355, width: 30, wickTop: 180, wickBottom: 380, fill: accentColor }
  ];

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        maxWidth: 520,
        margin: '0 auto',
        padding: '42px 42px 36px',
        borderRadius: '28px',
        background: 'rgba(4, 8, 18, 0.88)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 32px 80px rgba(2, 4, 12, 0.6)',
        display: 'grid',
        gap: '24px'
      }}
    >
      <div
        className="avatar-grid"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1'
        }}
      >
        <svg viewBox="0 0 640 640" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id={`bg-${gradientId}`} cx="50%" cy="36%" r="68%">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.55" />
              <stop offset="32%" stopColor={primaryColor} stopOpacity="0.18" />
              <stop offset="100%" stopColor={backgroundColor} stopOpacity="1" />
            </radialGradient>

            <linearGradient id={`ring-${ringId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.68" />
              <stop offset="45%" stopColor={primaryColor} stopOpacity="0.55" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0.74" />
            </linearGradient>

            <filter id={`glow-${glowId}`} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="24" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="28" y="28" width="584" height="584" rx="132" fill={backgroundColor} />
          <rect x="28" y="28" width="584" height="584" rx="132" fill={`url(#bg-${gradientId})`} opacity="0.9" />

          <circle
            cx="320"
            cy="320"
            r="248"
            stroke={`url(#ring-${ringId})`}
            strokeWidth="3"
            fill="none"
            opacity="0.85"
          />

          <circle cx="320" cy="320" r="190" fill="rgba(7,13,28,0.74)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />

          {showSparkline && (
            <>
              <path
                d="M120 410 C180 338 210 320 250 320 C280 320 320 360 360 290 C390 240 430 230 470 280 C510 330 540 322 560 300"
                stroke={accentColor}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter={`url(#glow-${glowId})`}
                opacity="0.92"
              />
              <path
                d="M130 402 C178 332 216 332 252 334 C286 336 320 348 360 274 C392 214 430 210 468 262 C504 312 534 308 554 288"
                stroke={primaryColor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.72"
              />
            </>
          )}

          <g opacity="0.92">
            {candles.map((candle) => (
              <g key={candle.x}>
                <rect
                  x={candle.x}
                  y={candle.wickTop}
                  width="6"
                  height={candle.wickBottom - candle.wickTop}
                  rx="3"
                  fill="rgba(244,248,255,0.6)"
                  opacity="0.5"
                />
                <rect
                  x={candle.x - candle.width / 2}
                  y={candle.top}
                  width={candle.width}
                  height={candle.bottom - candle.top}
                  rx="12"
                  fill={candle.fill}
                  opacity="0.88"
                />
              </g>
            ))}
          </g>

          {showCar && (
            <g transform="translate(80 342)">
              <path
                d="M96 116C96 76 110 52 168 52H300C346 52 358 30 400 30C462 30 504 66 520 122L552 144C570 156 564 186 544 186H520C504 214 472 230 442 230C408 230 384 214 368 186H208C192 214 162 230 130 230C102 230 76 214 58 186H30C12 186 4 164 18 150L44 124C60 66 102 30 160 30H196C212 30 238 52 268 52H320C284 52 244 78 230 116H96Z"
                fill={primaryColor}
                opacity="0.82"
                filter={`url(#glow-${glowId})`}
              />
              <circle cx="142" cy="200" r="32" fill="rgba(7,13,28,0.92)" stroke={accentColor} strokeWidth="6" />
              <circle cx="414" cy="200" r="32" fill="rgba(7,13,28,0.92)" stroke={accentColor} strokeWidth="6" />
              <circle cx="142" cy="200" r="14" fill={accentColor} opacity="0.85" />
              <circle cx="414" cy="200" r="14" fill={accentColor} opacity="0.85" />
            </g>
          )}

          <g transform="translate(176 176)">
            <path
              d="M80 20h184c9 0 16 7 16 16v18c0 9-7 16-16 16h-64v150c0 11-9 20-20 20h-20c-11 0-20-9-20-20V70H80c-9 0-16-7-16-16V36c0-9 7-16 16-16Z"
              fill="rgba(255,255,255,0.94)"
            />
            <path
              d="M226 66c78 0 122 48 122 118s-44 118-122 118h-60c-9 0-16-7-16-16V82c0-9 7-16 16-16h60Zm2 66c-16 0-26 8-26 23v60c0 15 10 23 26 23 33 0 54-17 54-53s-21-53-54-53Z"
              fill={accentColor}
              opacity="0.94"
            />
          </g>
        </svg>
      </div>

      <div
        style={{
          display: 'grid',
          gap: '8px',
          textAlign: 'center'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-montserrat), sans-serif',
            fontWeight: 700,
            fontSize: '1.6rem',
            letterSpacing: '0.2em'
          }}
        >
          TRADE DAY
        </span>
        <span
          style={{
            fontSize: '1rem',
            lineHeight: 1.5,
            color: 'rgba(244,248,255,0.82)'
          }}
        >
          {tagline || 'Слоган бренда появится здесь'}
        </span>
      </div>
    </div>
  );
});

export default AvatarPreview;

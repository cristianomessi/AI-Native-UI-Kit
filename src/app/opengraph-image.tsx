import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export const alt = 'AI Native UI Kit — components for AI-native apps';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#0a0a0f',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: -80,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: 'radial-gradient(circle, #d946ef 0%, transparent 70%)',
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -160,
            right: -100,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
            opacity: 0.55,
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 26,
            color: '#c4b5fd',
            marginBottom: 24,
          }}
        >
          ✦ Components for AI-native apps
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            fontSize: 82,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            maxWidth: 900,
          }}
        >
          The UI kit for building AI-native interfaces
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 30,
            color: '#a1a1aa',
            maxWidth: 820,
          }}
        >
          ai-native-ui.com
        </div>
      </div>
    ),
    { ...size },
  );
}

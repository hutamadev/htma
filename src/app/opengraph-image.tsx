import { ImageResponse } from 'next/og';

export const alt = 'Hutama — Web Developer Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#1b1c17',
        padding: '80px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            backgroundColor: '#526600',
            color: '#d0ef67',
            borderRadius: '9999px',
            padding: '8px 24px',
            fontSize: '22px',
            fontWeight: 600,
          }}
        >
          htma.site
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div
          style={{
            fontSize: '72px',
            fontWeight: 800,
            color: '#e4e3da',
            letterSpacing: '-0.02em',
          }}
        >
          Hutama
        </div>
        <div
          style={{
            fontSize: '36px',
            color: '#b4d34e',
            fontWeight: 500,
          }}
        >
          Web Developer Portfolio
        </div>
        <div
          style={{
            fontSize: '24px',
            color: '#c7c8b8',
            maxWidth: '900px',
            lineHeight: 1.4,
          }}
        >
          Crafting high-performance web applications with React, Next.js,
          TypeScript, and Material 3 Expressive.
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #46483c',
          paddingTop: '32px',
        }}
      >
        <div style={{ color: '#909283', fontSize: '20px' }}>
          github.com/hutamadev
        </div>
        <div style={{ color: '#909283', fontSize: '20px' }}>
          Available for collaboration
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}

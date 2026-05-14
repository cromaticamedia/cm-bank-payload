'use client'

import { logos } from '@/lib/logos'

interface LoadingViewProps {
  visible?: boolean
}

export default function LoadingView({ visible = true }: LoadingViewProps) {
  return (
    <section
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-gradient-dark overflow-hidden transition-opacity duration-300 ease-in-out"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,166,251,0.05) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0,166,251,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center gap-2 transition-all duration-500 ease-out"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="glitch-wrapper">
          <img
            src={logos.lightIsotype}
            alt="Cromatica Media"
            width={160}
            style={{ display: 'var(--logo-light-display, block)' }}
            className="glitch-img"
          />
          <img
            src={logos.darkIsotype}
            alt="Cromatica Media"
            width={160}
            style={{ display: 'var(--logo-dark-display, none)' }}
            className="glitch-img"
          />
          <img
            src={logos.lightIsotype}
            aria-hidden
            alt=""
            width={160}
            style={{ display: 'var(--logo-light-display, block)' }}
            className="glitch-layer-top"
          />
          <img
            src={logos.darkIsotype}
            aria-hidden
            alt=""
            width={160}
            style={{ display: 'var(--logo-dark-display, none)' }}
            className="glitch-layer-top"
          />
          <img
            src={logos.lightIsotype}
            aria-hidden
            alt=""
            width={160}
            style={{ display: 'var(--logo-light-display, block)' }}
            className="glitch-layer-bottom"
          />
          <img
            src={logos.darkIsotype}
            aria-hidden
            alt=""
            width={160}
            style={{ display: 'var(--logo-dark-display, none)' }}
            className="glitch-layer-bottom"
          />
        </div>

        <div className="relative w-14 h-14 mr-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[4px] h-3 rounded-full bg-neutral-200 dark:bg-primary-1000"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 30}deg) translateY(-120%)`,
                transformOrigin: '50% 80%',
                opacity: 0.1,
                animation: `spinner-fade 1.2s steps(1, end) infinite`,
                animationDelay: `${(i / 12) * 1.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `.dark { --logo-light-display: none; --logo-dark-display: block; }`,
        }}
      />
    </section>
  )
}

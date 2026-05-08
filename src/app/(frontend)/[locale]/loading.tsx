import { logos } from '@/lib/logos'

export default function Loading() {
  return (
    <section className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-gradient-dark overflow-hidden">
      {/* Grid Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,166,251,0.05) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0,166,251,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        <img
          src={logos.light}
          alt="Cromatica Media"
          width={300}
          style={{ display: 'var(--logo-light-display, block)' }}
        />
        <img
          src={logos.dark}
          alt="Cromatica Media"
          width={300}
          style={{ display: 'var(--logo-dark-display, none)' }}
        />
        {/* Loading Bar */}
        <div className="flex flex-col items-center gap-4">
          <span className="font-space text-md font-bold tracking-[2px] uppercase text-neutral-500 dark:text-white animate-pulse">
            Loading
          </span>
          <div className="w-48 h-0.5 bg-primary-400/20 dark:bg-primary-400/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(to right, #00a6fb, #3694ff)',
                animation: 'progressSlide 1.8s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .dark { --logo-light-display: none; --logo-dark-display: block; }
        @keyframes progressSlide {
          0% { width: 0%; margin-left: 0; }
          50% { width: 60%; margin-left: 20%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `,
        }}
      />
    </section>
  )
}

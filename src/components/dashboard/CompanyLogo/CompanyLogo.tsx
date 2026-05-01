import { logos } from '@/config/logos'

export default function CompanyLogo() {
  return (
    <>
      <img
        src={logos.light}
        alt="Cromatica Media"
        width={250}
        height={60}
        style={{ display: 'var(--logo-light-display, block)' }}
        className="logo-light"
      />
      <img
        src={logos.dark}
        alt="Cromatica Media"
        width={250}
        height={60}
        style={{ display: 'var(--logo-dark-display, none)' }}
        className="logo-dark"
      />
      <style>{`
        [data-theme="dark"] .logo-light { display: none !important; }
        [data-theme="dark"] .logo-dark { display: block !important; }
        [data-theme="light"] .logo-light { display: block !important; }
        [data-theme="light"] .logo-dark { display: none !important; }
      `}</style>
    </>
  )
}

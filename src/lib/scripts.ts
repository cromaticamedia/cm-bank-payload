export const langScript = `
(function() {
  var locale = window.location.pathname.split('/')[1];
  if (locale && /^[a-z]{2}$/.test(locale)) document.documentElement.lang = locale;
})();
`
export const themeScript = `
(function() {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.classList.add(theme);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const hasStored = localStorage.getItem('theme');
    if (!hasStored) {
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(e.matches ? 'dark' : 'light');
    }
  });
})();
`

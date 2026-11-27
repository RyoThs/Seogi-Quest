// Icônes au trait (pas d'émoji).
const ic = d => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
export const ICONES = {
  retour: ic('<path d="M15 18l-6-6 6-6"/>'),
  ampoule: ic('<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/>'),
  effacer: ic('<path d="M21 5H9l-6 7 6 7h12zM18 9l-6 6M12 9l6 6"/>'),
  passer: ic('<path d="M5 4l10 8-10 8zM19 5v14"/>'),
  coche: ic('<path d="M5 12l5 5 9-10"/>'),
};

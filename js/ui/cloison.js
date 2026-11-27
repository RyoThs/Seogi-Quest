// « Cloison » : si une zone plante, seule cette zone affiche un message, le reste de l'appli continue.
export const echapper = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function proteger(nomZone, fabrique, { pluriel = false } = {}) {
  try {
    return fabrique();
  } catch (erreur) {
    console.error(`[${nomZone}]`, erreur);
    return `<div class="cloison" data-cloison role="alert"><p>${echapper(nomZone)} ${pluriel ? 'n’ont pas pu s’afficher' : "n'a pas pu s'afficher"}.</p>` +
      `<button class="btn-texte" data-action="reessayer">Réessayer</button></div>`;
  }
}

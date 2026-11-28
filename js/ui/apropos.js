// Page « À propos » : crédits obligatoires (licence CC BY-SA de la carte des muscles).
import { ICONES } from './icones.js';

export const ecranAPropos = () => `<div class="haut"><button class="btn-texte retour" data-action="aller" data-vers="#/">${ICONES.retour}Accueil</button><span>À propos</span><span></span></div>
  <div class="carte texte-page">
    <h3>Seogi Quest</h3>
    <p>Jeu pour apprendre les positions et les techniques du taekwondo, de la ceinture blanche au 9e dan. Fonctionne sans internet ; ta progression reste dans ton téléphone.</p>
    <h3>Le mannequin</h3>
    <p>Corps et squelette : <b>MakeHuman</b> (domaine public, CC0).<br>
    Carte des muscles : <b>Z-Anatomy / BodyParts3D</b>, licence <b>CC BY-SA 4.0</b>.<br>
    Les images du mannequin de Seogi Quest sont partagées sous la même licence CC BY-SA 4.0.</p>
    <h3>Le contenu</h3>
    <p>Programme Kukkiwon / World Taekwondo. Les noms et explications sont à faire valider par ton professeur.</p>
  </div>`;

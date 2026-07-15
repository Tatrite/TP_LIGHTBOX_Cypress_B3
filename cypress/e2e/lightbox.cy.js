// Tests Cypress pour le composant Lightbox

describe('Lightbox - Alpine JS / Tailwind', () => {

  beforeEach(() => {
    // Adapter l'URL selon l'endroit où le fichier est servi
    cy.visit('../../lightbox.html');
  });

    const overlaySelector = '.relative.w-64';
    const overlayLikes = `${overlaySelector} [x-text="likesCount"]`;

    const lightboxBackdrop = '.fixed.top-0.left-0.flex.flex-col';
    const lightboxLikes = '#lightbox [x-text="likesCount"]';
    const likeBtn = 'svg[title="Like"]';
    const dislikeBtn = 'svg[title="Dislike"]';

  // 1. Ouverture de la lightbox au clic sur l'image
  it('ouvre la lightbox au clic sur l\'image', () => {
    cy.get(lightboxBackdrop).should('not.be.visible');
    cy.get(`${overlaySelector} img`).click({ force: true });
    cy.get(lightboxBackdrop).should('be.visible');
    cy.get('#lightbox').should('be.visible');
  });
    // 2. Fermeture de la lightbox au clic en dehors
  it('ferme la lightbox au clic en dehors du bloc #lightbox', () => {
    cy.get(`${overlaySelector} img`).click({ force: true });
    cy.get(lightboxBackdrop).should('be.visible');

    // Clic sur le fond, en dehors de #lightbox (coin haut-gauche du backdrop)
    cy.get(lightboxBackdrop).click(5, 5);
    cy.get(lightboxBackdrop).should('not.be.visible');
  });

  // 3. Ajout du like et mise à jour des compteurs (overlay + lightbox)
  it('ajoute un like et met à jour les compteurs overlay et lightbox', () => {
    cy.get(`${overlaySelector} img`).click({ force: true });

    cy.get(likeBtn).click();

    cy.get(lightboxLikes).should('have.text', '1');
    cy.get(dislikeBtn).should('be.visible');
    cy.get(likeBtn).should('not.be.visible');

    // Vérification du compteur affiché dans l'overlay (survol pour l'afficher)
    cy.get(lightboxBackdrop).click(5, 5);
    cy.get(overlaySelector).trigger('mouseover');
    cy.get(overlayLikes).should('have.text', '1');
  });


});
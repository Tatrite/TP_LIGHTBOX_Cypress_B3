// Tests Cypress pour le composant Lightbox

describe('Lightbox - Alpine JS / Tailwind', () => {

  beforeEach(() => {
    // Adapter l'URL selon l'endroit où le fichier est servi
    cy.visit('../../lightbox.html');
  });

  const overlaySelector = '.relative.w-64';
  const lightboxBackdrop = '.fixed.top-0.left-0.flex.flex-col';

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



});
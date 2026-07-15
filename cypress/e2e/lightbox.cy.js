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


});
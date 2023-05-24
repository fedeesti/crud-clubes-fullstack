describe('Frontend management', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173');
  });
  describe('UI components', () => {
    it('should enter the page and display the title', () => {
      cy.title().should('eq', 'CRUD-Clubes');
      cy.get('h1').contains('CRUD-Clubes');
    });
    it('should show the navigation bar with its elements', () => {
      cy.get('#nav-crud-logo').as('NavLogo');
      cy.get('#nav-search-team').as('NavSearch');
      cy.get('#nav-search-menu').as('NavMenu');

      cy.get('@NavLogo').find('img').should('exist');
      cy.get('@NavLogo').find('span').contains('CRUD-Clubes');

      cy.get('@NavSearch').should('exist');

      cy.get('@NavMenu').should('exist');
      cy.get('@NavMenu').find('ul').first().contains('Home');
      cy.get('@NavMenu').find('ul').last().contains('Create team');
    });
  });
});

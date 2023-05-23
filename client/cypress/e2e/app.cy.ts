describe('Frontend management', () => {
  it('should enter the page and display the title', () => {
    cy.visit('http://127.0.0.1:5173/');
    cy.title().should('eq', 'CRUD-Clubes');
    cy.get('h1').contains('CRUD-Clubes');
  });
});

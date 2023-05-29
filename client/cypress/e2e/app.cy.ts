const URL_APP = 'http://127.0.0.1:5173';
const URL_API = 'http://localhost:3000/api/v1/teams/';

describe('Frontend management', () => {
  beforeEach(() => {
    cy.visit(URL_APP);
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
  describe('Teams Table', () => {
    it('should show the teams table', () => {
      cy.intercept('GET', URL_API, { fixture: 'teams.json' }).as('getAllTeams');
      cy.visit(URL_APP);
      cy.wait('@getAllTeams');

      cy.get('[data-cy="team-table-title"]').should('exist').and('contain', `There are 3 teams`);

      cy.get('[data-cy="teams-table"]').should('exist');
      cy.get('[data-cy="teams-table-header"]').should('exist');
      cy.get('[data-cy="teams-table-body"]').should('exist');

      cy.get('[data-cy="teams-table-header-name"]').should('exist').and('contain', 'Team name');
      cy.get('[data-cy="teams-table-header-country"]').should('exist').and('contain', 'Country');
      cy.get('[data-cy="teams-table-header-actions"]').should('exist').and('contain', 'Actions');

      cy.get('[data-cy="team-row-img"]').should('exist');
      cy.get('[data-cy="team-row-name"]').should('exist');
      cy.get('[data-cy="team-row-country"]').should('exist');

      cy.get('[data-cy="team-row-actions"]').find('a').eq(0).should('contain', 'Watch');
      cy.get('[data-cy="team-row-actions"]').find('a').eq(1).should('contain', 'Edit');
      cy.get('[data-cy="team-row-actions"]').find('a').eq(2).should('contain', 'Delete');
    });
  });
});

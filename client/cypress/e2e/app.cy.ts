const URL_APP = 'http://127.0.0.1:5173';
const URL_API = 'http://localhost:3000/api/v1/teams';

describe('Frontend management', () => {
  beforeEach(() => {
    cy.intercept('GET', URL_API, { fixture: 'teams.json' }).as('getAllTeams');
    cy.visit(URL_APP);
    cy.wait('@getAllTeams');
  });

  describe('Navbar', () => {
    it('should show the navigation bar with its elements', () => {
      cy.get('[data-cy="navbar-logo-container"]').as('NavLogo');
      cy.get('[data-cy="navbar-search"]').as('NavSearch');
      cy.get('[data-cy="navbar-menu"]').as('NavMenu');
      cy.get('[data-cy="navbar-menu-home"]').as('NavMenuHome');
      cy.get('[data-cy="navbar-menu-create-team"]').as('NavMenuCreateTeam');

      cy.get('@NavLogo').find('img').should('exist');
      cy.get('@NavLogo').find('span').contains('CRUD-Clubes');

      cy.get('@NavSearch').should('exist');

      cy.get('@NavMenu').should('exist');
      cy.get('@NavMenuHome').contains('Home');
      cy.get('@NavMenuCreateTeam').contains('Create team');
    });
  });

  describe('Teams Table', () => {
    it('should enter the page and display the title', () => {
      cy.title().should('eq', 'CRUD-Clubes');
      cy.get('h1').contains('CRUD-Clubes');
    });

    it('should show the teams table', () => {
      cy.get('[data-cy="team-table-title"]').should('exist').and('contain', `There are 3 teams`);

      cy.get('[data-cy="teams-table"]').should('exist');
      cy.get('[data-cy="teams-table-header"]').should('exist');
      cy.get('[data-cy="teams-table-body"]').should('exist').children().and('have.length', 3);

      cy.get('[data-cy="teams-table-header-name"]').should('exist').and('contain', 'Team name');
      cy.get('[data-cy="teams-table-header-country"]').should('exist').and('contain', 'Country');
      cy.get('[data-cy="teams-table-header-actions"]').should('exist').and('contain', 'Actions');

      cy.get('[data-cy="team-row-img"]').should('exist');
      cy.get('[data-cy="team-row-name"]').should('exist');
      cy.get('[data-cy="team-row-country"]').should('exist');

      cy.get('[data-cy="team-actions-watch"]').contains('Watch');
      cy.get('[data-cy="team-actions-edit"]').contains('Edit');
      cy.get('[data-cy="team-actions-delete"]').contains('Delete');
    });
    it('tests trying to navigate from home page to team page', () => {
      cy.get('[data-cy="team-row-actions"]').as('Actions');

      cy.intercept('GET', `${URL_API}/57`, { fixture: 'team-without-data.json' });
      cy.get('@Actions').find('a').eq(0).click();

      cy.get('[data-cy="team-title"]').as('TeamTitle');
      cy.get('@TeamTitle').find('h1').should('contain', 'Manchester City FC');
    });
  });

  describe('Team page', () => {
    it('should show the team all their data', () => {
      cy.get('[data-cy="team-row-actions"]').as('Actions');
      cy.intercept('GET', `${URL_API}/57`, { fixture: 'team-with-data.json' }).as('getTeam');
      cy.get('@Actions').find('a').eq(0).click();

      cy.get('[data-cy="team-header"]').as('TeamHeader');
      cy.get('[data-cy="team-title"]').as('TeamTitle');
      cy.get('[data-cy="team-section-container"]').as('TeamSectionContainer');
      cy.get('[data-cy="team-data-title"]').as('TeamDataTitle');
      cy.get('[data-cy="team-data-container"]').as('TeamDataContainer');

      cy.get('@TeamHeader').should('exist');
      cy.get('@TeamHeader').find('img').should('exist').and('have.attr', 'alt', 'logo-Man City');
      cy.get('@TeamTitle').should('exist');
      cy.get('@TeamTitle').find('h1').contains('Manchester City FC').and('have.class', 'uppercase');
      cy.get('@TeamTitle').find('span').contains('MCI');

      cy.get('@TeamSectionContainer').should('exist');
      cy.get('@TeamDataTitle').contains('Overview');
      cy.get('@TeamDataContainer').should('exist').children().and('have.length', 9);
    });
    it('should show the team without your data', () => {
      cy.get('[data-cy="team-row-actions"]').as('Actions');
      cy.intercept('GET', `${URL_API}/57`, { fixture: 'team-without-data.json' }).as('getTeam');
      cy.get('@Actions').find('a').eq(0).click();

      cy.get('[data-cy="team-header"]').as('TeamHeader');
      cy.get('[data-cy="team-title"]').as('TeamTitle');
      cy.get('[data-cy="team-section-container"]').as('TeamSectionContainer');
      cy.get('[data-cy="team-data-title"]').as('TeamDataTitle');
      cy.get('[data-cy="team-data-container"]').as('TeamDataContainer');

      cy.get('@TeamHeader').should('exist');
      cy.get('@TeamHeader').find('img').should('exist');
      cy.get('@TeamTitle').should('exist');
      cy.get('@TeamTitle').find('h1').contains('Manchester City FC').and('have.class', 'uppercase');
      cy.get('@TeamTitle').find('span').contains('MCI');

      cy.get('@TeamSectionContainer').should('exist');
      cy.get('@TeamDataTitle').contains('Overview');
      cy.get('@TeamDataContainer').should('exist').children().and('have.length', 0);
    });
    it('tests trying to navigate from team page to home page', () => {
      cy.get('[data-cy="navbar-logo-container"]').as('NavLogo');

      cy.intercept('GET', URL_API, { fixture: 'teams.json' });
      cy.get('@NavLogo').click();

      cy.get('h1').contains('CRUD-Clubes');
    });
  });
  describe('Delete Team', () => {
    beforeEach(() => {
      cy.get('[data-cy="team-actions-delete"]').eq(0).click();
    });
    it('when clicking on delete, it should show a modal to confirm the action', () => {
      cy.get('[data-cy="modal-container"]').as('Modal');
      cy.get('[data-cy="modal-close"]').as('ModalClose');
      cy.get('[data-cy="modal-img"]').as('ModalTeamImg');
      cy.get('[data-cy="modal-information"]').as('ModalInformation');
      cy.get('[data-cy="modal-btn-confirm"]').as('ModalBtnConfirm');
      cy.get('[data-cy="modal-btn-cancel"]').as('ModalBtnCancel');

      cy.get('@Modal').should('exist');
      cy.get('@ModalClose').should('exist');
      cy.get('@ModalTeamImg').should('exist').and('have.attr', 'alt', 'logo-Arsenal');
      cy.get('@ModalInformation').contains('Are you sure you want to delete');
      cy.get('@ModalBtnConfirm').contains("Yes, I'm sure");
      cy.get('@ModalBtnCancel').contains('No, cancel');
    });
    it('when clicking outside the modal, should be closed and go to home page', () => {
      cy.get('[data-cy="modal-container"]').as('Modal');

      cy.get('@Modal').should('exist');

      cy.intercept('GET', URL_API, { fixture: 'teams.json' }).as('getAllTeams');
      cy.get('#popup-modal').click('top', { force: true });
      cy.wait('@getAllTeams');

      cy.get('h1').contains('CRUD-Clubes');
      cy.get('@Modal').should('not.exist');
    });
    it('when clicking the modal close should be closed and go to home page', () => {
      cy.get('[data-cy="modal-container"]').as('Modal');
      cy.get('[data-cy="modal-close"]').as('ModalClose');

      cy.get('@Modal').should('exist');

      cy.intercept('GET', URL_API, { fixture: 'teams.json' }).as('getAllTeams');
      cy.get('@ModalClose').click();
      cy.wait('@getAllTeams');

      cy.get('h1').contains('CRUD-Clubes');
      cy.get('@Modal').should('not.exist');
    });
    it('when clicking the button cancel should be closed the modal and go to home page', () => {
      cy.get('[data-cy="modal-container"]').as('Modal');
      cy.get('[data-cy="modal-btn-cancel"]').as('ModalBtnCancel');

      cy.get('@Modal').should('exist');

      cy.intercept('GET', URL_API, { fixture: 'teams.json' }).as('getAllTeams');
      cy.get('@ModalBtnCancel').click();
      cy.wait('@getAllTeams');

      cy.get('h1').contains('CRUD-Clubes');
      cy.get('@Modal').should('not.exist');
    });
    it.only('when confirming the removal successfully should go to the home page ', () => {
      cy.get('[data-cy="modal-container"]').as('Modal');
      cy.get('[data-cy="modal-btn-confirm"]').as('ModalBtnConfirm');

      cy.intercept('DELETE', `${URL_API}/57`).as('DeleteTeam');
      cy.intercept('GET', URL_API, { fixture: 'teams-two-lenght.json' }).as('getTwoTeams');
      cy.get('@ModalBtnConfirm').click();
      cy.wait('@getTwoTeams');
      cy.get('[data-cy="teams-table-body"]').find('tr').should('have.length', 2);
    });
  });
});

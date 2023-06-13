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
    it('when confirming the removal successfully should go to the home page ', () => {
      cy.get('[data-cy="modal-container"]').as('Modal');
      cy.get('[data-cy="modal-btn-confirm"]').as('ModalBtnConfirm');

      cy.intercept('DELETE', `${URL_API}/57`).as('DeleteTeam');
      cy.intercept('GET', URL_API, { fixture: 'teams-two-lenght.json' }).as('getTwoTeams');
      cy.get('@ModalBtnConfirm').click();
      cy.wait('@getTwoTeams');
      cy.get('[data-cy="teams-table-body"]').find('tr').should('have.length', 2);
    });
  });
  describe('Add a new team', () => {
    beforeEach(() => {
      cy.get('[data-cy="navbar-menu-create-team"]').click();
    });
    it('when clicking to create a team should be moved to the add a Team page and show the form', () => {
      cy.url().should('include', '/teams/add');
      cy.get('[data-cy="add-team-title"]').contains('Add a new team').as('addTeamTitle');
      cy.get('[data-cy="team-form-container"]').should('exist').as('formContainer');

      cy.get('[data-cy="form-team-name"]').should('exist').as('nameField');
      cy.get('@nameField').find('label').contains('Team Name');
      cy.get('@nameField').find('label > span').contains('*').and('have.class', 'text-red-800');
      cy.get('@nameField').find('input').should('be.visible');

      cy.get('[data-cy="form-short-name"]').should('exist').as('shortNameField');
      cy.get('@shortNameField').find('label').contains('Short name');
      cy.get('@shortNameField').find('label > span').contains('*').and('have.class', 'text-red-800');
      cy.get('@shortNameField').find('input').should('be.visible');

      cy.get('[data-cy="form-tla"]').should('exist').as('tlaField');
      cy.get('@tlaField').find('label').contains('TLA');
      cy.get('@tlaField').find('label > span').contains('*').and('have.class', 'text-red-800');
      cy.get('@tlaField').find('input').should('be.visible');

      cy.get('[data-cy="form-country"]').should('exist').as('countryField');
      cy.get('@countryField').find('label').contains('Country');
      cy.get('@countryField').find('label > span').contains('*').and('have.class', 'text-red-800');
      cy.get('@countryField').find('select').should('be.visible');

      cy.get('[data-cy="form-club-colors"]').as('clubColorsField');
      cy.get('@clubColorsField').find('label').contains('Club Colors');
      cy.get('@clubColorsField').find('label > span').contains('*').and('have.class', 'text-red-800');
      cy.get('@clubColorsField').find('input').should('be.visible');

      cy.get('[data-cy="form-venue"]').as('venueField');
      cy.get('@venueField').find('label').contains('Stadium name');
      cy.get('@venueField').find('input').should('be.visible');

      cy.get('[data-cy="form-founded"]').as('foundedField');
      cy.get('@foundedField').find('label').contains('Founded');
      cy.get('@foundedField').find('input').should('be.visible');

      cy.get('[data-cy="form-address"]').as('addressField');
      cy.get('@addressField').find('label').contains('Address');
      cy.get('@addressField').find('input').should('be.visible');

      cy.get('[data-cy="form-phone"]').as('phoneField');
      cy.get('@phoneField').find('label').contains('Phone');
      cy.get('@phoneField').find('input').should('be.visible');

      cy.get('[data-cy="form-email"]').as('emailField');
      cy.get('@emailField').find('label').contains('Email');
      cy.get('@emailField').find('input').should('be.visible');

      cy.get('[data-cy="form-website"]').as('websiteField');
      cy.get('@websiteField').find('label').contains('Website');
      cy.get('@websiteField').find('input').should('be.visible');

      cy.get('[data-cy="form-update-logo"]').as('logoField');
      cy.get('@logoField').find('label').contains('Upload logo');
      cy.get('@logoField').find('label > span').contains('*').and('have.class', 'text-red-800');
      cy.get('@logoField').find('input').should('be.visible');

      cy.get('[data-cy="form-btn-submit"]').contains('Add team').as('BtnSubmitForm');
    });
    it('when creating a team successfully should go to the home page', () => {
      const team = {
        area: {
          name: 'Italy',
        },
        name: 'AC Milán',
        crestUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Leeds_United.svg',
        address: 'Anfield Road Liverpool L4 OTH',
        shortName: 'Milán',
        tla: 'MIL',
        phone: '+44 (0871) 9841955',
        website: 'http://www.acmilan.com',
        email: 'acmilan@contac.com',
        founded: 1905,
        clubColors: 'Red / Black',
        venue: 'San Siro',
      };

      cy.get('[data-cy="form-team-name"]').type(team.name);
      cy.get('[data-cy="form-short-name"]').find('input').type(team.shortName);
      cy.get('[data-cy="form-tla"]').find('input').type(team.tla);
      cy.get('[data-cy="form-country"]').find('select').select(team.area.name);
      cy.get('[data-cy="form-club-colors"]').find('input').type(team.clubColors);
      cy.get('[data-cy="form-venue"]').find('input').type(team.venue);
      cy.get('[data-cy="form-founded"]').find('input').type(`${team.founded}`);
      cy.get('[data-cy="form-address"]').find('input').type(team.address);
      cy.get('[data-cy="form-phone"]').find('input').type(team.phone);
      cy.get('[data-cy="form-email"]').find('input').type(team.email);
      cy.get('[data-cy="form-website"]').find('input').type(team.website);
      cy.get('[data-cy="form-update-logo"]').find('input').selectFile('cypress/fixtures/ac-milan.png', { force: true });

      cy.intercept('POST', URL_API, { fixture: 'team-with-data.json' }).as('createATeam');
      cy.intercept('GET', URL_API, { fixture: 'teams-four-lenght.json' }).as('getFourTeams');
      cy.get('[data-cy="form-btn-submit"]').click();

      cy.url().should('not.include', '/teams/add');
      cy.get('h1').contains('CRUD-Clubes');
      cy.get('[data-cy="teams-table-body"]').find('tr').should('have.length', 4);
    });
  });
  describe('Update team', () => {
    it('when clicking to Edit should be moved to the Team update page and show the form', () => {
      cy.intercept('GET', `${URL_API}/57`, { fixture: 'team-with-data.json' }).as('GetTeam');
      cy.get('[data-cy="team-actions-edit"]').eq(0).click();

      cy.url().should('include', '/edit');
      cy.get('[data-cy="add-team-title"]').contains('Update team');
      cy.get('[data-cy="team-form-container"]').should('exist').as('formContainer');

      cy.get('[data-cy="form-team-name"]').should('exist').as('nameField');
      cy.get('@nameField').find('label').contains('Team Name');
      cy.get('@nameField').find('label > span').should('not.exist');
      cy.get('@nameField').find('input').should('be.visible');

      cy.get('[data-cy="form-short-name"]').should('exist').as('shortNameField');
      cy.get('@shortNameField').find('label').contains('Short name');
      cy.get('@shortNameField').find('label > span').should('not.exist');
      cy.get('@shortNameField').find('input').should('be.visible');

      cy.get('[data-cy="form-tla"]').should('exist').as('tlaField');
      cy.get('@tlaField').find('label').contains('TLA');
      cy.get('@tlaField').find('label > span').should('not.exist');
      cy.get('@tlaField').find('input').should('be.visible');

      cy.get('[data-cy="form-country"]').should('exist').as('countryField');
      cy.get('@countryField').find('label').contains('Country');
      cy.get('@countryField').find('label > span').should('not.exist');
      cy.get('@countryField').find('select').should('be.visible');

      cy.get('[data-cy="form-club-colors"]').as('clubColorsField');
      cy.get('@clubColorsField').find('label').contains('Club Colors');
      cy.get('@clubColorsField').find('label > span').should('not.exist');
      cy.get('@clubColorsField').find('input').should('be.visible');

      cy.get('[data-cy="form-venue"]').as('venueField');
      cy.get('@venueField').find('label').contains('Stadium name');
      cy.get('@venueField').find('input').should('be.visible');

      cy.get('[data-cy="form-founded"]').as('foundedField');
      cy.get('@foundedField').find('label').contains('Founded');
      cy.get('@foundedField').find('input').should('be.visible');

      cy.get('[data-cy="form-address"]').as('addressField');
      cy.get('@addressField').find('label').contains('Address');
      cy.get('@addressField').find('input').should('be.visible');

      cy.get('[data-cy="form-phone"]').as('phoneField');
      cy.get('@phoneField').find('label').contains('Phone');
      cy.get('@phoneField').find('input').should('be.visible');

      cy.get('[data-cy="form-email"]').as('emailField');
      cy.get('@emailField').find('label').contains('Email');
      cy.get('@emailField').find('input').should('be.visible');

      cy.get('[data-cy="form-website"]').as('websiteField');
      cy.get('@websiteField').find('label').contains('Website');
      cy.get('@websiteField').find('input').should('be.visible');

      cy.get('[data-cy="form-update-logo"]').as('logoField');
      cy.get('@logoField').find('label').contains('Upload logo');
      cy.get('@logoField').find('label > span').should('not.exist');
      cy.get('@logoField').find('input').should('be.visible');

      cy.get('[data-cy="form-btn-update"]').contains('Update team');
      cy.get('[data-cy="form-btn-delete"]').contains('Delete');
    });
    it('when clicking to update team should go to the home page', () => {
      cy.intercept('GET', `${URL_API}/57`, { fixture: 'team-with-data.json' }).as('GetTeam');
      cy.get('[data-cy="team-actions-edit"]').eq(0).click();

      cy.intercept('PUT', `${URL_API}/57`, { fixture: 'team-with-data.json' }).as('UpdateTeam');
      cy.intercept('GET', URL_API, { fixture: 'teams.json' }).as('getTeams');
      cy.get('[data-cy="form-btn-update"]').click();

      cy.url().should('not.include', '/edit');
      cy.get('h1').contains('CRUD-Clubes');
    });
    it('when clicking to delete team should go to the home page', () => {
      cy.intercept('GET', `${URL_API}/57`, { fixture: 'team-with-data.json' }).as('GetTeam');
      cy.get('[data-cy="team-actions-edit"]').eq(0).click();

      cy.intercept('DELETE', `${URL_API}/57`).as('DeleteTeam');
      cy.intercept('GET', URL_API, { fixture: 'teams-two-lenght.json' }).as('getTwoTeams');
      cy.get('[data-cy="form-btn-delete"]').click();

      cy.wait('@getTwoTeams');

      cy.url().should('not.include', '/edit');
      cy.get('h1').contains('CRUD-Clubes');
      cy.get('[data-cy="teams-table-body"]').find('tr').should('have.length', 2);
    });
  });
});

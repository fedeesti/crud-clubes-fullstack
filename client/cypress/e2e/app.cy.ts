describe('Frontend management', () => {
  beforeEach(() => {
    cy.intercept('GET', Cypress.env('URL_API'), { fixture: 'teams.json' }).as('getAllTeams');
    cy.visit(Cypress.env('URL_APP'));
    cy.wait('@getAllTeams');
  });

  describe('Navbar', () => {
    describe('Deskptop viewport', () => {
      it('should show the navigation bar with its elements on laptop viewport', () => {
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
      it('when clicking on the search it should not show the suggestions', () => {
        cy.get('[data-cy="navbar-search"]').click();

        cy.get('[data-cy="search-team-list"]').should('not.exist');
      });
      it('when typing a team in the search it should show the suggested teams', () => {
        cy.get('[data-cy="nav-search-input"]').click();
        cy.get('[data-cy="nav-search-input"]').type('chel').should('have.value', 'chel');

        cy.get('[data-cy="search-team-list"]').should('be.visible');
      });
      it('typing a team into the search and clicking outside of the search should close the suggestions', () => {
        cy.get('[data-cy="nav-search-input"]').click();

        cy.get('[data-cy="nav-search-input"]').type('chel').should('have.value', 'chel');
        cy.get('[data-cy="search-team-list"]').should('be.visible');

        cy.get('[data-cy="navbar-logo-container"]').click();

        cy.get('[data-cy="search-team-list"]').should('not.exist');
        cy.get('[data-cy="nav-search-input"]').invoke('attr', 'placeholder').should('contain', 'Search team...');
      });
      it('by typing a team in the search and matching the suggested one, you should click on the team and go to view it', () => {
        cy.get('[data-cy="nav-search-input"]').click();
        cy.get('[data-cy="nav-search-input"]').type('chel').should('have.value', 'chel');
        cy.url().should('not.include', '/teams');

        cy.intercept('GET', `${Cypress.env('URL_API')}/3`, { fixture: 'team-without-data.json' }).as('getTeam');
        cy.get('[data-cy="nav-search-list-team"]').find('li > a').eq(0).click();

        cy.url().should('include', '/teams');
        cy.get('[data-cy="search-team-list"]').should('not.exist');
      });
    });

    describe('Mobile viewport', () => {
      beforeEach(() => {
        cy.viewport('iphone-8');
      });
      afterEach(() => {
        cy.viewport('macbook-15');
      });
      it('should show the search and menu icons in the mobile viewport', () => {
        cy.get('[data-cy="nav-btn-search-icon"]').should('exist').as('btnSearch');
        cy.get('[data-cy="nav-btn-menu-icon"]').should('exist').as('btnOpenMenu');

        cy.get('@btnSearch').click();
        cy.get('[data-cy="nav-btn-search-icon"]').should('be.visible');
        cy.get('[data-cy="navbar-menu"]').should('not.be.visible');

        cy.get('[data-cy="navbar-logo-container"]').click();
        cy.get('[ data-cy="nav-search-mobile"]').should('not.be.visible');
        cy.get('[data-cy="navbar-menu"]').should('not.be.visible');

        cy.get('@btnOpenMenu').click();
        cy.get('[data-cy="navbar-menu"]').should('be.visible');
        cy.get('[data-cy="navbar-menu-home"]').should('be.visible');
        cy.get('[data-cy="navbar-menu-create-team"]').should('be.visible');
        cy.get('[ data-cy="nav-search-mobile"]').should('not.be.visible');

        cy.get('[data-cy="navbar-logo-container"]').click();
        cy.get('[ data-cy="nav-search-mobile"]').should('not.be.visible');
        cy.get('[data-cy="navbar-menu"]').should('not.be.visible');
      });
      it('when clicking on the search it should not show the suggestions', () => {
        cy.get('[data-cy="nav-btn-search-icon"]').click();

        cy.get('[data-cy="search-team-list"]').should('not.exist');
      });
      it('when typing a team in the search it should show the suggested teams', () => {
        cy.get('[data-cy="nav-btn-search-icon"]').click();

        cy.get('[data-cy="nav-search-input-mobile"]').type('chel').should('have.value', 'chel');
        cy.get('[data-cy="search-team-list-mobile"]').should('be.visible');
      });
      it('typing a team into the search and clicking outside of the search should close the suggestions', () => {
        cy.get('[data-cy="nav-btn-search-icon"]').click();

        cy.get('[data-cy="nav-search-input-mobile"]').type('chel').should('have.value', 'chel');
        cy.get('[data-cy="search-team-list-mobile"]').should('be.visible');

        cy.get('[data-cy="navbar-logo-container"]').click();

        cy.get('[data-cy="search-team-list-mobile"]').should('not.exist');
        cy.get('[data-cy="nav-search-input-mobile"]').invoke('attr', 'placeholder').should('contain', 'Search team...');
      });
      it('by typing a team in the search and matching the suggested one, you should click on the team and go to view it', () => {
        cy.get('[data-cy="nav-btn-search-icon"]').click();

        cy.get('[data-cy="nav-search-input-mobile"]').type('chel').should('have.value', 'chel');
        cy.url().should('not.include', '/teams');

        cy.intercept('GET', `${Cypress.env('URL_API')}/3`, { fixture: 'team-without-data.json' }).as('getTeam');
        cy.get('[data-cy="search-team-list-mobile"]').find('li > a').eq(0).click();

        cy.url().should('include', '/teams');
        cy.get('[data-cy="search-team-list-mobile"]').should('not.exist');
      });
    });
  });

  describe('Teams Table', () => {
    it('should enter the page and display the title', () => {
      cy.title().should('eq', 'CRUD-Clubes');
      cy.get('h1').contains('CRUD-Clubes');
    });
    describe('Laptop viewport', () => {
      it('should show the teams table', () => {
        cy.get('[data-cy="team-table-title"]').should('exist').and('contain', `There are 3 teams`);
        cy.get('[data-cy="home-btn-add-team"]').should('be.visible').and('contain', 'ADD');

        cy.get('[data-cy="teams-table"]').should('exist');
        cy.get('[data-cy="teams-table-header"]').should('exist');
        cy.get('[data-cy="teams-table-body"]').should('exist').children().and('have.length', 3);

        cy.get('[data-cy="teams-table-header-name"]').should('exist').and('contain', 'Team name');
        cy.get('[data-cy="teams-table-header-country"]').should('exist').and('contain', 'Country');
        cy.get('[data-cy="teams-table-header-actions"]').should('exist').and('contain', 'Actions');

        cy.get('[data-cy="team-row-img"]').should('exist');
        cy.get('[data-cy="team-row-name"]').should('exist');
        cy.get('[data-cy="team-row-country"]').should('exist');
        cy.get('[data-cy="team-row-actions"]').should('be.visible');
        cy.get('[data-cy="row-actions-mobile-icons"]').should('not.be.visible');

        cy.get('[data-cy="team-actions-watch"]').contains('Watch');
        cy.get('[data-cy="team-actions-edit"]').contains('Edit');
        cy.get('[data-cy="team-actions-delete"]').contains('Delete');
      });
      it('tests trying to navigate from the home page to the create team page', () => {
        cy.get('h1').contains('CRUD-Clubes');

        cy.get('[data-cy="home-btn-add-team"]').click();

        cy.url().should('include', '/teams/add');
      });
    });

    describe('Mobile viewport', () => {
      beforeEach(() => {
        cy.viewport('iphone-8');
      });
      afterEach(() => {
        cy.viewport('macbook-15');
      });
      it('should show the teams table', () => {
        cy.get('[data-cy="team-table-title"]').should('exist').and('contain', `There are 3 teams`);
        cy.get('[data-cy="home-btn-add-team"]').should('be.visible').and('contain', 'ADD');

        cy.get('[data-cy="teams-table"]').should('exist');
        cy.get('[data-cy="teams-table-header"]').should('exist');
        cy.get('[data-cy="teams-table-body"]').should('exist').children().and('have.length', 3);

        cy.get('[data-cy="teams-table-header-name"]').should('exist').and('contain', 'Team name');
        cy.get('[data-cy="teams-table-header-country"]').should('exist').and('contain', 'Country');
        cy.get('[data-cy="teams-table-header-actions"]').should('exist').and('contain', 'Actions');

        cy.get('[data-cy="team-row-img"]').should('exist');
        cy.get('[data-cy="team-row-name"]').should('exist');
        cy.get('[data-cy="team-row-country"]').should('exist');
        cy.get('[data-cy="team-row-actions"]').should('not.be.visible');
        cy.get('[data-cy="row-actions-mobile-icons"]').should('be.visible');

        cy.get('[data-cy="row-actions-mobile-icons-watch"]').should('be.visible');
        cy.get('[data-cy="row-actions-mobile-icons-edit"]').should('be.visible');
        cy.get('[data-cy="row-actions-mobile-icons-delete"]').should('be.visible');
      });
      it('tests trying to navigate from the home page to the team page', () => {
        cy.get('[data-cy="row-actions-mobile-icons-watch"]').as('Actions');

        cy.intercept('GET', `${Cypress.env('URL_API')}/1`, { fixture: 'team-with-data.json' });
        cy.get('@Actions').eq(0).click();

        cy.get('[data-cy="team-title"]').as('TeamTitle');
        cy.get('@TeamTitle').find('h1').should('contain', 'Man City');
      });
      it('tests trying to navigate from the home page to the edit team page', () => {
        cy.get('[data-cy="row-actions-mobile-icons-edit"]').as('editActions');

        cy.intercept('GET', `${Cypress.env('URL_API')}/1`, { fixture: 'team-with-data.json' });
        cy.intercept('GET', `${Cypress.env('URL_API')}/1/edit`, { fixture: 'team-without-data.json' });
        cy.get('@editActions').eq(0).click();

        cy.get('[data-cy="update-team-title"]').as('updateTeamTitle');
        cy.get('@updateTeamTitle').should('contain', 'Update team');
      });
      it('should open the modal with the delete button in the action table', () => {
        cy.get('[data-cy="row-actions-mobile-icons-delete"]').as('deleteActions');

        cy.get('@deleteActions').eq(0).click();
        cy.get('[data-cy="modal-container"]').should('be.visible');
      });
    });
  });

  describe('Team page', () => {
    it('should show the team all their data', () => {
      cy.get('[data-cy="team-row-actions"]').as('Actions');
      cy.intercept('GET', `${Cypress.env('URL_API')}/1`, { fixture: 'team-with-data.json' }).as('getTeam');
      cy.get('@Actions').find('a').eq(0).click();

      cy.get('[data-cy="team-header"]').as('TeamHeader');
      cy.get('[data-cy="team-title"]').as('TeamTitle');
      cy.get('[data-cy="team-section-container"]').as('TeamSectionContainer');
      cy.get('[data-cy="team-data-title"]').as('TeamDataTitle');
      cy.get('[data-cy="team-address-map"]').as('teamAddressMap');
      cy.get('[data-cy="team-data-container"]').as('TeamDataContainer');
      cy.get('[data-cy="watch-team-btn-edit"]').as('btnEditTeam');

      cy.get('@TeamHeader').should('exist');
      cy.get('@TeamHeader').find('img').should('exist').and('have.attr', 'alt', 'logo-Man City');
      cy.get('@TeamTitle').should('exist');
      cy.get('@TeamTitle').find('h1').contains('Manchester City FC').and('have.class', 'uppercase');
      cy.get('@TeamTitle').find('span').contains('MCI');

      cy.get('@TeamSectionContainer').should('exist');
      cy.get('@TeamDataTitle').contains('Overview');
      cy.get('@teamAddressMap').should('exist');
      cy.get('@TeamDataContainer').should('exist').children().and('have.length', 9);
      cy.get('@btnEditTeam').should('be.visible').contains('Edit team');
    });
    it('should show the team without your data', () => {
      cy.get('[data-cy="team-row-actions"]').as('Actions');
      cy.intercept('GET', `${Cypress.env('URL_API')}/1`, { fixture: 'team-without-data.json' }).as('getTeam');
      cy.get('@Actions').find('a').eq(0).click();

      cy.get('[data-cy="team-header"]').as('TeamHeader');
      cy.get('[data-cy="team-title"]').as('TeamTitle');
      cy.get('[data-cy="team-section-container"]').as('TeamSectionContainer');
      cy.get('[data-cy="team-data-title"]').as('TeamDataTitle');
      cy.get('[data-cy="team-address-map"]').as('teamAddressMap');
      cy.get('[data-cy="team-data-container"]').as('TeamDataContainer');
      cy.get('[data-cy="watch-team-btn-edit"]').as('btnEditTeam');

      cy.get('@TeamHeader').should('exist');
      cy.get('@TeamHeader').find('img').should('exist');
      cy.get('@TeamTitle').should('exist');
      cy.get('@TeamTitle').find('h1').contains('Manchester City FC').and('have.class', 'uppercase');
      cy.get('@TeamTitle').find('span').contains('MCI');

      cy.get('@TeamSectionContainer').should('exist');
      cy.get('@TeamDataTitle').contains('Overview');
      cy.get('@teamAddressMap').should('exist');
      cy.get('@TeamDataContainer').should('exist').children().and('have.length', 0);
      cy.get('@btnEditTeam').should('be.visible').contains('Edit team');
    });
    it('tests trying to navigate from team page to home page', () => {
      cy.get('[data-cy="team-actions-watch"]').as('watchTeam');
      cy.intercept('GET', `${Cypress.env('URL_API')}/1`, { fixture: 'team-without-data.json' }).as('getTeam');
      cy.get('@watchTeam').eq(0).click();

      cy.url().should('include', '/teams');

      cy.get('[data-cy="navbar-logo-container"]').as('NavLogo');

      cy.intercept('GET', Cypress.env('URL_API'), { fixture: 'teams.json' });
      cy.get('@NavLogo').click();

      cy.url().should('not.include', '/teams');
      cy.get('h1').contains('CRUD-Clubes');
    });
    it('tests trying to navigate from the team page to the edit team page', () => {
      cy.get('[data-cy="team-actions-watch"]').as('watchTeam');
      cy.intercept('GET', `${Cypress.env('URL_API')}/1`, { fixture: 'team-without-data.json' }).as('getTeam');
      cy.get('@watchTeam').eq(0).click();

      cy.url().should('include', '/teams');
      cy.url().should('not.include', '/edit');

      cy.intercept('GET', `${Cypress.env('URL_API')}/5`, { fixture: 'team-with-data.json' }).as('GetTeam');
      cy.get('[data-cy="watch-team-btn-edit"]').click();

      cy.url().should('include', '/edit');
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

      cy.intercept('GET', Cypress.env('URL_API'), { fixture: 'teams.json' }).as('getAllTeams');
      cy.get('#popup-modal').click('top', { force: true });
      cy.wait('@getAllTeams');

      cy.get('h1').contains('CRUD-Clubes');
      cy.get('@Modal').should('not.exist');
    });
    it('when clicking the modal close should be closed and go to home page', () => {
      cy.get('[data-cy="modal-container"]').as('Modal');
      cy.get('[data-cy="modal-close"]').as('ModalClose');

      cy.get('@Modal').should('exist');

      cy.intercept('GET', Cypress.env('URL_API'), { fixture: 'teams.json' }).as('getAllTeams');
      cy.get('@ModalClose').click();
      cy.wait('@getAllTeams');

      cy.get('h1').contains('CRUD-Clubes');
      cy.get('@Modal').should('not.exist');
    });
    it('when clicking the button cancel should be closed the modal and go to home page', () => {
      cy.get('[data-cy="modal-container"]').as('Modal');
      cy.get('[data-cy="modal-btn-cancel"]').as('ModalBtnCancel');

      cy.get('@Modal').should('exist');

      cy.intercept('GET', Cypress.env('URL_API'), { fixture: 'teams.json' }).as('getAllTeams');
      cy.get('@ModalBtnCancel').click();
      cy.wait('@getAllTeams');

      cy.get('h1').contains('CRUD-Clubes');
      cy.get('@Modal').should('not.exist');
    });
    it('when confirming the removal successfully should go to the home page ', () => {
      cy.get('[data-cy="modal-container"]').as('Modal');
      cy.get('[data-cy="modal-btn-confirm"]').as('ModalBtnConfirm');

      cy.intercept('DELETE', `${Cypress.env('URL_API')}/1`, { fixture: 'team-with-data.json' }).as('DeleteTeam');
      cy.intercept('GET', Cypress.env('URL_API'), { fixture: 'teams-two-lenght.json' }).as('getTwoTeams');
      cy.get('@ModalBtnConfirm').click();

      cy.wait('@DeleteTeam');
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
    describe('When adding is successful', () => {
      it('when creating a team should go to the home page', () => {
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
        cy.get('[data-cy="form-update-logo"]')
          .find('input')
          .selectFile('cypress/fixtures/ac-milan.png', { force: true });

        cy.intercept('POST', Cypress.env('URL_API'), { fixture: 'team-with-data.json' }).as('createATeam');
        cy.intercept('GET', Cypress.env('URL_API'), { fixture: 'teams-four-lenght.json' }).as('getFourTeams');
        cy.get('[data-cy="form-btn-submit"]').click();

        cy.url().should('not.include', '/teams/add');
        cy.get('h1').contains('CRUD-Clubes');
        cy.get('[data-cy="teams-table-body"]').find('tr').should('have.length', 4);
      });
      it('when creating a team without required fields should complete the other fields without data', () => {
        const team = {
          area: {
            name: 'Italy',
          },
          name: 'AC Milán',
          shortName: 'Milán',
          tla: 'MIL',
          clubColors: 'Red / Black',
          crestUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Leeds_United.svg',
        };
        cy.get('[data-cy="form-team-name"]').type(team.name);
        cy.get('[data-cy="form-short-name"]').find('input').type(team.shortName);
        cy.get('[data-cy="form-tla"]').find('input').type(team.tla);
        cy.get('[data-cy="form-country"]').find('select').select(team.area.name);
        cy.get('[data-cy="form-club-colors"]').find('input').type(team.clubColors);
        cy.get('[data-cy="form-update-logo"]')
          .find('input')
          .selectFile('cypress/fixtures/ac-milan.png', { force: true });

        cy.intercept('POST', Cypress.env('URL_API'), { fixture: 'team-with-required-fields.json' }).as('createATeam');
        cy.intercept('GET', Cypress.env('URL_API'), { fixture: 'teams-four-lenght.json' }).as('getFourTeams');
        cy.get('[data-cy="form-btn-submit"]').click();

        cy.url().should('not.include', '/teams/add');
        cy.get('h1').contains('CRUD-Clubes');
      });
    });

    describe('When adding with wrong fields', () => {
      it('when clicking on add team without the required fields should show messages errors', () => {
        cy.get('[data-cy="form-btn-submit"]').click();

        cy.get('[data-cy="form-name-msg-error"]').contains('Name is required');
        cy.get('[data-cy="form-short-name-msg-error"]').contains('Short name is required');
        cy.get('[data-cy="form-tla-msg-error"]').contains('TLA is required');
        cy.get('[data-cy="form-club-colors-msg-error"]').contains('Club Colors is required');
        cy.get('[data-cy="form-logo-msg-error"]').contains('Logo is required');
      });
      it('when the name is invalid it should throw an error message', () => {
        const invalidName = [
          {
            name: '-Milan',
            error: "Name should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            name: 'Milan-',
            error: "Name should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            name: '.Milan',
            error: "Name should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            name: 'Milan.',
            error: "Name should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            name: 'Milan_',
            error: "Name should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            name: '_Milan',
            error: "Name should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          { name: 'Milan', error: 'must be at least 7 characters long' },
          { name: 'Lorem ipsum dolor sit amet cons', error: 'must be a maximum of 30 characters' },
        ];

        invalidName.forEach((el) => {
          cy.get('[data-cy="form-team-name"]').type(el.name);
          cy.get('[data-cy="form-short-name"]').click();
          cy.get('[data-cy="form-name-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-team-name"]').clear();
        });
      });
      it('when the shortname is invalid it should throw an error message', () => {
        const invalidShortName = [
          {
            shortName: 'hola@hotmail.com',
            error: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            shortName: 'https://www.acmilan.com',
            error: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            shortName: '-Milan',
            error: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            shortName: 'Milan-',
            error: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            shortName: '.Milan',
            error: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            shortName: 'Milan.',
            error: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            shortName: 'Milan_',
            error: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            shortName: '_Milan',
            error: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          { shortName: 'Mil', error: 'must be at least 4 characters long' },
          { shortName: 'Lorem ipsum dolor sit', error: 'must be a maximum of 20 characters' },
        ];

        invalidShortName.forEach((el) => {
          cy.get('[data-cy="form-short-name"]').type(el.shortName);
          cy.get('[data-cy="form-team-name"]').click();
          cy.get('[data-cy="form-short-name-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-short-name"]').clear();
        });
      });
      it('when the TLA is invalid it should throw an error message', () => {
        const invalidTla = [
          {
            tla: '19',
            error: 'TLA only contains letters',
          },
          {
            tla: 'h@l',
            error: 'TLA only contains letters',
          },
          {
            tla: '-12',
            error: 'TLA only contains letters',
          },
          {
            tla: 'hola',
            error: 'TLA must contain 3 chars',
          },
          {
            tla: 'ho',
            error: 'TLA must contain 3 chars',
          },
        ];

        invalidTla.forEach((el) => {
          cy.get('[data-cy="form-tla"]').type(el.tla);
          cy.get('[data-cy="form-team-name"]').click();
          cy.get('[data-cy="form-tla-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-tla"]').clear();
        });
      });
      it('when the clubColors is invalid it should throw an error message', () => {
        const invalidClubColors = [
          {
            clubColors: 'red . black',
            error: 'Club Colors only contains words, spaces and slash',
          },
          {
            clubColors: 'red @ black',
            error: 'Club Colors only contains words, spaces and slash',
          },
          {
            clubColors: 'red _ black',
            error: 'Club Colors only contains words, spaces and slash',
          },
          {
            clubColors: 'red - black',
            error: 'Club Colors only contains words, spaces and slash',
          },
          {
            clubColors: 'red / black / white / orange / blue',
            error: 'must be a maximum of 20 characters',
          },
          {
            clubColors: 're',
            error: 'must be at least 3 characters long',
          },
        ];

        invalidClubColors.forEach((el) => {
          cy.get('[data-cy="form-club-colors"]').type(el.clubColors);
          cy.get('[data-cy="form-team-name"]').click();
          cy.get('[data-cy="form-club-colors-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-club-colors"]').clear();
        });
      });
      it('when the venue is invalid it should throw an error message', () => {
        const invalidVenue = [
          { venue: 'hola@hotmail.com', error: "should only contain alphanumeric, spaces and the next symbol: '-'" },
          {
            venue: 'https://www.acmilan.com',
            error: "should only contain alphanumeric, spaces and the next symbol: '-'",
          },
          { venue: '-Milan', error: "should only contain alphanumeric, spaces and the next symbol: '-'" },
          { venue: 'Milan-', error: "should only contain alphanumeric, spaces and the next symbol: '-'" },
          { venue: '.Milan', error: "should only contain alphanumeric, spaces and the next symbol: '-'" },
          { venue: 'Milan.', error: "should only contain alphanumeric, spaces and the next symbol: '-'" },
          { venue: 'Milan_', error: "should only contain alphanumeric, spaces and the next symbol: '-'" },
          { venue: '_Milan', error: "should only contain alphanumeric, spaces and the next symbol: '-'" },
          { venue: 'AC / Milan', error: "should only contain alphanumeric, spaces and the next symbol: '-'" },
          { venue: 'San', error: 'must be at least 7 characters long' },
          {
            venue: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
            error: 'must be a maximum of 40 characters',
          },
        ];

        invalidVenue.forEach((el) => {
          cy.get('[data-cy="form-venue"]').type(el.venue);
          cy.get('[data-cy="form-team-name"]').click();
          cy.get('[data-cy="form-venue-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-venue"]').clear();
        });
      });
      it('when the founded is invalid it should throw an error message', () => {
        const invalidFounded = [
          { founded: '-904', error: 'founded must be a positive number' },
          { founded: '.904', error: 'founded must be an integer' },
          { founded: '20133', error: 'must not exceed current year' },
          { founded: '0', error: 'founded must be a positive number' },
        ];

        invalidFounded.forEach((el) => {
          cy.get('[data-cy="form-founded"]').type(el.founded);
          cy.get('[data-cy="form-team-name"]').click();
          cy.get('[data-cy="form-founded-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-founded"]').clear();
        });
      });
      it('when the address is invalid it should throw an error message', () => {
        const invalidAddress = [
          { address: 'hola@hola.com', error: 'Address should be a valid address' },
          { address: 'mailto://acmilan.com', error: 'Address should be a valid address' },
          { address: 'Leeds_United.svg', error: 'Address should be a valid address' },
          { address: 'AC-Milan 4042', error: 'Address should be a valid address' },
          { address: 'hola', error: 'must be at least 7 characters long' },
          {
            address: 'P.sherman calle wallaby 42 sydney  Pelicula Buscando a Nemo',
            error: 'must be a maximum of 50 characters',
          },
        ];

        invalidAddress.forEach((el) => {
          cy.get('[data-cy="form-address"]').type(el.address);
          cy.get('[data-cy="form-team-name"]').click();
          cy.get('[data-cy="form-address-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-address"]').clear();
        });
      });
      it('when the phone is invalid it should throw an error message', () => {
        const invalidPhone = [
          { phone: '+44  hola 9841955', error: 'should be a valid phone number' },
          { phone: '+44 (0871) hola', error: 'should be a valid phone number' },
          { phone: 'hola', error: 'should be a valid phone number' },
          { phone: '123456789', error: 'must be at least 10 characters long' },
          { phone: '0123456789012345678901234567890', error: 'must be a maximum of 30 characters' },
        ];

        invalidPhone.forEach((el) => {
          cy.get('[data-cy="form-phone"]').type(el.phone);
          cy.get('[data-cy="form-team-name"]').click();
          cy.get('[data-cy="form-phone-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-phone"]').clear();
        });
      });
      it('when the email is invalid it should throw an error message', () => {
        const invalidEmail = [
          {
            email: 'http://www.acmilan.com',
            error: 'Please provide valid email',
          },
          {
            email: 'hola@com',
            error: 'Please provide valid email',
          },
          {
            email: 'hola',
            error: 'Please provide valid email',
          },
          {
            email: '1234',
            error: 'Please provide valid email',
          },
        ];

        invalidEmail.forEach((el) => {
          cy.get('[data-cy="form-email"]').type(el.email);
          cy.get('[data-cy="form-team-name"]').click();
          cy.get('[data-cy="form-email-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-email"]').clear();
        });
      });
      it('when the website is invalid it should throw an error message', () => {
        const invalidWebsite = [
          { website: 'www.acmil@angmail.com', error: 'should be a URL' },
          { website: 'mailto://acmilan.com', error: 'should be a URL' },
          { website: 'hola', error: 'should be a URL' },
          { website: 'fdp://www.acmilan.com', error: 'should be a URL' },
          { website: 'htps://www.acmilan.com', error: 'should be a URL' },
        ];

        invalidWebsite.forEach((el) => {
          cy.get('[data-cy="form-website"]').type(el.website);
          cy.get('[data-cy="form-team-name"]').click();
          cy.get('[data-cy="form-website-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-website"]').clear();
        });
      });
    });
  });

  describe('Update team', () => {
    beforeEach(() => {
      cy.intercept('GET', `${Cypress.env('URL_API')}/1`, { fixture: 'team-with-data.json' }).as('GetTeam');
      cy.get('[data-cy="team-actions-edit"]').eq(0).click();
    });
    describe('When clicking to', () => {
      it('edit should be moved to the Team update page and show the form', () => {
        cy.url().should('include', '/edit');
        cy.get('[data-cy="update-team-title"]').contains('Update team');
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
      it('update team should go to the home page', () => {
        cy.url().should('include', '/edit');

        cy.intercept('PUT', `${Cypress.env('URL_API')}/1`, { fixture: 'team-with-data.json' }).as('UpdateTeam');
        cy.intercept('GET', Cypress.env('URL_API'), { fixture: 'teams.json' }).as('getTeams');
        cy.get('[data-cy="form-btn-update"]').click();

        cy.url().should('not.include', '/edit');
        cy.get('h1').contains('CRUD-Clubes');
      });
      it('delete team should go to the home page', () => {
        cy.intercept('DELETE', `${Cypress.env('URL_API')}/1`, { fixture: 'team-without-data.json' }).as('DeleteTeam');
        cy.intercept('GET', Cypress.env('URL_API'), { fixture: 'teams-two-lenght.json' }).as('getTwoTeams');
        cy.get('[data-cy="form-btn-delete"]').click();

        cy.wait('@getTwoTeams');

        cy.url().should('not.include', '/edit');
        cy.get('h1').contains('CRUD-Clubes');
        cy.get('[data-cy="teams-table-body"]').find('tr').should('have.length', 2);
      });
    });
    describe('When an update is successful', () => {
      it('with required fields should go to the home page', () => {
        const team = {
          area: {
            name: 'Italy',
          },
          name: 'AC Milán',
          crestUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Leeds_United.svg',
          shortName: 'Milán',
          tla: 'MIL',
          clubColors: 'Red / Black',
        };

        cy.get('[data-cy="form-team-name"]').find('input').clear();
        cy.get('[data-cy="form-short-name"]').find('input').clear();
        cy.get('[data-cy="form-tla"]').find('input').clear();
        cy.get('[data-cy="form-club-colors"]').find('input').clear();

        cy.get('[data-cy="form-team-name"]').type(team.name);
        cy.get('[data-cy="form-short-name"]').find('input').type(team.shortName);
        cy.get('[data-cy="form-tla"]').find('input').type(team.tla);
        cy.get('[data-cy="form-country"]').find('select').select(team.area.name);
        cy.get('[data-cy="form-club-colors"]').find('input').type(team.clubColors);
        cy.get('[data-cy="form-update-logo"]')
          .find('input')
          .selectFile('cypress/fixtures/ac-milan.png', { force: true });

        cy.intercept('PUT', `${Cypress.env('URL_API')}/1`, { fixture: 'team-with-data.json' }).as('updateTeam');
        cy.intercept('GET', Cypress.env('URL_API'), { fixture: 'teams-four-lenght.json' }).as('getFourTeams');
        cy.get('[data-cy="form-btn-update"]').click();

        cy.url().should('not.include', '/teams/add');
        cy.get('h1').contains('CRUD-Clubes');
        cy.get('[data-cy="teams-table-body"]').find('tr').should('have.length', 4);
      });
      it('with empty fields complete should go to the home page', () => {
        const team = {
          address: 'Anfield Road Liverpool L4 OTH',
          phone: '+44 (0871) 9841955',
          website: 'http://www.acmilan.com',
          email: 'acmilan@contac.com',
          founded: 1905,
          venue: 'San Siro',
        };

        cy.get('[data-cy="form-venue"]').find('input').clear();
        cy.get('[data-cy="form-founded"]').find('input').clear();
        cy.get('[data-cy="form-address"]').find('input').clear();
        cy.get('[data-cy="form-phone"]').find('input').clear();
        cy.get('[data-cy="form-email"]').find('input').clear();
        cy.get('[data-cy="form-website"]').find('input').clear();

        cy.get('[data-cy="form-venue"]').find('input').type(team.venue);
        cy.get('[data-cy="form-founded"]').find('input').type(`${team.founded}`);
        cy.get('[data-cy="form-address"]').find('input').type(team.address);
        cy.get('[data-cy="form-phone"]').find('input').type(team.phone);
        cy.get('[data-cy="form-email"]').find('input').type(team.email);
        cy.get('[data-cy="form-website"]').find('input').type(team.website);

        cy.intercept('PUT', `${Cypress.env('URL_API')}/1`, { fixture: 'team-with-data.json' }).as('updateTeam');
        cy.intercept('GET', Cypress.env('URL_API'), { fixture: 'teams-four-lenght.json' }).as('getFourTeams');
        cy.get('[data-cy="form-btn-update"]').click();

        cy.url().should('not.include', '/teams/add');
        cy.get('h1').contains('CRUD-Clubes');
        cy.get('[data-cy="teams-table-body"]').find('tr').should('have.length', 4);
      });
    });
    describe('When updating with wrong fields', () => {
      it('when clicking on update team without the required fields should show messages errors', () => {
        cy.get('[data-cy="form-team-name"]').find('input').clear();
        cy.get('[data-cy="form-short-name"]').find('input').clear();
        cy.get('[data-cy="form-tla"]').find('input').clear();
        cy.get('[data-cy="form-club-colors"]').find('input').clear();

        cy.get('[data-cy="form-btn-update"]').click();

        cy.get('[data-cy="form-name-msg-error"]').contains('Name cannot be empty');
        cy.get('[data-cy="form-short-name-msg-error"]').contains('ShortName cannot be empty');
        cy.get('[data-cy="form-tla-msg-error"]').contains('TLA cannot be empty');
        cy.get('[data-cy="form-club-colors-msg-error"]').contains('Club Colors cannot be empty');
      });
      it('when the name is invalid it should throw an error message', () => {
        const invalidName = [
          {
            name: '-Milan',
            error: "Name should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            name: 'Milan-',
            error: "Name should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            name: '.Milan',
            error: "Name should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            name: 'Milan.',
            error: "Name should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            name: 'Milan_',
            error: "Name should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            name: '_Milan',
            error: "Name should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          { name: 'Milan', error: 'must be at least 7 characters long' },
          { name: 'Lorem ipsum dolor sit amet cons', error: 'must be a maximum of 30 characters' },
        ];

        cy.get('[data-cy="form-team-name"]').find('input').clear();

        invalidName.forEach((el) => {
          cy.get('[data-cy="form-team-name"]').type(el.name);
          cy.get('[data-cy="form-short-name"]').click();
          cy.get('[data-cy="form-name-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-team-name"]').clear();
        });
      });
      it('when the shortname is invalid it should throw an error message', () => {
        const invalidShortName = [
          {
            shortName: 'hola@hotmail.com',
            error: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            shortName: 'https://www.acmilan.com',
            error: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            shortName: '-Milan',
            error: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            shortName: 'Milan-',
            error: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            shortName: '.Milan',
            error: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            shortName: 'Milan.',
            error: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            shortName: 'Milan_',
            error: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          {
            shortName: '_Milan',
            error: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
          },
          { shortName: 'Mil', error: 'must be at least 4 characters long' },
          { shortName: 'Lorem ipsum dolor sit', error: 'must be a maximum of 20 characters' },
        ];

        cy.get('[data-cy="form-short-name"]').find('input').clear();

        invalidShortName.forEach((el) => {
          cy.get('[data-cy="form-short-name"]').type(el.shortName);
          cy.get('[data-cy="form-team-name"]').click();
          cy.get('[data-cy="form-short-name-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-short-name"]').clear();
        });
      });
      it('when the TLA is invalid it should throw an error message', () => {
        const invalidTla = [
          {
            tla: '19',
            error: 'TLA only contains letters',
          },
          {
            tla: 'h@l',
            error: 'TLA only contains letters',
          },
          {
            tla: '-12',
            error: 'TLA only contains letters',
          },
          {
            tla: 'hola',
            error: 'TLA must contain 3 chars',
          },
          {
            tla: 'ho',
            error: 'TLA must contain 3 chars',
          },
        ];

        cy.get('[data-cy="form-tla"]').find('input').clear();

        invalidTla.forEach((el) => {
          cy.get('[data-cy="form-tla"]').type(el.tla);
          cy.get('[data-cy="form-team-name"]').click();
          cy.get('[data-cy="form-tla-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-tla"]').find('input').clear();
        });
      });
      it('when the clubColors is invalid it should throw an error message', () => {
        const invalidClubColors = [
          {
            clubColors: 'red . black',
            error: 'Club Colors only contains words, spaces and slash',
          },
          {
            clubColors: 'red @ black',
            error: 'Club Colors only contains words, spaces and slash',
          },
          {
            clubColors: 'red _ black',
            error: 'Club Colors only contains words, spaces and slash',
          },
          {
            clubColors: 'red - black',
            error: 'Club Colors only contains words, spaces and slash',
          },
          {
            clubColors: 'red / black / white / orange / blue',
            error: 'must be a maximum of 20 characters',
          },
          {
            clubColors: 're',
            error: 'must be at least 3 characters long',
          },
        ];

        cy.get('[data-cy="form-club-colors"]').find('input').clear();

        invalidClubColors.forEach((el) => {
          cy.get('[data-cy="form-club-colors"]').type(el.clubColors);
          cy.get('[data-cy="form-team-name"]').click();
          cy.get('[data-cy="form-club-colors-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-club-colors"]').clear();
        });
      });
      it('when the venue is invalid it should throw an error message', () => {
        const invalidVenue = [
          { venue: 'hola@hotmail.com', error: "should only contain alphanumeric, spaces and the next symbol: '-'" },
          {
            venue: 'https://www.acmilan.com',
            error: "should only contain alphanumeric, spaces and the next symbol: '-'",
          },
          { venue: '-Milan', error: "should only contain alphanumeric, spaces and the next symbol: '-'" },
          { venue: 'Milan-', error: "should only contain alphanumeric, spaces and the next symbol: '-'" },
          { venue: '.Milan', error: "should only contain alphanumeric, spaces and the next symbol: '-'" },
          { venue: 'Milan.', error: "should only contain alphanumeric, spaces and the next symbol: '-'" },
          { venue: 'Milan_', error: "should only contain alphanumeric, spaces and the next symbol: '-'" },
          { venue: '_Milan', error: "should only contain alphanumeric, spaces and the next symbol: '-'" },
          { venue: 'AC / Milan', error: "should only contain alphanumeric, spaces and the next symbol: '-'" },
          { venue: 'San', error: 'must be at least 7 characters long' },
          {
            venue: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
            error: 'must be a maximum of 40 characters',
          },
        ];

        cy.get('[data-cy="form-venue"]').find('input').clear();

        invalidVenue.forEach((el) => {
          cy.get('[data-cy="form-venue"]').type(el.venue);
          cy.get('[data-cy="form-team-name"]').click();
          cy.get('[data-cy="form-venue-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-venue"]').clear();
        });
      });
      it('when the founded is invalid it should throw an error message', () => {
        const invalidFounded = [
          { founded: '-904', error: 'founded must be a positive number' },
          { founded: '.904', error: 'founded must be an integer' },
          { founded: '20133', error: 'must not exceed current year' },
          { founded: '0', error: 'founded must be a positive number' },
        ];

        cy.get('[data-cy="form-founded"]').find('input').clear();

        invalidFounded.forEach((el) => {
          cy.get('[data-cy="form-founded"]').type(el.founded);
          cy.get('[data-cy="form-team-name"]').click();
          cy.get('[data-cy="form-founded-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-founded"]').clear();
        });
      });
      it('when the address is invalid it should throw an error message', () => {
        const invalidAddress = [
          { address: 'hola@hola.com', error: 'Address should be a valid address' },
          { address: 'mailto://acmilan.com', error: 'Address should be a valid address' },
          { address: 'Leeds_United.svg', error: 'Address should be a valid address' },
          { address: 'AC-Milan 4042', error: 'Address should be a valid address' },
          { address: 'hola', error: 'must be at least 7 characters long' },
          {
            address: 'P.sherman calle wallaby 42 sydney  Pelicula Buscando a Nemo',
            error: 'must be a maximum of 50 characters',
          },
        ];

        cy.get('[data-cy="form-address"]').find('input').clear();

        invalidAddress.forEach((el) => {
          cy.get('[data-cy="form-address"]').type(el.address);
          cy.get('[data-cy="form-team-name"]').click();
          cy.get('[data-cy="form-address-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-address"]').clear();
        });
      });
      it('when the phone is invalid it should throw an error message', () => {
        const invalidPhone = [
          { phone: '+44  hola 9841955', error: 'should be a valid phone number' },
          { phone: '+44 (0871) hola', error: 'should be a valid phone number' },
          { phone: 'hola', error: 'should be a valid phone number' },
          { phone: '123456789', error: 'must be at least 10 characters long' },
          { phone: '0123456789012345678901234567890', error: 'must be a maximum of 30 characters' },
        ];

        cy.get('[data-cy="form-phone"]').find('input').clear();

        invalidPhone.forEach((el) => {
          cy.get('[data-cy="form-phone"]').type(el.phone);
          cy.get('[data-cy="form-team-name"]').click();
          cy.get('[data-cy="form-phone-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-phone"]').clear();
        });
      });
      it('when the email is invalid it should throw an error message', () => {
        const invalidEmail = [
          {
            email: 'http://www.acmilan.com',
            error: 'Please provide valid email',
          },
          {
            email: 'hola@com',
            error: 'Please provide valid email',
          },
          {
            email: 'hola',
            error: 'Please provide valid email',
          },
          {
            email: '1234',
            error: 'Please provide valid email',
          },
        ];

        cy.get('[data-cy="form-email"]').find('input').clear();

        invalidEmail.forEach((el) => {
          cy.get('[data-cy="form-email"]').type(el.email);
          cy.get('[data-cy="form-team-name"]').click();
          cy.get('[data-cy="form-email-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-email"]').clear();
        });
      });
      it('when the website is invalid it should throw an error message', () => {
        const invalidWebsite = [
          { website: 'www.acmil@angmail.com', error: 'should be a URL' },
          { website: 'mailto://acmilan.com', error: 'should be a URL' },
          { website: 'hola', error: 'should be a URL' },
          { website: 'fdp://www.acmilan.com', error: 'should be a URL' },
          { website: 'htps://www.acmilan.com', error: 'should be a URL' },
        ];

        cy.get('[data-cy="form-website"]').find('input').clear();

        invalidWebsite.forEach((el) => {
          cy.get('[data-cy="form-website"]').type(el.website);
          cy.get('[data-cy="form-team-name"]').click();
          cy.get('[data-cy="form-website-msg-error"]').contains(el.error);
          cy.get('[data-cy="form-website"]').clear();
        });
      });
    });
  });
});

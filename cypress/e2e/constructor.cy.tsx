const url = 'https://norma.nomoreparties.space/api';

beforeEach(() => {
  cy.intercept('GET', `${url}/ingredients`, {
    fixture: 'ingredients.json'
  }).as('mockIngredients');
  cy.setCookie('accessToken', 'ACCESS_TOKEN');
  localStorage.setItem('refreshToken', 'REFRESH_TOKEN');
  cy.intercept('GET', `${url}/auth/user`, { fixture: 'user.json' }).as(
    'mockUser'
  );
  cy.intercept('POST', `${url}/orders`, { fixture: 'order.json' }).as(
    'mockOrder'
  );
  cy.visit('http://localhost:4000');
});

afterEach(() => {
  cy.clearCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

describe('e2e test for burger constructor page: adding ingredients to burger constructor', () => {
  it('should add ingredient from list to constructor', () => {
    cy.get('[data-cy="main"]:first-of-type').children('button').click();
    cy.get('[data-cy="burgerConstructor"]').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get('[data-cy="sauce"]:first-of-type').children('button').click();
    cy.get('[data-cy="burgerConstructor"]').should('contain', 'Соус Spicy-X');
  });

  it('should add bun from list to constructor', () => {
    cy.get('[data-cy="bun"]:first-of-type').children('button').click();
    cy.get('[data-cy="burgerConstructor"]').should(
      'contain',
      'Краторная булка N-200i'
    );
  });
});

describe('e2e test for burger constructor page: modals', () => {
  beforeEach(() => {
    cy.get('[data-cy="bun"]:first-of-type').click();
  });

  it('should open after click on card and after reload', () => {
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.reload(true);
    cy.get('[data-cy="modal"]').should('be.visible');
  });

  it('should close by click on close button', () => {
    cy.get('[data-cy="modalCloseButton"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('should close by click on overlay', () => {
    cy.get('[data-cy="modalOverlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});

describe('e2e test for burger constructor page: creating order', () => {
  it('should create order with chosen ingredients for auth user, open modal and clear constructor', () => {
    cy.get('[data-cy="orderButton"]').should('be.disabled');

    cy.get('[data-cy="bun"]:first-of-type').children('button').click();
    cy.get('[data-cy="main"]:first-of-type').children('button').click();
    cy.get('[data-cy="orderButton"]').should('be.enabled');

    cy.get('[data-cy="orderButton"]').click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="orderNumber"]').should('contain.text', '52971');

    cy.get('[data-cy="modalCloseButton"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="burgerConstructor"]').should(
      'not.contain',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get('[data-cy="burgerConstructor"]').should(
      'not.contain',
      'Краторная булка N-200i'
    );
    cy.get('[data-cy="orderButton"]').should('be.disabled');
  });
});

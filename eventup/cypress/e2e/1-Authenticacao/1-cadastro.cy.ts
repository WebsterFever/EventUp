/// <reference types="cypress" />

describe('Cadastro de usuário', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/cadastro');
  });

  it('Deve cadastrar um novo usuário', () => {
    const email = `teste${Date.now()}@gmail.com`;

    cy.get('input[name="email"]')
      .type(email);

    cy.get('input[name="password"]')
      .type('senha123');

    cy.get('button[type="submit"]')
      .click();

    cy.url().should('include', '/login');
  });
});
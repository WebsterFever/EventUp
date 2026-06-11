/// <reference types="cypress" />

describe("Validação do Cadastro", () => {
  it("Cadastro com dados válidos", () => {
    cy.visit("http://localhost:5173");

    const email = `${Date.now()}@gmail.com`;

    cy.get('input[name="email"]')
      .type(email);

    cy.get('input[name="password"]')
      .type("123456");

    cy.contains("button", "Criar Conta")
      .click();

    cy.contains("Conta criada com sucesso!")
      .should("be.visible");
  });
});
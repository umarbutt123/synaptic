// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-file-upload';
// eslint-disable-next-line
import faker from 'faker';
import 'cypress-audit/commands';

Cypress.Commands.add('openPortal', () => {
  cy.visit('/');
});

Cypress.Commands.add('login', (usernameField, username, passwordField, password, submitButton) => {
  cy.intercept("GET", `/api/access/v1/features/resellerType/${username}`).as("resellerTypeLoading");
  cy.intercept("POST", "/api/dms/auth/getResellerInfo").as("getResellerInfo");
  cy.intercept("GET", "/api/oms/v2/order-payment-types").as("orderPaymentTypes");
  cy.intercept("GET", "/api/bi-engine/v1/metadata?channel=web").as("biMetaDataFetch");
  if (username !== "") {
    cy.xpath(usernameField, { timeout: 15000 }).clear().type(username);
  }
  if (password !== "") {
    cy.xpath(passwordField, { timeout: 15000 }).clear().type(password, { log: false });
    cy.xpath(passwordField, { timeout: 15000 }).invoke('attr', 'type').should('include', 'password');
  }
  cy.xpath(submitButton, { timeout: 15000 }).click();
  cy.wait(["@getResellerInfo", "@orderPaymentTypes", "@biMetaDataFetch"]);
});

Cypress.Commands.add('loginWithouBICall', (usernameField, username, passwordField, password, submitButton) => {
  cy.intercept("GET", `/api/access/v1/features/resellerType/${username}`).as("resellerTypeLoading");
  cy.intercept("POST", "/api/dms/auth/getResellerInfo").as("getResellerInfo");
  if (username !== "") {
    cy.xpath(usernameField, { timeout: 15000 }).clear().type(username);
  }
  if (password !== "") {
    cy.xpath(passwordField, { timeout: 15000 }).clear().type(password, { log: false });
    cy.xpath(passwordField, { timeout: 15000 }).invoke('attr', 'type').should('include', 'password');
  }
  cy.xpath(submitButton, { timeout: 15000 }).click();
  cy.wait(["@getResellerInfo"]);
});

Cypress.Commands.add('logout', (logoutButton) => {
  cy.xpath(logoutButton, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });
});

Cypress.Commands.add("openAndLogin", (user, pw) => {
  let username;
  let password;
  cy.visit('/');
  cy.fixture('default-user')
    .then((defaultUser) => {
      username = user || defaultUser.userId;
      password = pw || defaultUser.password;

      cy.get('input[id=userId]').clear().type(username);
      cy.get('input[id=password]').clear().type(password);
      cy.xpath("(//span[contains(text(),'Login')])[1]").click();
    });
});

Cypress.Commands.add("addProductCategories", (count) => {
  let i = parseInt(count, 10);
  const hostname = Cypress.env('hostname');
  while (i > 0) {
    cy.request('POST', `${hostname}:8012/pms/v1/productCategory`, {
      productCategory: {
        availableFrom: "2021-06-21T08:42:10Z",
        availableUntil: "2021-06-21T08:42:10Z",
        data: [
          {
            dataName: "tmp",
            dataValue: "tmp",
          },
        ],
        description: "tempdata",
        id: 1,
        imageUrl: "string",
        name: faker.lorem.words(),
        path: "j/r",
        status: "decommissioned",
        taxIds: [],
        workflowId: 1,
      },
    }).then((response) => {
      cy.log(response.body);
      expect(response.body.resultDescription).to.eq("Product category added");
    });
    i -= 1;
  }
});

Cypress.Commands.add("checkPerformance", () => {
  const accessibility = Cypress.env('accessibility');
  const performance = Cypress.env('performance');
  const seo = Cypress.env('seo');
  cy.lighthouse({
    accessibility,
    performance,
    seo,
  },
    {
      formFactor: 'desktop',
      screenEmulation: { disabled: true },
    });
});

Cypress.Commands.add('loginWithSession', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('/');
    // cy.intercept('POST', 'api/Account/LogIn').as('login');
    cy.xpath("//input[@id='email']").clear().type(username);
    cy.xpath("//input[@id='password']").clear().type(password);
    cy.xpath("//input[@id='recaptchaCheckbox']").click();
    cy.xpath("//button[@label='Log In']").click();
    // cy.wait('@login');
    // cy.xpath("//input[@id='userId']").clear().type(username);
    // cy.xpath("//input[@id='password']").clear().type(password, { log: false });
    // cy.xpath("(//span[contains(text(),'Login')])[1]").click();
    cy.wait(3000);
    cy.url().should('contains', '/x-matrix/goals');
    cy.wait(4000);
  },
    {
      cacheAcrossSpecs: true
    });
});


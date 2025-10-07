
const USER_ID_FIELD = "//input[@id='email']";
const PASSWORD_FIELD = "//input[@id='password']";
const ACCEPT_TERMS = "//input[@id='recaptchaCheckbox']"
const LOGIN_BUTTON = "//button[@label='Log In']"
const ELEMENT_TIMEOUT = 30000;

class PortalLoginPage {
  static visit() {
    cy.log('Opening portal');
    cy.openPortal();
  }

  static login(username, password) {
    cy.wait(1000);
    cy.intercept('POST', 'api/Account/LogIn').as('login');
    cy.xpath(USER_ID_FIELD, { timeout: ELEMENT_TIMEOUT }).clear().type(username);
    cy.xpath(PASSWORD_FIELD, { timeout: ELEMENT_TIMEOUT }).clear().type(password);
    cy.xpath(ACCEPT_TERMS, { timeout: ELEMENT_TIMEOUT }).click();
    cy.xpath(LOGIN_BUTTON, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait('@login');
  }

  static loginWithBlankCredentials(username) {
    cy.wait(1000);
    cy.xpath(USER_ID_FIELD, { timeout: ELEMENT_TIMEOUT }).clear().type(username);
    cy.xpath(ACCEPT_TERMS, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static loginWithBlockedUser(username, password) {
    cy.log(`username ${username}passowrd${password}`);
    cy.wait(900);
    cy.xpath('//body').then((body) => {
      if (body.find(NEXT_BUTTON).length > 0) {
        cy.xpath(USER_ID_FIELD).clear().type(username);
        cy.get(NEXT_BUTTON).click();
        cy.xpath(PASSWORD_BUTTON).clear().type(password);
        cy.xpath(SUBMIT_BUTTON).click();
      } else {
        cy.xpath(USER_ID_FIELD, { timeout: ELEMENT_TIMEOUT }).type(username);
        cy.xpath(PASSWORD_BUTTON, { timeout: ELEMENT_TIMEOUT }).type(password);
        cy.xpath(SUBMIT_BUTTON, { timeout: ELEMENT_TIMEOUT }).click();
      }
    });
  }



  static loginWithInValidUser(username, password) {
    cy.log(`username ${username}`);
    cy.wait(900);
    cy.xpath('//body').then((body) => {
      if (body.find(NEXT_BUTTON).length > 0) {
        cy.xpath(USER_ID_FIELD).clear().type(username);
        cy.get(NEXT_BUTTON).click();
      } else {
        cy.xpath(USER_ID_FIELD, { timeout: ELEMENT_TIMEOUT }).type(username);
        cy.xpath(PASSWORD_BUTTON, { timeout: ELEMENT_TIMEOUT }).type(password);
        cy.xpath(SUBMIT_BUTTON, { timeout: ELEMENT_TIMEOUT }).click();
      }
    });
  }

  static loginWithInValidPassword(username, password) {
    cy.wait(2000);
    cy.xpath('//body').then((body) => {
      if (body.find(NEXT_BUTTON).length > 0) {
        cy.xpath(USER_ID_FIELD).clear().type(username);
        cy.get(NEXT_BUTTON).click();
        cy.xpath(PASSWORD_BUTTON).clear().type(password);
        cy.xpath(SUBMIT_BUTTON).click();
      } else {
        // cy.login(USER_ID_FIELD, username, PASSWORD_BUTTON, password, SUBMIT_BUTTON);
        cy.xpath(USER_ID_FIELD, { timeout: ELEMENT_TIMEOUT })
          .should('be.visible')
          .clear()
          .type(username);
        cy.xpath(PASSWORD_BUTTON, { timeout: ELEMENT_TIMEOUT })
          .should('be.visible')
          .clear()
          .type(password);
        cy.xpath(SUBMIT_BUTTON).click();
      }
    });
  }

  static loginWithBlankUser(username) {
    cy.wait(3000);
    cy.xpath('//body').then((body) => {
      if (body.find(NEXT_BUTTON, { timeout: ELEMENT_TIMEOUT }).length > 0) {
        cy.get(NEXT_BUTTON, { timeout: ELEMENT_TIMEOUT }).click();
      } else {
        cy.xpath(SUBMIT_BUTTON).click();
      }
    });
  }

  static loginCredentials(userName, password) {
    if (userName != "") {
      cy.xpath(USER_ID_FIELD).clear().type(userName);
    }
    if (password != "") {
      cy.xpath(PASSWORD_BUTTON).clear().type(password);
    }
    cy.xpath(SUBMIT_BUTTON).click();
    cy.wait(900);
  }

  static selectTypeBasedAuth(loginType) {
    cy.log("select login type");
    cy.xpath(LOGIN_TYPE, { timeout: ELEMENT_TIMEOUT }).click();
    cy.xpath(`//li[@data-value='${loginType}']`, { timeout: ELEMENT_TIMEOUT }).click();
  }
}

export default PortalLoginPage;

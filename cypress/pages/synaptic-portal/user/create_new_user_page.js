

import URL_PATH from "../../../common/Route";
const ADD_NEW_USER_BUTTON = "//span[text()=' Add New User']";
const USER_FIRST_NAME = "//input[@id='firstName']";
const USER_LAST_NAME = "//input[@id='lastName']";
const CLICK_ROLE = "//p-dropdown[@formcontrolname='role' and @placeholder='Select role']";
const USER_EMAIL = "//input[@id='email']";
const CLICK_USER_STATUS = "//p-dropdown[@formcontrolname='status' and @placeholder='Select Status']";
const BTN_SUBMIT = "//span[text()='Create']";
const BTN_CANCEL = "//span[text()='Cancel']";
const BTN_UPDATE = "//span[text()='Update']";

const ELEMENT_TIMEOUT = 20000;

class CreateNewUserPage {

  static navigateToAddUserPageUsingUrl() {
    cy.log("Navigate to manage users page");
    cy.intercept('GET', 'api/User/get-by-company-id*').as('getCompanyId');
    cy.visit(URL_PATH.users, { timeout: ELEMENT_TIMEOUT });
    cy.wait('@getCompanyId');
  };

  static clickOnAddNewUserButton() {
    cy.log('click on add new user button');
    cy.intercept('GET', 'api/Role/get-by-company-id*').as('gerRoleData');
    cy.xpath(ADD_NEW_USER_BUTTON, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait('@gerRoleData');
  }

  static fillFirstName(firstName) {
    if (firstName !== "") {
      cy.xpath(USER_FIRST_NAME, { timeout: ELEMENT_TIMEOUT }).clear().type(firstName);
    }
  }

  static fillLastName(lastName) {
    if (lastName !== "") {
      cy.xpath(USER_LAST_NAME, { timeout: ELEMENT_TIMEOUT }).clear().type(lastName);
    }
  }

  static selectRole(role) {
    if (role !== "") {
      cy.xpath(CLICK_ROLE, { timeout: ELEMENT_TIMEOUT }).click();
      cy.xpath(`//p-dropdownitem//li[normalize-space()='${role}']`, { timeout: ELEMENT_TIMEOUT }).click();
    }

  }

  static fillUserEmail(email) {
    if (email !== "") {
      cy.xpath(USER_EMAIL, { timeout: ELEMENT_TIMEOUT }).clear().type(email);
    }
  }

  static selectStatus(status) {
    if (status !== "") {
      cy.xpath(CLICK_USER_STATUS, { timeout: ELEMENT_TIMEOUT }).click();
      cy.xpath(`//p-dropdownitem//li[normalize-space()='${status}']`, { timeout: ELEMENT_TIMEOUT }).click();
    }
  }

  static clicOnCreate() {
    cy.xpath(BTN_SUBMIT, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static clicOnUpdate() {
    cy.intercept('PUT', 'api/User/EditUser*').as('updateUser');
    cy.xpath(BTN_UPDATE, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait('@updateUser');
  }

  static clicOnCancel() {
    cy.xpath(BTN_CANCEL, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static validateDataInTable(email) {
    cy.xpath(`(//tr[td[contains(., '${email}')]])`, { timeout: ELEMENT_TIMEOUT }).should('exist');
  }

  static clickEditUserButton(email) {
    cy.xpath(`(//tr[td[contains(., '${email}')]]//button[contains(., 'Edit')])[1]`, { timeout: ELEMENT_TIMEOUT }).click();
  }


}
export default CreateNewUserPage;



import URL_PATH from "../../../common/Route";
const ADD_NEW_ROLE_BUTTON = "//span[text()='Add New User']";
const USER_FIRST_NAME = "//input[@id='firstName']";
const USER_LAST_NAME = "//input[@id='firstName']";
const CLICK_ROLE = "//p-dropdown[@formcontrolname='status' and @placeholder='Select role']";
const USER_EMAIL = "//input[@id='email']";
const CLICK_ROLE_STATUS = "//p-dropdown[@formcontrolname='status' and @placeholder='Select Status']";
const BTN_SUBMIT = "//span[text()='Create']";

const ELEMENT_TIMEOUT = 20000;

class CreateNewUserPage {

  static navigateToAddRolePageUsingUrl() {
    cy.log("Navigate to manage roles page");
    cy.intercept('GET', 'api/Role/get-by-company-id*').as('getCompanyId');
    cy.visit(URL_PATH.users, { timeout: ELEMENT_TIMEOUT });
    cy.wait('@getCompanyId');
  };

  static clickOnAddNewUserButton() {
    cy.log('click on add new role button');
    cy.intercept('GET', 'api/Role/GetRoleDropDownData*').as('gerRoleData');
    cy.xpath(ADD_NEW_ROLE_BUTTON, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait('@gerRoleData');
  }

  static fillFirstName(firstName) {
    if (name !== "") {
      cy.xpath(USER_FIRST_NAME, { timeout: ELEMENT_TIMEOUT }).clear().type(firstName);
    }
  }

  static fillLastName(lastName) {
    if (name !== "") {
      cy.xpath(USER_LAST_NAME, { timeout: ELEMENT_TIMEOUT }).clear().type(lastName);
    }
  }

  static selectRoleStatus(status) {
    cy.xpath(CLICK_ROLE_STATUS, { timeout: ELEMENT_TIMEOUT }).click();
    cy.xpath(`//p-dropdownitem//li[normalize-space()='${status}']`, { timeout: ELEMENT_TIMEOUT }).click();

  }

  static fillUserEmail(email) {
    if (name !== "") {
      cy.xpath(USER_EMAIL, { timeout: ELEMENT_TIMEOUT }).clear().type(email);
    }
  }

  static selectScreen(status) {
    if (screen !== "") {
      cy.xpath(CLICK_ROLE_STATUS, { timeout: ELEMENT_TIMEOUT }).click();
      cy.xpath(`//p-dropdownitem//li[normalize-space()='${status}']`, { timeout: ELEMENT_TIMEOUT }).click();
    }
  }

  static clicOnCreate() {
    cy.xpath(BTN_SUBMIT, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static clickEditRoleButton(roleName) {
    cy.xpath(`(//tr[td[contains(., '${roleName}')]]//button[contains(., 'Edit')])[1]`, { timeout: ELEMENT_TIMEOUT }).click();
  }


}
export default CreateNewUserPage;

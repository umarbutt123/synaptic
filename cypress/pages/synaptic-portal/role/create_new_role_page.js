

import URL_PATH from "../../../common/Route";
const ADD_NEW_ROLE_BUTTON = "//span[text()='Add New Role']";
const ROLE_NAME = "//input[@id='title']";
const ROLE_DESCRIPTION = "//textarea[@placeholder='Enter role description']";
const CLICK_ROLE_STATUS = "//p-dropdown[@formcontrolname='status' and @placeholder='Select status']";
const CLICK_ROLE_MODULE = "//p-dropdown[@formcontrolname='module' and @placeholder='Select module']";
const CLICK_ROLE_SCREEN = "//p-dropdown[@formcontrolname='subModule' and @placeholder='Select screen']";
const CLICK_ROLE_FEATURE = "//p-dropdown[@formcontrolname='feature' and @placeholder='Select feature']";
const CLICK_ROLE_PERMISSION = "//p-dropdown[@formcontrolname='permission' and @placeholder='Select permission']";
const BTN_SUBMIT = "//span[text()='Save']";

const ELEMENT_TIMEOUT = 20000;
class CreateNewResellerRolePage {

  static navigateToAddRolePageUsingUrl() {
    cy.log("Navigate to manage roles page");
    cy.intercept('GET', 'api/Role/get-by-company-id*').as('getCompanyId');
    cy.visit(URL_PATH.role, { timeout: ELEMENT_TIMEOUT });
    cy.wait('@getCompanyId');
  };

  static clickOnAddNewRoleButton() {
    cy.log('click on add new role button');
    cy.intercept('GET', 'api/Role/GetRoleDropDownData*').as('gerRoleData');
    cy.xpath(ADD_NEW_ROLE_BUTTON, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait('@gerRoleData');
  }

  static fillRoleName(name) {
    if (name !== "") {
      cy.xpath(ROLE_NAME, { timeout: ELEMENT_TIMEOUT }).clear().type(name);
    }
  }

  static fillRoleDescription(description) {
    if (description !== "") {
      cy.xpath(ROLE_DESCRIPTION, { timeout: ELEMENT_TIMEOUT }).clear().type(description);
    }
  }

  static selectRoleStatus(status) {
    cy.xpath(CLICK_ROLE_STATUS, { timeout: ELEMENT_TIMEOUT }).click();
    cy.xpath(`//p-dropdownitem//li[normalize-space()='${status}']`, { timeout: ELEMENT_TIMEOUT }).click();

  }

  static selectModule(roleModule) {
    if (roleModule !== "") {
      cy.xpath(CLICK_ROLE_MODULE, { timeout: ELEMENT_TIMEOUT }).click();
      cy.xpath(`//p-dropdownitem//li[normalize-space()='${roleModule}']`, { timeout: ELEMENT_TIMEOUT }).click();
    }
  }

  static selectScreen(screen) {
    if (screen !== "") {
      cy.xpath(CLICK_ROLE_SCREEN, { timeout: ELEMENT_TIMEOUT }).click();
      cy.xpath(`//p-dropdownitem//li[normalize-space()='${screen}']`, { timeout: ELEMENT_TIMEOUT }).click();
    }
  }

  static selectFeature(feature) {
    if (feature !== "") {
      cy.xpath(CLICK_ROLE_FEATURE, { timeout: ELEMENT_TIMEOUT }).click();
      cy.xpath(`//p-dropdownitem//li[normalize-space()='${feature}']`, { timeout: ELEMENT_TIMEOUT }).click();
    }
  }
  static selectPermission(permission) {
    if (permission !== "") {
      cy.xpath(CLICK_ROLE_PERMISSION, { timeout: ELEMENT_TIMEOUT }).click();
      cy.xpath(`//p-dropdownitem//li[normalize-space()='${permission}']`, { timeout: ELEMENT_TIMEOUT }).click();
    }
  }

  static clicOnSubmit() {
    cy.xpath(BTN_SUBMIT, { timeout: ELEMENT_TIMEOUT }).click();
  }


}
export default CreateNewResellerRolePage;

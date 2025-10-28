

import URL_PATH from "../../../common/Route";
const EDIT_XMATRIX_BUTTON = "//span[text()='Edit X-Matrix']";
const CREATE_XMATRIX_BUTTON = "//span[text()='Create X-Matrix']";
const STRATEGIC_OBJECTIVE_TITLE = "//input[@id='title']";
const STRATEGIC_OBJECTIVE_DESCRIPTION = "//textarea[@id='description']";
const BTN_ADD_NEW_OBJECTIVE = "//span[text()='Add New Objective']";
const BTN_SAVE_AND_EXIT = "//span[text()='Save and Exit Strategic Objectives']";
const BTN_SAVE_PROGRESS = "//button[text()=' Save Progress ']";
const BTN_CONTINUE = "//button[text()=' Continue ']";
const BTN_CONFIRM_DELETE = "//button[text()=' Delete ']";
const BTN_UPDATE_OBJECTIVE = "//span[text()='Update Objective']";
const ADD_COMMENT = "//textarea[@placeholder='Add a comment...']";
const BTN_ADD_COMMENT = "//button[@aria-label='Send comment']";
const ELEMENT_TIMEOUT = 20000;

class XMatrixPage {

  static navigateToXMatrixPageUsingURL() {
    cy.log("Navigate to manage users page");
    cy.visit(URL_PATH.xMatrix, { timeout: ELEMENT_TIMEOUT });
  };

  static clickOnCreateXMatrixButton() {
    cy.wait(4000);
    cy.log('click on create x matrix button');
    cy.intercept('GET', 'api/TopLevelImprovementPriority/get-top-level-priorities-detailed*').as('getTopLevelPrioritiesData');
    cy.xpath(CREATE_XMATRIX_BUTTON, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait('@getTopLevelPrioritiesData');
  }

  static clickOnEditXMatrixButton() {
    cy.wait(2000);
    cy.log('click on edit x matrix button');
    cy.intercept('GET', 'api/TopLevelImprovementPriority/get-top-level-priorities-detailed*').as('getTopLevelPrioritiesData');
    cy.xpath(EDIT_XMATRIX_BUTTON, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait('@getTopLevelPrioritiesData');
  }

  static fillStrategicObjectiveTitle(title) {
    if (title !== "") {
      cy.wait(800);
      cy.xpath(STRATEGIC_OBJECTIVE_TITLE, { timeout: ELEMENT_TIMEOUT }).clear().type(title);
    }
  }

  static fillStrategicObjectiveDescription(description) {
    if (description !== "") {
      cy.xpath(STRATEGIC_OBJECTIVE_DESCRIPTION, { timeout: ELEMENT_TIMEOUT }).clear().type(description);
    }
  }

  static clicOnAddNewObjective() {
    cy.intercept('GET', 'api/StrategicObjective/strategic-objectives-detailed*').as('strategicObjectivesDetail');
    cy.xpath(BTN_ADD_NEW_OBJECTIVE, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait('@strategicObjectivesDetail');
  }

  static clicOnSaveAndExit() {
    cy.xpath(BTN_SAVE_AND_EXIT, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static clicOnSaveProgress() {
    cy.intercept('GET', 'api/StrategicObjective/strategic-objectives-detailed*').as('strategicObjectivesDetail');
    cy.xpath(BTN_SAVE_PROGRESS, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait('@strategicObjectivesDetail');
  }

  static clicOnContinue() {
    cy.xpath(BTN_CONTINUE, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static validateStrategicObjective(title) {
    cy.wait(2000);
    cy.xpath(`//div[@id='0']//span[normalize-space()='${title}']`, { timeout: ELEMENT_TIMEOUT }).should('exist');
  }

  static validateStrategicObjectiveIsNotVisible(title) {
    cy.xpath(`//div[@id='0']//span[normalize-space()='${title}']`, { timeout: ELEMENT_TIMEOUT }).should('not.exist');
  }

  static validateComment(comment) {
    cy.log('validating comment');
    cy.xpath("(//div[contains(@class,'comment-item')])[1]", { timeout: ELEMENT_TIMEOUT }).should('contain', comment);
  }

  static clickEditIcon() {
    cy.wait(1500);
    cy.xpath("//div[contains(@class,'goals') and .//span[contains(text(),'Automated Strategic Objectives')]]//div[contains(@class,'horizontal-bottom-hover-btns')]//img[contains(@src,'edit-icon.png')]")
      .invoke('show') // make visible if hidden
      .click({ force: true });

    // cy.xpath("//div[contains(@class, 'horizontal-bottom-hover-btns')]//img[contains(@src, 'edit-icon.png')]")
    //   .invoke('show') // make it visible if hidden
    //   .click({ force: true });
    // cy.contains('div.goals', 'Automated Strategic Objectives Update')
    //   .find("img[src*='edit-icon.png']")
    //   .invoke('show') // make it visible if hidden
    //   .click({ force: true });
  }

  static clickCommentIcon() {
    cy.wait(1500);
    cy.xpath("//div[contains(@class,'goals') and .//span[contains(text(),'Automated Strategic Objectives')]]//div[contains(@class,'horizontal-bottom-hover-btns')]//img[contains(@src,'comment-icon.png')]")
      .invoke('show') // make visible if hidden
      .click({ force: true });
  }

  static clickDeleteButton() {
    cy.wait(1500);
    cy.xpath("//div[contains(@class,'goals') and .//span[contains(text(),'Automated Strategic Objectives')]]//div[contains(@class,'horizontal-bottom-hover-btns')]//img[contains(@src,'trash-icon.png')]")
      .invoke('show') // make visible if hidden
      .click({ force: true });

    // cy.contains('div.goals', 'Automated Strategic Objectives')
    //   .find("img[src*='trash-icon.png']")
    //   .invoke('show') // make it visible if hidden
    //   .click({ force: true });
  }

  static enterComment(comment) {
    cy.xpath('//textarea[@placeholder="Add a comment..."]', { timeout: ELEMENT_TIMEOUT }).clear().type(comment);
  }

  static clickUpdateButton() {
    cy.intercept('PUT', 'api/StrategicObjective').as('updateStrategicObjective');
    cy.intercept('GET', 'api/AnnualStrategicObjective/get-annual-strategic-objectives-detailed*').as('strategicObjectivesDetail');
    cy.log('click on update objective button');
    cy.xpath(BTN_UPDATE_OBJECTIVE, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait(['@updateStrategicObjective', '@strategicObjectivesDetail']);
  }

  static clickConfirmDeleteButton() {
    cy.intercept('DELETE', 'api/StrategicObjective/*').as('deleteStrategicObjective');
    cy.intercept('GET', 'api/AnnualStrategicObjective/get-annual-strategic-objectives-detailed*').as('strategicObjectivesDetail');
    cy.xpath(BTN_CONFIRM_DELETE, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait(['@deleteStrategicObjective', '@strategicObjectivesDetail']);
  }

  static enterComment(comment) {
    cy.log('enter comment');
    cy.xpath(ADD_COMMENT, { timeout: ELEMENT_TIMEOUT }).clear().type(comment);
  }

  static clickAddCommentButton() {
    cy.log('click on add comment button');
    cy.xpath(BTN_ADD_COMMENT, { timeout: ELEMENT_TIMEOUT }).click();
  }
}

export default XMatrixPage;

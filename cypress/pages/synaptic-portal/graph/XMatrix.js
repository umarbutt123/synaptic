
import URL_PATH from "../../../common/Route";
const EDIT_XMATRIX_BUTTON = "//span[text()='Edit X-Matrix']";
const CREATE_XMATRIX_BUTTON = "//span[text()='Create X-Matrix']";
const STRATEGIC_OBJECTIVE_TITLE = "//input[@id='title']";
const STRATEGIC_OBJECTIVE_DESCRIPTION = "//textarea[@id='description']";
const BTN_ADD_NEW_OBJECTIVE = "//span[text()='Add New Objective']";
const BTN_ADD_NEW_ANNUAL_OBJECTIVE = "//span[text()='Add New Annual Objective']";
const BTN_CONNECT_STRATEGIC_OBJECTIVE = "//span[text()='Connect a Strategic Objective']";
const BTN_SAVE_AND_EXIT = "//span[text()='Save and Exit Strategic Objectives']";
const BTN_SAVE_AND_EXIT_ANNUAL_OBJECTIVE = "//span[text()='Save and Exit Annual Strategic Objectives']";
const BTN_SAVE_PROGRESS = "//button[text()=' Save Progress ']";
const BTN_CONTINUE = "//button[text()=' Continue ']";
const BTN_CONFIRM_DELETE = "//button[text()=' Delete ']";
const BTN_UPDATE_OBJECTIVE = "//span[text()='Update Objective']";
const BTN_UPDATE_ANNUAL_OBJECTIVE = "//span[text()='Update Annual Objective']";
const ADD_COMMENT = "//textarea[@placeholder='Add a comment...']";
const BTN_ADD_COMMENT = "//button[@aria-label='Send comment']";
const BTN_NEXT_QUADRANT = "//span[text()='Next Quadrant']";
const BTN_DELETE_CANCEL = "//button[normalize-space(text())='Cancel']";
const CHK_CONNECTED_QUADRANT = "//input[@type='checkbox' and contains(@class,'p-element')]";
const BTN_ASSIGN_RESOURCE = "//span[text()='Assign Resource']";
const RESOURCE_NAME_SEARCH_BOX = "//input[@placeholder='Search by name']";
const RESOURCE_TITLE_DROPDOWN = "//span[@aria-label='Select the title category for resource']";
const BTN_SEND = "//button[normalize-space()='Send']"
const BTN_CONNECT_ANNUAL_STRATEGIC_OBJECTIVE = "//span[text()='Connect a Annual Objective']";
const BTN_ADD_NEW_PRIORITY = "//span[text()='Add New Priority']";
const BTN_SAVE_AND_EXIT_TOP_LEVEL_IMPROVEMENT = "//span[text()='Save and Exit Top Level Improvements']";
const BTN_OKAY = "//button[normalize-space()='Okay']";
const BTN_UPDATE_TOP_LEVEL_IMPROVEMENT = "//span[text()='Update Priority']";
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
      cy.wait(1000);
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

  static clicOnSaveAndExitAnnualObjective() {
    cy.xpath(BTN_SAVE_AND_EXIT_ANNUAL_OBJECTIVE, { timeout: ELEMENT_TIMEOUT }).click();
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

  static clickConfirmDeleteButtonAnnualObjective() {
    cy.log('click on confirm delete button annual objective');
    cy.xpath(BTN_CONFIRM_DELETE, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static enterComment(comment) {
    cy.log('enter comment');
    cy.xpath(ADD_COMMENT, { timeout: ELEMENT_TIMEOUT }).clear().type(comment);
  }

  static clickAddCommentButton() {
    cy.log('click on add comment button');
    cy.xpath(BTN_ADD_COMMENT, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static clickAddNewAnnualObjectiveButton() {
    cy.log('click on add new annual objective button');
    cy.xpath(BTN_ADD_NEW_ANNUAL_OBJECTIVE, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static connectStrategicObjective(strategicObjective) {
    cy.log('click on connect strategic objective button');
    cy.xpath(BTN_CONNECT_STRATEGIC_OBJECTIVE, { timeout: ELEMENT_TIMEOUT }).click();
    cy.log("Connect strategic objective");
    cy.xpath(`(//span[text()=' ${strategicObjective} '])[2]`)
      .click({ force: true });
  }

  static clickNextQuadrantButton() {
    cy.log('click on next quadrant button');
    cy.xpath(BTN_NEXT_QUADRANT, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static clickEditIconAnnualObjective() {
    cy.wait(1500);
    cy.xpath("//div[contains(@class,'sub-golas')]//span[normalize-space(text())='Automated annual Strategic Objectives']/following-sibling::div[contains(@class,'vrtical-left-hover-btns')]//img[contains(@src,'edit-icon.png')]")
      .invoke('show') // make visible if hidden
      .click({ force: true });
  }

  static clickCommentIconAnnualObjective() {
    cy.wait(1500);
    cy.xpath("//div[contains(@class,'sub-golas')]//span[normalize-space(text())='Automated annual Strategic Objectives Update']/following-sibling::div[contains(@class,'vrtical-left-hover-btns')]//img[contains(@src,'comment-icon.png')]")
      .invoke('show') // make visible if hidden
      .click({ force: true });
  }

  static clickDeleteIconAnnualObjective() {
    cy.wait(1500);
    cy.xpath("//div[contains(@class,'sub-golas')]//span[normalize-space(text())='Automated annual Strategic Objectives Update']/following-sibling::div[contains(@class,'vrtical-left-hover-btns')]//img[contains(@src,'trash-icon.png')]")
      .invoke('show') // make visible if hidden
      .click({ force: true });
  }

  static validateDeleteButtonIsDisabled() {
    cy.wait(800);
    cy.xpath("//button[normalize-space(text())='Delete']")
      .should('be.disabled');
  }

  static clickDeleteCancelButton() {
    cy.log('click on delete cancel button');
    cy.xpath(BTN_DELETE_CANCEL, { timeout: ELEMENT_TIMEOUT }).click();
  }
  static clickConnectedQuadrantCheckbox() {
    cy.log('click on connected quadrant checkbox');
    cy.xpath(CHK_CONNECTED_QUADRANT, { timeout: ELEMENT_TIMEOUT }).click({ force: true });
  }

  static clickUpdateAnnualObjectiveButton() {
    cy.log('click on next quadrant button');
    cy.xpath(BTN_UPDATE_ANNUAL_OBJECTIVE, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static validateStrategicAnnualObjectiveIsNotVisible(title) {
    cy.xpath(`//div[@id='0']//span[(text()='${title}')]`, { timeout: ELEMENT_TIMEOUT }).should('not.exist');
  }

  static validateTopLevelImprovementScreen() {
    cy.wait(3000)
    cy.get('body').then(($body) => {
      // Check if text exists anywhere in the DOM
      if ($body.text().includes('Annual Strategic Objectives')) {
        cy.contains('Annual Strategic Objectives').then(($el) => {
          if ($el.is(':visible')) {
            cy.log('✅ Annual Strategic Objectives is visible — clicking Next');
            cy.xpath(BTN_NEXT_QUADRANT, { timeout: ELEMENT_TIMEOUT }).click();
            cy.wait(2000);
          } else {
            cy.log('⚠️ Annual Strategic Objectives is not visible — skipping Next click');
          }
        });
      } else {
        cy.log('⚠️ Annual Strategic Objectives not found in DOM — skipping action');
        cy.wait(2000);
      }
    });
  }
  // cy.contains('Annual Strategic Objectives').then(($el) => {
  //   if ($el.is(':visible')) {
  //     cy.xpath(BTN_NEXT_QUADRANT, { timeout: ELEMENT_TIMEOUT }).click();
  //     cy.wait(1000);
  //     // cy.contains('button', 'Next').click();
  //   }
  //   else {
  //     cy.log('Annual Strategic Objectives is not visible');
  //   }
  // });

  static clickAssignResourceButton() {
    cy.log('click on assign resource button');
    cy.xpath(BTN_ASSIGN_RESOURCE, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static selectResource(resourceName) {
    cy.log('Enter resource name');
    cy.wait(2000);
    cy.xpath(RESOURCE_NAME_SEARCH_BOX, { timeout: ELEMENT_TIMEOUT }).clear().type(resourceName);
    cy.wait(1000);
    cy.xpath(RESOURCE_NAME_SEARCH_BOX, { timeout: ELEMENT_TIMEOUT }).type('{downarrow}').type('{enter}');
  }

  static selectResourceTitle(resourceTitle) {
    cy.log('Select resource title');
    cy.xpath(RESOURCE_TITLE_DROPDOWN, { timeout: ELEMENT_TIMEOUT })
      .click({ force: true });
    cy.xpath(`//div[normalize-space(text())='${resourceTitle}']`)
      .click({ force: true });
  }

  static clickSendButton() {
    cy.log('click on send button');
    cy.xpath(BTN_SEND, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static connectAnnualStrategicObjective(annualStrategicObjective) {
    cy.log('click on connect strategic objective button');
    cy.wait(1000);
    cy.xpath(BTN_CONNECT_ANNUAL_STRATEGIC_OBJECTIVE, { timeout: ELEMENT_TIMEOUT }).click();
    cy.log("Connect annual objective");
    cy.xpath(`(//span[normalize-space()='${annualStrategicObjective}'])[2]`)
      .click({ force: true });
  }

  static clickAddNewPriorityButton() {
    cy.log('click on add new priority button');
    cy.xpath(BTN_ADD_NEW_PRIORITY, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static validateSuccessMessage(message) {
    cy.log('validate success message');
    cy.xpath(`//div[normalize-space(text())='${message}']`, { timeout: ELEMENT_TIMEOUT }).should('exist');
  }

  static clickSaveAndExitTopLevelImprovementButton() {
    cy.log('click on save and exit top level improvement button');
    cy.xpath(BTN_SAVE_AND_EXIT_TOP_LEVEL_IMPROVEMENT, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static validateTopLevelImprovement(title) {
    cy.wait(2000);
    cy.xpath(`//div[@id='0']//span[normalize-space()='${title}']`, { timeout: ELEMENT_TIMEOUT }).should('exist');
  }

  static clickOkayButton() {
    cy.log('click on okay button');
    cy.xpath(BTN_OKAY, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static clickEditIconTopLevelImprovement(title) {
    cy.wait(1500);
    cy.xpath(`//div[contains(@class,'flex')]//span[normalize-space(text())='${title}']/following-sibling::div[contains(@class,'horizontal-top-hover-btns')]//img[contains(@src,'edit-icon.png')]`)
      .invoke('show') // make visible if hidden
      .click({ force: true });
    cy.wait(1000);
  }

  static clickCommentIconTopLevelImprovement(title) {
    cy.wait(1500);
    cy.xpath(`//div[contains(@class,'flex')]//span[normalize-space(text())='${title}']/following-sibling::div[contains(@class,'horizontal-top-hover-btns')]//img[contains(@src,'comment-icon.png')]`)
      .invoke('show') // make visible if hidden
      .click({ force: true });
  }

  static clickDeleteIconTopLevelImprovement(title) {
    cy.wait(1500);
    cy.xpath(`//div[contains(@class,'flex')]//span[normalize-space(text())='${title}']/following-sibling::div[contains(@class,'horizontal-top-hover-btns')]//img[contains(@src,'trash-icon.png')]`)
      .invoke('show') // make visible if hidden
      .click({ force: true });
  }
  static clickUpdateTopLevelImprovementButton() {
    cy.log('click on update top level improvement button');
    cy.xpath(BTN_UPDATE_TOP_LEVEL_IMPROVEMENT, { timeout: ELEMENT_TIMEOUT }).click();
  }

}

export default XMatrixPage;

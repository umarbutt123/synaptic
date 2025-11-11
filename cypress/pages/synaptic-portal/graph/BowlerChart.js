

import URL_PATH from "../../../common/Route";
const EDIT_XMATRIX_BUTTON = "//span[text()='Edit X-Matrix']";
const STRATEGIC_OBJECTIVE_TITLE = "//input[@id='title']";
const STRATEGIC_OBJECTIVE_DESCRIPTION = "//textarea[@id='description']";
const BTN_ADD_NEW_OBJECTIVE = "//span[text()='Add New Objective']";
const BTN_SAVE_AND_EXIT = "//span[text()='Save and Exit Strategic Objectives']";
const BTN_SAVE_PROGRESS = "//button[text()=' Save Progress ']";
const BTN_CONTINUE = "//button[text()=' Continue ']";
const BTN_CONFIRM_DELETE = "//button[text()=' Delete ']";
const BTN_UPDATE_OBJECTIVE = "//span[text()='Update Objective']";
const DIALOG_UPDATE_BUTTON = "//button[contains(text(), 'Update')]";
const DIALOG_CANCEL_BUTTON = "//button[contains(text(), 'Cancel')]";
const UPDATE_DIALOG_BOX = "div[role='dialog']";
const ELEMENT_TIMEOUT = 20000;
const specific_target_value_spans = "//span[contains(text(),'Pair 80% of emerging leaders with executive mentors within the partnership.')]/parent::*/parent::*/following-sibling::*//span[@class='cell-value ng-star-inserted']"
const Actual_Value_Spans = "//span[@class='cell-value ng-star-inserted']"
const Actual_Value_Input = "//div[contains(@class,'data-cell') and contains(@class,'editing')]//input"

class BowlerChartPage {

  // static navigateToAddUserPageUsingUrl() {
  //   cy.log("Navigate to manage users page");
  //   cy.intercept('GET', 'api/User/get-by-company-id*').as('getCompanyId');
  //   cy.visit(URL_PATH.users, { timeout: ELEMENT_TIMEOUT });
  //   cy.wait('@getCompanyId');
  // };

  static updateDialogHandler(action) {
    cy.document().then((doc) => {
      const $dialog = Cypress.$(UPDATE_DIALOG_BOX); // jQuery query
      if ($dialog.length && $dialog.is(':visible')) {
        cy.log(`Dialog detected — clicking ${action} button`);

        if (action.toLowerCase() === 'update') {
          cy.xpath(DIALOG_UPDATE_BUTTON).should('be.visible').click();
        } else if (action.toLowerCase() === 'cancel') {
          cy.xpath(DIALOG_CANCEL_BUTTON).should('be.visible').click();
        } else {
          cy.log(`Unknown action: ${action}. Skipping dialog click.`);
        }

      } else {
        cy.log('No dialog appeared — continuing test');
      }
    });

  }


  static navigateToXMatrixPageUsingURL() {
    cy.log("Navigate to X-Matrix page");
    cy.visit(URL_PATH.xMatrix, { timeout: ELEMENT_TIMEOUT });
  };

  static navigateToBowlerChartPageUsingURL() {
    cy.log('Navigate to BowlerChart using URL')
    //cy.intercept('GET', "api/Bowler/get-bowler-lists*").as('getBowlerPageByCompanyId');
    //cy.intercept('GET', "https://app-synaptic-flow-centraus-dev-gbbthuceaqbrdgf8.centralus-01.azurewebsites.net/bowler-chart").as('getBowlerPage');
    cy.visit(URL_PATH.bowlerChart);
    //cy.wait(["@getBowlerPageByCompanyId", "@getBowlerPage"]);
  }

  static addValueUnderFirstMeasurement() {
    cy.log('Adding value under 1st measurement');
    cy.xpath(Actual_Value_Spans).first().click();
    cy.xpath(Actual_Value_Input).should('be.visible').clear().type('9.00{enter}');
    //Update Dialog Box Handling
    this.updateDialogHandler('update');
  }

  static AssertEnteredValue() {
    cy.log('Asserting if added value saved successfully');
    cy.xpath(Actual_Value_Spans).first().as('inputValue')
    cy.get('@inputValue').then((text) => {
      expect(text).to.contain('3.00');
    });
  }



  static clickOnEditXMatrixButton() {
    cy.log('click on edit x matrix button');
    cy.intercept('GET', 'api/TopLevelImprovementPriority/get-top-level-priorities-detailed*').as('getTopLevelPrioritiesData');
    cy.xpath(EDIT_XMATRIX_BUTTON, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait('@getTopLevelPrioritiesData');
  }

  static fillStrategicObjectiveTitle(title) {
    if (title !== "") {
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
    cy.xpath(`//div[@id='1']//span[normalize-space()='${title}']`, { timeout: ELEMENT_TIMEOUT }).should('exist');
  }

  static validateComment(comment) {
    cy.log('validating comment');
    cy.xpath("(//div[contains(@class,'comment-item')])[1]", { timeout: ELEMENT_TIMEOUT }).should('contain', comment);
  }

  static clickDeleteButton() {
    // cy.get("div.horizontal-bottom-hover-btns").invoke('show');
    // cy.get("img[src*='trash-icon.png']").click({ force: true });
    // Find the goal container that has the specific title
    cy.contains('div.goals', 'Adding Automated Strategic Objectives')
      .find("img[src*='trash-icon.png']")
      .invoke('show') // make it visible if hidden
      .click({ force: true });
  }

  static clickEditButton() {
    cy.contains('div.goals', 'Adding Automated Strategic Objectives')
      .find("img[src*='edit-icon.png']")
      .invoke('show') // make it visible if hidden
      .click({ force: true });
  }

  static clickCommentIcon() {
    cy.contains('div.goals', 'Adding Automated Strategic Objectives')
      .find("img[src*='comment-icon.png']")
      .invoke('show') // make it visible if hidden
      .click({ force: true });
  }

  static enterComment(comment) {
    cy.xpath('//textarea[@placeholder="Add a comment..."]', { timeout: ELEMENT_TIMEOUT }).clear().type(comment);
  }

  static clickUpdateButton() {
    cy.log('click on update objective button');
    cy.xpath(BTN_UPDATE_OBJECTIVE, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static clickConfirmDeleteButton() {
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

}

export default BowlerChartPage;

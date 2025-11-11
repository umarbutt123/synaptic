

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
}

export default BowlerChartPage;

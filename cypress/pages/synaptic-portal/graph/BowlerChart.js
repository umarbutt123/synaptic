

import URL_PATH from "../../../common/Route";
const EDIT_XMATRIX_BUTTON = "//span[text()='Edit X-Matrix']";
const STRATEGIC_OBJECTIVE_TITLE = "//input[@id='title']";
const STRATEGIC_OBJECTIVE_DESCRIPTION = "//textarea[@id='description']";
const BTN_ADD_NEW_OBJECTIVE = "//span[text()='Add New Objective']";
const BTN_SAVE_AND_EXIT = "//span[text()='Save and Exit Strategic Objectives']";
const LIST_TARGETS = "//li[@class='text-xl text-primary mb-2']";
const BTN_SKIP = "//span[contains(text(),' Skip for now')]";
const BTN_NEXT_QUADRANT = "//span[contains(text(),'Next Quadrant')]";
const BTN_XMATRIX_UPDATE = "//span[contains(text(),'Edit X-Matrix')]";
const DIALOG_UPDATE_BUTTON = "//button[contains(text(), 'Update')]";
const DIALOG_CANCEL_BUTTON = "//button[contains(text(), 'Cancel')]";
const UPDATE_DIALOG_BOX = "div[role='dialog']";
const UPDATE_DIALOG_BOX_XPATH = "//div[@role='dialog']";
const ELEMENT_TIMEOUT = 20000;
// const Actual_Value_Spans = "//span[@class='cell-value ng-star-inserted']";
const Actual_Value_Spans = "(//span[@class='cell-value ng-star-inserted'])[1]";
const Actual_Value_INPUT = "(//input[@type='number' and @placeholder='Enter value'])[)1]";
const Actual_Value_box = "//span[@class='cell-value ng-star-inserted']/parent::*";
const Actual_Value_Input = "//div[contains(@class,'data-cell') and contains(@class,'editing')]//input";
const FILE_UPLOAD_BUTTON = "//button[contains(text(),'Upload')]";
const FILE_UPLOAD_FIELD = "//app-add-measures-file-modal//input[@type='file']";
const FILE_UPLOAD_LOADER = "//app-add-measures-file-modal//span[3]";
const FILE_SAVE_BUTTON = "//button[contains(text(),'Save')]";
//let firstTarget;  

class BowlerChartPage {
  static firstTarget = '';


  // static navigateToAddUserPageUsingUrl() {
  //   cy.log("Navigate to manage users page");
  //   cy.intercept('GET', 'api/User/get-by-company-id*').as('getCompanyId');
  //   cy.visit(URL_PATH.users, { timeout: ELEMENT_TIMEOUT });
  //   cy.wait('@getCompanyId');
  // };


  static uploadFile(file) {
    cy.xpath(FILE_UPLOAD_BUTTON).click();
    cy.wait(1000);

    cy.fixture(file, "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((blob) => {
        cy.xpath(FILE_UPLOAD_FIELD)
          .invoke("show")
          .attachFile({
            fileContent: blob,
            fileName: file,
            mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          });
      });

    cy.xpath(FILE_UPLOAD_LOADER, { timeout: 15000 })
      .should('contain.text', 'Ready');

    cy.xpath(FILE_SAVE_BUTTON).click();
    cy.wait(2000)
  }

  static assertImportedValue(value) {

    cy.log('Asserting if added value saved successfully');

    cy.xpath(Actual_Value_Spans).click();
    cy.xpath(Actual_Value_INPUT).clear().type(value);
    // cy.xpath(Actual_Value_Spans).first().as('inputValue')
    // cy.get('@inputValue').then((text) => {
    //   expect(text).to.contain(`${value}`);
    // });

  }

  static updateDialogHandler(action) {
    // cy.xpath(UPDATE_DIALOG_BOX_XPATH).should('exist');
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


  static findorAddNewTarget() {
    cy.log('click on edit x matrix button');
    cy.wait(1500)
    cy.xpath(BTN_XMATRIX_UPDATE, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait(1500)
    cy.xpath(BTN_NEXT_QUADRANT, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait(1500)
    cy.xpath(BTN_NEXT_QUADRANT, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait(1500)
    cy.xpath(BTN_NEXT_QUADRANT, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait(1500)
    cy.xpath(BTN_SKIP, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait(1500)
    cy.xpath(BTN_NEXT_QUADRANT, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait(1500)
    cy.xpath(BTN_NEXT_QUADRANT, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait(1500)

    cy.xpath(LIST_TARGETS).then(($elements) => {
      if ($elements.length > 0) {
        cy.wrap($elements.eq(0))
          .invoke('text')
          .then((text) => {
            this.firstTarget = text.trim(); // store trimmed text
            cy.log(`Stored first target: ${this.firstTarget}`);
          });
      } else {
        cy.log("No elements found.");
      }
    });

  }

  static findTopTarget() {
    cy.log("Navigate to X-Matrix page");
    cy.visit(URL_PATH.targets, { timeout: ELEMENT_TIMEOUT });
    cy.wait(2000);

    cy.xpath(LIST_TARGETS).then(($elements) => {
      if ($elements.length > 0) {
        cy.wrap($elements.eq(0))
          .invoke('text')
          .then((text) => {
            this.firstTarget = text.trim(); // store trimmed text
            cy.log(`Stored first target: ${this.firstTarget}`);
          });
      } else {
        cy.log("No elements found.");
      }
    });

  }

  static assertTargetonBowlerPage() {
    cy.log('Navigate to Bowler Chart page');
    cy.visit(URL_PATH.bowlerChart, { timeout: ELEMENT_TIMEOUT });
    cy.wait(2000)
    cy.xpath(`//span[contains(text(),"${this.firstTarget}")]`).should('exist');

    cy.xpath(`//span[contains(text(),"${this.firstTarget}")]/parent::*//parent::*//parent::*//parent::*//parent::div[@class='chart-group ng-star-inserted']/div[contains(@class, 'bowler-table-container')]`)
      .then(($div) => {
        const className = $div.attr('class');
        if (!className.includes('expanded')) {
          cy.xpath(`//span[contains(text(),"${this.firstTarget}")]/parent::*//parent::*//parent::*//parent::*//parent::div[@class='chart-group ng-star-inserted']/div[contains(@class, 'bowler-table-container')]/preceding-sibling::*[1]`)
            .click();
          cy.log('Clicked collapsed div');
        } else {
          cy.log('Already expanded, skipped');
        }
      });

  };

  static navigateToBowlerChartPageUsingURL() {
    cy.log('Navigate to BowlerChart using URL')
    //cy.intercept('GET', "api/Bowler/get-bowler-lists*").as('getBowlerPageByCompanyId');
    //cy.intercept('GET', "https://app-synaptic-flow-centraus-dev-gbbthuceaqbrdgf8.centralus-01.azurewebsites.net/bowler-chart").as('getBowlerPage');
    cy.visit(URL_PATH.bowlerChart);
    //cy.wait(["@getBowlerPageByCompanyId", "@getBowlerPage"]);
  }

  static addValueUnderFirstMeasurement(value) {
    cy.log('Adding value under 1st measurement');
    cy.xpath(Actual_Value_Spans).first().click();
    cy.xpath(Actual_Value_Input).should('be.visible').clear().type(`${value}{enter}`);
    //Update Dialog Box Handling
    this.updateDialogHandler('update');
  }

  static boxturnsGreen() {
    cy.log("Box turns Red");
    cy.xpath(Actual_Value_box)
      .invoke('attr', 'class')
      .should('contain', 'status-green')
    // cy.xpath(Actual_Value_box).should('have.class', 'data-cell actual-cell status-green editable-cell')
  };

  static addValueUnderFirstMeasurementWithDialog(value) {
    cy.log('Adding value under 1st measurement');
    cy.xpath(Actual_Value_Spans).first().click();
    cy.xpath(Actual_Value_Input).should('be.visible').clear().type(`${value}{enter}`);
    cy.wait(2000);
    //Update Dialog Box Handling
    //this.updateDialogHandler('update');
    //cy.xpath(UPDATE_DIALOG_BOX).should('exist');
  }
  static assertUpdatePopup() {

    this.updateDialogHandler('cancel');
    cy.wait(2000);
  }
  static assertUpdatePopupWithButton(value) {

    this.updateDialogHandler(value);
    cy.wait(2000);
  }

  static AssertEnteredValue(value) {
    cy.log('Asserting if added value saved successfully');
    cy.xpath(Actual_Value_Spans).first().as('inputValue')
    cy.get('@inputValue').then((text) => {
      expect(text).to.contain(`${value}`);
    });
  }
  static AssertEnteredValueNot(value) {
    cy.log('Asserting if added value saved successfully');
    cy.xpath(Actual_Value_Spans).first().as('inputValue')
    cy.get('@inputValue').then((text) => {
      expect(text).to.not.match(`${value}`);
    });
  }
}

export default BowlerChartPage;

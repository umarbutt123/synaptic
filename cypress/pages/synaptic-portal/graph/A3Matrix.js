
import URL_PATH from "../../../common/Route";
const SOLVE_NEW_PROBLEM_BTN = "//span[text()='Solve New Problem']";
const PROBLEM_STATEMENT = "//input[@id='problemStatement']";
const PROBLEM_DESCRIPTION = "//textarea[@id='problemDescription']";
const CREATE_SOLUTION_BTN = "//button[normalize-space()='Create Solutions']";
const BTN_SAVE = "//button[@aria-label='Save']";
//click on + button based on chart name
//click on edit button based on chart name
//h3[normalize-space(text())='Current Condition']/following-sibling::div//button[@aria-label='Edit']

const ELEMENT_TIMEOUT = 20000;

class XMatrixPage {

  static navigateToA3MatrixPageUsingURL() {
    cy.log("Navigate to manage users page");
    cy.intercept('GET', 'api/A3Matrix.*').as('A3MatrixData');
    cy.visit(URL_PATH.a3Matrix, { timeout: ELEMENT_TIMEOUT });
    cy.wait('@A3MatrixData');
  };

  static navigateToA3MatrixPageUsingSidebar() {
    cy.log("Navigate to manage users page");
    cy.xpath("//a[.//span[text()='Current Strategies']]//img[contains(@src, 'strategy.png')]", { timeout: ELEMENT_TIMEOUT }).click();
    cy.xpath("//span[text()='A3 Matrix']", { timeout: ELEMENT_TIMEOUT }).click();
  };

  static clickOnSolveNewProblemButton() {
    cy.wait(4000);
    cy.log('click on solve new problem button');
    // cy.intercept('GET', 'api/TopLevelImprovementPriority/get-top-level-priorities-detailed*').as('getTopLevelPrioritiesData');
    cy.xpath(SOLVE_NEW_PROBLEM_BTN, { timeout: ELEMENT_TIMEOUT }).click();
    // cy.wait('@getTopLevelPrioritiesData');
  }

  static fillProblemStatement(problemStatement) {
    if (problemStatement !== "") {
      cy.xpath(PROBLEM_STATEMENT, { timeout: ELEMENT_TIMEOUT }).clear().type(problemStatement);
    }
  }

  static fillProblemDescription(problemDescription) {
    if (problemDescription !== "") {
      cy.xpath(PROBLEM_DESCRIPTION, { timeout: ELEMENT_TIMEOUT }).clear().type(problemDescription);
    }
  }

  static clickOnA3Matrix(title) {
    cy.log('click on a3 matrix');
    cy.xpath(`//span[text()='${title}']`, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static validateAllChartsAreVisibleOnA3Matrix(chart1, chart2, chart3, chart4, chart5, chart6, chart7, chart8) {
    cy.xpath(`//h3[text()='${chart1}']`, { timeout: ELEMENT_TIMEOUT }).should('be.visible');
    cy.xpath(`//h3[text()='${chart2}']`, { timeout: ELEMENT_TIMEOUT }).should('be.visible');
    cy.xpath(`//h3[text()='${chart3}']`, { timeout: ELEMENT_TIMEOUT }).should('be.visible');
    cy.xpath(`//h3[text()='${chart4}']`, { timeout: ELEMENT_TIMEOUT }).should('be.visible');
    cy.xpath(`//h3[text()='${chart5}']`, { timeout: ELEMENT_TIMEOUT }).should('be.visible');
    cy.xpath(`//h3[text()='${chart6}']`, { timeout: ELEMENT_TIMEOUT }).should('be.visible');
    cy.xpath(`//h3[text()='${chart7}']`, { timeout: ELEMENT_TIMEOUT }).should('be.visible');
    cy.xpath(`//h3[text()='${chart8}']`, { timeout: ELEMENT_TIMEOUT }).should('be.visible');
  }

  static clickOnAddNewContentButton(chartName) {
    cy.xpath(`//h3[normalize-space(text())='${chartName}']/following-sibling::div//button[@aria-label='Add Content']`, { timeout: ELEMENT_TIMEOUT }).click();
    cy.wait(800);
  }

  static clickOnEditContentButton(chartName) {
    cy.xpath(`//h3[normalize-space(text())='${chartName}']/following-sibling::div//button[@aria-label='Edit']`, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static clickOnSaveButton() {
    cy.xpath(BTN_SAVE, { timeout: ELEMENT_TIMEOUT }).click();
  }

  static clickonAddButton(subTitle) {
    cy.xpath(`//div[.='${subTitle}']/following-sibling::button`, { timeout: ELEMENT_TIMEOUT }).click();
  }
  static clickonEditButton(Title) {
    cy.xpath(`//div[.='${Title}']//button[@aria-label='Edit']`, { timeout: ELEMENT_TIMEOUT }).click();
  }
  clickonEditButton

  static fillTitle(subTitle, title) {
    if (subTitle === "Objective:") {
      if (title !== "") {
        cy.xpath(`(//div[contains(.,'${subTitle}')]/following::textarea)[2]`, { timeout: ELEMENT_TIMEOUT }).clear().type(title);
      }
    }
    else if (subTitle === "Current Status:" || subTitle === "Tools Used:") {
      if (title !== "") {
        cy.xpath(`//div[@class='block-heading' and contains(text(),'${subTitle}')]/following::textarea[4]`, { timeout: ELEMENT_TIMEOUT }).type(title);
      }
    }
       else if (subTitle === "Actions:" || subTitle === "Goals:" || subTitle === "Post-Implementation Checks:" || subTitle === "Actions to Sustain Improvements:") {
      if (title !== "") {
        cy.xpath(`//div[@class='block-heading' and contains(text(),'${subTitle}')]/following::textarea[6]`, { timeout: ELEMENT_TIMEOUT }).type(title);
      }
    }  

    else if (subTitle === "Analysis:") {
      if (title !== "") {
        cy.xpath(`//div[@class='block-heading' and contains(text(),'${subTitle}')]/following::textarea[5]`, { timeout: ELEMENT_TIMEOUT }).type(title);
      }
    }
    else if (subTitle === "SuggestedActions:") {
      if (title !== "") {
        cy.xpath(`//div[@class='block-heading' and contains(text(),'${subTitle}')]/following::textarea[7]`, { timeout: ELEMENT_TIMEOUT }).type(title);
      }
    }
  }


  static EditText(subTitle, title) {
    if (subTitle === "Objective:" || subTitle === "Background:" || subTitle === "Significance:") {
      if (title !== "") {
        
        cy.xpath(`//div[@class='block-heading' and contains(text(),'${subTitle}')]/following::textarea[2]`, { timeout: ELEMENT_TIMEOUT }).type(title);
      }
    }
    else if (subTitle === "Current Status:" || subTitle === "Tools Used:") {
      if (title !== "") {
        cy.xpath(`//div[@class='block-heading' and contains(text(),'${subTitle}')]/following::textarea[4]`, { timeout: ELEMENT_TIMEOUT }).type(title);
      }
    }
       else if (subTitle === "Actions:" || subTitle === "Goals:" || subTitle === "Post-Implementation Checks:" || subTitle === "Actions to Sustain Improvements:") {
      if (title !== "") {
        cy.xpath(`//div[@class='block-heading' and contains(text(),'${subTitle}')]/following::textarea[6]`, { timeout: ELEMENT_TIMEOUT }).type(title);
      }
    }  

    else if (subTitle === "Analysis:") {
      if (title !== "") {
        cy.xpath(`//div[@class='block-heading' and contains(text(),'${subTitle}')]/following::textarea[5]`, { timeout: ELEMENT_TIMEOUT }).type(title);
      }
    }
    else if (subTitle === "SuggestedActions:") {
      if (title !== "") {
        cy.xpath(`//div[@class='block-heading' and contains(text(),'${subTitle}')]/following::textarea[7]`, { timeout: ELEMENT_TIMEOUT }).type(title);
      }
    }
  }

  static validateObjectiveIsVisible(objectiveTitle) {
    cy.xpath(`//p[text()='${objectiveTitle}']`, { timeout: ELEMENT_TIMEOUT }).should('exist');
  }

  static validateSuccessMessage(successMessage) {
    cy.xpath(`//div[contains(@class,'p-toast-summary') and text()='${successMessage}']`, { timeout: ELEMENT_TIMEOUT }).should('exist');
  }

}

export default XMatrixPage;

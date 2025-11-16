/* eslint-disable max-len */
import {
  And, Then, When,
} from 'cypress-cucumber-preprocessor/steps';

import A3MatrixPage from '../../../pages/synaptic-portal/graph/A3Matrix';

// before(() => {
//   cy.loginWithSession("croubayinoulle-3277@yopmail.com", "Test@1234");
// });

And(/^I navigate to the A3-Matrix page$/, () => {
  cy.wait(4000);
  A3MatrixPage.navigateToA3MatrixPageUsingSidebar();
});

And(/^I click on solve new problem button$/, () => {
  cy.wait(2000);
  A3MatrixPage.clickOnSolveNewProblemButton();
});

When(/^I enter details having following parameters "([^"]*)" "([^"]*)"$/, (problemStatement, problemDescription) => {
  cy.log("Enter title")
  A3MatrixPage.fillProblemStatement(problemStatement);
  cy.log("Enter description")
  A3MatrixPage.fillProblemDescription(problemDescription);
});


And(/^I click on A3-Matrix "([^"]*)"$/, (title) => {
  A3MatrixPage.clickOnA3Matrix(title);
});

Then(/^I validate all charts are visible on A3 Matrix "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)"$/, (chart1, chart2, chart3, chart4, chart5, chart6, chart7, chart8) => {
  A3MatrixPage.validateAllChartsAreVisibleOnA3Matrix(chart1, chart2, chart3, chart4, chart5, chart6, chart7, chart8);
});

And(/^I click add new objective button on "([^"]*)" chart$/, (chartName) => {
  A3MatrixPage.clickOnAddNewContentButton(chartName);
});

And(/^I click add new objective button on "([^"]*)" chart$/, (chartName) => {
  A3MatrixPage.clickOnAddNewContentButton(chartName);
});

And(/^I add new "([^"]*)" with following title "([^"]*)"$/, (subTitle, title) => {
  A3MatrixPage.clickonAddButton(subTitle);
  A3MatrixPage.fillTitle(subTitle, title);
  A3MatrixPage.clickOnSaveButton();
});

And(/^I add new current status with following title "([^"]*)"$/, (title) => {
  A3MatrixPage.clickonAddButton("Current Status:");
  A3MatrixPage.fillCurrentStatusTitle(title);
  A3MatrixPage.clickOnSaveButton();
});

Then(/^I validate new value is visible with following title "([^"]*)"$/, (objectiveTitle) => {
  A3MatrixPage.validateObjectiveIsVisible(objectiveTitle);
});


Then(/^I click on update button$/, () => {
  userPage.clicOnUpdate();
});

Then(/^I validate success message "([^"]*)"$/, (successMessage) => {
  A3MatrixPage.validateSuccessMessage(successMessage);
});



// When(/^I enter details having following parameters "([^"]*)" "([^"]*)"$/, (title, description) => {
//   cy.log("Enter title")
//   XMatrixPage.fillStrategicObjectiveTitle(title);
//   cy.log("Enter description")
//   XMatrixPage.fillStrategicObjectiveDescription(description);
// });

// And(/^I click on add new objective button$/, () => {
//   cy.log("Click on Add new objective button")
//   XMatrixPage.clicOnAddNewObjective();
// });

// And(/^I click on delete strategic objective button$/, () => {
//   XMatrixPage.clickDeleteButton();
// });

// And(/^I click on update icon on strategic objective$/, () => {
//   XMatrixPage.clickEditIcon();
// });

// And(/^I click on update objective button$/, () => {
//   XMatrixPage.clickUpdateButton();
// });

// And(/^I click on comment icon on strategic objective$/, () => {
//   XMatrixPage.clickCommentIcon();
// });

// And(/^I enter a comment on strategic objective "([^"]*)"$/, (comment) => {
//   XMatrixPage.enterComment(comment);
// });

// And(/^I click on add comment button$/, () => {
//   cy.log('click on add comment button');
//   XMatrixPage.clickAddCommentButton();
// });

// Then(/^I click on save progress button$/, () => {
//   XMatrixPage.clicOnSaveProgress();
// });

// Then(/^I validate strategic objective is visible on graph "([^"]*)"$/, (title) => {
//   XMatrixPage.validateStrategicObjective(title);
// });

// Then(/^I validate annual strategic objective is visible on graph "([^"]*)"$/, (title) => {
//   XMatrixPage.validateAnnualStrategicObjective(title);
// });

// Then(/^I validate strategic objective is not visible on graph "([^"]*)"$/, (title) => {
//   XMatrixPage.validateStrategicObjectiveIsNotVisible(title);
// });


// Then(/^I validate comment is addedd successfully "([^"]*)"$/, (comment) => {
//   XMatrixPage.validateComment(comment);
// });

// Then(/^I click on save and exit button$/, () => {
//   XMatrixPage.clicOnSaveAndExit();
// });
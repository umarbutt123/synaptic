/* eslint-disable max-len */
import {
  And, Then, When,
} from 'cypress-cucumber-preprocessor/steps';

import XMatrixPage from '../../../pages/synaptic-portal/graph/XMatrix';

// before(() => {
//   cy.loginWithSession("croubayinoulle-3277@yopmail.com", "Test@1234");
// });

When(/^I navigate to the X-Matrix page$/, () => {
  XMatrixPage.navigateToXMatrixPageUsingURL();
});

And(/^I click on create X-Matrix button$/, () => {
  cy.wait(2000);
  XMatrixPage.clickOnCreateXMatrixButton();
});

And(/^I click on edit X-Matrix button$/, () => {
  cy.wait(1500);
  XMatrixPage.clickOnEditXMatrixButton();
});

Then(/^I click on update button$/, () => {
  userPage.clicOnUpdate();
});

When(/^I enter details having following parameters "([^"]*)" "([^"]*)"$/, (title, description) => {
  cy.log("Enter title")
  XMatrixPage.fillStrategicObjectiveTitle(title);
  cy.log("Enter description")
  XMatrixPage.fillStrategicObjectiveDescription(description);
});

And(/^I click on add new objective button$/, () => {
  cy.log("Click on Add new objective button")
  XMatrixPage.clicOnAddNewObjective();
});

And(/^I click on delete strategic objective button$/, () => {
  XMatrixPage.clickDeleteButton();
});

And(/^I click on update icon on strategic objective$/, () => {
  XMatrixPage.clickEditIcon();
});

And(/^I click on update objective button$/, () => {
  XMatrixPage.clickUpdateButton();
});

And(/^I click on comment icon on strategic objective$/, () => {
  XMatrixPage.clickCommentIcon();
});

And(/^I enter a comment on strategic objective "([^"]*)"$/, (comment) => {
  XMatrixPage.enterComment(comment);
});

And(/^I click on add comment button$/, () => {
  cy.log('click on add comment button');
  XMatrixPage.clickAddCommentButton();
});

Then(/^I click on save progress button$/, () => {
  XMatrixPage.clicOnSaveProgress();
});

Then(/^I validate strategic objective is visible on graph "([^"]*)"$/, (title) => {
  cy.reload();
  XMatrixPage.validateStrategicObjective(title);
});

Then(/^I validate annual strategic objective is visible on graph "([^"]*)"$/, (title) => {
  XMatrixPage.validateAnnualStrategicObjective(title);
});

Then(/^I validate strategic objective is not visible on graph "([^"]*)"$/, (title) => {
  XMatrixPage.validateStrategicObjectiveIsNotVisible(title);
});


Then(/^I validate comment is addedd successfully "([^"]*)"$/, (comment) => {
  XMatrixPage.validateComment(comment);
});

Then(/^I click on save and exit button$/, () => {
  XMatrixPage.clicOnSaveAndExit();
});

Then(/^I click on save and exit annual objective button$/, () => {
  XMatrixPage.clicOnSaveAndExitAnnualObjective();
});

And(/^I click on confirm delete button$/, () => {
  XMatrixPage.clickConfirmDeleteButton();
});

And(/^I click on confirm delete annual objective button$/, () => {
  XMatrixPage.clickConfirmDeleteButtonAnnualObjective();
});

And(/^I click on next quadrant button$/, () => {
  XMatrixPage.clickNextQuadrantButton();
});

And(/^I click on skip for now button$/, () => {
  XMatrixPage.clickSkipForNowButton();
});

And(/^I click on add new annual objective button$/, () => {
  XMatrixPage.clickAddNewAnnualObjectiveButton();
});

And(/^I click on connect strategic objective button "([^"]*)"$/, (strategicObjective) => {
  XMatrixPage.connectStrategicObjective(strategicObjective);
});

And(/^I click on edit icon on annual objective$/, () => {
  XMatrixPage.clickEditIconAnnualObjective();
});

And(/^I click on comment icon on annual objective$/, () => {
  XMatrixPage.clickCommentIconAnnualObjective();
});

And(/^I click on delete icon on annual objective$/, () => {
  XMatrixPage.clickDeleteIconAnnualObjective();
});

Then(/^I validate Delete button is disabled on selecting no connected quadrant$/, () => {
  XMatrixPage.validateDeleteButtonIsDisabled();
  XMatrixPage.clickDeleteCancelButton();
});

And(/^I click on connected quadrant checkbox$/, () => {
  XMatrixPage.clickConnectedQuadrantCheckbox();
});

Then(/^I validate strategic annual objective is not visible on graph "([^"]*)"$/, (title) => {
  XMatrixPage.validateStrategicAnnualObjectiveIsNotVisible(title);
});

And(/^I click on update annual objective button$/, () => {
  XMatrixPage.clickUpdateAnnualObjectiveButton();
});

And(/^I validate top level improvement screen$/, () => {
  XMatrixPage.validateTopLevelImprovementScreen();
});

And(/^I assign resource "([^"]*)" "([^"]*)"$/, (resourceName, resourceTitle) => {
  XMatrixPage.clickAssignResourceButton();
  XMatrixPage.selectResource(resourceName);
  XMatrixPage.selectResourceTitle(resourceTitle);
  XMatrixPage.clickSendButton();
});

And(/^I click on connect annual strategic objective button "([^"]*)"$/, (annualStrategicObjective) => {
  XMatrixPage.connectAnnualStrategicObjective(annualStrategicObjective);
});

And(/^I click on connect an improvement Priority button "([^"]*)"$/, (annualStrategicObjective) => {
  XMatrixPage.connectImprovementPriority(annualStrategicObjective);
});

And(/^I click on add new priority button$/, () => {
  XMatrixPage.clickAddNewPriorityButton();
});

And(/^I click on add new target button$/, () => {
  XMatrixPage.clickAddNewTargetButton();
});

Then(/^I click on save and exit top level improvement button$/, () => {
  XMatrixPage.clickSaveAndExitTopLevelImprovementButton();
});

Then(/^I click on save and exit targets button$/, () => {
  XMatrixPage.clickSaveAndExitTargetsButton();
});

Then(/^I validate top level improvement is visible on graph "([^"]*)"$/, (title) => {
  cy.reload();
  XMatrixPage.validateTopLevelImprovement(title);
});

Then(/^I validate target is visible on graph "([^"]*)"$/, (title) => {
  XMatrixPage.validateTarget(title);
});

And(/^I click on okay button$/, () => {
  XMatrixPage.clickOkayButton();
});

And(/^I click on add measures button$/, () => {
  cy.wait(1000);
  XMatrixPage.clickAddMeasuresButton();
});

And(/^I add measures$/, () => {
  cy.wait(1000);
  XMatrixPage.clickNextQuadrantButton();
  cy.wait(400);
  XMatrixPage.clickNextQuadrantButton();
  cy.wait(400);
  XMatrixPage.clickNextQuadrantButton();
  cy.wait(400);
  XMatrixPage.clickSkipForNowButton();
  cy.wait(400);
  XMatrixPage.clickNextQuadrantButton();
  cy.wait(400);
  XMatrixPage.clickAddMeasuresButton();
  XMatrixPage.addMeasures();
});

And(/^I click on edit icon on top level improvement "([^"]*)"$/, (title) => {
  cy.wait(1000);
  XMatrixPage.clickEditIconTopLevelImprovement(title);
});

And(/^I click on comment icon on top level improvement "([^"]*)"$/, (title) => {
  XMatrixPage.clickCommentIconTopLevelImprovement(title);
});

And(/^I click on delete icon on top level improvement "([^"]*)"$/, (title) => {
  XMatrixPage.clickDeleteIconTopLevelImprovement(title);
});

And(/^I click on update top level improvement button$/, () => {
  XMatrixPage.clickUpdateTopLevelImprovementButton();
});
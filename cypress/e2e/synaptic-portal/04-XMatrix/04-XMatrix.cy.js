/* eslint-disable max-len */
import {
  And, Then, When,
} from 'cypress-cucumber-preprocessor/steps';

import XMatrixPage from '../../../pages/synaptic-portal/graph/XMatrix';

before(() => {
  cy.loginWithSession("croubayinoulle-3277@yopmail.com", "Test@1234");
});

When(/^I navigate to the X-Matrix page$/, () => {
  XMatrixPage.navigateToXMatrixPageUsingURL();
});

And(/^I click on create X-Matrix button$/, () => {
  cy.wait(2000);
  XMatrixPage.clickOnCreateXMatrixButton();
});

And(/^I click on edit X-Matrix button$/, () => {
  cy.wait(2000);
  XMatrixPage.clickOnEditXMatrixButton();
});

Then(/^I click on update button$/, () => {
  userPage.clicOnUpdate();
});

When(/^I enter strategic objective details having following parameters "([^"]*)" "([^"]*)"$/, (title, description) => {
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
  XMatrixPage.validateStrategicObjective(title);
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

Then(/^I click on save and exit button$/, () => {
  XMatrixPage.clicOnSaveProgress();
});

And(/^I click on confirm delete button$/, () => {
  XMatrixPage.clickConfirmDeleteButton();
});

When(/^I click on edit user button "([^"]*)"$/, (email) => {
  userPage.clickEditUserButton(email);
  cy.wait(2000);
});

When(/^I perform Edit user having following parameters "([^"]*)"$/, (lastName) => {
  cy.log("Enter user last name")
  userPage.fillLastName(lastName);
});

Then(/^I validate data in table "([^"]*)"$/, (email) => {
  cy.log("Enter role name")
  userPage.validateDataInTable(email);

});

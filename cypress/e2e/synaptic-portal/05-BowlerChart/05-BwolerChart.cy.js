/* eslint-disable max-len */
import {
  And, Then, When,
} from 'cypress-cucumber-preprocessor/steps';

import BowlerPage from '../../../pages/synaptic-portal/graph/BowlerChart';
// before(() => {
//   cy.loginWithSession("croubayinoulle-3277@yopmail.com", "Test@1234");
// });

And(/^I navigate to the Bowler Chart Page$/, () => {
  BowlerPage.navigateToBowlerChartPageUsingURL();
});

And('I add a {string} under 1st measurement', (value) => {
  BowlerPage.addValueUnderFirstMeasurement(value);
});
And('I add a {string} under 1st measurement with dialog', (value) => {
  BowlerPage.addValueUnderFirstMeasurementWithDialog(value);
});
Then(/^A popup confirming the update appears$/, () => {
  BowlerPage.assertUpdatePopup();
});
Then('A popup confirming the update appears with user clicking on {string}', (button) => {
  BowlerPage.assertUpdatePopupWithButton(button);
});
Then('Entered {string} must be saved successfully', (value) => {
  BowlerPage.AssertEnteredValue(value);
});
Then('Entered {string} must not be saved', (value) => {
  BowlerPage.AssertEnteredValueNot(value);
});
And('I Upload a {string}', (value) => {
  BowlerPage.uploadFile(value);
});
Then('Imported {string} must be reflected on the chart', (value) => {
  BowlerPage.assertImportedValue(value);
});
And(/^I navigate to the X-Matrix page$/, () => {
  BowlerPage.navigateToXMatrixPageUsingURL();
});
And(/^the box turns green$/, () => {
  BowlerPage.boxturnsGreen();
});
And(/^I add a new Percentage target$/, () => {
  BowlerPage.findorAddNewTarget();
});
And(/^I get the top target from targets page$/, () => {
  BowlerPage.findTopTarget();
});
And(/^the target must be visible on Bowler chart page$/, () => {
  BowlerPage.assertTargetonBowlerPage();
});
When(/^I perform Create User having following parameters "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)"$/, (firstName, lastName, role, email, status) => {
  cy.log("Enter first name")
  userPage.fillFirstName(firstName);
  cy.log("Enter last name")
  userPage.fillLastName(lastName);
  cy.log("Select role status")
  userPage.selectRole(role);
  cy.log("Select role module")
  userPage.fillUserEmail(email);
  cy.log("Select status")
  userPage.selectStatus(status);
  cy.log("Click on submit button")
  userPage.clicOnCreate();
});

Then(/^I click on cancel button$/, () => {
  userPage.clicOnCancel();
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

/* eslint-disable max-len */
import {
  And, Then, When,
} from 'cypress-cucumber-preprocessor/steps';

import userPage from '../../../pages/synaptic-portal/user/create_new_user_page';
// before(() => {
//   cy.loginWithSession("croubayinoulle-3277@yopmail.com", "Test@1234");
// });

And(/^I navigate to the User Page$/, () => {
  userPage.navigateToAddUserPageUsingUrl();
});

And(/^I click on add new user button$/, () => {
  userPage.clickOnAddNewUserButton();
});

Then(/^I click on update button$/, () => {
  userPage.clicOnUpdate();
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

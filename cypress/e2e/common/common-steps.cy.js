import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PortalLoginPage from '../../pages/synaptic-portal/login/portal-login-page';
import CommonUtilities from '../../common/Util';
import PortalHomePage from '../../pages/synaptic-portal/home/portal-home-page';
import Util from 'lighthouse/lighthouse-core/util-commonjs';

Then(/^I should see the message "([^"]*)" on the Home page$/, (message) => {
  cy.debug('Verify message on the Home page');
  PortalHomePage.verify(message);
  if (Cypress.env('lighthouse') === true) {
    cy.debug('we are in lighhouse environment');
    cy.checkPerformance();
  }
});

Given(/^I am on the Synaptic login page$/, () => {
  cy.debug('Opening synaptic login page');
  PortalLoginPage.visit();
});

When(/^Provide "([^"]*)" and "([^"]*)" and login into system$/, (email, password) => {
  cy.debug("The portal is opening now");
  PortalLoginPage.login(email, password);
  cy.wait(2000);
  cy.debug("login successful");
  // cy.url().should('contains', '/home/');
  // cy.debug('Now we are in Homepage after successful login');
});

When(/^Provide "([^"]*)" and "([^"]*)" and login into system$/, (resellerId, password) => {
  cy.debug("The portal is opening now");
  PortalLoginPage.login(resellerId, password);
  cy.wait(4000);
  cy.debug("login successful");
  cy.url().should('contains', '/home/');
  cy.debug('Now we are in Homepage after successful login');
  cy.wait(4000);
});

Then(/^I am able to validate proper message "([^"]*)"$/, (message) => {
  cy.debug('Validate message');
  //cy.wait(2000);
  CommonUtilities.validateMessage(message);
});

When(/^Provide "([^"]*)" and "([^"]*)" and login into system with invalid data$/, (resellerId, password) => {
  cy.debug("The portal is opening now");
  PortalLoginPage.loginWithBlockedUser(resellerId, password);
  cy.debug("login unsuccessful");
});

Then(/^I logout$/, () => {
  // cy.debug('Now perform logout Operation');
  PortalHomePage.LogOut();
});

Then(/^I am able to validate proper message below field "([^"]*)"$/, (field) => {
  cy.debug('Validate message');
  CommonUtilities.validateFieldMessage(field);
});

Then(/^I am able to validate proper error message "([^"]*)"$/, (message) => {
  cy.debug('Validate message');
  CommonUtilities.validateMessage(message);
});

Then(/^I perform Hide all columns operation$/, () => {
  cy.debug('Hide all columns');
  CommonUtilities.hideColumns();
  cy.wait(1000);
});

Then(/^I perform Show all columns operation$/, () => {
  cy.debug('Show all columns');
  CommonUtilities.showColumns();
  cy.wait(1000);
});

Then(/^I validate columns should not be displayed in the table$/, () => {
  cy.debug('columns should not be displayed in the table');
  CommonUtilities.columnNotExists();
  cy.wait(1000);
});

Then(/^I validate columns should be displayed in the table$/, () => {
  cy.debug('columns should be displayed in the table');
  CommonUtilities.columnExists();
  cy.wait(1000);
});

When(/^I provide rows per page count "([^"]*)"$/, (rowsPerPageCount) => {
  cy.debug('provide rows per page count');
  CommonUtilities.selectRowsPerPageCount(rowsPerPageCount);
  cy.wait(800);
});

Then(/^I verify rows per page count inside table less than or equal to "([^"]*)"$/, (rowsCount) => {
  cy.debug('provide rows per page count');
  CommonUtilities.verifyTableRowsCount(rowsCount);
});

Then(/^I verify page title "([^"]*)"$/, (pageTitle) => {
  cy.debug(`I verify page title  ${pageTitle} to be loaded`);
  cy.wait(2000);
  CommonUtilities.verifyPageTitle(pageTitle);
});

When(/^Provide "([^"]*)" and "([^"]*)" and login into system with MSISDN$/, (resellerId, password) => {
  cy.debug("The portal is opening now");
  PortalLoginPage.loginWithMSISDN(resellerId, password);
  cy.debug("login successful");
  cy.url().should('contains', '/home/');
  cy.debug('Now we are in Homepage after successful login');
});

When(/^Provide "([^"]*)" and "([^"]*)" and login into system with invalid MSISDN data$/, (resellerId, password) => {
  cy.debug("The portal is opening now");
  PortalLoginPage.loginWithInvalidMSISDN(resellerId, password);
  cy.debug("login successful");
});

And(/^I disable & enable the individual table column "([^"]*)" view and verify accordingly$/, (tableColumnName) => {
  cy.wait(800);
  cy.debug(`I disable the table column view ${tableColumnName}`);
  CommonUtilities.individualColumnDisable(tableColumnName);
  cy.wait(800);
  cy.debug(`verify table column "${tableColumnName}" disabled`);
  CommonUtilities.verifyIndividualColumnDisabled(tableColumnName);
  cy.wait(800);
  cy.debug(`I enable the table column view ${tableColumnName}`);
  CommonUtilities.individualColumnEnable(tableColumnName);
  cy.wait(800);
  cy.debug(`verify table column "${tableColumnName}" enabled`);
  CommonUtilities.verifyIndividualColumnEnabled(tableColumnName);
});

When(/^Provide "([^"]*)" and "([^"]*)" and login into system with invalid user$/, (email, password) => {
  cy.debug("The portal is opening now");
  PortalLoginPage.login(email, password);
  cy.debug("login unsuccessful");
});

When(/^Provide "([^"]*)" and "([^"]*)" and login into system with invalid password$/, (email, password) => {
  cy.debug("The portal is opening now");
  PortalLoginPage.login(email, password);
  cy.debug("login unsuccessful");
});

When(/^Provide "([^"]*)" and login into system with blank userId$/, (email) => {
  cy.debug("The portal is opening now");
  PortalLoginPage.loginWithBlankCredentials(email);
  cy.debug("login unsuccessful");
});

Then(/^I am able to validate error message below the field "([^"]*)" "([^"]*)"$/, (message, field) => {
  cy.debug('Validate message');
  CommonUtilities.validateErrorMessage(message, field);
});

When(/^I filter "([^"]*)" using filter operator as "([^"]*)" for "([^"]*)"$/, (filterColumns, filterOperators, filterValue) => {
  cy.debug("Apply filter");
  CommonUtilities.applyFilter(filterColumns, filterOperators, filterValue);
});

Then(/^I verify if the data-field "([^"]*)" with data-value "([^"]*)" exists$/, (field, value) => {
  CommonUtilities.verifyDataFieldWithDataValue(field, value);
});

Then(/^I click on filters$/, () => {
  CommonUtilities.clickOnFilters();
});

And(/^I select filter column "([^"]*)"$/, (column) => {
  CommonUtilities.selectFilterColumn(column);
});

And(/^I select filter option "([^"]*)"$/, (option) => {
  CommonUtilities.selectFilterOption(option);
});

And(/^I enter filter value "([^"]*)"$/, (value) => {
  CommonUtilities.typeFilterValue(value);
  cy.wait(1000);
});

When(/^I enter userID "([^"]*)"$/, (userId) => {
  PortalHomePage.enterUsername(userId);
  PortalHomePage.clickNext();
});

When(/^I enter password "([^"]*)"$/, (password) => {
  PortalHomePage.enterPassword(password);
});

When(/^I click on Login button$/, () => {
  PortalHomePage.clickLoginButton();
});

Then(/^I validate Login button is disabled$/, () => {
  PortalHomePage.validateLoginButton();
});

When(/^Session is enabled for user "([^"]*)" and password "([^"]*)"$/, (username, password) => {
  cy.loginWithSession(username, password);
  cy.visit('/');
});

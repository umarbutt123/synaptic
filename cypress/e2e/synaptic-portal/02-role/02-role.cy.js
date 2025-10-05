/* eslint-disable max-len */
import {
  And, Then, When,
} from 'cypress-cucumber-preprocessor/steps';

import CommonUtilities from '../../../common/Util';
import rolePage from '../../../pages/synaptic-portal/role/create_new_role_page';
// before(() => {
//   cy.loginWithSession("croubayinoulle-3277@yopmail.com", "Test@1234");
// });

And(/^I navigate to the Role Page$/, () => {
  rolePage.navigateToAddRolePageUsingUrl();
  cy.wait(3000);
  // rolePage.navigateToAddRolePageUsingUrl();
});

And(/^I click on add new role button$/, () => {
  rolePage.clickOnAddNewRoleButton();
  cy.wait(2000);
});

When(/^I perform Create Role having following parameters "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)"$/, (roleName, roleDescription, status, roleModule, screen, feature, permission) => {
  cy.log("Enter role name")
  rolePage.fillRoleName(roleName);
  cy.log("Enter role description")
  rolePage.fillRoleDescription(roleDescription);
  cy.log("Select role status")
  rolePage.selectRoleStatus(status);
  cy.log("Select role module")
  rolePage.selectModule(roleModule);
  cy.log("Select role screen")
  rolePage.selectScreen(screen);
  cy.log("Select role feature")
  rolePage.selectFeature(feature);
  cy.log("Select role permission")
  rolePage.selectPermission(permission);
  rolePage.clicOnSubmit();
});

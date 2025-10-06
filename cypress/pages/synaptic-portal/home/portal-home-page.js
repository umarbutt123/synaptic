const USER_NAME_FIELD = "//span[@class='company-name']";
const LOGOUT_FIELD = "//a[@ptooltip='Logout']";
const USERNAME = "(//input[@id= 'userId'])[1]";
const PASSWORD = "//*[@id='password']";
// const LOGIN_BUTTON = "//*[@id='login-form-submit-button']/span[1]";
const LOGIN_BUTTON = "//button[@label='Log In']"
const HAVING_TROUBLE_SIGNING_IN = "//a[@href='/login/recovery']";
const RECOVERY_HEADER = "//h1[text() = 'Recover your account']";
const FORGOT_PASSWORD = "//p[text() = 'Forgot Password ?']";
const USER_ID = "//label[text() = 'User Id']";
const APPLICATION_LANGUAGE_LABEL = "//*[@id='select-language-label']";
const APPLICATION_LANGUAGE_VALUE = "//*[@id='select-language']";
const MSISDN_LOGIN = "//button/span[text()='MSISDN Login']";
// const LOGOUT = "//button/span[text()='Logout']";
const RECOVERY_LINK = "//a[@href='/login/recovery']";
const NEXT_BUTTON = "//span[text() = 'Next']";
const VIA_SMS_BUTTON = "//span[text() = 'Via SMS']";
const VERIFY_OTP = "//span[text() = 'Verify OTP']";
const OTP_0 = "//input[@id='otp-input-box-0']";
const OTP_1 = "//input[@id='otp-input-box-1']";
const OTP_2 = "//input[@id='otp-input-box-2']";
const OTP_3 = "//input[@id='otp-input-box-3']";
const OTP_4 = "//input[@id='otp-input-box-4']";
const OTP_5 = "//input[@id='otp-input-box-5']";
const MSISDN_OPTION = "(//span[@class='MuiToggleButton-label'])[2]";
const PRODUCT_MENU = "//div/p[text()='PRODUCT']";
const ELEMENT_TIMEOUT = 30000;

class PortalHomePage {
  static verify(username) {
    cy.wait(2000);
    cy.xpath(USER_NAME_FIELD).contains(username); // 2 seconds
  }

  static LogOut() {
    cy.logout(LOGOUT_FIELD);
  }

  static clickChangePassword() {
    cy.log('Click on change password option');
    cy.xpath(CLICK_USERNAME).click();
    cy.xpath(CLICK_CHANGE_PASSWORD).should('be.visible').click();
  }

  static enterChangePasswordDetails(password, newPassword, confirmPassword) {
    cy.log('Adding password details to perform change password operation');
    if (password !== "") {
      cy.xpath(ENTER_OLD_PASSWORD).type(password);
    }
    if (newPassword !== "") {
      cy.xpath(ENTER_NEW_PASSWORD).type(newPassword);
    }

    if (confirmPassword !== "") {
      cy.xpath(ENTER_CONFIRM_PASSWORD).type(confirmPassword);
    }
    cy.xpath(CLICK_UPDATE_BUTTON).click();
    cy.wait(1000);
  }

  static enterUsername(username) {
    cy.log('enter username');
    cy.wait(1000);
    cy.xpath(USERNAME).type(username);
    cy.wait(1000);
  }

  static enterPassword(password) {
    cy.log('enter password');
    cy.wait(1000);
    cy.xpath(PASSWORD).type(password);
    cy.wait(1000);
  }

  static clickOnHavingTroubleSigningIn() {
    cy.log('click on "having trouble signing in"');
    cy.xpath(HAVING_TROUBLE_SIGNING_IN).click();
  }

  static verifyRecoveryPage() {
    cy.log('verify recovery page');
    cy.url().should('contains', 'recovery');
    cy.xpath(RECOVERY_HEADER).should('be.visible');
  }

  static clickOnForgotPassword() {
    cy.log('click on forgot password');
    cy.wait(1000);
    cy.xpath(FORGOT_PASSWORD).click();
    cy.wait(1000);
  }

  static verifyUserIdLabel() {
    cy.log('verify user id label on clicking forgot possword');
    cy.xpath(USER_ID).should('be.visible');
  }

  static verifyApplicationLanguageLabel(languageLabel) {
    cy.log('verify application language label on verifying user');
    cy.xpath(APPLICATION_LANGUAGE_LABEL).contains(languageLabel);
  }

  static verifyApplicationLanguageValue(languageValue) {
    cy.log('verify application language value on verifying user');
    cy.xpath(APPLICATION_LANGUAGE_VALUE).contains(languageValue);
  }

  static clickMSISDNLogin() {
    cy.log('click on MSISDN login');
    cy.xpath(MSISDN_LOGIN).click();
    cy.wait(1000);
  }

  static clickHavingTrouble() {
    cy.log('click having trouble option');
    cy.wait(1000);
    cy.xpath(RECOVERY_LINK).click();
    cy.wait(1000);
  }

  static clickNext() {
    cy.log('click on next');
    cy.xpath(NEXT_BUTTON).click();
    cy.wait(1000);
  }

  static clickLoginButton() {
    cy.log('click on login button');
    cy.xpath(LOGIN_BUTTON).click();
    cy.wait(1000);
  }

  static validateLoginButton() {
    cy.log('click on login button');
    cy.xpath(LOGIN_BUTTON).should('be.disabled');
    cy.wait(1000);
  }


  static clickSMSOption() {
    cy.log('click on sms option');
    cy.wait(1000);
    cy.intercept("POST", "generateOTP").as("generateOTP");
    cy.xpath(VIA_SMS_BUTTON).click();
    cy.wait("@generateOTP");
    // cy.wait(1000);
  }

  static enterOTP() {
    cy.log('enter OTP 000000');
    cy.wait(2000);
    cy.xpath(OTP_0, { timeout: ELEMENT_TIMEOUT }).type('0');
    cy.log(900);
    cy.xpath(OTP_1, { timeout: ELEMENT_TIMEOUT }).type('0');
    cy.log(900);
    cy.xpath(OTP_2, { timeout: ELEMENT_TIMEOUT }).type('0');
    cy.log(900);
    cy.xpath(OTP_3, { timeout: ELEMENT_TIMEOUT }).type('0');
    cy.log(900);
    cy.xpath(OTP_4).type('0');
    cy.log(900);
    cy.xpath(OTP_5, { timeout: ELEMENT_TIMEOUT }).type('0');
    cy.wait(1000);
  }

  static verifyOTP() {
    cy.log('verify otp');
    cy.wait(1000);
    cy.xpath(VERIFY_OTP).click();
    cy.wait(1000);
  }

  static clickMSISDNOption() {
    cy.log('click msisdn option');
    cy.xpath(MSISDN_OPTION).click({ force: true });
    cy.log(1000);
  }

  static providePasswordType(passwordType, password) {
    cy.log(`provide particular ${passwordType}`);
    cy.xpath(`//label[contains(text(),'${passwordType}')]/..//input`).clear().type(password);
  }

  static clickOnViewIcon(passwordType) {
    cy.log(`click on ${passwordType}`);
    cy.xpath(`//label[contains(text(),'${passwordType}')]/../..//*[local-name()='svg']`).click();
  }

  static verifyPasswordFormatText(passwordType) {
    cy.log(`verify password format `);
    cy.xpath(`//label[contains(text(),'${passwordType}')]/..//input`).should('have.attr', 'type', 'text');
  }

  static verifyPasswordFormatDot(passwordType) {
    cy.log(`verify password format `);
    cy.xpath(`//label[contains(text(),'${passwordType}')]/..//input`).should('have.attr', 'type', 'password');
  }

  static productShouldNotVisible() {
    cy.log(`product menu should not be visible `);
    cy.xpath(PRODUCT_MENU).should('not.exist');
  }

  static validateChangePasswordScreen() {
    cy.log('validate change password screen');
    cy.xpath(ENTER_OLD_PASSWORD).should('be.visible');
    cy.xpath(ENTER_NEW_PASSWORD).should('be.visible');
    cy.xpath(ENTER_CONFIRM_PASSWORD).should('be.visible');
  }

}

export default PortalHomePage;

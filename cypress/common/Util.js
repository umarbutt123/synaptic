// const MESSAGE_ALERT = '//div[@id="notistack-snackbar"]';
// const MESSAGE_ALERT = "//div[contains(text(),'Invalid Credentials')]"
const FILTER = "//span[@class='MuiButton-label' and contains(text(),'Filters')]";
const COLUMN_SELECT = "//select[@id='columns-filter-select']";
const OPERATOR_SELECT = "//select[@id='columns-operators-select']";
const FILTER_VALUE = "//select[@id='columns-operators-select']/ancestor::div[@class='MuiDataGridFilterForm-root']/descendant::input";
const CLOSE_ALERTMESSAGE = "//div[@id='notistack-snackbar']/..//button/span/span[text()='close']";
const TABLE_ROWS = ".rendering-zone > div";
const DOWNLOAD_PATH = 'cypress/downloads/';
const CLICK_COLUMNS = "//button/span[contains(text(),'Columns')]";
const CLICK_HIDE_ALL = "//span[contains(text(),'Hide all')]";
const CLICK_SHOW_ALL = "//button/span[contains(text(),'Show all')]";
// const COLUMN_EXISTS = "(//div[@class='MuiDataGrid-colCellTitle'])[3]";
const COLUMN_EXISTS = "(//div[@class='MuiDataGrid-colCellTitleContainer'])[3]";
const SCROLLABLE_AREA = "div.MuiDataGrid-window";
const CLICK_ON_ROWS_PER_PAGE = "//div[contains(@class,'MuiSelect-select')]";
const TABLE_LAST_ROW = "(//div[@data-rowindex and @aria-rowindex])[last()]";
const PAGE_TITLE = "//h4";

class CommonUtilities {
  //    validate and close alert pop-up

  //    apply filter for table

  static applyFilter(field, operation, value) {
    cy.debug('apply Filter search');
    cy.wait(1000);
    cy.debug('Click on filter logo');
    cy.xpath(FILTER).should('be.visible').click();
    cy.wait(1000);
    cy.debug('Select the column value');
    cy.xpath(COLUMN_SELECT).should('be.visible').select(field);
    cy.wait(1000);
    cy.debug('Select the Operator');
    cy.xpath(OPERATOR_SELECT).should('be.visible').select(operation);
    cy.wait(1000);
    cy.debug('Click on filter value');
    cy.xpath(FILTER_VALUE).should('be.visible').clear().type(value);
    cy.wait(2000);
  }

  //    verify table record length

  static verifyFetchedRecordLength(length) {
    cy.debug('verify Fetched Record Length');
    cy.get(TABLE_ROWS).should('have.length', parseInt(length, 10));
  }

  //    verify table record length Less than or Equal to

  static verifyFetchedRecordLengthLessOrEq(length) {
    cy.debug('Validating records per page');
    cy.get(TABLE_ROWS).should('have.length.at.most', parseInt(length, 10));
    cy.wait(1000);
  }

  //    verify table record length Greater than or Equal to

  static verifyFetchedRecordLengthGreaterOrEq(length) {
    cy.debug('Validating records per page');
    cy.get(TABLE_ROWS).should('have.length.at.least', parseInt(length, 10));
  }

  //    close alert pop-up

  static closeAlertMessage() {
    cy.log("Closing alert message ");
    cy.wait(500);
    cy.xpath(CLOSE_ALERTMESSAGE).click({ multiple: true });
    cy.log("It is done");
  }

  //    sort table column data

  static SortBy(sortField, sortType) {
    cy.log(`click on sort option of ${sortField}`);
    cy.xpath(`//div[contains(text(),'${sortField}')]/parent::div/following-sibling::div//span[text()='more_vert']`).click({ force: true });
    cy.wait(1000);
    cy.log(`select sort option of ${sortType}`);
    cy.xpath(`//ul//li[text()='${sortType}']`).should('be.visible').click();
    cy.wait(1000);
  }

  //    read downloaded file name

  static readFileName(fileName) {
    cy.log(`read file name`);
    cy.readFile(`${DOWNLOAD_PATH}${fileName}`, { timeout: 60000 });
  }

  //    get text value of HTML tag

  static getTextValue(xpath) {
    cy.xpath(xpath).then((getText) => {
      const value = getText.text();
      cy.task('setValue', value);
    });
  }

  //    set text value of HTML tag

  static setTextValue(xpath) {
    cy.task('getValue').then((value) => {
      cy.xpath(xpath).type(value);
    });
  }

  //    get expected text value

  static getExpectedTextValue(xpath) {
    cy.xpath(xpath).then((expectedValue) => {
      cy.task('setValue', expectedValue.text());
    });
  }

  //    verify actual text value

  static verifyActualTextValue(xpath) {
    cy.task('getValue').then((actualValue) => {
      cy.log(actualValue);
      cy.xpath(xpath).should('include.text', actualValue);
    });
  }

  // eslint-disable-next-line max-len
  //    verify table list unique parameters (as VALUE) by passing table header row parameter (as KEY)

  static validateTableListParameters(columnName, columnData) {
    cy.log('validate list values inside table ');
    cy.xpath(`//div[@class='MuiDataGrid-colCellTitleContainer']/ancestor::div[@class='MuiDataGrid-main']/descendant::div[text()='${columnData}']`).then(($elements) => {
      //css structure is changed this is currenty not working
      // cy.xpath(`//div[@class='MuiDataGrid-colCellTitleContainer' and text()='${columnName}']/ancestor::div[@class='MuiDataGrid-main']/descendant::div[text()='${columnData}']`).then(($elements) => {
      const listOfElements = $elements.length;
      cy.log(listOfElements);
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i <= listOfElements; i++) {
        cy.xpath(`(//div[@class='MuiDataGrid-colCellTitleContainer']/ancestor::div[@class='MuiDataGrid-main']/descendant::div[text()='${columnData}'])[${i}]`).should('include.text', columnData);
        //css structure is changed this is currenty not working
        // cy.xpath(`(//div[@class='MuiDataGrid-colCellTitleContainer' and text()='${columnName}']/ancestor::div[@class='MuiDataGrid-main']/descendant::div[text()='${columnData}'])[${i}]`).should('include.text', columnData);
      }
    });
  }

  //    table view scroll to right

  static scrollToRight() {
    cy.log('Scroll to right');
    cy.get(SCROLLABLE_AREA).scrollTo('right');
    cy.wait(800);
  }

  //    table view scroll to left

  static scrollToLeft() {
    cy.log('Scroll to right');
    cy.get(SCROLLABLE_AREA).scrollTo('left');
    cy.wait(800);
  }

  // verify input field alert message


  // static validateFieldMessage(message, field) {
  //   cy.log('validating field message');
  //   cy.xpath(`//label[text()="${field}"]//..//p`).then((alert) => {

  //     const text = alert.text();
  //     cy.debug(text);
  //     expect(text).to.contains(message);
  //   });
  // }

  static validateFieldMessage(field) {
    cy.log('validating field message');
    cy.xpath(`//small[text()='${field} is required']`).should('be.visible');
  }


  static validateMessage(message) {
    cy.log('validating field message');
    cy.contains(message).should('be.visible');
  }

  // hide all columns

  static hideColumns() {
    cy.wait(500);
    cy.log('click columns');
    cy.xpath(CLICK_COLUMNS).click({ force: true });
    cy.wait(900);
    cy.log('click hide all');
    cy.xpath(CLICK_HIDE_ALL).click({ force: true });
  }

  // un-hide all columns

  static showColumns() {
    cy.reload();
    cy.wait(500);
    cy.log('click columns');
    cy.xpath(CLICK_COLUMNS).click({ force: true });
    cy.wait(900);
    cy.log('click hide all');
    cy.xpath(CLICK_SHOW_ALL).click({ force: true });
  }

  // validate all columns are not visible

  static columnNotExists() {
    cy.xpath(COLUMN_EXISTS, { timeout: 2000 }).should('not.exist');
  }

  // validate all columns are visible

  static columnExists() {
    cy.xpath(COLUMN_EXISTS, { timeout: 2000 }).should('be.visible');
  }

  // enable individual column view

  static individualColumnEnable(tableColumnName) {
    cy.xpath(`//span[text()='${tableColumnName}']/preceding-sibling::span//input[@type='checkbox']`, { timeout: 2000 }).check();
  }

  // disable individual column view

  static individualColumnDisable(tableColumnName) {
    cy.log(`disable table column "${tableColumnName}"`);
    cy.xpath(`//span[text()='${tableColumnName}']/preceding-sibling::span//input[@type='checkbox']`).uncheck();
  }

  // verify individual column view enabled

  static verifyIndividualColumnEnabled(tableColumnName) {
    cy.log(`verify table column "${tableColumnName}" enabled`);
    cy.xpath(`//div[@class='MuiDataGrid-columnsContainer']//div[text()='${tableColumnName}']`).should('be.visible');
  }

  // verify individual column view disabled

  static verifyIndividualColumnDisabled(tableColumnName) {
    cy.log(`verify table column "${tableColumnName}" disabled`);
    cy.xpath(`//div[@class='MuiDataGrid-columnsContainer']//div[text()='${tableColumnName}']`).should('not.exist');
  }

  //    select rows per page display for any table

  static selectRowsPerPageCount(rowsPerPageCount) {
    cy.log(`selected rows per page count is ${rowsPerPageCount}`);
    cy.xpath(CLICK_ON_ROWS_PER_PAGE).click();
    cy.wait(1000);
    cy.xpath(`//li[text()='${rowsPerPageCount}']`).click();
  }

  //    verify maximum rows fetched inside table

  static verifyTableRowsCount(rowCount) {
    cy.log('verify maximum rows fetched inside table');
    cy.xpath(TABLE_LAST_ROW).invoke('attr', 'data-rowindex').then((value) => {
      expect(parseInt(value, 10)).to.be.lessThan(parseInt(rowCount, 10));
    });
    cy.wait(1000);
  }

  //    verify page title

  static verifyPageTitle(pageTitle) {
    cy.log(`verify page title as ${pageTitle}`);
    cy.xpath(PAGE_TITLE).should('include.text', pageTitle);
  }

  static validateErrorMessage(message, field) {
    cy.log('validating field message');
    // cy.xpath(`//input[@id="${field}"]//..//..//..//p | //input[@name="${field}"]//..//..//..//p | //textarea[@name="${field}"]//..//..//..//p  | //select[@name="${field}"]//..//..//..//p`).then((alert) => {
    //   const text = alert.text();
    //   cy.debug(text);
    //   expect(text).to.contains(message);
    // });
    cy.contains(message)
      .should('be.visible');
  }

  static verifyDataFieldWithDataValue(field, value) {
    cy.debug('Verifying data field with data value exists');
    cy.xpath(`//div[@data-field='${field}' and @data-value='${value}']`).should('exist');
  }

  static clickOnFilters() {
    cy.debug('Clicking on FILTER');
    cy.xpath(FILTER).click();
  }

  static selectFilterColumn(column) {
    cy.debug('Selecting column ', column);
    cy.xpath(COLUMN_SELECT).should('be.visible').select(column);
    cy.wait(300);
  }

  static selectFilterOption(operator) {
    cy.debug('Selecting operator ', operator);
    cy.xpath(OPERATOR_SELECT).should('be.visible').select(operator);
  }

  static typeFilterValue(value) {
    cy.debug('Typing in the value ', value);
    cy.xpath(FILTER_VALUE).should('be.visible').clear().type(value);
  }
}

export default CommonUtilities;

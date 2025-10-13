
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  "chromeWebSecurity": false,
  "requestTimeout": 150000,
  "responseTimeout": 150000,
  "pageLoadTimeout": 150000,
  "video": false,
  "viewportWidth": 1366,
  "viewportHeight": 768,
  "defaultCommandTimeout": 9000,
  "screenshotsFolder": "cypress/reports/mochareports/assets",
  "screenshotOnRunFailure": true,
  "reporter": "cypress-multi-reporters",
  "watchForFileChanges": false,
  "retries": {
    // Configure retry attempts for `cypress run`
    // Default is 0
    "runMode": 1,
    // Configure retry attempts for `cypress open`
    // Default is 0
    "openMode": 0
  },
  "reporterOptions": {
    "reporterEnabled": "mochawesome",
    "mochawesomeReporterOptions": {
      "reportDir": "cypress/reports/mocha",
      "quite": true,
      "overwrite": false,
      "html": true,
      "json": true
    }
  },
  "numTestsKeptInMemory": 0,
  "experimentalMemoryManagement": true,
  "env": {
    "lighthouse": false,
    "accessibility": 50,
    "performance": 5,
    "seo": 10,
    "TAGS": "@user"
  },
  "e2e": {
    "specPattern": "**/*.feature",
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    "baseUrl": "https://app-synaptic-flow-centraus-dev-gbbthuceaqbrdgf8.centralus-01.azurewebsites.net/login",
    "excludeSpecPattern": ["*.js", "*.md"],
    "experimentalSessionAndOrigin": true
  }
});

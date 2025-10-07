/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
const cucumber = require('cypress-cucumber-preprocessor').default;
const { lighthouse, prepareAudit, pa11y } = require('cypress-audit');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
// import allureWriter from "@shelex/cypress-allure-plugin/writer";
const fs = require('fs');
const { rm } = fs;
const ReportGenerator = require('lighthouse/report/generator/report-generator');
const mysql = require("mysql");
let value = [];


function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db);
  // start connection to db
  connection.connect();
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        // console.log(results)
        return resolve(results);
      }
    });
  });
};

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
module.exports = (on, config) => {
  // config.env.db = {
  //   host : process.env.hostname,
  //   user : 'refill',
  //   password : 'refill'
  // }
  // modify env var value
  // config.env.db.host = config.env.host;

  on('file:preprocessor', cucumber());
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // It run lighthouse inside the same browser as Cypress rather than opening a new one
  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);

    if (browser.name === 'chrome' || browser.name === 'chromium' || browser.name === 'canary') {
      const cacheDir = '/tmp/chrome-cache';

      // Ensure the cache directory exists
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }
      // Enable cache
      launchOptions.args.push(`--disk-cache-dir=${cacheDir}`);
      launchOptions.args.push('--disk-cache-size=104857600'); // Cache size 100MB

      // Clear cache on browser launch
      if (fs.existsSync(cacheDir)) {
        fs.rmSync(cacheDir, { recursive: true, force: true });
      }
      return launchOptions;
    }
  });

  on('task', {
    lighthouse: lighthouse((lighthouseReport) => {
      const date = new Date();
      const name = lighthouseReport.lhr.requestedUrl.replace(
        /[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g,
        (x) => "",
      );
      fs.writeFileSync(`./performance_reports/${name}_${date.toJSON()}.html`,
        ReportGenerator.generateReport(lighthouseReport.lhr, 'html'));
    }),
    pa11y: pa11y(),
  });

  // Usage: cy.task('queryDb', query)
  on("task", {
    queryDb: query => {
      return queryTestDb(query, config);
    }
  });

  // deleting files from 'cypress/downloads'
  on('task', {
    deleteFile(fileName) {
      console.log(`deleting file "${fileName}"`)
      return new Promise((resolve) => {
        rm(`cypress/downloads/${fileName}`, { recursive: true }, () => {
          resolve(null)
        })
      })
    },
  });

  // deleting files from 'cypress/downloads'
  on('task', {
    deleteZipFile(fileName) {
      console.log(`deleting file "${fileName}"`)
      return new Promise((resolve) => {
        rm(`cypress/downloads/`, { recursive: true }, () => {
          resolve(null)
        })
      })
    },
  });

  // getter and setter for variable
  on('task', {
    setValue: (val) => {
      return (value.push(val));
    },

    getValue: () => {
      return value.shift();
    }
  });

  return config;
};


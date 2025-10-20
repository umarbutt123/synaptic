const datefns = require('date-fns');
const report = require('multiple-cucumber-html-reporter-ignore-skipped-pending-tests');
const fs = require('fs');
const os = require('os');

function getBrowserDetails() {
  const stringifyData = JSON.stringify(fs.readFileSync('./browserDetails.json', 'utf-8'));
  const parseData = JSON.parse(JSON.parse(stringifyData));
  console.log(typeof parseData);
  return parseData;
}

function getOSDetails() {
  const nodePlatformName = os.platform();
  let reportPlatformName = "";
  if (nodePlatformName === 'darwin') {
    reportPlatformName = "osx";
  } else if (nodePlatformName === 'win32') {
    reportPlatformName = "windows";
  } else {
    reportPlatformName = nodePlatformName;
  }
  return reportPlatformName;
}

const browserDetails = getBrowserDetails();
const platformName = getOSDetails();

report.generate({
  jsonDir: './cypress/reports/cucumber-json',
  ignoreSkipTest: true,
  reportPath: './cypress/reports/cucumber/',
  pageTitle: 'UI Automation Test Report',
  reportName: 'Synaptic Regression Run',
  pageFooter: '<div><p>Synaptic</p></div>',
  displayDuration: true,
  displayReportTime: true,
  metadata: {
    browser: {
      name: browserDetails.name,
      version: browserDetails.version,
    },
    platform: {
      name: platformName,
      version: os.release(),
    },
    device: "Virtual Machine",
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'Synaptic UI Automation' },
      { label: 'UI App Version', value: 'v0.3.414' },
      { label: 'Report Date', value: datefns.format(new Date(), "yyyy-MM-dd HH:mm:ss") },
    ],
  },
});

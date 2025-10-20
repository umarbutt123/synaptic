const fs = require('fs');
const path = require('path');

// Directory containing cucumber-json files
const cucumberJsonDirectory = './cypress/reports/cucumber-json';

// Function to embed screenshot into cucumber-json
const embedScreenshotToStep = (step, screenshotPath) => {
  if (step && screenshotPath) {
    const screenshotData = fs.readFileSync(screenshotPath, { encoding: 'base64' });
    if (step.embeddings && step.embeddings.length > 0) {
      // Check if there's already an embedding with mime_type 'image/png'
      const pngEmbeddingIndex = step.embeddings.findIndex(embedding => embedding.mime_type === 'image/png');
      if (pngEmbeddingIndex !== -1) {
        // Add screenshotData before the existing 'image/png' embedding
        step.embeddings.splice(pngEmbeddingIndex, 1, { data: screenshotData, mime_type: 'image/png' });
      } else {
        // If 'image/png' embedding doesn't exist, simply add a new one
        step.embeddings.push({ data: screenshotData, mime_type: 'image/png' });
      }
    } else {
      // If there are no embeddings, create a new array with the screenshotData embedding
      step.embeddings = [{ data: screenshotData, mime_type: 'image/png' }];
    }
  }
};


// Loop through all cucumber-json files in the directory
fs.readdirSync(cucumberJsonDirectory).forEach(file => {
  if (file.endsWith('.json')) {
    const cucumberJsonFilePath = path.resolve(cucumberJsonDirectory, file);
    const cucumberJsonData = require(cucumberJsonFilePath);

    // Loop through features and scenarios to embed screenshots
    cucumberJsonData.forEach(feature => {
      feature.elements.forEach(scenario => {
        if (scenario.steps) {
          scenario.steps.forEach(step => {
            if (step.result && step.result.status === 'failed') {
              const exampleNumber = findExampleNumber(`cypress/e2e/synaptic-portal/${feature.uri}`, `${scenario.name}`, `$${scenario.line}`);
              const scenarioNameWithoutColon = `${scenario.name}`.replace(/:/g, '');
              const screenshotPathPattern = `cypress/reports/mochareports/assets/${feature.uri}/${feature.name} -- ${scenarioNameWithoutColon} ${exampleNumber} (failed).png`;
              const screenshotPath = path.resolve(__dirname, screenshotPathPattern);
              console.log(screenshotPathPattern);
              if (fs.existsSync(screenshotPath)) {
                embedScreenshotToStep(step, screenshotPath);
              }
            }
          });
        }
      });
    });

    // Write back to the cucumber-json file
    fs.writeFileSync(cucumberJsonFilePath, JSON.stringify(cucumberJsonData, null, 2));
  }
});

function findExampleNumber(featureFileName, scenarioOutlineName, lineNumber) {
  // Read the feature file
  const fileContent = fs.readFileSync(featureFileName, 'utf8');

  // Split the content by lines
  const lines = fileContent.split('\n');

  let scenarioFound = false;
  let exampleCount = 0;

  // Iterate through the lines
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check if the line matches the scenario outline
    if (line.startsWith('Scenario Outline:') && line.includes(scenarioOutlineName)) {
      scenarioFound = true;
    } else if (scenarioFound && line.startsWith('Examples:')) {
      // If the scenario outline is found, look for Examples section
      let j = i + 1;
      while (j < lines.length) {
        const exampleLine = lines[j].trim();
        if (exampleLine.startsWith('|')) {
          exampleCount++;
        } else {
          // If we encounter a line that doesn't start with '|', we exit the loop
          break;
        }
        j++;
      }
      break; // Exit loop after finding Examples section
    }
  }

  // Calculate the example number based on the provided line number
  const exampleNumber = exampleCount - 1;

  return `(example #${exampleNumber})`;
}

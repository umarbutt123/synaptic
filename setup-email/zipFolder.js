const fs = require('fs-extra');
const archiver = require('archiver');
const path = require('path');

/**
 * Zips a folder and saves it to the specified output path
 * @param {string} folderPath - Path to the folder to zip
 * @param {string} outputPath - Output path for the zip file (optional)
 * @returns {Promise<string>} Path to the created zip file
 */
async function zipFolder(folderPath, outputPath = null) {
    return new Promise((resolve, reject) => {
        try {
            // Validate input
            if (!folderPath) {
                throw new Error('Folder path is required');
            }

            // Resolve absolute paths
            const absoluteFolderPath = path.resolve(folderPath);

            // Check if folder exists
            if (!fs.existsSync(absoluteFolderPath)) {
                throw new Error(`Folder does not exist: ${absoluteFolderPath}`);
            }

            // Check if it's a directory
            const stats = fs.statSync(absoluteFolderPath);
            if (!stats.isDirectory()) {
                throw new Error(`Path is not a directory: ${absoluteFolderPath}`);
            }

            // Set default output path if not provided
            // const timestamp = Date.now();
            // const timestamp = new Date().toISOString();
            // console.log('timestamp', timestamp);


            // const zipFileName = `${timestamp} - reports.zip`;
            const zipFileName = `reports.zip`;

            console.log('zipFileName', zipFileName);


            const absoluteOutputPath = path.resolve(zipFileName);
            // const renamedFile = absoluteOutputPath.replace(/\.zip$/, ".zipx");


            // Create write stream
            const output = fs.createWriteStream(absoluteOutputPath);

            // Create archiver
            const archive = archiver('zip', {
                zlib: { level: 9 } // Maximum compression
            });

            // Handle archive events
            archive.on('error', (err) => {
                console.error('Error creating archive:', err);
                reject(err);
            });

            output.on('error', (err) => {
                console.error('Error writing output file:', err);
                reject(err);
            });

            output.on('close', () => {
                console.log(`✅ Zip file created successfully!`);
                resolve(absoluteOutputPath);
            });

            // Pipe archive to output stream
            archive.pipe(output);

            // Add folder to archive
            console.log(`📦 Compressing folder: ${path.basename(absoluteFolderPath)} `);
            archive.directory(absoluteFolderPath, false);

            // Finalize the archive
            archive.finalize();

        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Helper function to zip the reports folder
 * @param {string} outputPath - Optional output path for the zip file
 * @returns {Promise<string>} Path to the created zip file
 */
async function zipReportsFolder(outputPath = null) {
    const reportsFolderPath = path.join(__dirname, 'cypress', 'reports', 'cucumber');
    const defaultOutputPath = outputPath || path.join(__dirname, 'reports-backup.zip');

    console.log('🚀 Zipping Cypress reports folder...');
    return await zipFolder(reportsFolderPath, defaultOutputPath);
}

/**
 * Zip Allure reports folder
 * @param {string} outputPath - Optional output path for the zip file
 * @returns {Promise<string>} Path to the created zip file
 */
async function zipAllureReportsFolder(outputPath = null) {
    const allureReportsPath = path.join(__dirname, 'cypress', 'reports', 'allure-reports');
    const defaultOutputPath = outputPath || path.join(__dirname, 'allure-reports.zip');

    console.log('🎯 Zipping Allure reports folder...');
    return await zipFolder(allureReportsPath, defaultOutputPath);
}

/**
 * Zip all reports (Cucumber + Allure)
 * @param {string} outputPath - Optional output path for the zip file
 * @returns {Promise<string>} Path to the created zip file
 */
async function zipAllReportsFolder(outputPath = null) {
    const allReportsPath = path.join(__dirname, 'cypress', 'reports');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const defaultOutputPath = outputPath || path.join(__dirname, `all-reports-${timestamp}.zip`);

    console.log('📊 Zipping all reports folder (Cucumber + Allure + Mocha)...');
    return await zipFolder(allReportsPath, defaultOutputPath);
}

// Command line interface
if (require.main === module) {
    const args = process.argv.slice(2);
    const folderPath = args[0]; // First argument is folder path
    const outputPath = args[1]; // Second argument is output path (optional)

    if (!folderPath) {
        // Default to reports folder if no argument provided
        zipReportsFolder(outputPath)
            .catch(error => {
                console.error('❌ Error:', error.message);
                process.exit(1);
            });
    } else {
        zipFolder(folderPath, outputPath)
            .catch(error => {
                console.error('❌ Error:', error.message);
                process.exit(1);
            });
    }
}

module.exports = { zipFolder, zipReportsFolder, zipAllureReportsFolder, zipAllReportsFolder };

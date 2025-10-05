const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

class GoogleDriveUploader {
    constructor() {
        this.drive = null;
        this.auth = null;
    }

    /**
     * Initialize Google Drive API with authentication
     */
    async initialize() {
        try {
            // Load credentials from environment or file
            const credentials = this.loadCredentials();

            // Create OAuth2 client
            this.auth = new google.auth.OAuth2(
                credentials.client_id,
                credentials.client_secret,
                credentials.redirect_uris[0]
            );

            // Check if we have existing tokens
            const tokens = this.loadTokens();
            if (tokens) {
                this.auth.setCredentials(tokens);
            } else {
                // Get new tokens
                await this.getNewTokens();
            }

            // Initialize Drive API
            this.drive = google.drive({ version: 'v3', auth: this.auth });

            console.log('✅ Google Drive API initialized successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize Google Drive API:', error.message);
            return false;
        }
    }

    /**
     * Load credentials from environment variables or credentials.json file
     */
    loadCredentials() {
        // Try environment variables first
        if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REDIRECT_URI) {
            return {
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uris: [process.env.GOOGLE_REDIRECT_URI]
            };
        }

        // Try to load from credentials.json file
        const credentialsPath = path.join(__dirname, 'credentials.json');
        if (fs.existsSync(credentialsPath)) {
            const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
            return credentials.installed || credentials.web;
        }

        throw new Error('No Google credentials found. Please set environment variables or create credentials.json file.');
    }

    /**
     * Load existing tokens from token.json file
     */
    loadTokens() {
        const tokenPath = path.join(__dirname, 'token.json');
        if (fs.existsSync(tokenPath)) {
            const tokens = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
            return tokens;
        }
        return null;
    }

    /**
     * Save tokens to token.json file
     */
    saveTokens(tokens) {
        const tokenPath = path.join(__dirname, 'token.json');
        fs.writeFileSync(tokenPath, JSON.stringify(tokens, null, 2));
        console.log('💾 Tokens saved to token.json');
    }

    /**
     * Get new authorization tokens
     */
    async getNewTokens() {
        const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

        const authUrl = this.auth.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });

        console.log('🔐 Authorize this app by visiting this url:', authUrl);

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        return new Promise((resolve, reject) => {
            rl.question('Enter the code from that page here: ', async (code) => {
                rl.close();
                try {
                    const { tokens } = await this.auth.getToken(code);
                    this.auth.setCredentials(tokens);
                    this.saveTokens(tokens);
                    resolve(tokens);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    /**
     * Upload file to Google Drive
     * @param {string} filePath - Path to the file to upload
     * @param {string} folderId - Optional folder ID to upload to
     * @param {string} fileName - Optional custom file name
     */
    async uploadFile(filePath, folderId = null, fileName = null) {
        try {
            if (!this.drive) {
                throw new Error('Google Drive API not initialized. Call initialize() first.');
            }

            if (!fs.existsSync(filePath)) {
                throw new Error(`File not found: ${filePath}`);
            }

            const fileStats = fs.statSync(filePath);
            const fileSize = fileStats.size;
            const actualFileName = fileName || path.basename(filePath);

            console.log(`📤 Uploading file: ${actualFileName}`);
            console.log(`📊 File size: ${this.formatFileSize(fileSize)}`);

            // Prepare file metadata
            const fileMetadata = {
                name: actualFileName,
                parents: folderId ? [folderId] : undefined,
            };

            // Prepare media
            const media = {
                mimeType: this.getMimeType(filePath),
                body: fs.createReadStream(filePath),
            };

            // Upload file with progress tracking
            const uploadProgress = await this.uploadWithProgress(fileMetadata, media, fileSize);

            console.log('✅ File uploaded successfully!');
            console.log(`🔗 File ID: ${uploadProgress.id}`);
            console.log(`🌐 View file: https://drive.google.com/file/d/${uploadProgress.id}/view`);

            return uploadProgress;
        } catch (error) {
            console.error('❌ Upload failed:', error.message);
            throw error;
        }
    }

    /**
     * Upload file with progress tracking
     */
    async uploadWithProgress(fileMetadata, media, fileSize) {
        try {
            console.log('📈 Starting upload...');
            const startTime = Date.now();

            const response = await this.drive.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'id,name,size,webViewLink',
            });

            const elapsed = Date.now() - startTime;
            const speed = fileSize / (elapsed / 1000);

            console.log(`📈 Upload completed in ${(elapsed / 1000).toFixed(2)}s at ${this.formatFileSize(speed)}/s`);

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create a folder in Google Drive
     * @param {string} folderName - Name of the folder
     * @param {string} parentFolderId - Optional parent folder ID
     */
    async createFolder(folderName, parentFolderId = null) {
        try {
            const fileMetadata = {
                name: folderName,
                mimeType: 'application/vnd.google-apps.folder',
                parents: parentFolderId ? [parentFolderId] : undefined,
            };

            const folder = await this.drive.files.create({
                resource: fileMetadata,
                fields: 'id,name,webViewLink',
            });

            console.log(`📁 Folder created: ${folderName}`);
            console.log(`🔗 Folder ID: ${folder.data.id}`);
            console.log(`🌐 View folder: ${folder.data.webViewLink}`);

            return folder.data;
        } catch (error) {
            console.error('❌ Failed to create folder:', error.message);
            throw error;
        }
    }

    /**
     * List files in Google Drive
     * @param {string} query - Optional search query
     */
    async listFiles(query = '') {
        try {
            const response = await this.drive.files.list({
                q: query,
                fields: 'files(id,name,mimeType,size,createdTime,webViewLink)',
                pageSize: 100,
            });

            return response.data.files;
        } catch (error) {
            console.error('❌ Failed to list files:', error.message);
            throw error;
        }
    }

    /**
     * Verify if a folder exists and is accessible
     * @param {string} folderId - Folder ID to verify
     */
    async verifyFolder(folderId) {
        try {
            const response = await this.drive.files.get({
                fileId: folderId,
                fields: 'id,name,mimeType,webViewLink',
            });

            if (response.data.mimeType !== 'application/vnd.google-apps.folder') {
                throw new Error(`File with ID ${folderId} is not a folder`);
            }

            return response.data;
        } catch (error) {
            console.error(`❌ Folder verification failed for ID ${folderId}:`, error.message);
            throw error;
        }
    }

    /**
     * Get MIME type based on file extension
     */
    getMimeType(filePath) {
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
            '.zip': 'application/zip',
            '.pdf': 'application/pdf',
            '.txt': 'text/plain',
            '.json': 'application/json',
            '.js': 'application/javascript',
            '.html': 'text/html',
            '.css': 'text/css',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.mp4': 'video/mp4',
            '.mp3': 'audio/mpeg',
        };
        return mimeTypes[ext] || 'application/octet-stream';
    }

    /**
     * Format file size in human readable format
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Example usage function
async function uploadZipToGoogleDrive(zipFilePath = "./reports.zip", folderName = "Synaptic Reports", existingFolderId = "1gJiIttHKrR0atufSF89wiNTNpyIbNKLR") {
    const uploader = new GoogleDriveUploader();

    try {
        // Initialize the uploader
        const initialized = await uploader.initialize();
        if (!initialized) {
            throw new Error('Failed to initialize Google Drive API');
        }

        let folderId = existingFolderId;

        // Create folder if specified and no existing folder ID provided
        if (folderName && !existingFolderId) {
            console.log(`📁 Creating new folder: ${folderName}`);
            const folder = await uploader.createFolder(folderName);
            folderId = folder.id;
        } else if (existingFolderId) {
            console.log(`📁 Verifying existing folder ID: ${existingFolderId}`);
            try {
                const folder = await uploader.verifyFolder(existingFolderId);
                console.log(`✅ Folder verified: ${folder.name}`);
                folderId = existingFolderId;
            } catch (error) {
                console.log(`⚠️  Folder verification failed, creating new folder: ${folderName}`);
                const folder = await uploader.createFolder(folderName);
                folderId = folder.id;
            }
        }

        // Upload the zip file
        const result = await uploader.uploadFile(zipFilePath, folderId);

        return result;
    } catch (error) {
        console.error('❌ Upload process failed:', error.message);
        throw error;
    }
}

// Function to upload to a specific existing folder
async function uploadToExistingFolder(zipFilePath, folderId) {
    const uploader = new GoogleDriveUploader();

    try {
        // Initialize the uploader
        const initialized = await uploader.initialize();
        if (!initialized) {
            throw new Error('Failed to initialize Google Drive API');
        }

        // Upload the zip file to existing folder
        const result = await uploader.uploadFile(zipFilePath, folderId);

        return result;
    } catch (error) {
        console.error('❌ Upload process failed:', error.message);
        throw error;
    }
}

// Export the class and function
module.exports = {
    GoogleDriveUploader,
    uploadZipToGoogleDrive,
    uploadToExistingFolder
};

// If running this file directly
if (require.main === module) {
    const args = process.argv.slice(2);

    // If no arguments provided, use hardcoded defaults
    if (args.length === 0) {
        console.log('🚀 Running with hardcoded defaults:');
        console.log('📄 File: ./reports.zip');
        console.log('📁 Folder: Synaptic Reports');
        console.log('🔗 Folder ID: 1BNTCToGK0Ggk9sE7BCOv2Mp42f_cYL0o');
        console.log('');

        uploadZipToGoogleDrive()
            .then((result) => {
                console.log('🎉 Upload completed successfully!');
                process.exit(0);
            })
            .catch((error) => {
                console.error('💥 Upload failed:', error.message);
                process.exit(1);
            });
        return;
    }

    // Show usage if help is requested
    if (args.includes('--help') || args.includes('-h')) {
        console.log('Usage: node google-drive-upload.js [zip-file-path] [options]');
        console.log('');
        console.log('Options:');
        console.log('  --folder <name>           Create new folder with specified name');
        console.log('  --folder-id <id>          Upload to existing folder by ID');
        console.log('  --list-folders            List all folders in Google Drive');
        console.log('  --help, -h                Show this help message');
        console.log('');
        console.log('Examples:');
        console.log('  node google-drive-upload.js                    # Use hardcoded defaults');
        console.log('  node google-drive-upload.js ./reports.zip --folder "Synaptic Reports"');
        console.log('  node google-drive-upload.js ./reports.zip --folder-id "1ABC123def456"');
        console.log('  node google-drive-upload.js ./reports.zip --list-folders');
        process.exit(0);
    }

    const zipFilePath = args[0];
    let folderName = null;
    let folderId = null;
    let listFolders = false;

    // Parse command line arguments
    for (let i = 1; i < args.length; i++) {
        if (args[i] === '--folder' && i + 1 < args.length) {
            folderName = args[i + 1];
            i++; // Skip next argument
        } else if (args[i] === '--folder-id' && i + 1 < args.length) {
            folderId = args[i + 1];
            i++; // Skip next argument
        } else if (args[i] === '--list-folders') {
            listFolders = true;
        }
    }

    // Handle list folders option
    if (listFolders) {
        const uploader = new GoogleDriveUploader();
        uploader.initialize()
            .then(() => uploader.listFiles("mimeType='application/vnd.google-apps.folder'"))
            .then((folders) => {
                console.log('📁 Available folders:');
                folders.forEach(folder => {
                    console.log(`  📁 ${folder.name} (ID: ${folder.id})`);
                    console.log(`     🔗 ${folder.webViewLink}`);
                });
                process.exit(0);
            })
            .catch((error) => {
                console.error('💥 Failed to list folders:', error.message);
                process.exit(1);
            });
        return;
    }

    // Upload file
    uploadZipToGoogleDrive(zipFilePath, folderName, folderId)
        .then((result) => {
            console.log('🎉 Upload completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Upload failed:', error.message);
            process.exit(1);
        });
}

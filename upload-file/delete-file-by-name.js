const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

class GoogleDriveFileDeleter {
    constructor() {
        this.drive = null;
        this.auth = null;
    }

    /**
     * Initialize Google Drive API with authentication
     */
    async initialize() {
        try {
            const credentials = this.loadCredentials();
            this.auth = new google.auth.OAuth2(
                credentials.client_id,
                credentials.client_secret,
                credentials.redirect_uris[0]
            );

            const tokens = this.loadTokens();
            if (tokens) {
                this.auth.setCredentials(tokens);
            } else {
                await this.getNewTokens();
            }

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
        if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REDIRECT_URI) {
            return {
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uris: [process.env.GOOGLE_REDIRECT_URI]
            };
        }

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
            return JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
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
     * Delete files by name (searches and deletes all matching files)
     */
    async deleteFilesByName(fileName, folderId = null) {
        if (!this.drive) {
            throw new Error('Google Drive API not initialized. Call initialize() first.');
        }

        let query = `name='${fileName}'`;
        if (folderId) {
            query += ` and parents in '${folderId}'`;
        }

        console.log(`🔍 Searching for files with name: ${fileName}`);
        if (folderId) {
            // console.log(`📁 In folder ID: ${folderId}`);
        }

        const response = await this.drive.files.list({
            q: query,
            fields: 'files(id,name,mimeType,size,webViewLink)',
        });

        const files = response.data.files;

        if (files.length === 0) {
            console.log('ℹ️  No files found with that name');
            return { success: true, deletedCount: 0, deletedFiles: [] };
        }

        console.log(`📋 Found ${files.length} file(s) to delete:`);
        files.forEach((file, index) => {
            console.log(`  ${index + 1}. ${file.name} (ID: ${file.id})`);
            // console.log(`     📊 Size: ${this.formatFileSize(file.size || 0)}`);
            console.log(`     🌐 Link: ${file.webViewLink}`);
        });

        const deletedFiles = [];
        for (const file of files) {
            try {
                await this.drive.files.delete({ fileId: file.id });
                console.log(`✅ Deleted: ${file.name}`);
                deletedFiles.push(file);
            } catch (error) {
                console.error(`❌ Failed to delete ${file.name}:`, error.message);
            }
        }

        console.log(`🎉 Successfully deleted ${deletedFiles.length} out of ${files.length} files`);
        return { success: true, deletedCount: deletedFiles.length, deletedFiles };
    }

    /**
     * List files in a folder for deletion
     */
    async listFilesForDeletion(folderId = null) {
        let query = '';
        if (folderId) {
            query = `parents in '${folderId}'`;
        }

        const response = await this.drive.files.list({
            q: query,
            fields: 'files(id,name,mimeType,size,createdTime,modifiedTime,webViewLink)',
            orderBy: 'modifiedTime desc',
            pageSize: 50,
        });

        const files = response.data.files;

        if (files.length === 0) {
            console.log('📁 No files found');
            return files;
        }

        console.log(`📋 Found ${files.length} file(s):`);
        console.log('');

        files.forEach((file, index) => {
            const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
            const icon = isFolder ? '📁' : '📄';
            const size = isFolder ? 'Folder' : this.formatFileSize(file.size || 0);

            console.log(`${index + 1}. ${icon} ${file.name}`);
            console.log(`   🔗 ID: ${file.id}`);
            console.log(`   📊 Size: ${size}`);
            console.log(`   📅 Modified: ${new Date(file.modifiedTime).toLocaleString()}`);
            console.log(`   🌐 Link: ${file.webViewLink}`);
            console.log('');
        });

        return files;
    }


}

// Main execution
async function main() {
    const args = process.argv.slice(2);
    const deleter = new GoogleDriveFileDeleter();

    // Initialize the deleter
    const initialized = await deleter.initialize();
    if (!initialized) {
        console.error('❌ Failed to initialize Google Drive API');
        process.exit(1);
    }

    // If no arguments provided, use hardcoded defaults
    if (args.length === 0) {
        console.log('📄 File name: reports.zip');
        console.log('');

        try {
            await deleter.deleteFilesByName("reports.zip", "1gJiIttHKrR0atufSF89wiNTNpyIbNKLR");
            console.log('🎉 Delete completed successfully!');
        } catch (error) {
            console.error('💥 Delete failed:', error.message);
            process.exit(1);
        }
        return;
    }

    // Show usage if help is requested
    if (args.includes('--help') || args.includes('-h')) {
        console.log('Usage: node delete-file-by-name.js [command] [options]');
        console.log('');
        console.log('Commands:');
        console.log('  delete <file-name>         Delete files by name');
        console.log('  list [folder-id]           List files in folder (or root)');
        console.log('');
        console.log('Options:');
        console.log('  --folder-id <id>          Limit delete search to specific folder');
        console.log('  --help, -h                Show this help message');

        process.exit(0);
    }

    // Determine command
    const command = args[0];
    let folderId = null;

    // Parse command line arguments
    for (let i = 1; i < args.length; i++) {
        if (args[i] === '--folder-id' && i + 1 < args.length) {
            folderId = args[i + 1];
            i++; // Skip next argument
        }
    }

    try {
        // Handle different commands
        if (command === 'delete') {
            const fileName = args[1];
            if (!fileName) {
                console.error('❌ File name is required for delete command');
                process.exit(1);
            }

            await deleter.deleteFilesByName(fileName, folderId);
            console.log('🎉 Delete completed successfully!');
        } else if (command === 'list') {
            const targetFolderId = args[1] || folderId;
            await deleter.listFilesForDeletion(targetFolderId);
            console.log('🎉 List completed successfully!');
        } else {
            console.log('❌ No command specified. Use --help for usage information.');
            process.exit(1);
        }
    } catch (error) {
        console.error('💥 Operation failed:', error.message);
        process.exit(1);
    }
}

// Run the main function
if (require.main === module) {
    main();
}
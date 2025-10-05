# Google Drive Upload Setup Guide

## Prerequisites

1. **Google Cloud Console Setup**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google Drive API
   - Create credentials (OAuth 2.0 Client ID)

## Setup Steps

### 1. Enable Google Drive API
1. In Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Drive API"
3. Click on it and press "Enable"

### 2. Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client ID"
3. Choose "Desktop application" as the application type
4. Download the credentials JSON file
5. Rename it to `credentials.json` and place it in your project root

### 3. Alternative: Use Environment Variables
Instead of `credentials.json`, you can set these environment variables:
```bash
export GOOGLE_CLIENT_ID="your-client-id"
export GOOGLE_CLIENT_SECRET="your-client-secret"
export GOOGLE_REDIRECT_URI="http://localhost"
```

## Usage Examples

### Basic Usage
```javascript
const { uploadZipToGoogleDrive } = require('./google-drive-upload');

// Upload a zip file
uploadZipToGoogleDrive('./reports.zip')
  .then(result => console.log('Upload successful:', result))
  .catch(error => console.error('Upload failed:', error));
```

### Upload to Specific Folder
```javascript
// Upload to a specific folder (creates folder if it doesn't exist)
uploadZipToGoogleDrive('./reports.zip', 'Test Reports')
  .then(result => console.log('Upload successful:', result))
  .catch(error => console.error('Upload failed:', error));
```

### Command Line Usage
```bash
# Upload a zip file
node google-drive-upload.js ./reports.zip

# Upload to a specific folder
node google-drive-upload.js ./reports.zip "Test Reports"
```

### Advanced Usage with Class
```javascript
const { GoogleDriveUploader } = require('./google-drive-upload');

async function advancedUpload() {
  const uploader = new GoogleDriveUploader();
  
  // Initialize
  await uploader.initialize();
  
  // Create a folder
  const folder = await uploader.createFolder('My Test Reports');
  
  // Upload file to the folder
  const result = await uploader.uploadFile('./reports.zip', folder.id);
  
  // List files
  const files = await uploader.listFiles();
  console.log('All files:', files);
}
```

## Features

- ✅ **Progress Tracking**: Real-time upload progress with speed indicators
- ✅ **Folder Support**: Upload to specific folders or create new ones
- ✅ **Multiple Auth Methods**: Support for credentials.json or environment variables
- ✅ **Error Handling**: Comprehensive error handling and user-friendly messages
- ✅ **File Type Detection**: Automatic MIME type detection
- ✅ **Token Management**: Automatic token refresh and storage
- ✅ **Command Line Interface**: Easy CLI usage
- ✅ **File Size Formatting**: Human-readable file sizes

## File Structure
```
your-project/
├── google-drive-upload.js      # Main upload script
├── credentials.json            # Google API credentials (create this)
├── token.json                  # Auto-generated auth tokens
└── your-zip-file.zip          # File to upload
```

## Troubleshooting

### Common Issues

1. **"No Google credentials found"**
   - Make sure `credentials.json` exists in the project root
   - Or set the required environment variables

2. **"Invalid client"**
   - Check that your OAuth 2.0 client is configured correctly
   - Ensure the redirect URI matches what's in your credentials

3. **"Access denied"**
   - Make sure you've granted the necessary permissions during OAuth flow
   - Check that the Google Drive API is enabled in your project

4. **"File not found"**
   - Verify the file path is correct
   - Use absolute paths if relative paths don't work

### Getting Help

If you encounter issues:
1. Check the console output for detailed error messages
2. Verify your Google Cloud Console setup
3. Ensure your credentials are valid and not expired
4. Check that the file you're trying to upload exists and is accessible

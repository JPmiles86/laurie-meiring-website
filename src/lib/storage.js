import { Storage } from '@google-cloud/storage';

// Initialize Google Cloud Storage
let storage;
let bucket;

try {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    // Server-side: use service account key
    storage = new Storage({
      projectId: process.env.GCS_PROJECT_ID || 'pbguisecr-laurie-meirling',
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS || './laurie-storage-key.json'
    });
    
    bucket = storage.bucket(process.env.GCS_BUCKET_NAME || 'laurie-blog-media');
  }
} catch (error) {
  console.warn('GCS initialization failed:', error.message);
}

/**
 * Upload a file to Google Cloud Storage
 * @param {File|Buffer} file - File to upload
 * @param {string} destination - Destination path in bucket
 * @param {string} tenantId - Tenant identifier for folder organization
 * @returns {Promise<Object>} - Upload result with public URL
 */
export async function uploadToGCS(file, destination, tenantId = 'laurie-personal') {
  if (!bucket) {
    throw new Error('GCS not initialized properly');
  }

  try {
    // Create full path with tenant isolation
    const fileName = `${tenantId}/${destination}`;
    const gcsFile = bucket.file(fileName);

    // Upload options
    const options = {
      metadata: {
        cacheControl: 'public, max-age=86400', // 24 hours
        metadata: {
          uploadedAt: new Date().toISOString(),
          tenantId
        }
      },
      public: true, // Make file publicly accessible
      validation: 'md5'
    };

    // Upload the file
    let uploadResult;
    if (file instanceof Buffer) {
      uploadResult = await gcsFile.save(file, options);
    } else {
      // For File objects, convert to buffer first
      const buffer = Buffer.from(await file.arrayBuffer());
      uploadResult = await gcsFile.save(buffer, options);
    }

    // Make the file public
    await gcsFile.makePublic();

    // Get the public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    return {
      success: true,
      url: publicUrl,
      path: fileName,
      size: file.size || buffer.length,
      contentType: file.type || 'application/octet-stream'
    };
  } catch (error) {
    console.error('GCS upload error:', error);
    throw new Error(`Upload failed: ${error.message}`);
  }
}

/**
 * Delete a file from Google Cloud Storage
 * @param {string} filePath - Path to file in bucket
 * @returns {Promise<boolean>} - Success status
 */
export async function deleteFromGCS(filePath) {
  if (!bucket) {
    throw new Error('GCS not initialized properly');
  }

  try {
    await bucket.file(filePath).delete();
    return true;
  } catch (error) {
    console.error('GCS delete error:', error);
    return false;
  }
}

/**
 * Generate a signed URL for temporary access
 * @param {string} filePath - Path to file in bucket
 * @param {number} expiresInHours - Hours until expiration
 * @returns {Promise<string>} - Signed URL
 */
export async function getSignedUrl(filePath, expiresInHours = 4) {
  if (!bucket) {
    throw new Error('GCS not initialized properly');
  }

  try {
    const options = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + expiresInHours * 60 * 60 * 1000
    };

    const [url] = await bucket.file(filePath).getSignedUrl(options);
    return url;
  } catch (error) {
    console.error('GCS signed URL error:', error);
    throw new Error(`Failed to generate signed URL: ${error.message}`);
  }
}

/**
 * List files in a tenant's folder
 * @param {string} tenantId - Tenant identifier
 * @param {string} folder - Subfolder (optional)
 * @returns {Promise<Array>} - List of files
 */
export async function listFiles(tenantId, folder = '') {
  if (!bucket) {
    throw new Error('GCS not initialized properly');
  }

  try {
    const prefix = folder ? `${tenantId}/${folder}/` : `${tenantId}/`;
    const [files] = await bucket.getFiles({ prefix });

    return files.map(file => ({
      name: file.name,
      size: file.metadata.size,
      updated: file.metadata.updated,
      contentType: file.metadata.contentType,
      publicUrl: `https://storage.googleapis.com/${bucket.name}/${file.name}`
    }));
  } catch (error) {
    console.error('GCS list files error:', error);
    throw new Error(`Failed to list files: ${error.message}`);
  }
}

/**
 * Browser-compatible file upload using signed URLs
 * This function generates a signed URL that can be used from the browser
 * @param {string} fileName - Name of file to upload
 * @param {string} contentType - MIME type of file
 * @param {string} tenantId - Tenant identifier
 * @returns {Promise<Object>} - Signed upload URL and final public URL
 */
export async function getUploadSignedUrl(fileName, contentType, tenantId = 'laurie-personal') {
  if (!bucket) {
    throw new Error('GCS not initialized properly');
  }

  try {
    const destination = `${tenantId}/uploads/${Date.now()}-${fileName}`;
    const file = bucket.file(destination);

    const options = {
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType,
      extensionHeaders: {
        'x-goog-meta-tenant-id': tenantId,
        'x-goog-meta-uploaded-at': new Date().toISOString()
      }
    };

    const [signedUrl] = await file.getSignedUrl(options);
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;

    return {
      signedUrl,
      publicUrl,
      path: destination
    };
  } catch (error) {
    console.error('GCS upload signed URL error:', error);
    throw new Error(`Failed to generate upload URL: ${error.message}`);
  }
}

export { storage, bucket };
const supabase = require('../config/supabase');

/**
 * Storage bucket initialization utility
 * Automatically creates storage buckets and policies
 */
class StorageInitializer {
  constructor() {
    this.initialized = false;
    this.errors = [];
  }

  /**
   * Main initialization method
   */
  async initialize() {
    console.log('🔄 Starting storage bucket initialization...');

    try {
      // Create storage buckets
      await this.createBuckets();

      // Create storage policies
      await this.createStoragePolicies();

      console.log('✅ Storage bucket initialization completed successfully!');
      this.initialized = true;
      return { success: true, message: 'Storage initialized successfully' };

    } catch (error) {
      console.error('❌ Storage initialization failed:', error);
      this.errors.push(error);
      return { success: false, error: error.message, errors: this.errors };
    }
  }

  /**
   * Create storage buckets
   */
  async createBuckets() {
    const buckets = [
      {
        name: 'project-files',
        config: {
          public: false,
          fileSizeLimit: 104857600, // 100MB
          allowedMimeTypes: [
            'text/plain',
            'text/markdown',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'video/mp4',
            'video/quicktime',
            'video/x-msvideo'
          ]
        }
      },
      {
        name: 'content-files',
        config: {
          public: false,
          fileSizeLimit: 104857600, // 100MB
          allowedMimeTypes: [
            'text/plain',
            'text/markdown',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'video/mp4',
            'video/quicktime',
            'video/x-msvideo'
          ]
        }
      },
      {
        name: 'user-avatars',
        config: {
          public: true,
          fileSizeLimit: 5242880, // 5MB
          allowedMimeTypes: [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp'
          ]
        }
      }
    ];

    for (const bucket of buckets) {
      try {
        // Check if bucket exists
        const { data: existingBucket } = await supabase.storage.getBucket(bucket.name);

        if (existingBucket) {
          console.log(`ℹ Bucket '${bucket.name}' already exists`);
          continue;
        }

        // Create bucket
        const { data, error } = await supabase.storage.createBucket(bucket.name, bucket.config);

        if (error) {
          // If bucket already exists, continue
          if (error.message.includes('already exists')) {
            console.log(`ℹ Bucket '${bucket.name}' already exists`);
            continue;
          }
          throw error;
        }

        console.log(`✓ Created bucket: ${bucket.name}`);
      } catch (error) {
        console.log(`⚠ Could not create bucket ${bucket.name}:`, error.message);
      }
    }
  }

  /**
   * Create storage policies
   * Note: Storage policies require SQL execution in Supabase Dashboard
   */
  async createStoragePolicies() {
    console.log('ℹ️  Storage policies need to be created in Supabase Dashboard');
    console.log('   See database/storage-policies.sql for the SQL to run');
    return { success: true, message: 'Buckets created. Please run storage-policies.sql manually' };

    /* Storage policies - run these in Supabase SQL Editor:
    const policies = [
      // Project files policies
      {
        bucket: 'project-files',
        name: 'Users can upload own files',
        operation: 'INSERT',
        sql: `
          CREATE POLICY "Users can upload own files"
          ON storage.objects FOR INSERT
          WITH CHECK (
            bucket_id = 'project-files'
            AND auth.uid()::text = (storage.foldername(name))[1]
          );
        `
      },
      {
        bucket: 'project-files',
        name: 'Users can view own files',
        operation: 'SELECT',
        sql: `
          CREATE POLICY "Users can view own files"
          ON storage.objects FOR SELECT
          USING (
            bucket_id = 'project-files'
            AND auth.uid()::text = (storage.foldername(name))[1]
          );
        `
      },
      {
        bucket: 'project-files',
        name: 'Users can update own files',
        operation: 'UPDATE',
        sql: `
          CREATE POLICY "Users can update own files"
          ON storage.objects FOR UPDATE
          USING (
            bucket_id = 'project-files'
            AND auth.uid()::text = (storage.foldername(name))[1]
          );
        `
      },
      {
        bucket: 'project-files',
        name: 'Users can delete own files',
        operation: 'DELETE',
        sql: `
          CREATE POLICY "Users can delete own files"
          ON storage.objects FOR DELETE
          USING (
            bucket_id = 'project-files'
            AND auth.uid()::text = (storage.foldername(name))[1]
          );
        `
      },
      // Content files policies
      {
        bucket: 'content-files',
        name: 'Users can upload content files',
        operation: 'INSERT',
        sql: `
          CREATE POLICY "Users can upload content files"
          ON storage.objects FOR INSERT
          WITH CHECK (
            bucket_id = 'content-files'
            AND auth.uid()::text = (storage.foldername(name))[1]
          );
        `
      },
      {
        bucket: 'content-files',
        name: 'Users can view content files',
        operation: 'SELECT',
        sql: `
          CREATE POLICY "Users can view content files"
          ON storage.objects FOR SELECT
          USING (
            bucket_id = 'content-files'
            AND auth.uid()::text = (storage.foldername(name))[1]
          );
        `
      },
      {
        bucket: 'content-files',
        name: 'Users can update content files',
        operation: 'UPDATE',
        sql: `
          CREATE POLICY "Users can update content files"
          ON storage.objects FOR UPDATE
          USING (
            bucket_id = 'content-files'
            AND auth.uid()::text = (storage.foldername(name))[1]
          );
        `
      },
      {
        bucket: 'content-files',
        name: 'Users can delete content files',
        operation: 'DELETE',
        sql: `
          CREATE POLICY "Users can delete content files"
          ON storage.objects FOR DELETE
          USING (
            bucket_id = 'content-files'
            AND auth.uid()::text = (storage.foldername(name))[1]
          );
        `
      },
      // Avatar policies
      {
        bucket: 'user-avatars',
        name: 'Users can upload own avatar',
        operation: 'INSERT',
        sql: `
          CREATE POLICY "Users can upload own avatar"
          ON storage.objects FOR INSERT
          WITH CHECK (
            bucket_id = 'user-avatars'
            AND auth.uid()::text = (storage.foldername(name))[1]
          );
        `
      },
      {
        bucket: 'user-avatars',
        name: 'Anyone can view avatars',
        operation: 'SELECT',
        sql: `
          CREATE POLICY "Anyone can view avatars"
          ON storage.objects FOR SELECT
          USING (bucket_id = 'user-avatars');
        `
      },
      {
        bucket: 'user-avatars',
        name: 'Users can update own avatar',
        operation: 'UPDATE',
        sql: `
          CREATE POLICY "Users can update own avatar"
          ON storage.objects FOR UPDATE
          USING (
            bucket_id = 'user-avatars'
            AND auth.uid()::text = (storage.foldername(name))[1]
          );
        `
      },
      {
        bucket: 'user-avatars',
        name: 'Users can delete own avatar',
        operation: 'DELETE',
        sql: `
          CREATE POLICY "Users can delete own avatar"
          ON storage.objects FOR DELETE
          USING (
            bucket_id = 'user-avatars'
            AND auth.uid()::text = (storage.foldername(name))[1]
          );
        `
      }
    ];
    */
  }

  /**
   * Test bucket access
   */
  async testBucketAccess(bucketName) {
    try {
      const { data, error } = await supabase.storage.from(bucketName).list();

      if (error) {
        console.error(`❌ Failed to access bucket '${bucketName}':`, error);
        return false;
      }

      console.log(`✓ Successfully accessed bucket '${bucketName}'`);
      return true;
    } catch (error) {
      console.error(`❌ Error testing bucket '${bucketName}':`, error);
      return false;
    }
  }

  /**
   * Get bucket info
   */
  async getBucketInfo(bucketName) {
    try {
      const { data, error } = await supabase.storage.getBucket(bucketName);

      if (error) {
        console.error(`❌ Failed to get bucket info for '${bucketName}':`, error);
        return null;
      }

      return data;
    } catch (error) {
      console.error(`❌ Error getting bucket info for '${bucketName}':`, error);
      return null;
    }
  }
}

// Export singleton instance
const storageInitializer = new StorageInitializer();

module.exports = storageInitializer;

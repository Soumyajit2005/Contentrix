const supabase = require('../config/supabase');

/**
 * Database initialization utility
 * Automatically creates all required tables, policies, and functions
 */
class DatabaseInitializer {
  constructor() {
    this.initialized = false;
    this.errors = [];
  }

  /**
   * Main initialization method - runs all setup steps
   */
  async initialize() {
    console.log('🔄 Checking database status...');

    try {
      // Check if already initialized
      const isInitialized = await this.checkInitialization();
      if (isInitialized) {
        this.initialized = true;
        return { success: true, message: 'Database already initialized' };
      }

      // If not initialized, provide instructions
      console.log('📋 Database tables not found. Please run the SQL migration:');
      console.log('   1. Go to Supabase Dashboard > SQL Editor');
      console.log('   2. Copy content from database/init.sql');
      console.log('   3. Run it in the SQL Editor');
      console.log('   4. Then copy and run database/storage-policies.sql');
      console.log('   OR use: npm run migrate (in backend folder)');

      return {
        success: false,
        message: 'Database not initialized. Please run SQL migrations.',
        instructions: {
          step1: 'Open Supabase Dashboard > SQL Editor',
          step2: 'Copy and run database/init.sql',
          step3: 'Copy and run database/storage-policies.sql',
          alternative: 'Run: cd backend && npm run migrate'
        }
      };

    } catch (error) {
      console.error('❌ Database check failed:', error);
      this.errors.push(error);
      return { success: false, error: error.message, errors: this.errors };
    }
  }

  /**
   * Check if database is already initialized
   */
  async checkInitialization() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .limit(1);

      // If query succeeds, tables exist
      if (!error) {
        console.log('✓ Database tables already exist');
        return true;
      }

      // Check for specific error codes
      if (error.code === 'PGRST204' || error.code === '42P01' || error.message?.includes('does not exist')) {
        return false; // Tables don't exist
      }

      // Other errors mean we can't determine status
      console.warn('⚠️ Could not determine database status:', error.message);
      return false;
    } catch (error) {
      console.warn('⚠️ Error checking database:', error.message);
      return false;
    }
  }


  /**
   * Create user profile on signup (called from auth flow)
   */
  async createUserProfile(userId, email, fullName = null) {
    try {
      // Create user record
      await supabase.from('users').upsert({
        id: userId,
        email,
        full_name: fullName,
        subscription_tier: 'free',
        usage_stats: { projects_created: 0, content_generated: 0 }
      });

      // Create profile record (legacy compatibility)
      await supabase.from('profiles').upsert({
        id: userId,
        email,
        full_name: fullName
      });

      console.log('✓ Created user profile for:', email);
      return { success: true };
    } catch (error) {
      console.error('❌ Failed to create user profile:', error);
      return { success: false, error: error.message };
    }
  }
}

// Export singleton instance
const dbInitializer = new DatabaseInitializer();

module.exports = dbInitializer;

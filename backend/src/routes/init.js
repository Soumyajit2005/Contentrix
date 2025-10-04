const express = require('express');
const dbInitializer = require('../utils/dbInit');
const storageInitializer = require('../utils/storageInit');

const router = express.Router();

/**
 * Initialize database and storage
 * POST /api/init/setup
 */
router.post('/setup', async (req, res) => {
  try {
    console.log('📦 Starting full system initialization...');

    // Initialize database
    const dbResult = await dbInitializer.initialize();

    // Initialize storage
    const storageResult = await storageInitializer.initialize();

    const response = {
      success: dbResult.success && storageResult.success,
      database: dbResult,
      storage: storageResult,
      message: 'System initialization completed'
    };

    if (!response.success) {
      return res.status(500).json(response);
    }

    res.json(response);
  } catch (error) {
    console.error('❌ System initialization error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Check initialization status
 * GET /api/init/status
 */
router.get('/status', async (req, res) => {
  try {
    const dbStatus = dbInitializer.initialized;
    const storageStatus = storageInitializer.initialized;

    res.json({
      database: {
        initialized: dbStatus,
        errors: dbInitializer.errors
      },
      storage: {
        initialized: storageStatus,
        errors: storageInitializer.errors
      },
      ready: dbStatus && storageStatus
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Initialize database only
 * POST /api/init/database
 */
router.post('/database', async (req, res) => {
  try {
    const result = await dbInitializer.initialize();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Initialize storage only
 * POST /api/init/storage
 */
router.post('/storage', async (req, res) => {
  try {
    const result = await storageInitializer.initialize();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Create user profile (called after signup)
 * POST /api/init/user-profile
 */
router.post('/user-profile', async (req, res) => {
  try {
    const { userId, email, fullName } = req.body;

    if (!userId || !email) {
      return res.status(400).json({
        success: false,
        error: 'userId and email are required'
      });
    }

    const result = await dbInitializer.createUserProfile(userId, email, fullName);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;

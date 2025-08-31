const express = require('express');
const { authenticateUser } = require('../middleware/auth');
const { repurposeContent, getContentHistory, deleteContent } = require('../services/contentService');

const router = express.Router();

// Repurpose content
router.post('/repurpose', authenticateUser, async (req, res) => {
  try {
    const { originalContent, platform } = req.body;
    const userId = req.user.id;

    if (!originalContent || !platform) {
      return res.status(400).json({ error: 'Original content and platform are required' });
    }

    const result = await repurposeContent(originalContent, platform, userId);
    res.json(result);
  } catch (error) {
    console.error('Repurpose error:', error);
    res.status(500).json({ error: 'Failed to repurpose content' });
  }
});

// Get content history
router.get('/history', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    
    const result = await getContentHistory(userId, parseInt(page), parseInt(limit));
    res.json(result);
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Failed to fetch content history' });
  }
});

// Delete content
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    await deleteContent(id, userId);
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete content' });
  }
});

module.exports = router;
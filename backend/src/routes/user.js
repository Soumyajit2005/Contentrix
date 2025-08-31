const express = require('express');
const { authenticateUser } = require('../middleware/auth');
const supabase = require('../config/supabase');

const router = express.Router();

// Get user profile
router.get('/profile', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    if (!data) {
      // Create profile if doesn't exist
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: req.user.email,
          full_name: req.user.user_metadata?.full_name || ''
        })
        .select()
        .single();

      if (createError) throw createError;
      return res.json(newProfile);
    }

    res.json(data);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName } = req.body;

    const { data, error } = await supabase
      .from('profiles')
      .update({ 
        full_name: fullName,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get user stats
router.get('/stats', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get total content count
    const { count: totalContent } = await supabase
      .from('repurposed_content')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get this month's content
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count: monthlyContent } = await supabase
      .from('repurposed_content')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', startOfMonth.toISOString());

    // Get platform distribution
    const { data: platformStats } = await supabase
      .from('repurposed_content')
      .select('platform')
      .eq('user_id', userId);

    const platformCounts = platformStats.reduce((acc, item) => {
      acc[item.platform] = (acc[item.platform] || 0) + 1;
      return acc;
    }, {});

    res.json({
      totalContent: totalContent || 0,
      monthlyContent: monthlyContent || 0,
      timeSaved: Math.round(((totalContent || 0) * 0.75) * 10) / 10, // Estimate 45 mins saved per piece
      platformCounts
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
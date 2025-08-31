const express = require('express');
const supabase = require('../config/supabase');

const router = express.Router();

// Sign up
router.post('/signup', async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ 
      user: data.user, 
      session: data.session,
      message: 'Please check your email for verification link'
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

// Sign in
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      // Provide more helpful error messages
      let errorMessage = error.message;
      if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Please check your email and click the confirmation link before signing in.';
      } else if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password. Please check your credentials.';
      }
      
      return res.status(400).json({ error: errorMessage });
    }

    res.json({ user: data.user, session: data.session });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ error: 'Failed to sign in' });
  }
});

// Sign out
router.post('/signout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Signed out successfully' });
  } catch (error) {
    console.error('Signout error:', error);
    res.status(500).json({ error: 'Failed to sign out' });
  }
});

// Resend confirmation email
router.post('/resend-confirmation', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Confirmation email sent. Please check your inbox.' });
  } catch (error) {
    console.error('Resend confirmation error:', error);
    res.status(500).json({ error: 'Failed to resend confirmation email' });
  }
});

module.exports = router;
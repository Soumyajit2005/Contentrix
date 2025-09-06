# 🚀 Vercel Deployment Guide for RepurposePie

## Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- Environment variables ready

## Quick Deploy

### Option 1: One-Click Deploy (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" 
4. Import your GitHub repository
5. Configure environment variables (see below)
6. Deploy!

### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel  
vercel login

# Deploy
vercel
```

## Environment Variables Setup

In your Vercel project dashboard, add these environment variables:

### Frontend Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### Backend Environment Variables  
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=production
FRONTEND_URL=https://your-domain.vercel.app
```

## Build Configuration

Your project is now configured with:
- ✅ Next.js frontend with static build
- ✅ Express.js backend as serverless functions
- ✅ Proper CORS configuration
- ✅ Environment variable setup
- ✅ Vercel routing configuration

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variables set in Vercel
- [ ] Supabase configured for production domain
- [ ] Gemini API key added
- [ ] CORS updated with production domain
- [ ] Database accessible from Vercel

## Troubleshooting

### Common Issues:
1. **API Routes 404**: Check vercel.json routing
2. **CORS Errors**: Update CORS settings with your domain
3. **Environment Variables**: Ensure all vars are set in Vercel dashboard
4. **Build Failures**: Check build logs in Vercel

### Build Logs:
Check Vercel dashboard → Your Project → Deployments → View Function Logs

## Post-Deployment

1. Test all functionality:
   - User authentication  
   - Content generation
   - File uploads
   - Project creation

2. Update any hardcoded URLs in your app

3. Set up custom domain (optional)

## Support
- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment

Your app will be available at: `https://your-project-name.vercel.app`

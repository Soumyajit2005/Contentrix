# 🎯 RepurposePie - AI-Powered Content Repurposing Platform

Transform your content for multiple social media platforms with AI-powered repurposing technology.

## ✨ Features

- 🤖 **AI Content Generation** - Powered by Google Gemini
- 📱 **Multi-Platform Support** - Twitter, LinkedIn, Instagram, TikTok, YouTube, Facebook, Medium
- 📁 **File Upload Support** - Documents, images, and various file types
- 🎨 **Beautiful UI** - Modern, responsive design
- 👥 **User Management** - Secure authentication with Supabase
- 📊 **Content Analytics** - Track your repurposed content
- 🚀 **Project-Based Workflow** - Organize content by projects

## 🏗️ Tech Stack

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase Auth** - Authentication

### Backend  
- **Node.js & Express** - API server
- **Supabase** - Database and storage
- **Google Gemini AI** - Content generation
- **Multer** - File upload handling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- Google Gemini API key

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/Soumyajit2005/Repurpose-pie.git
cd Repurpose-pie
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

3. **Setup Frontend**  
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your credentials
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🌐 Deployment

### Deploy to Vercel (Recommended)

This project is optimized for Vercel deployment:

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy on Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository  
- Configure environment variables
- Deploy!

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📁 Project Structure

```
repurpose-pie/
├── frontend/          # Next.js frontend application
│   ├── src/
│   │   ├── app/       # App router pages
│   │   ├── components/ # React components
│   │   ├── hooks/     # Custom hooks
│   │   ├── lib/       # Utility libraries
│   │   └── types/     # TypeScript types
│   └── package.json
├── backend/           # Express.js backend API
│   ├── src/
│   │   ├── config/    # Configuration files
│   │   ├── routes/    # API routes
│   │   ├── services/  # Business logic
│   │   └── middleware/ # Express middleware
│   └── package.json
├── vercel.json        # Vercel deployment config
└── DEPLOYMENT.md      # Deployment guide
```

## 🔧 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Backend (.env)
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 [Documentation](./DEPLOYMENT.md)
- 🐛 [Report Issues](https://github.com/Soumyajit2005/Repurpose-pie/issues)
- 💬 [Discussions](https://github.com/Soumyajit2005/Repurpose-pie/discussions)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.io/) - Backend as a service
- [Google Gemini](https://ai.google.dev/) - AI content generation
- [Vercel](https://vercel.com/) - Deployment platform

---

**Made with ❤️ by [Soumyajit](https://github.com/Soumyajit2005)**

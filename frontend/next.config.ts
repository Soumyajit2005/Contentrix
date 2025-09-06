/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'khoycikxggabkmhgskup.supabase.co'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // Enable static exports for better Vercel compatibility
  trailingSlash: false,
  // Optimize for serverless
  serverExternalPackages: ['@supabase/supabase-js'],
}

module.exports = nextConfig
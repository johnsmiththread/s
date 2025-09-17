# Waifu 2.0

A Next.js project configured for Vercel deployment.

## Deployment Instructions

### Deploy to Vercel

This project is configured for seamless deployment on Vercel. Follow these steps:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Visit [Vercel](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Select the repository and keep the default settings (they're already configured in vercel.json)
5. Click "Deploy"

### Manual Deployment

You can also deploy manually using the Vercel CLI:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from the project directory
vercel
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Configuration

The project includes:
- `next.config.ts` - Next.js configuration optimized for Vercel
- `vercel.json` - Vercel-specific deployment configuration
- Security headers for production

## Notes

- The project is configured with `output: 'standalone'` for optimized serverless deployment
- Image optimization is configured for production environments
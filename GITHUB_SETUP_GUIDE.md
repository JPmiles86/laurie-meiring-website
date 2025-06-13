# GitHub API Setup Guide

## Quick Setup Steps

### 1. Create GitHub Personal Access Token

1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Laurie Website Blog Admin"
4. Select these permissions:
   - ✅ repo (Full control of private repositories)
5. Click "Generate token"
6. **COPY THE TOKEN NOW** - you won't see it again!

### 2. Create .env File

1. In your project root, create a file named `.env`
2. Add this content:
```
VITE_GITHUB_TOKEN=your_token_here
VITE_GITHUB_OWNER=jpmiles
VITE_GITHUB_REPO=laurie-meiring-website
```
3. Replace `your_token_here` with the token you copied

### 3. Add .env to .gitignore

Make sure `.env` is in your `.gitignore` file:
```
echo ".env" >> .gitignore
```

### 4. Restart Development Server

```bash
npm run dev
```

## Testing

1. Go to `/admin`
2. Login with password: `lauriepickleball2024`
3. Create a test blog post
4. Click "Publish Blog"
5. Check GitHub - you should see a new commit!

## Deployment on Vercel

Add the environment variable to Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - Name: `VITE_GITHUB_TOKEN`
   - Value: Your GitHub token
   - Environment: Production, Preview, Development
5. Redeploy your site

## Security Notes

- **NEVER** commit your .env file
- The token gives write access to your repository
- Regenerate the token if compromised
- Consider using a fine-grained token for better security

## Troubleshooting

**"GitHub token not configured" error**
- Check that .env file exists
- Verify token is correct
- Restart dev server

**"Failed to fetch current blogs" error**
- Check GitHub token permissions
- Verify repo name is correct
- Check internet connection

**"Failed to save blog" error**
- Token might be expired
- Check you have write permissions
- Verify branch name is "main"
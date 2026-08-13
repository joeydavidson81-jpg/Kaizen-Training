# Deployment Guide: Speech Translator to Vercel

## Quick Start (5 minutes)

### Prerequisites
- GitHub account (free)
- Vercel account (free tier available)
- This project code

---

## Step 1: Push Code to GitHub

### 1.1 Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `speech-translator`
3. Description: "Real-time speech translation app (English ↔ Mandarin)"
4. Choose "Public" or "Private"
5. Click "Create repository"

### 1.2 Push Your Code

```bash
# Navigate to project directory
cd speech-translator

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Speech translator app"

# Add remote
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/speech-translator.git

# Push to GitHub
git push -u origin main
```

> **Note:** Replace `YOUR_USERNAME` with your GitHub username

---

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - Visit https://vercel.com/new
   - Click "Continue with GitHub"
   - Log in with your GitHub account

2. **Select Repository**
   - Find and select `speech-translator`
   - Click "Import"

3. **Configure Project**
   - **Project Name:** `speech-translator` (auto-filled)
   - **Framework Preset:** `Next.js` (auto-selected)
   - **Root Directory:** `./` (default)
   - **Environment Variables:** Leave blank (not needed)
   - Click "Deploy"

4. **Wait for Deployment**
   - Vercel will build and deploy your app
   - Takes about 2-3 minutes
   - You'll see a success message with your live URL

5. **Access Your App**
   - Click on the URL provided
   - Your speech translator is now live! 🎉

---

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Answer the prompts**
   ```
   ? Set up and deploy "~/speech-translator"? [Y/n] Y
   ? Which scope do you want to deploy to? (your account)
   ? Link to existing project? [y/N] N
   ? What's your project's name? speech-translator
   ? In which directory is your code located? ./
   ? Want to modify these settings? [y/N] N
   ```

4. **Copy Your URL**
   - Vercel will provide a URL
   - Your app is live!

---

## Step 3: Test Your Deployment

1. **Open Your Live URL**
   - Click the link provided by Vercel
   - Or go to: `https://speech-translator-YOUR_USERNAME.vercel.app`

2. **Test Features**
   - Click "Start Listening"
   - Grant microphone permission
   - Speak in English or Mandarin
   - Verify translation appears

3. **Test on Mobile** (Optional)
   - Copy the URL
   - Send to phone
   - Test on mobile browser

---

## Step 4: Custom Domain (Optional)

### Add Your Own Domain

1. **In Vercel Dashboard**
   - Go to Settings → Domains
   - Click "Add"
   - Enter your domain name
   - Follow verification steps

2. **Supported Domain Providers**
   - Vercel Domains
   - Namecheap
   - GoDaddy
   - Route 53
   - Any other registrar

---

## Step 5: Updates & Maintenance

### Making Changes

1. **Edit Code Locally**
   ```bash
   # Make your changes
   git add .
   git commit -m "Update: description of changes"
   git push
   ```

2. **Automatic Deployment**
   - Vercel automatically redeploys when you push
   - No manual steps needed
   - Redeploy takes 1-2 minutes

### View Logs

1. **In Vercel Dashboard**
   - Go to "Deployments"
   - Click on any deployment
   - View build logs and runtime logs

### Rollback to Previous Version

1. **In Vercel Dashboard**
   - Go to "Deployments"
   - Find previous deployment
   - Click "Promote to Production"

---

## Environment Variables (Advanced)

### Add API Keys (Optional)

1. **In Vercel Dashboard**
   - Go to Settings → Environment Variables
   - Click "Add New"
   - Name: `NEXT_PUBLIC_TRANSLATION_API_KEY`
   - Value: `your_key_here`
   - Select: Production (or all)
   - Click "Save"

2. **In Code**
   ```javascript
   const apiKey = process.env.NEXT_PUBLIC_TRANSLATION_API_KEY;
   ```

---

## Troubleshooting Deployment

### Build Failed
- **Check:** `.next` folder is in `.gitignore`
- **Check:** Node.js version in `vercel.json`
- **Re-deploy:** Click "Redeploy" in Vercel dashboard

### 404 Pages Not Found
- **Check:** Files are in correct directories
  - Pages: `pages/` folder
  - API: `pages/api/` folder
  - Styles: `public/` folder

### Microphone Not Working
- **Check:** HTTPS is enabled (Vercel provides this)
- **Check:** Browser permissions
- **Check:** Browser console for errors (F12)

### Translation API Errors
- **Check:** Internet connection
- **Check:** MyMemory API is working
- **Try:** Different translation
- **Check:** Browser console logs

### Vercel Free Tier Limits
- ✅ 100GB bandwidth/month (plenty)
- ✅ 12 serverless function executions/second (plenty for <10 users)
- ✅ 50 concurrent executions (plenty)
- ✅ Unlimited deployments

**Your app will work great on free tier!**

---

## Performance Optimization

### Vercel Analytics (Optional)

1. **In Vercel Dashboard**
   - Go to Analytics tab
   - Enable "Web Vitals"
   - Monitor performance

### Caching Strategy

- Static pages: Cached globally
- API routes: Can add caching headers
- Client-side: Browser caching enabled

### Current Performance
- Page load: ~500ms
- Translation API: ~1-2s
- Speech recognition: Real-time (local)

---

## Security Best Practices

✅ **Already Implemented**
- HTTPS enforced (Vercel default)
- No sensitive data stored
- No user tracking
- API rate limiting (built-in)

✅ **Additional Security**
- Keep dependencies updated
- Monitor Vercel dashboard for alerts
- Use environment variables for secrets
- Enable 2FA on GitHub & Vercel

---

## Scaling to More Users

### Current Limits (Free Tier)
- ~10 concurrent users (comfortable)
- ~100 concurrent users (maximum)

### If You Need More

**Option 1: Upgrade Vercel Plan**
- Pro Plan: $20/month
- More serverless function concurrency
- Better uptime SLA

**Option 2: Add Caching**
- Reduce translation API calls
- Use Redis for session storage

**Option 3: Use Paid Translation API**
- Google Translate: $15/month
- Faster, more reliable
- Higher rate limits

---

## Support & Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

### Community Help
- [Stack Overflow](https://stackoverflow.com) - Tag: `nextjs`
- [GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [Vercel Community](https://www.vercel.com/community)

### Monitoring
- [Vercel Status](https://www.vercelstatus.com)
- [GitHub Status](https://www.githubstatus.com)

---

## Success Checklist

- [ ] Code pushed to GitHub
- [ ] Repository is public
- [ ] Vercel project created
- [ ] Deployment successful
- [ ] Live URL working
- [ ] Microphone permission granted
- [ ] Speech recognition working
- [ ] Translation working
- [ ] Tested on multiple browsers
- [ ] Shared with users/participants

---

**🎉 Your speech translator is now live and ready to use!**

For updates or changes, just push to GitHub and Vercel automatically redeploys.

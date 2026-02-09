# 🚀 Render Deployment Checklist

## ✅ Pre-Deployment (Completed)
- [x] Updated server/package.json start script to use `node` instead of `nodemon`
- [x] Added CORS configuration for production URLs
- [x] Created render.yaml for automatic deployment
- [x] Created root package.json for build scripts
- [x] Added .gitignore file
- [x] Migrated to OpenRouter API (free tier)

## 📋 Deployment Steps

### 1. Push to GitHub
```bash
cd "c:\Users\91933\Desktop\Help Code copy"
git init
git add .
git commit -m "Initial commit - Ready for Render deployment"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

### 2. Deploy on Render
1. Go to https://dashboard.render.com/
2. Click **"New"** → **"Web Service"**
3. Connect your GitHub repository
4. Render will auto-detect settings from `render.yaml`
5. Add these **Environment Variables**:
   ```
   MONGO_URI=mongodb+srv://kumarkrishna9801552:krishna%401234@cluster0.35srgkw.mongodb.net/help?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=ht98yty96y67i69i6056oun679ng896u09jkgm95iy50ui60u0ngor
   OPENROUTER_API_KEY=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
   NODE_ENV=production
   ```
6. Click **"Create Web Service"**

### 3. Wait for Build (5-10 minutes)
- Render will install dependencies
- Build the React frontend
- Start the Node.js server

### 4. Update Frontend URL (After Deployment)
Once deployed, your app URL will be: `https://helpcode-ai.onrender.com` (or similar)

Update `client/.env`:
```
VITE_API_BASE_URL=https://helpcode-ai.onrender.com
```

Then rebuild:
```bash
cd client
npm run build
```

Commit and push:
```bash
git add .
git commit -m "Update API URL for production"
git push
```

### 5. Test Your App
Visit: `https://your-app-name.onrender.com`

## 🔧 Important Notes
- **Free Tier**: App sleeps after 15 min inactivity (first request takes ~30s)
- **MongoDB**: Already configured with your Atlas connection
- **OpenRouter**: Using free Gemini 2.0 model (generous limits)
- **Logs**: Check Render Dashboard → Your Service → Logs for errors

## 🎯 Your Current Configuration
- **MongoDB**: ✅ Connected to Atlas
- **API Key**: ✅ OpenRouter configured
- **JWT Secret**: ✅ Set
- **CORS**: ✅ Configured for production
- **Build**: ✅ Optimized for Render

## 📞 Support
If deployment fails, check:
1. Render logs for error messages
2. MongoDB Atlas network access (allow 0.0.0.0/0)
3. Environment variables are correctly set
4. OpenRouter API key is valid

---
**Ready to deploy!** Follow steps 1-5 above.

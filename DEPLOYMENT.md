# Render Deployment Guide for HelpCode AI

## Prerequisites
- GitHub account
- Render account (https://render.com)
- OpenRouter API key (https://openrouter.ai/keys)

## Step 1: Push Code to GitHub
```bash
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Step 2: Deploy on Render

### Option A: Using render.yaml (Recommended)
1. Go to https://dashboard.render.com
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Render will auto-detect `render.yaml`
5. Add environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `OPENROUTER_API_KEY`: Your OpenRouter API key
6. Click "Apply"

### Option B: Manual Setup
1. Go to https://dashboard.render.com
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: helpcode-ai
   - **Environment**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `NODE_ENV` = `production`
     - `MONGO_URI` = `<your-mongodb-uri>`
     - `JWT_SECRET` = `<your-jwt-secret>`
     - `OPENROUTER_API_KEY` = `<your-openrouter-key>`
     - `Frontend_URL` = `https://your-app-name.onrender.com`
5. Click "Create Web Service"

## Step 3: Update Frontend API URL
After deployment, update `client/src/utils/axios.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'https://your-app-name.onrender.com/api';
```

Or add to `client/.env`:
```
VITE_API_URL=https://your-app-name.onrender.com/api
```

## Environment Variables Required
- `MONGO_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `OPENROUTER_API_KEY`: OpenRouter API key
- `Frontend_URL`: Your Render app URL (auto-set by Render)
- `NODE_ENV`: production

## Important Notes
1. Free tier on Render spins down after 15 minutes of inactivity
2. First request after spin-down takes ~30 seconds
3. MongoDB Atlas free tier (M0) is sufficient
4. OpenRouter free tier has generous limits

## Troubleshooting
- Check logs: Render Dashboard → Your Service → Logs
- Verify environment variables are set correctly
- Ensure MongoDB allows connections from anywhere (0.0.0.0/0)
- Check CORS settings if frontend can't connect

## Post-Deployment
Your app will be live at: `https://your-app-name.onrender.com`

# X-Coder Store - Render.com Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Prepare Your Repository
- Ensure all files are committed to your GitHub repository
- The repository should contain all files from the project

### 2. Create Render.com Account
1. Go to [render.com](https://render.com)
2. Sign up for a free account
3. Connect your GitHub account

### 3. Create New Web Service
1. Click "New +" → "Web Service"
2. Select your GitHub repository
3. Use the following configuration:

**Basic Settings:**
- **Name**: `x-coder-store` (or your preferred name)
- **Region**: Choose nearest to your audience
- **Branch**: `main`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Advanced Settings:**
- **Node Version**: `18`
- **Instance Type**: `Free` (upgrade as needed)
- **Health Check Path**: `/api/health`

### 4. Environment Variables
Add these environment variables in Render dashboard:

```bash
NODE_ENV=production
PORT=10000
STORE_NAME=X-Coder Store
STORE_AUTHOR=Mr Ntando Ofc
```

### 5. Deploy
- Click "Create Web Service"
- Wait for deployment (2-3 minutes)
- Your store will be live at `https://x-coder-store.onrender.com`

## 🌐 Custom Domain Setup

### Option 1: Use Render Subdomain
Your store will be available at: `https://x-coder-store.onrender.com`

### Option 2: Custom Domain
1. Purchase a domain (e.g., `xcoder.store`)
2. In Render dashboard:
   - Go to your service → "Custom Domains"
   - Click "Add Custom Domain"
   - Enter your domain name
3. Configure DNS:
   ```
   A record: @ → 216.24.57.1
   CNAME: www → x-coder-store.onrender.com
   ```

## 🔧 Subdomain Configuration

For multiple subdomains, create separate services:

### Main Store
- **Service**: `x-coder-store`
- **URL**: `store.yourdomain.com`
- **Code**: Main repository

### Admin Panel (Future)
- **Service**: `x-coder-admin`
- **URL**: `admin.yourdomain.com`
- **Code**: Same repository, different start command

### API Service (Future)
- **Service**: `x-coder-api`
- **URL**: `api.yourdomain.com`
- **Code**: API-only version

## 📱 Mobile Optimization

The store is fully responsive and will work on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Android Chrome)
- Tablets (iPad, Android tablets)
- All screen sizes

## 🔒 Security Features

Your deployed store includes:
- Content Security Policy (CSP)
- Rate limiting
- HTTPS/SSL encryption
- Secure admin authentication
- Input validation

## 📊 Performance Optimization

Render.com provides:
- Global CDN
- Automatic SSL
- Load balancing
- 99.9% uptime guarantee (paid plans)
- Automatic scaling

## 🛠️ Troubleshooting

### Common Issues:

**1. Deployment Fails**
- Check your `package.json` is valid
- Ensure all dependencies are listed
- Verify `start` script is correct

**2. 502 Bad Gateway**
- Check if server is running on correct port (10000)
- Verify `start` command works locally
- Check Render logs for errors

**3. Images Not Loading**
- Ensure images are in `images/` directory
- Check file paths are relative
- Verify image files exist

**4. Admin Panel Not Working**
- Clear browser cache
- Check localStorage is enabled
- Verify admin credentials (Ntando/Ntando)

### View Logs:
In Render dashboard → Your service → Logs

## 🎯 Post-Deployment Checklist

- [ ] Store loads correctly
- [ ] All services display properly
- [ ] Shopping cart works
- [ ] Admin login works (Ntando/Ntando)
- [ ] Mobile responsive test
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Performance optimization enabled

## 📞 Support

If you encounter issues:
1. Check Render documentation: docs.render.com
2. Review your service logs
3. Test locally first
4. Check this guide for common solutions

## 🔄 Updates and Maintenance

To update your store:
1. Push changes to GitHub
2. Render auto-deploys (if enabled)
3. Manual deploy: Click "Manual Deploy" in Render

---

**Author**: Mr Ntando Ofc  
**Store**: X-Coder Store  
**Deployed on**: Render.com
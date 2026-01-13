# GitHub Repository Setup Guide

## Step-by-Step Instructions

### Step 1: Create GitHub Repository

1. **Go to GitHub**:
   - Visit [github.com](https://github.com)
   - Sign in (or create account if you don't have one)

2. **Create New Repository**:
   - Click the **"+"** icon in top right → **"New repository"**
   - **Repository name**: `thekedar-msme` (or any name you prefer)
   - **Description**: "Quotation Management System for MSME Manufacturing"
   - **Visibility**: 
     - Choose **Public** (free, anyone can see code)
     - Or **Private** (only you/team can see)
   - **DO NOT** check "Initialize with README" (we already have files)
   - **DO NOT** add .gitignore or license (we already have them)
   - Click **"Create repository"**

3. **Copy the Repository URL**:
   - GitHub will show you the repository URL
   - It will look like: `https://github.com/yourusername/thekedar-msme.git`
   - **Copy this URL** - you'll need it in the next step

### Step 2: Initialize Git and Push Code

Open your terminal in the project directory and run these commands:

```bash
# Navigate to your project
cd /Users/apple/Documents/Thekedar-MSME/thekedar-msme

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Quotation Template Management System"

# Add your GitHub repository as remote
# Replace <YOUR_GITHUB_URL> with the URL you copied
git remote add origin <YOUR_GITHUB_URL>

# Example:
# git remote add origin https://github.com/yourusername/thekedar-msme.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Verify Upload

1. Go back to your GitHub repository page
2. Refresh the page
3. You should see all your files uploaded!

### Step 4: Deploy to Vercel

1. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click **"Sign Up"** or **"Log In"**
   - **Sign in with GitHub** (recommended - one click)

2. **Import Project**:
   - Click **"Add New..."** → **"Project"**
   - You'll see your GitHub repositories
   - Find `thekedar-msme` and click **"Import"**

3. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected ✅)
   - **Root Directory**: `./` (or `thekedar-msme` if repo is in subfolder)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)
   - **Environment Variables**: None needed (leave empty)

4. **Deploy**:
   - Click **"Deploy"**
   - Wait 2-3 minutes for build
   - You'll get a URL like: `https://thekedar-msme.vercel.app`

### Step 5: Share with Team

- **Share the Vercel URL** with your team
- Anyone can access it (if repository is public)
- No login required for viewing

## Troubleshooting

### If Git Commands Fail

**"fatal: not a git repository"**:
```bash
cd /Users/apple/Documents/Thekedar-MSME/thekedar-msme
git init
```

**"Permission denied"**:
- Make sure you're logged into GitHub
- Use HTTPS URL (not SSH) if you haven't set up SSH keys

**"remote origin already exists"**:
```bash
git remote remove origin
git remote add origin <YOUR_GITHUB_URL>
```

### If Vercel Deployment Fails

- Check build logs in Vercel dashboard
- Common issues:
  - Wrong root directory (should be `./` or `thekedar-msme`)
  - Missing dependencies (check `package.json`)
  - Build errors (check logs for details)

## Quick Command Reference

```bash
# Initialize and push (run these in order)
cd /Users/apple/Documents/Thekedar-MSME/thekedar-msme
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/thekedar-msme.git
git branch -M main
git push -u origin main
```

## After Deployment

✅ Your app will be live at: `https://your-project.vercel.app`  
✅ Every git push automatically redeploys  
✅ Preview deployments for pull requests  
✅ Free SSL certificate included  

---

**Need Help?** Check the `DEPLOYMENT.md` file for more details!

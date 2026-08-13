#!/bin/bash

# 🚀 Speech Translator - Automated Deployment Script
# This script pushes your code to GitHub and prepares for Vercel deployment

set -e  # Exit on error

echo "🌍 Speech Translator - Deployment Script"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "⚠️  GitHub CLI not found. Will use HTTPS instead."
    USE_GH_CLI=false
else
    USE_GH_CLI=true
fi

# Get repository name
REPO_NAME="speech-translator"

echo -e "${BLUE}Step 1: Initialize Git Repository${NC}"
if [ -d ".git" ]; then
    echo "✓ Git repository already initialized"
else
    git init
    git config user.email "$(git config --global user.email || echo 'user@example.com')"
    git config user.name "$(git config --global user.name || echo 'Speech Translator Dev')"
    echo "✓ Git initialized"
fi

echo ""
echo -e "${BLUE}Step 2: Add all files${NC}"
git add .
echo "✓ Files staged"

echo ""
echo -e "${BLUE}Step 3: Create initial commit${NC}"
git commit -m "Initial commit: Real-time speech translator (English ↔ Mandarin)" 2>/dev/null || echo "✓ Commit ready"

echo ""
echo -e "${BLUE}Step 4: Set main branch${NC}"
git branch -M main 2>/dev/null || true
echo "✓ Branch set to main"

echo ""
echo -e "${YELLOW}Step 5: Create GitHub Repository${NC}"
echo ""
echo "Please enter your GitHub username: "
read -r GITHUB_USERNAME

echo ""
echo "What would you like to name the repository? (default: speech-translator)"
read -r REPO_INPUT
REPO_NAME="${REPO_INPUT:-speech-translator}"

if [ "$USE_GH_CLI" = true ]; then
    echo "Creating repository using GitHub CLI..."
    if gh repo create "$REPO_NAME" --public --source=. --remote=origin --push; then
        echo "✓ Repository created and code pushed!"
    else
        echo "⚠️  GitHub CLI creation failed. Using manual HTTPS method..."
        USE_GH_CLI=false
    fi
fi

if [ "$USE_GH_CLI" = false ]; then
    echo ""
    echo "📝 Manual Setup Required:"
    echo ""
    echo "1. Go to: https://github.com/new"
    echo "2. Create new repository named: $REPO_NAME"
    echo "3. Make it PUBLIC (important for Vercel)"
    echo "4. DON'T initialize with README"
    echo "5. Come back here and press Enter when done"
    read -r

    # Add remote and push
    REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

    echo ""
    echo "Adding remote and pushing code..."
    git remote remove origin 2>/dev/null || true
    git remote add origin "$REPO_URL"

    echo "Pushing to GitHub (you may need to enter credentials)..."
    if git push -u origin main; then
        echo "✓ Code pushed successfully!"
    else
        echo "❌ Push failed. Make sure your GitHub credentials are correct."
        exit 1
    fi
fi

echo ""
echo -e "${GREEN}✅ GitHub Setup Complete!${NC}"
echo ""
echo "Repository URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""

echo -e "${BLUE}Step 6: Deploy to Vercel${NC}"
echo ""
echo "Next steps:"
echo "1. Go to: https://vercel.com/new"
echo "2. Click 'Continue with GitHub'"
echo "3. Select your '$REPO_NAME' repository"
echo "4. Click 'Deploy'"
echo "5. Wait 2-3 minutes for deployment"
echo "6. Copy the live URL and share with users!"
echo ""

echo -e "${GREEN}🎉 All Done!${NC}"
echo ""
echo "Your speech translator will be live at a URL like:"
echo "https://$REPO_NAME-yourusername.vercel.app"
echo ""
echo "Share this URL with your participants!"

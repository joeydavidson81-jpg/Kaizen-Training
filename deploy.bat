@echo off
REM 🚀 Speech Translator - Automated Deployment Script (Windows)
REM This script pushes your code to GitHub and prepares for Vercel deployment

echo.
echo 🌍 Speech Translator - Deployment Script
echo ========================================"
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed. Please install Git first from https://git-scm.com
    pause
    exit /b 1
)

echo Step 1: Initialize Git Repository
if exist .git (
    echo ✓ Git repository already initialized
) else (
    git init
    git config user.email "user@example.com"
    git config user.name "Speech Translator Dev"
    echo ✓ Git initialized
)

echo.
echo Step 2: Add all files
git add .
echo ✓ Files staged

echo.
echo Step 3: Create initial commit
git commit -m "Initial commit: Real-time speech translator (English ↔ Mandarin)" >nul 2>&1 || echo ✓ Commit ready

echo.
echo Step 4: Set main branch
git branch -M main >nul 2>&1
echo ✓ Branch set to main

echo.
echo Step 5: Create GitHub Repository
echo.
set /p GITHUB_USERNAME="Please enter your GitHub username: "

echo.
set /p REPO_INPUT="What would you like to name the repository? (default: speech-translator): "
if "%REPO_INPUT%"=="" (
    set REPO_NAME=speech-translator
) else (
    set REPO_NAME=%REPO_INPUT%
)

echo.
echo 📝 Manual Setup Required:
echo.
echo 1. Go to: https://github.com/new
echo 2. Create new repository named: %REPO_NAME%
echo 3. Make it PUBLIC (important for Vercel)
echo 4. DON'T initialize with README
echo 5. Come back here and press any key when done
pause >nul

echo.
echo Adding remote and pushing code...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

echo Pushing to GitHub (you may need to enter credentials)...
git push -u origin main
if errorlevel 1 (
    echo ❌ Push failed. Make sure your GitHub credentials are correct.
    pause
    exit /b 1
)

echo ✓ Code pushed successfully!

echo.
echo ✅ GitHub Setup Complete!
echo.
echo Repository URL: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo.

echo Step 6: Deploy to Vercel
echo.
echo Next steps:
echo 1. Go to: https://vercel.com/new
echo 2. Click 'Continue with GitHub'
echo 3. Select your '%REPO_NAME%' repository
echo 4. Click 'Deploy'
echo 5. Wait 2-3 minutes for deployment
echo 6. Copy the live URL and share with users!
echo.

echo 🎉 All Done!
echo.
echo Your speech translator will be live at a URL like:
echo https://%REPO_NAME%-yourusername.vercel.app
echo.
echo Share this URL with your participants!
echo.
pause

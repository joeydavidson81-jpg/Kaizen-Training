# 🌍 Real-Time Speech Translator
## English ↔ Mandarin Chinese

A web-based real-time speech translation application built with Next.js and deployed on Vercel. Users can speak in English or Mandarin, and get instant translations in real-time.

### Features

✅ **Real-Time Speech Recognition** — Uses Web Speech API (built into modern browsers)  
✅ **Instant Translation** — English ↔ Mandarin Chinese translation  
✅ **Cross-Platform** — Works on Windows, Mac, and Linux (Chrome, Edge, Safari)  
✅ **Free APIs** — No API keys or paid subscriptions required  
✅ **Responsive Design** — Mobile-friendly interface  
✅ **Zero Configuration** — Ready to deploy on Vercel  

### Tech Stack

- **Frontend:** React, Next.js, Web Speech API
- **Backend:** Next.js API Routes (Serverless Functions)
- **Translation:** MyMemory Translated API (Free)
- **Hosting:** Vercel (Free Tier)
- **Styling:** CSS3 with animations

### Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome  | ✅ Full | Best support |
| Edge    | ✅ Full | Recommended |
| Safari  | ✅ Full | iOS 14.5+ |
| Firefox | ⚠️ Partial | Limited STT support |

---

## Local Development

### Prerequisites

- Node.js 16+ and npm/yarn
- Modern browser with Web Speech API support

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd speech-translator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   - Navigate to `http://localhost:3000`
   - Allow microphone access when prompted
   - Start translating!

### Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/speech-translator.git
   git push -u origin main
   ```

2. **Go to Vercel**
   - Visit https://vercel.com/new
   - Sign in with GitHub
   - Select your repository
   - Click "Deploy"
   - Done! Your app is live

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Link to your Vercel account
   - Confirm project settings
   - Done!

### Option 3: Deploy to Other Platforms

**Netlify:**
```bash
npm run build
# Upload the .next folder to Netlify
```

**Docker (Self-Hosted):**
```bash
docker build -t speech-translator .
docker run -p 3000:3000 speech-translator
```

---

## Usage Guide

### Step 1: Select Languages
- Choose source language (English or Mandarin)
- Choose target language
- Use ⇄ button to swap languages

### Step 2: Start Recording
- Click "Start Listening" button
- Grant microphone permission (if first time)
- Speak clearly into your microphone

### Step 3: Get Translation
- Your speech appears in the **Transcript** section
- Translation appears in the **Translation** section
- Both update in real-time

### Step 4: Stop & Clear
- Click "Stop" when finished
- Click "Clear" to start over

---

## API Reference

### POST `/api/translate`

Translates text from one language to another.

**Request:**
```json
{
  "text": "Hello, how are you?",
  "source": "en",
  "target": "zh"
}
```

**Response:**
```json
{
  "translation": "你好，你好吗？",
  "source": "en",
  "target": "zh"
}
```

**Parameters:**
- `text` (string, required) — Text to translate
- `source` (string, required) — Source language code ("en" or "zh")
- `target` (string, required) — Target language code ("en" or "zh")

---

## Troubleshooting

### Microphone Not Working
- ✓ Check browser permissions (Settings → Privacy)
- ✓ Restart browser
- ✓ Use Chrome or Edge (best support)
- ✓ Check if another app is using microphone

### Translation Not Appearing
- ✓ Check internet connection
- ✓ Reload page (F5)
- ✓ Try a different translation
- ✓ Check browser console for errors (F12)

### Browser Not Supported
- ✓ Use Chrome, Edge, or Safari
- ✓ Update your browser to latest version
- ✓ Firefox has limited support (use others if possible)

### Deployment Issues
- ✓ Ensure Node.js version is 16+
- ✓ Check `.gitignore` includes `node_modules/`
- ✓ Rebuild: `npm run build`
- ✓ Check Vercel logs in dashboard

---

## Performance Optimization

- **Web Workers** — Offload translation processing (future)
- **Caching** — Cache translations to reduce API calls
- **Lazy Loading** — Load libraries on demand
- **Compression** — CSS/JS minified automatically by Next.js

---

## Privacy & Data

- **No Data Storage** — Translations are not saved
- **No User Tracking** — No analytics or cookies
- **API Privacy** — MyMemory API is privacy-friendly
- **Microphone** — Audio is processed locally by Web Speech API
- **HTTPS Only** — All traffic is encrypted

---

## Free API Limits

- **MyMemory (Translation):** 1000 requests/day per IP
- **Web Speech API:** Unlimited (local processing)

For production use with higher volume, consider:
- Google Cloud Translation API ($20/month)
- Microsoft Translator API ($10-30/month)
- AWS Translate (pay-per-use)

---

## Customization

### Change Colors
Edit `public/styles/globals.css`:
```css
--primary-color: #667eea;
--secondary-color: #764ba2;
```

### Add More Languages
Edit `app/components/SpeechTranslator.js`:
```jsx
<option value="es">Spanish 🇪🇸</option>
<option value="fr">French 🇫🇷</option>
```

Then update language mapping in `pages/api/translate.js`.

### Custom Translation Service
Replace MyMemory with your preferred API:
```javascript
// Use Google Translate, DeepL, or others
const response = await axios.get('https://your-api-endpoint');
```

---

## License

MIT License — Free to use and modify

---

## Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review browser console errors (F12)
3. Check Vercel deployment logs
4. Open an issue on GitHub

---

## Roadmap

- [ ] Add more language pairs
- [ ] Implement audio file upload
- [ ] Add text-to-speech for translations
- [ ] Create desktop app (Electron)
- [ ] Mobile app (React Native)
- [ ] Multi-user conversations
- [ ] Translation history
- [ ] Custom vocabulary support

---

**Built with ❤️ for global communication**

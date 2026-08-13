import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, source, target } = req.body;

  if (!text || !source || !target) {
    return res.status(400).json({ error: 'Missing required fields: text, source, target' });
  }

  try {
    // Use free Google Translate API via mymemory.translated.net
    // Alternative: You can use other free APIs like LibreTranslate

    const sourceMap = { en: 'en', zh: 'zh-CN' };
    const targetMap = { en: 'en', zh: 'zh-CN' };

    const sourceCode = sourceMap[source] || source;
    const targetCode = targetMap[target] || target;

    // Using MyMemory Translated API (free, no auth required)
    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: `${sourceCode}|${targetCode}`,
      },
      timeout: 10000,
    });

    if (response.data.responseStatus === 200) {
      return res.status(200).json({
        translation: response.data.responseData.translatedText,
        source,
        target,
      });
    } else {
      throw new Error('Translation API error');
    }
  } catch (error) {
    console.error('Translation error:', error.message);

    // Fallback: Return placeholder if API fails
    return res.status(500).json({
      error: 'Translation failed',
      message: 'Please check your internet connection and try again.',
    });
  }
}

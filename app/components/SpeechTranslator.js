#!/usr/bin/env python3
import os

# Change to your project directory
os.chdir(r'C:\Users\gameo\Downloads\speech-translator\speech-translator')

# Read the file
with open('app/components/SpeechTranslator.js', 'r') as f:
    content = f.read()

# TTS function to add
tts_code = '''  const speakText = (text, language) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'en' ? 'en-US' : 'zh-CN';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

'''

# Find "return (" and insert before it
if 'return (' in content:
    content = content.replace('  return (', tts_code + '  return (', 1)

    with open('app/components/SpeechTranslator.js', 'w') as f:
        f.write(content)

    print("✓ Step 1-2: TTS code added!")

    # Step 3: Commit and push
    os.system('git add app/components/SpeechTranslator.js')
    os.system('git commit -m "Add text-to-speech"')
    os.system('git push')
    print("✓ Step 3: Pushed to GitHub!")
else:
    print("Error: Could not find return statement")

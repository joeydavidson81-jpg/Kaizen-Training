'use client';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
export default function SpeechTranslator() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [translation, setTranslation] = useState('');
    const [sourceLanguage, setSourceLanguage] = useState('en');
    const [targetLanguage, setTargetLanguage] = useState('zh');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const recognitionRef = useRef(null);
    const [isBrowserSupported, setIsBrowserSupported] = useState(true);
    const [voicesLoaded, setVoicesLoaded] = useState(false);
    // Initialize Web Speech API and Text-to-Speech voices
  useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
                setIsBrowserSupported(false);
                setError('Speech Recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
                return;
        }
        // Load Text-to-Speech voices
                const loadVoices = () => {
                        if (window.speechSynthesis) {
                                  window.speechSynthesis.onvoiceschanged = () => {
                                              setVoicesLoaded(true);
                                  };
                                  // Try to load voices immediately
                          if (window.speechSynthesis.getVoices().length > 0) {
                                      setVoicesLoaded(true);
                          }
                        }
                };
        loadVoices();
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.language = sourceLanguage === 'en' ? 'en-US' : 'zh-CN';
        recognition.onstart = () => {
                setIsListening(true);
                setError('');
        };
        recognition.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                          const transcript = event.results[i][0].transcript;
                          if (event.results[i].isFinal) {
                                      finalTranscript += transcript + ' ';
                          } else {
                                      interimTranscript += transcript;
                          }
                }
                if (finalTranscript) {
                          setTranscript((prev) => prev + finalTranscript);
                          handleTranslation(finalTranscript);
                }
        };
        recognition.onerror = (event) => {
                setError(`Speech Recognition Error: ${event.error}`);
                setIsListening(false);
        };
        recognition.onend = () => {
                setIsListening(false);
        };
        recognitionRef.current = recognition;
        return () => {
                if (recognitionRef.current) {
                          recognitionRef.current.abort();
                }
        };
  }, [sourceLanguage]);
    const handleTranslation = async (text) => {
          if (!text.trim()) return;
          setLoading(true);
          try {
                  const response = await axios.post('/api/translate', {
                            text: text.trim(),
                            source: sourceLanguage,
                            target: targetLanguage,
                  });
                  const translatedText = response.data.translation;
                  setTranslation((prev) => prev + translatedText + ' ');
                  speakText(translatedText, targetLanguage);
          } catch (err) {
                  console.error('Translation error:', err);
                  setError('Failed to translate text. Please check your internet connection.');
          } finally {
                  setLoading(false);
          }
    };
    const startListening = () => {
          if (recognitionRef.current && isBrowserSupported) {
                  setTranscript('');
                  setTranslation('');
                  recognitionRef.current.start();
          }
    };
    const stopListening = () => {
          if (recognitionRef.current) {
                  recognitionRef.current.stop();
          }
    };
    const swapLanguages = () => {
          setSourceLanguage(sourceLanguage === 'en' ? 'zh' : 'en');
          setTargetLanguage(targetLanguage === 'en' ? 'zh' : 'en');
          setTranscript('');
          setTranslation('');
    };
    const clearAll = () => {
          setTranscript('');
          setTranslation('');
          setError('');
    };
    if (!isBrowserSupported) {
          return (
                  <div className="card error">
                    <p>{error}</p>
            </div>
          );
    }
    // Text-to-Speech function
  const speakText = (text, language) => {
        if (!window.speechSynthesis || !text.trim()) {
                setError('Text-to-Speech is not supported or no text to speak.');
                return;
        }
        try {
                setIsSpeaking(true);
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = language === 'en' ? 'en-US' : 'zh-CN';
                utterance.rate = 0.9;
                utterance.pitch = 1;
                // Get available voices and find the best match
          const voices = window.speechSynthesis.getVoices();
                if (voices.length > 0) {
                          const langCode = language === 'en' ? 'en' : 'zh';
                          // Find a voice matching the language
                  const matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith(langCode));
                          if (matchedVoice) {
                                      utterance.voice = matchedVoice;
                          }
                }
                utterance.onend = () => {
                          setIsSpeaking(false);
                };
                utterance.onerror = (event) => {
                          console.error('TTS error:', event);
                          setError(`Speech synthesis error: ${event.error}`);
                          setIsSpeaking(false);
                };
                window.speechSynthesis.speak(utterance);
        } catch (e) {
                console.error('TTS error:', e);
                setError('Failed to play audio. Please try again.');
                setIsSpeaking(false);
        }
  };
    return (
          <div className="translator-container">
    {/* Language Selection */}
            <div className="language-selector">
              <div className="language-pair">
                <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)} disabled={isListening}>
              <option value="en">English 🇬🇧</option>
            <option value="zh">Mandarin Chinese 🇨🇳</option>
  </select>
          <button onClick={swapLanguages} className="swap-btn" disabled={isListening}>
              ⇄
  </button>
          <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)} disabled={isListening}>
              <option value="en">English 🇬🇧</option>
            <option value="zh">Mandarin Chinese 🇨🇳</option>
  </select>
  </div>
  </div>
{/* Control Buttons */}
      <div className="controls">
                <button
          onClick={startListening}
          disabled={isListening}
          className="btn btn-primary"
        >
                      🎤 Start Listening
            </button>
        <button
          onClick={stopListening}
          disabled={!isListening}
          className="btn btn-danger"
        >
                      ⏹️ Stop
            </button>
        <button onClick={clearAll} className="btn btn-secondary">
                      🗑️ Clear
            </button>
            </div>
{/* Status Indicator */}
{isListening && (
          <div className="status">
            <div className="listening-indicator"></div>
           <span>Listening...</span>
  </div>
       )}
{/* Error Message */}
{error && (
          <div className="error-message">
            ⚠️ {error}
 </div>
       )}
{/* Transcript */}
      <div className="output-section">
                <h3>Transcript ({sourceLanguage === 'en' ? 'English' : 'Mandarin'})</h3>
        <div className="output-box">
      {transcript || <span className="placeholder">Your speech will appear here...</span>}
        </div>
        </div>
{/* Translation */}
      <div className="output-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3>Translation ({targetLanguage === 'en' ? 'English' : 'Mandarin'})</h3>
{translation && (
              <button
               onClick={() => speakText(translation, targetLanguage)}
               disabled={isSpeaking || !translation}
              className="btn btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            >
              🔊 Speak
                </button>
          )}
</div>
        <div className="output-box">
          {loading && <span className="loading">Translating...</span>}
{translation || <span className="placeholder">Translation will appear here...</span>}
  </div>
  </div>
 {/* Info Box */}
       <div className="info-box">
                 <h4>How to use:</h4>
         <ul>
       {/* eslint-disable-next-line react/no-unescaped-entities */}
                   <li>Select your source and target languages</li>
           <li>{/* eslint-disable-next-line react/no-unescaped-entities */}Click &quot;Start Listening&quot; to begin recording</li>
           <li>Speak clearly into your microphone</li>
           <li>Translations appear in real-time</li>
           <li>Click '"Sto<li>{/* eslint-disable-next-line react/no-unescaped-entities */}Click &quot;Stop&quot; when finished</li>
           <li>Click the 🔊 Speak button to hear the translation aloud</li>
         </ul>
         </div>
         </div>
   );
}

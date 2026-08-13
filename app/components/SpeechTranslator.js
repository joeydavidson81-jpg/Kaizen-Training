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
  const recognitionRef = useRef(null);
  const [isBrowserSupported, setIsBrowserSupported] = useState(true);

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsBrowserSupported(false);
      setError('Speech Recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

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

      setTranslation((prev) => prev + response.data.translation + ' ');
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
        <h3>Translation ({targetLanguage === 'en' ? 'English' : 'Mandarin'})</h3>
        <div className="output-box">
          {loading && <span className="loading">Translating...</span>}
          {translation || <span className="placeholder">Translation will appear here...</span>}
        </div>
      </div>

      {/* Info Box */}
      <div className="info-box">
        <h4>How to use:</h4>
        <ul>
          <li>Select your source and target languages</li>
          <li>Click "Start Listening" to begin recording</li>
          <li>Speak clearly into your microphone</li>
          <li>Translations appear in real-time</li>
          <li>Click "Stop" when finished</li>
        </ul>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import SpeechTranslator from '../app/components/SpeechTranslator';
import '../public/styles/globals.css';

export default function Home() {
  return (
    <main className="container">
      <div className="header">
        <h1>🌍 Real-Time Speech Translator</h1>
        <p>English ↔ Mandarin Chinese</p>
      </div>
      <SpeechTranslator />
    </main>
  );
}

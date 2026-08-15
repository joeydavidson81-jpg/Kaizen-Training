import Image from 'next/image';
import SpeechTranslator from '@/app/components/SpeechTranslator';

export default function Home() {
  return (
    <div className="container">
      <div className="header">
        <Image
          src="/pickleball.png"
          alt="A red pickleball surrounded by flames"
          width={1254}
          height={1254}
          className="header-image"
          priority
        />

        <h1>Real-Time Speech Translator</h1>
        <p>English ↔ Mandarin Chinese</p>
      </div>

      <SpeechTranslator />
    </div>
  );
}

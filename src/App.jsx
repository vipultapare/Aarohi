import { useState } from 'react';
import FloatingHeartsCanvas from './FloatingHeartsCanvas';
import EnchantedWelcome from './EnchantedWelcome';
import MusicControl from './MusicControl';
import HeroSection from './HeroSection';
import LoveCounter from './LoveCounter';
import WhyYouMatter from './WhyYouMatter';
import LoveJar from './LoveJar';
import LoveLetter from './LoveLetter';
import OurSpecialSong from './OurSpecialSong';
import ForeverProposal from './ForeverProposal';
import Footer from './Footer';
import './App.css';

export default function App() {
  const [hasUnlocked, setHasUnlocked] = useState(false);

  return (
    <div className="app-container">
      {/* Background animated particle canvas */}
      <FloatingHeartsCanvas />

      {/* Opening curtain envelope */}
      {!hasUnlocked && (
        <EnchantedWelcome onOpen={() => setHasUnlocked(true)} />
      )}

      {/* Main romantic journey */}
      <div className={`experience-shell ${hasUnlocked ? 'unlocked' : 'locked'}`}>
        <MusicControl />

        <main className="main-content">
          <HeroSection />

          <section className="section-container">
            <LoveCounter />
          </section>

          <section className="section-container">
            <WhyYouMatter />
          </section>

          <section className="section-container">
            <LoveJar />
          </section>

          <section className="section-container">
            <LoveLetter />
          </section>

          <section className="section-container">
            <OurSpecialSong />
          </section>

          <section className="section-container">
            <ForeverProposal />
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

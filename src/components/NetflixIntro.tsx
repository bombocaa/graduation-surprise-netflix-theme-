import React, { useEffect, useState, useMemo } from 'react';
import { playTaDumSound } from '../utils/taDumSound';
import { Volume2, VolumeX, FastForward } from 'lucide-react';
import './NetflixIntro.css';

interface NetflixIntroProps {
  onComplete?: () => void;
  autoPlaySound?: boolean;
}

export const NetflixIntro: React.FC<NetflixIntroProps> = ({
  onComplete,
  autoPlaySound = true,
}) => {
  const [isMuted, setIsMuted] = useState(!autoPlaySound);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showSpectrum, setShowSpectrum] = useState(false);
  const [soundPlayed, setSoundPlayed] = useState(false);

  // Generate 40 vibrant spectrum light bars for the explosion effect
  const spectrumBars = useMemo(() => {
    const colors = [
      '#E50914', '#B1060F', '#FF2A35', '#D81F26', 
      '#FF5E66', '#83060C', '#FFFFFF', '#FFAA00', 
      '#990000', '#FF0055', '#4A00E0', '#8E2DE2'
    ];
    
    return Array.from({ length: 42 }).map((_, idx) => {
      const offset = (idx - 21) * 32 + (Math.random() * 16 - 8);
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const scale = 0.8 + Math.random() * 0.8;
      const width = 4 + Math.random() * 12;
      return {
        id: idx,
        x: `${offset}px`,
        color: randomColor,
        scale,
        width: `${width}px`,
      };
    });
  }, []);

  const triggerAudio = () => {
    if (!isMuted && !soundPlayed) {
      playTaDumSound();
      setSoundPlayed(true);
    }
  };

  useEffect(() => {
    // Attempt auto-play sound
    const audioTimer = setTimeout(() => {
      triggerAudio();
    }, 150);

    // Spectrum explosion trigger at ~2.5s
    const spectrumTimer = setTimeout(() => {
      setShowSpectrum(true);
    }, 2400);

    // Fade out start at ~3.6s
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3600);

    // Complete callback at 4.2s
    const completeTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 4200);

    return () => {
      clearTimeout(audioTimer);
      clearTimeout(spectrumTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [isMuted, soundPlayed]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 400);
  };

  const toggleSound = () => {
    if (isMuted) {
      setIsMuted(false);
      playTaDumSound();
      setSoundPlayed(true);
    } else {
      setIsMuted(true);
    }
  };

  return (
    <div 
      className={`netflix-intro-overlay ${isFadingOut ? 'fade-out' : ''}`}
      onClick={triggerAudio}
    >
      {/* Background vignette glow */}
      <div className="intro-bg-glow" />

      {/* Spectrum explosion rays during zoom */}
      <div className={`spectrum-container ${showSpectrum ? 'active' : ''}`}>
        {spectrumBars.map((bar) => (
          <div
            key={bar.id}
            className="spectrum-bar"
            style={{
              '--bar-x': bar.x,
              '--bar-color': bar.color,
              '--bar-scale': bar.scale,
              width: bar.width,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Main Netflix N Animation */}
      <div className="intro-stage">
        <div className="logo-wrapper">
          <div className="shimmer-overlay" />
          
          <svg
            className="netflix-n-svg"
            viewBox="0 0 180 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Left ribbon gradient */}
              <linearGradient id="leftGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B1060F" />
                <stop offset="60%" stopColor="#E50914" />
                <stop offset="100%" stopColor="#E50914" />
              </linearGradient>

              {/* Right ribbon gradient */}
              <linearGradient id="rightGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E50914" />
                <stop offset="70%" stopColor="#B1060F" />
                <stop offset="100%" stopColor="#83060C" />
              </linearGradient>

              {/* Center diagonal gradient */}
              <linearGradient id="centerGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E50914" />
                <stop offset="50%" stopColor="#DB0510" />
                <stop offset="100%" stopColor="#83060C" />
              </linearGradient>

              {/* Realistic 3D Shadow for center ribbon on left ribbon */}
              <filter id="shadowLeft" x="-20%" y="-20%" width="160%" height="160%">
                <feDropShadow dx="-8" dy="0" stdDeviation="6" floodColor="#000" floodOpacity="0.85" />
              </filter>
            </defs>

            {/* Left Pillar */}
            <path
              className="ribbon-left"
              d="M 15,0 L 60,0 L 60,295 Q 37.5,302 15,295 Z"
              fill="url(#leftGrad)"
            />

            {/* Right Pillar */}
            <path
              className="ribbon-right"
              d="M 120,0 L 165,0 L 165,295 Q 142.5,302 120,295 Z"
              fill="url(#rightGrad)"
            />

            {/* Center Diagonal Ribbon with 3D drop shadow */}
            <path
              className="ribbon-center"
              d="M 15,0 L 60,0 L 165,295 Q 142.5,302 120,295 L 15,0 Z"
              fill="url(#centerGrad)"
              filter="url(#shadowLeft)"
            />
          </svg>
        </div>
      </div>

      {/* Audio hint banner if sound hasn't triggered */}
      {!soundPlayed && !isMuted && (
        <div className="audio-hint-banner" onClick={triggerAudio}>
          <Volume2 size={16} /> Click anywhere for Sound (TA-DUM)
        </div>
      )}

      {/* Intro Controls: Audio & Skip */}
      <div className="intro-controls">
        <button 
          className="intro-btn" 
          onClick={toggleSound}
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          <span>{isMuted ? 'Muted' : 'Sound On'}</span>
        </button>

        <button 
          className="intro-btn" 
          onClick={handleSkip}
          title="Skip Netflix Intro"
        >
          <FastForward size={16} />
          <span>Skip Intro</span>
        </button>
      </div>
    </div>
  );
};
export default NetflixIntro;

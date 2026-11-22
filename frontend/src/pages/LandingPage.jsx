import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import CesiumGlobe from '../components/cesium/CesiumGlobe';
import HeroSection from '../components/landing/HeroSection';
import PlanetaryIntelligenceSection from '../components/landing/PlanetaryIntelligenceSection';
import QuestionIntelligenceSection from '../components/landing/QuestionIntelligenceSection';
import GisOrchestrationSection from '../components/landing/GisOrchestrationSection';
import ChangeDetectionSection from '../components/landing/ChangeDetectionSection';
import SatelliteIntelligenceSection from '../components/landing/SatelliteIntelligenceSection';
import AIAnalystSection from '../components/landing/AIAnalystSection';
import DataInsightSection from '../components/landing/DataInsightSection';
import CommandCenterPreviewSection from '../components/landing/CommandCenterPreviewSection';
import FinalCTASection from '../components/landing/FinalCTASection';

const cameraProgression = [
  { lng: 78.0, lat: 20.0, height: 24000000.0, pitch: -90, heading: 0, duration: 1.4 },
  { lng: 85.0, lat: 22.0, height: 15000000.0, pitch: -80, heading: 10, duration: 1.4 },
  { lng: 80.0, lat: 24.0, height: 8000000.0, pitch: -70, heading: 15, duration: 1.4 },
  { lng: 78.5, lat: 26.0, height: 3800000.0, pitch: -60, heading: 0, duration: 1.4 },
  { lng: 77.2090, lat: 28.6139, height: 1200000.0, pitch: -50, heading: 350, duration: 1.4 },
  { lng: 77.2090, lat: 28.6139, height: 400000.0, pitch: -45, heading: 345, duration: 1.4 },
  { lng: 77.2090, lat: 28.6139, height: 250000.0, pitch: -40, heading: 0, duration: 1.4 },
  { lng: 77.2090, lat: 28.6139, height: 650000.0, pitch: -50, heading: 10, duration: 1.4 },
  { lng: 77.2090, lat: 28.6139, height: 1100000.0, pitch: -55, heading: 0, duration: 1.4 },
  { lng: 78.0, lat: 20.0, height: 22000000.0, pitch: -90, heading: 0, duration: 1.6 },
];

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    let frameId = null;
    let lastIndex = -1;

    const updateActiveSection = () => {
      frameId = null;
      const markerY = window.innerHeight * 0.35;
      const sections = document.querySelectorAll('.landing-story > section');
      if (!sections.length) return;

      let activeIndex = 0;
      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= markerY) activeIndex = index;
      });

      const boundedIndex = Math.min(cameraProgression.length - 1, activeIndex);
      if (boundedIndex !== lastIndex) {
        lastIndex = boundedIndex;
        setActiveSection(boundedIndex);
      }
    };

    const handleScroll = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const handleExploreClick = () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative w-full min-h-screen bg-[#020408] text-white">
      <Navbar />

      <div className="fixed inset-0 z-0 pointer-events-auto">
        <CesiumGlobe
          cameraTarget={cameraProgression[activeSection]}
          interactive={true}
          autoRotate={activeSection === 0 || activeSection === 9}
          highlightRegion={{
            lng: 77.2090,
            lat: 28.6139,
            radius: 55000.0,
            name: 'delhi ncr'
          }}
          markers={[
            { lng: 77.2090, lat: 28.6139, title: 'delhi ncr — target analysis region' },
            { lng: 72.8777, lat: 19.0760, title: 'mumbai' },
            { lng: 77.5946, lat: 12.9716, title: 'bengaluru' },
            { lng: 88.3639, lat: 22.5726, title: 'kolkata' },
          ]}
        />
      </div>

      <div className="relative z-10 landing-story">
        <HeroSection onExploreClick={handleExploreClick} />
        <PlanetaryIntelligenceSection />
        <QuestionIntelligenceSection />
        <GisOrchestrationSection />
        <ChangeDetectionSection />
        <SatelliteIntelligenceSection />
        <AIAnalystSection />
        <DataInsightSection />
        <CommandCenterPreviewSection />
        <FinalCTASection />
      </div>
    </div>
  );
}

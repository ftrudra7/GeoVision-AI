import React, { useState, useEffect, useRef } from 'react';
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
  // 01 - Hero
  { lng: 78.0, lat: 20.0, height: 24000000.0, pitch: -90, heading: 0, duration: 2.0 },
  // 02 - Planetary Intelligence
  { lng: 85.0, lat: 22.0, height: 15000000.0, pitch: -80, heading: 10, duration: 2.0 },
  // 03 - Question -> Intelligence
  { lng: 80.0, lat: 24.0, height: 8000000.0, pitch: -70, heading: 15, duration: 2.0 },
  // 04 - Intelligent GIS Orchestration
  { lng: 78.5, lat: 26.0, height: 3800000.0, pitch: -60, heading: 0, duration: 2.0 },
  // 05 - Change Detection (Delhi NCR)
  { lng: 77.2090, lat: 28.6139, height: 1200000.0, pitch: -50, heading: 350, duration: 2.0 },
  // 06 - Satellite Intelligence
  { lng: 77.2090, lat: 28.6139, height: 400000.0, pitch: -45, heading: 345, duration: 2.0 },
  // 07 - AI Analyst
  { lng: 77.2090, lat: 28.6139, height: 250000.0, pitch: -40, heading: 0, duration: 2.0 },
  // 08 - Data -> Insight
  { lng: 77.2090, lat: 28.6139, height: 650000.0, pitch: -50, heading: 10, duration: 2.0 },
  // 09 - Command Center Preview
  { lng: 77.2090, lat: 28.6139, height: 1100000.0, pitch: -55, heading: 0, duration: 2.0 },
  // 10 - Final CTA
  { lng: 78.0, lat: 20.0, height: 22000000.0, pitch: -90, heading: 0, duration: 2.5 },
];

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const index = Math.min(
        cameraProgression.length - 1,
        Math.max(0, Math.floor((scrollY + windowHeight * 0.35) / windowHeight))
      );
      if (index !== activeSection) {
        setActiveSection(index);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleExploreClick = () => {
    const element = document.getElementById('story');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#020408] text-white">
      <Navbar />

      {/* Fixed Background Cesium Globe */}
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

      {/* Storytelling Narrative Sections */}
      <div className="relative z-10">
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

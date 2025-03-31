import React, { useState } from 'react';
import config from '../../config.json';
import Navigation from '../components/landing/Navigation';
import Hero from '../components/landing/Hero';
import SocialProof from '../components/landing/SocialProof';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';
import FAQ from '../components/landing/FAQ';
import CTA from '../components/landing/CTA';
import TrustBadges from '../components/landing/TrustBadges';
import ExitPopup from '../components/landing/ExitPopup';
import Footer from '../components/landing/Footer';
import { useSessionStorage } from '../hooks/useSessionStorage';
export default function LandingPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useSessionStorage('hasShownPopup', false); 
  const [hasClosedPopup, setHasClosedPopup] = useSessionStorage('hasClosedPopup', false); 
  const [pageLoadTime] = useState(Date.now());

  // Exit intent detection
  React.useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only show popup if:
      // 1. It hasn't been shown this session
      // 2. User has been on the page for at least 30 seconds
      // 3. Mouse leaves towards the top of the page
      // 4. Discount is enabled in config
      if (
        !hasShownPopup && 
        e.clientY <= 0 && 
        Date.now() - pageLoadTime > 30000 &&
        config.showDiscount
      ) {
        setShowPopup(true);
        setHasShownPopup(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShownPopup, pageLoadTime, setHasShownPopup]);

  return (
    <div className="bg-dark-900">
      <Navigation 
        onShowOffer={() => setShowPopup(true)} 
        showOfferButton={hasClosedPopup && config.showDiscount} 
      />
      <Hero />
      <SocialProof />
      <Features />
      {config.showTestimonials && <Testimonials />}
      <Pricing />
      <FAQ />
      <CTA />
      {config.showDiscount && <ExitPopup 
        show={showPopup} 
        onClose={() => {
          setShowPopup(false);
          setHasClosedPopup(true);
        }} 
      />}
      <TrustBadges />
      <Footer />
    </div>
  );
}
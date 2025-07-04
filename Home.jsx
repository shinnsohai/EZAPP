import React from 'react';
import Hero from '../components/Hero';
import TrustIndicators from '../components/TrustIndicators';
import GettingStarted from '../components/GettingStarted';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

const Home = () => {
  return (
    <>
      <Hero />
      <TrustIndicators />
      <GettingStarted />
      <Testimonials />
      <FAQ />
    </>
  );
};

export default Home;


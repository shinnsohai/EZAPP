import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="fade-in-up">Find reliable interior designers</h1>
            <p className="hero-subtitle fade-in-up">
              Experience easier renovations with interior firms you can trust.
            </p>
            <button className="btn btn-primary hero-cta fade-in-up">
              Find a Designer
            </button>
          </div>
          <div className="hero-image">
            <img src="/hero_interior.png" alt="Modern interior design" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


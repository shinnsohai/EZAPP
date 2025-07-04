import React from 'react';
import './GettingStarted.css';

const GettingStarted = () => {
  const steps = [
    {
      title: 'Get a Shortlist',
      description: 'Not sure where to start? Share your renovation details with us, and our Ez-ID Guide will send you a list of fitting interior firms via email.',
      cta: 'Get Started',
      icon: '📋'
    },
    {
      title: 'Browse Directly',
      description: 'Know what you like? Browse interior firms, fill up the enquiry form, and connect with a designer.',
      cta: 'Browse Here',
      icon: '🔍'
    },
    {
      title: 'Ez-ID Meetup',
      description: 'Pressed for time? Meet multiple firms in one place over a weekend to discuss your renovation and get quotes.',
      cta: 'Book a Slot',
      icon: '🤝'
    }
  ];

  return (
    <section className="getting-started section-light">
      <div className="container">
        <div className="section-header">
          <h2>3 simple ways to get started</h2>
        </div>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card fade-in-up">
              <div className="step-icon">
                <span>{step.icon}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <button className="btn btn-secondary step-cta">
                {step.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GettingStarted;


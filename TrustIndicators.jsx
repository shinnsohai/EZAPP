import React from 'react';
import './TrustIndicators.css';

const TrustIndicators = () => {
  const indicators = [
    {
      icon: '🛡️',
      title: 'Verified Designers Only',
      description: 'All firms are vetted through a strict onboarding criteria.'
    },
    {
      icon: '💰',
      title: 'No Hidden Charges',
      description: 'Our service is entirely free and we do not receive any commissions.'
    },
    {
      icon: '🔒',
      title: '$50K Ez-ID Guarantee',
      description: 'Get your renovation deposits back in the event of a firm\'s insolvency.'
    }
  ];

  return (
    <section className="trust-indicators section-gray">
      <div className="container">
        <div className="indicators-grid">
          {indicators.map((indicator, index) => (
            <div key={index} className="indicator-card fade-in-up">
              <div className="indicator-icon">
                <span>{indicator.icon}</span>
              </div>
              <h3>{indicator.title}</h3>
              <p>{indicator.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;


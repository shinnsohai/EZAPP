import React from 'react';
import './About.css';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      position: "Founder & CEO",
      image: "/api/placeholder/300/300",
      bio: "With over 10 years in interior design, Sarah founded Ez-ID to make quality design accessible to everyone.",
      linkedin: "#"
    },
    {
      id: 2,
      name: "Michael Wong",
      position: "Head of Design",
      image: "/api/placeholder/300/300",
      bio: "Michael leads our design team with expertise in modern and contemporary interior solutions.",
      linkedin: "#"
    },
    {
      id: 3,
      name: "Lisa Tan",
      position: "Customer Success Manager",
      image: "/api/placeholder/300/300",
      bio: "Lisa ensures every customer has an exceptional experience throughout their design journey.",
      linkedin: "#"
    },
    {
      id: 4,
      name: "David Lim",
      position: "Technology Director",
      image: "/api/placeholder/300/300",
      bio: "David builds the technology that powers our platform and connects customers with designers.",
      linkedin: "#"
    }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Quality First",
      description: "We partner only with verified, experienced designers who meet our strict quality standards."
    },
    {
      icon: "🤝",
      title: "Trust & Transparency",
      description: "Complete transparency in pricing, processes, and designer qualifications builds lasting trust."
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "We continuously innovate to make interior design more accessible and enjoyable for everyone."
    },
    {
      icon: "❤️",
      title: "Customer-Centric",
      description: "Every decision we make is guided by what's best for our customers and their dream homes."
    }
  ];

  const milestones = [
    {
      year: "2024",
      title: "Ez-ID Launch",
      description: "Founded Ez-ID with a mission to revolutionize interior design accessibility in Singapore."
    },
    {
      year: "2024",
      title: "100+ Designers",
      description: "Onboarded over 100 verified interior designers across Singapore."
    },
    {
      year: "2024",
      title: "1,000+ Projects",
      description: "Successfully completed over 1,000 interior design projects."
    },
    {
      year: "2024",
      title: "$50K Guarantee",
      description: "Launched our industry-leading $50,000 renovation guarantee program."
    }
  ];

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <div className="hero-content">
            <h1>About Ez-ID</h1>
            <p>Revolutionizing interior design by making quality design accessible, transparent, and stress-free for everyone.</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                At Ez-ID, we believe everyone deserves a beautiful home. We're on a mission to democratize 
                interior design by connecting homeowners with talented designers through a transparent, 
                trustworthy platform that makes the design process easy and enjoyable.
              </p>
              <p>
                Founded in 2024, Ez-ID was born from the frustration of navigating the complex world of 
                interior design. We saw homeowners struggling to find reliable designers, understand pricing, 
                and manage renovation projects. That's why we created a platform that puts transparency, 
                quality, and customer satisfaction at the heart of everything we do.
              </p>
            </div>
            <div className="mission-image">
              <img src="/api/placeholder/500/400" alt="Ez-ID Mission" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section section-gray">
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  <span>{value.icon}</span>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>The passionate people behind Ez-ID</p>
          </div>
          <div className="team-grid">
            {teamMembers.map(member => (
              <div key={member.id} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                  <div className="team-overlay">
                    <a href={member.linkedin} className="linkedin-link">
                      💼 LinkedIn
                    </a>
                  </div>
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <h4>{member.position}</h4>
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section section-gray">
        <div className="container">
          <div className="section-header">
            <h2>Our Journey</h2>
            <p>Key milestones in our growth</p>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Verified Designers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1,000+</div>
              <div className="stat-label">Completed Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.8★</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">$50K</div>
              <div className="stat-label">Guarantee Protection</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to transform your space?</h2>
            <p>Join thousands of satisfied homeowners who have found their perfect designer through Ez-ID.</p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Find a Designer</button>
              <button className="btn btn-secondary">Contact Us</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;


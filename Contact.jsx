import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    projectType: '',
    budget: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
  };

  const contactMethods = [
    {
      icon: "📞",
      title: "Phone",
      details: "+65 6123 4567",
      description: "Mon-Fri, 9AM-6PM SGT"
    },
    {
      icon: "✉️",
      title: "Email",
      details: "hello@ez-id.sg",
      description: "We'll respond within 24 hours"
    },
    {
      icon: "💬",
      title: "Live Chat",
      details: "Available on website",
      description: "Instant support during business hours"
    },
    {
      icon: "📍",
      title: "Office",
      details: "123 Design Street, Singapore 123456",
      description: "Visit us by appointment"
    }
  ];

  const faqs = [
    {
      question: "How quickly can I get a response?",
      answer: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly."
    },
    {
      question: "Do you offer free consultations?",
      answer: "Yes! We offer free initial consultations to understand your project needs and match you with the right designer."
    },
    {
      question: "What information should I include in my inquiry?",
      answer: "Please include your project type, budget range, timeline, and any specific requirements or preferences you have."
    },
    {
      question: "Can I visit your office?",
      answer: "Absolutely! We welcome office visits by appointment. Please contact us to schedule a meeting with our team."
    }
  ];

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Get in Touch</h1>
            <p>Ready to start your interior design journey? We're here to help you every step of the way.</p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods-section">
        <div className="container">
          <div className="section-header">
            <h2>How to Reach Us</h2>
            <p>Choose the method that works best for you</p>
          </div>
          <div className="contact-methods-grid">
            {contactMethods.map((method, index) => (
              <div key={index} className="contact-method-card">
                <div className="method-icon">
                  <span>{method.icon}</span>
                </div>
                <h3>{method.title}</h3>
                <div className="method-details">{method.details}</div>
                <p>{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section section-gray">
        <div className="container">
          <div className="contact-form-content">
            <div className="form-intro">
              <h2>Send Us a Message</h2>
              <p>
                Tell us about your project and we'll connect you with the perfect designer. 
                The more details you provide, the better we can help you.
              </p>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="project">New Project</option>
                    <option value="designer">Find a Designer</option>
                    <option value="support">Support</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="projectType">Project Type</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select project type</option>
                    <option value="hdb">HDB Flat</option>
                    <option value="condo">Condominium</option>
                    <option value="landed">Landed Property</option>
                    <option value="commercial">Commercial Space</option>
                    <option value="office">Office</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="budget">Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                  >
                    <option value="">Select budget range</option>
                    <option value="under-20k">Under $20,000</option>
                    <option value="20k-50k">$20,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k-200k">$100,000 - $200,000</option>
                    <option value="over-200k">Over $200,000</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project, timeline, preferences, or any questions you have..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary form-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions</p>
          </div>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="map-content">
            <div className="map-info">
              <h2>Visit Our Office</h2>
              <div className="office-details">
                <div className="detail-item">
                  <strong>Address:</strong>
                  <span>123 Design Street, Singapore 123456</span>
                </div>
                <div className="detail-item">
                  <strong>Business Hours:</strong>
                  <span>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</span>
                </div>
                <div className="detail-item">
                  <strong>Nearest MRT:</strong>
                  <span>Design Station (Red Line) - 5 minutes walk</span>
                </div>
              </div>
              <button className="btn btn-secondary">Get Directions</button>
            </div>
            <div className="map-placeholder">
              <div className="map-mock">
                <span>📍</span>
                <p>Interactive Map<br />123 Design Street</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section-gray">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Don't wait any longer. Let's bring your dream home to life today.</p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Find a Designer</button>
              <button className="btn btn-secondary">Schedule Consultation</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;


import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      text: "Our designer was one of the 5 recommended by Ez-ID. The designer we worked with was honest, patient, and made the entire process pain-free.",
      author: "Darren & Coco",
      location: "Bedok Reservoir Road"
    },
    {
      text: "We found our designer on Ez-ID and we're extremely happy about how our home turned out! It was easy to work with her and she felt more like a friend.",
      author: "Fadhil & Hazimah",
      location: "Bukit Batok West"
    },
    {
      text: "We approached Ez-ID for help and met up with their recommended firms. We settled with Mint as she went beyond what we sought for in the ideation stage.",
      author: "Ryan & Gillian",
      location: "Sembawang Crescent"
    }
  ];

  return (
    <section className="testimonials section-gray">
      <div className="container">
        <div className="section-header">
          <h2>Hear it from our homeowners</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card fade-in-up">
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p>{testimonial.text}</p>
              </div>
              <div className="testimonial-author">
                <strong>{testimonial.author}</strong>
                <span>{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="reviews-badge">
          <div className="google-reviews">
            <div className="stars">
              ⭐⭐⭐⭐⭐
            </div>
            <div className="review-text">
              <strong>4.8 Stars</strong>
              <span>2,870 Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


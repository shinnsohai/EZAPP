import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Ez-ID?",
      answer: "Established in 2024, Ez-ID is a renovation platform that revolutionizes and simplifies the search for reliable interior design firms. We make finding the perfect designer easy and stress-free."
    },
    {
      question: "Is Ez-ID an interior firm?",
      answer: "No, we're not an interior firm. We are a renovation platform that simplifies your search for reliable interior designers. You can browse portfolios and reviews of interior design companies, and get tips from our renovation content."
    },
    {
      question: "How do I get free renovation quotes?",
      answer: "You can submit your request through our platform. By submitting a request for free quotes, you will receive a shortlist of up to five interior firms that best match your renovation preferences. Alternatively, you can enquire directly with interior designers on their profile page, or join the Ez-ID Meetup event."
    },
    {
      question: "Can I trust the interior firms on Ez-ID?",
      answer: "All interior firms on Ez-ID undergo a stringent vetting process, including checking the firm's registration details, cross-checking with industry partners, and more. We continuously monitor the quality of firms based on verified reviews left by homeowners."
    },
    {
      question: "What is the Ez-ID Guarantee?",
      answer: "The Ez-ID Guarantee is a free scheme that safeguards your renovation deposits, in the rare event that the interior firm you have engaged via Ez-ID becomes insolvent. It covers 50% of your contract value, up to $50,000, whichever is lower."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq section-light">
      <div className="container">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="faq-footer">
          <p>Still have questions? <strong>Chat with us.</strong></p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;


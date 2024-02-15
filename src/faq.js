import React from 'react';

const Faq = () => {
  const faqData = [
    {
      question: 'What is Pageone?',
      highlight: 'Pageone',
      answer: 'PageOne is a dedicated online platform for young pregnant women to securely store and manage their pregnancy-related documents. Our service digitizes the Plan of Safe Care forms and other essential pregnancy documents, offering a convenient and paperless solution.'
    },
    {
      question: 'How can PageOne benefit me during my pregnancy?',
      highlight: 'pregnancy',
      answer: 'PageOne simplifies the management of your pregnancy documents by providing a secure, easily accessible online space. This means you can quickly access your Plan of Safe Care forms, medical records, and other important documents anytime, anywhere.'
    },
    {
      question: 'Is it safe to store my pregnancy documents on PageOne?',
      highlight: 'Pageone',
      answer: 'Absolutely. We prioritize your privacy and data security. Our platform uses advanced encryption and security protocols to ensure that your personal and medical information is protected.'
    },
    // Add more FAQ items as needed
  ];

  return (
    <div className="faq-page">
      <h1 className="faq-title">Pageone Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <h2>{faq.question}</h2>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;

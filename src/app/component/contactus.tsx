"use client"
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const socialIcons = [
  { name: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com' },
  { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com' },
  { name: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://linkedin.com' },
  { name: 'Facebook', icon: 'fab fa-facebook', url: 'https://facebook.com' },
];

const ContactCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    // GSAP Animations
    gsap.from('.contact-card', {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power3.out',
    });
    gsap.from('.left-section > div', {
      opacity: 0,
      x: -50,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 0.3,
    });
    gsap.from('.form-field', {
      opacity: 0,
      x: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 0.5,
    });
    gsap.from('.submit-button', {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
      delay: 1,
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      gsap.to('.contact-card', {
        scale: 0.95,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', message: '' });
          setIsSubmitting(false);
          setTimeout(() => setSubmitStatus(null), 3000);
        },
      });
    }, 1000);
  };

  return (
    <div className='flex justify-center py-[100px]'>
    <div className="contact-card bg-gradient-to-br from-black to-blue-900 rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden relative mx-4">
      {/* Left Section */}
      <div className="left-section flex-1 py-12 px-12 flex flex-col justify-between bg-black/80">
        <div>
          <button className="bg-blue-950 text-blue-200 px-6 py-2 rounded-full text-sm font-medium mb-8 hover:bg-blue-800 transition-colors duration-300">
            Contact Us
          </button>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 text-white leading-tight">
            Let's Elevate <br /> Your Social <br /> Media
          </h1>
          <p className="text-blue-200 mb-12 max-w-sm">
            Let’s boost your brand’s social media reach today!
          </p>
        </div>
        <div>
          <span className="text-sm font-medium text-white">Follow Us:</span>
          <div className="flex gap-5 mt-4">
            {socialIcons.map((item) => (
              <a
                href={item.url}
                aria-label={item.name}
                key={item.name}
                target="_blank"
                rel="noopener noreferrer"
                className={`${item.icon} text-xl cursor-pointer transition-colors duration-200 text-blue-300 hover:text-blue-100`}
              >
                <i className={item.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex-1 bg-blue-950/90 p-12 flex flex-col gap-6 min-w-[340px] relative">
        {submitStatus === 'success' && (
          <div className="form-field absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg">
            Form submitted successfully!
          </div>
        )}
        <div className="form-field">
          <label className="text-blue-200 text-[1rem] font-semibold flex flex-col gap-2">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Jane Smith"
              required
              className="p-3 text-white bg-blue-900/50 rounded-lg border-none focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
            />
          </label>
        </div>
        <div className="form-field">
          <label className="text-blue-200 text-[1rem] font-semibold flex flex-col gap-2">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="jane@framer.com"
              required
              className="p-3 text-white bg-blue-900/50 rounded-lg border-none focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
            />
          </label>
        </div>
        <div className="form-field">
          <label className="text-blue-200 text-[1rem] font-semibold flex flex-col gap-2">
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your message here..."
              rows={4}
              required
              className="p-3 text-white bg-blue-900/50 rounded-lg border-none focus:ring-2 focus:ring-blue-400 outline-none resize-none transition-all duration-300"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`submit-button mt-2 bg-blue-600 hover:bg-blue-500 transition-colors text-white font-semibold rounded-full py-3 text-[1.1rem] ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Contact Us Now!'}
        </button>
      </div>
    </div>
    </div>
  );
};

export default ContactCard;
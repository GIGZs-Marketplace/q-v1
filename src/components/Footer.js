import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Github,
  Mail,
  Phone,
  MapPin,
  ChevronUp
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (path) => {
    navigate(path);
    scrollToTop();
  };

  const scrollToSection = (sectionId) => {
    if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-text">Q.</span>
            </div>
            <p className="footer-description">
              Build professional SaaS applications in minutes, not months. 
              Transform your ideas into reality with our AI-powered platform.
            </p>
            <div className="social-links">
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
            </div>
          </div>

          {/* Product Links */}
          <div className="footer-section">
            <h3>Product</h3>
            <ul className="footer-links">
              <li>
                <button onClick={() => handleNavigation('/configure')}>
                  Build Your SaaS
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('features')}>
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/configure')}>
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('testimonials')}>
                  Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('config-section')}>
                  Get Started
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-section">
            <h3>Company</h3>
            <ul className="footer-links">
              <li>
                <button onClick={() => scrollToSection('testimonials')}>
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('features')}>
                  Our Mission
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('testimonials')}>
                  Success Stories
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/configure')}>
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('config-section')}>
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="footer-section">
            <h3>Support</h3>
            <ul className="footer-links">
              <li>
                <button onClick={() => scrollToSection('config-section')}>
                  Help Center
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('features')}>
                  Documentation
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('testimonials')}>
                  Community
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/configure')}>
                  Status
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('config-section')}>
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contact</h3>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span>q@gigzs.com</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+91 9724823602</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Bangalore, Karnataka, India</span>
              </div>
            </div>
            <div className="newsletter">
              <h4>Stay Updated</h4>
              <p>Get the latest updates and news</p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="newsletter-input"
                />
                <button className="newsletter-btn">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-bottom-left">
              <p className="footer-copyright">
                &copy; {currentYear} Q. All rights reserved. | 
                Designed by <a href="https://uimitra.com" target="_blank" rel="noopener noreferrer">Uimitra</a> | 
                Powered by <a href="https://gigzs.com" target="_blank" rel="noopener noreferrer">Gigzs</a>
              </p>
            </div>
            <div className="footer-bottom-links">
              <button onClick={() => scrollToSection('config-section')}>
                Privacy Policy
              </button>
              <button onClick={() => scrollToSection('features')}>
                Terms of Service
              </button>
              <button onClick={() => scrollToSection('testimonials')}>
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button 
        className="scroll-to-top"
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronUp size={20} />
      </motion.button>
    </footer>
  );
};

export default Footer; 
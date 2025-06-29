import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  Menu, 
  X, 
  Rocket,
  ChevronDown,
  User,
  LogOut
} from 'lucide-react';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsFeaturesOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname === '/') {
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
    setIsMenuOpen(false);
    setIsFeaturesOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <motion.div 
            className="logo"
            onClick={() => handleNavigation('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="logo-icon">
              <Rocket size={24} />
            </div>
            <span className="logo-text">Q.</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <ul className="nav-list">
              <li className="nav-item">
                <button 
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                  onClick={() => handleNavigation('/')}
                >
                  Home
                </button>
              </li>
              <li className="nav-item dropdown">
                <button 
                  className="nav-link dropdown-toggle"
                  onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                  onMouseEnter={() => setIsFeaturesOpen(true)}
                >
                  Features
                  <ChevronDown size={16} />
                </button>
                {isFeaturesOpen && (
                  <div 
                    className="dropdown-menu"
                    onMouseLeave={() => setIsFeaturesOpen(false)}
                  >
                    <div className="dropdown-item" onClick={() => scrollToSection('config-section')}>
                      <span>Build Your SaaS</span>
                      <small>Start building in minutes</small>
                    </div>
                    <div className="dropdown-item" onClick={() => scrollToSection('features')}>
                      <span>Our Features</span>
                      <small>See what we offer</small>
                    </div>
                    <div className="dropdown-item" onClick={() => scrollToSection('testimonials')}>
                      <span>Success Stories</span>
                      <small>Customer testimonials</small>
                    </div>
                  </div>
                )}
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link"
                  onClick={() => scrollToSection('testimonials')}
                >
                  Testimonials
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link"
                  onClick={() => handleNavigation('/configure')}
                >
                  Pricing
                </button>
              </li>
            </ul>
          </nav>

          {/* CTA Buttons */}
          <div className="header-actions">
            {user ? (
              <div className="user-menu">
                <button 
                  className="user-button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <User size={20} />
                  <span>{user.email}</span>
                  <ChevronDown size={16} />
                </button>
                {isUserMenuOpen && (
                  <div className="user-dropdown">
                    <button 
                      className="dropdown-item"
                      onClick={() => handleNavigation('/dashboard')}
                    >
                      <User size={16} />
                      Dashboard
                    </button>
                    <button 
                      className="dropdown-item"
                      onClick={() => handleNavigation('/action')}
                    >
                      <Rocket size={16} />
                      Order Details
                    </button>
                    <button 
                      className="dropdown-item"
                      onClick={handleSignOut}
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleNavigation('/login')}
                >
                  Sign In
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleNavigation('/configure')}
                >
                  Start Building
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            className="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="mobile-nav-list">
              <li className="mobile-nav-item">
                <button 
                  className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
                  onClick={() => handleNavigation('/')}
                >
                  Home
                </button>
              </li>
              <li className="mobile-nav-item">
                <button 
                  className="mobile-nav-link"
                  onClick={() => scrollToSection('config-section')}
                >
                  Build Your SaaS
                </button>
              </li>
              <li className="mobile-nav-item">
                <button 
                  className="mobile-nav-link"
                  onClick={() => scrollToSection('features')}
                >
                  Features
                </button>
              </li>
              <li className="mobile-nav-item">
                <button 
                  className="mobile-nav-link"
                  onClick={() => scrollToSection('testimonials')}
                >
                  Testimonials
                </button>
              </li>
              <li className="mobile-nav-item">
                <button 
                  className="mobile-nav-link"
                  onClick={() => handleNavigation('/configure')}
                >
                  Pricing
                </button>
              </li>
            </ul>
            <div className="mobile-nav-actions">
              <button 
                className="btn btn-primary btn-large"
                onClick={() => handleNavigation('/configure')}
              >
                Start Building Now
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header; 
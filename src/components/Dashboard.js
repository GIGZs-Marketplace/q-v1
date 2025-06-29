import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  Settings, 
  Code, 
  Rocket, 
  MessageCircle,
  Mail,
  Phone,
  ExternalLink,
  Download,
  Calendar
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ configData, userData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const developmentSteps = [
    {
      id: 1,
      title: 'Project Setup',
      description: 'Initializing your project structure and environment',
      icon: <Settings size={24} />,
      duration: '1-2 hours'
    },
    {
      id: 2,
      title: 'Design & UI',
      description: 'Creating your custom design and user interface',
      icon: <Code size={24} />,
      duration: '4-6 hours'
    },
    {
      id: 3,
      title: 'Core Development',
      description: 'Building the main functionality and features',
      icon: <Rocket size={24} />,
      duration: '1-2 days'
    },
    {
      id: 4,
      title: 'Testing & QA',
      description: 'Quality assurance and testing all features',
      icon: <CheckCircle size={24} />,
      duration: '4-6 hours'
    },
    {
      id: 5,
      title: 'Deployment',
      description: 'Launching your SaaS to production',
      icon: <Rocket size={24} />,
      duration: '2-4 hours'
    }
  ];

  const useCaseTitles = {
    'freelancer': 'Freelancer Portfolio',
    'service-store': 'Digital Service Store',
    'coach-info': 'Info Website for Coach',
    'd2c-product': 'Product Selling (D2C)'
  };

  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 5;
      });
      
      setCurrentStep(prev => {
        const newStep = Math.floor((progress / 100) * developmentSteps.length);
        return Math.min(newStep, developmentSteps.length - 1);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [progress, developmentSteps.length]);

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  const handleContactSupport = () => {
    // In a real app, this would open a chat widget or contact form
    alert('Contact support feature would open here');
  };

  const handleDownloadInvoice = () => {
    // In a real app, this would generate and download an invoice
    alert('Invoice download feature would work here');
  };

  return (
    <div className="dashboard">
      <div className="container">
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="welcome-section">
            <h1>Welcome back, {userData.name}! 👋</h1>
            <p>Your SaaS is currently under development. Here's the latest status:</p>
          </div>
          
          <div className="project-info">
            <div className="info-card">
              <h3>Project Details</h3>
              <div className="info-item">
                <span>Type:</span>
                <span>{useCaseTitles[configData.useCase]}</span>
              </div>
              <div className="info-item">
                <span>Features:</span>
                <span>{configData.features.length} selected</span>
              </div>
              <div className="info-item">
                <span>Order ID:</span>
                <span>#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="dashboard-content">
          {/* Progress Overview */}
          <motion.div
            className="progress-overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="progress-card">
              <div className="progress-header">
                <h2>Development Progress</h2>
                <div className="progress-percentage">
                  {Math.round(progress)}%
                </div>
              </div>
              
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              <div className="progress-stats">
                <div className="stat">
                  <Clock size={16} />
                  <span>Estimated completion: {configData.deliveryTime} {configData.deliveryTime === 1 ? 'day' : 'days'}</span>
                </div>
                <div className="stat">
                  <Calendar size={16} />
                  <span>Started: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Development Steps */}
          <motion.div
            className="development-steps"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2>Development Timeline</h2>
            <div className="steps-container">
              {developmentSteps.map((step, index) => {
                const status = getStepStatus(index);
                return (
                  <motion.div
                    key={step.id}
                    className={`step-item ${status}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="step-icon">
                      {step.icon}
                    </div>
                    <div className="step-content">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                      <div className="step-duration">
                        <Clock size={14} />
                        <span>{step.duration}</span>
                      </div>
                    </div>
                    <div className="step-status">
                      {status === 'completed' && <CheckCircle size={20} color="#10b981" />}
                      {status === 'active' && <div className="loading-spinner"></div>}
                      {status === 'pending' && <div className="pending-dot"></div>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Action Cards */}
          <motion.div
            className="action-cards"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="cards-grid">
              <div className="action-card">
                <div className="card-icon">
                  <MessageCircle size={24} />
                </div>
                <h3>Need Help?</h3>
                <p>Our support team is here to help you with any questions</p>
                <button className="btn btn-primary" onClick={handleContactSupport}>
                  Contact Support
                </button>
              </div>

              <div className="action-card">
                <div className="card-icon">
                  <Download size={24} />
                </div>
                <h3>Download Invoice</h3>
                <p>Get your order receipt and project documentation</p>
                <button className="btn btn-secondary" onClick={handleDownloadInvoice}>
                  Download Invoice
                </button>
              </div>

              <div className="action-card">
                <div className="card-icon">
                  <ExternalLink size={24} />
                </div>
                <h3>Project Updates</h3>
                <p>We'll send you regular updates about your project progress</p>
                <div className="contact-info">
                  <div className="contact-item">
                    <Mail size={16} />
                    <span>{userData.email}</span>
                  </div>
                  {userData.whatsapp && (
                    <div className="contact-item">
                      <Phone size={16} />
                      <span>{userData.whatsapp}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
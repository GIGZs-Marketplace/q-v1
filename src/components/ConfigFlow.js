import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check,
  Briefcase,
  Store,
  UserCheck,
  ShoppingCart
} from 'lucide-react';
import './ConfigFlow.css';

const ConfigFlow = ({ configData, updateConfig }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedUseCase, setSelectedUseCase] = useState(configData.useCase);
  const [selectedFeatures, setSelectedFeatures] = useState(configData.features);

  const useCases = [
    {
      id: 'freelancer',
      title: 'Freelancer Portfolio',
      description: 'Showcase your work and attract new clients',
      icon: <Briefcase size={32} />,
      basePrice: 999,
      baseTime: 2
    },
    {
      id: 'service-store',
      title: 'Digital Service Store',
      description: 'Sell your services online with order processing',
      icon: <Store size={32} />,
      basePrice: 1499,
      baseTime: 3
    },
    {
      id: 'coach-info',
      title: 'Info Website for Coach',
      description: 'Build authority and capture leads for your coaching business',
      icon: <UserCheck size={32} />,
      basePrice: 1299,
      baseTime: 2
    },
    {
      id: 'd2c-product',
      title: 'Product Selling (D2C)',
      description: 'Direct-to-consumer product sales with full e-commerce',
      icon: <ShoppingCart size={32} />,
      basePrice: 2499,
      baseTime: 4
    }
  ];

  const features = [
    { id: 'custom-domain', name: 'Custom Domain', price: 199, time: 0.5 },
    { id: 'contact-form', name: 'Contact Form', price: 99, time: 0.5 },
    { id: 'payment-gateway', name: 'Order Gateway', price: 299, time: 1 },
    { id: 'whatsapp-chatbot', name: 'WhatsApp Chatbot', price: 399, time: 1 },
    { id: 'analytics-dashboard', name: 'Analytics Dashboard', price: 249, time: 1 },
    { id: 'blog-seo', name: 'Blog / SEO Module', price: 349, time: 1.5 },
    { id: 'user-login', name: 'User Login System', price: 499, time: 2 },
    { id: 'newsletter', name: 'Newsletter Integration', price: 199, time: 0.5 },
    { id: 'ai-generator', name: 'AI Text Generator', price: 449, time: 1.5 }
  ];

  const calculatePricing = () => {
    if (!selectedUseCase) return { price: 0, time: 0 };
    
    const useCase = useCases.find(uc => uc.id === selectedUseCase);
    const featureCosts = selectedFeatures.reduce((total, featureId) => {
      const feature = features.find(f => f.id === featureId);
      return total + (feature ? feature.price : 0);
    }, 0);
    
    const featureTime = selectedFeatures.reduce((total, featureId) => {
      const feature = features.find(f => f.id === featureId);
      return total + (feature ? feature.time : 0);
    }, 0);
    
    return {
      price: useCase.basePrice + featureCosts,
      time: useCase.baseTime + featureTime
    };
  };

  const { price, time } = calculatePricing();

  const handleUseCaseSelect = (useCaseId) => {
    setSelectedUseCase(useCaseId);
  };

  const handleFeatureToggle = (featureId) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleNext = () => {
    if (currentStep === 1 && selectedUseCase) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      updateConfig({
        useCase: selectedUseCase,
        features: selectedFeatures,
        pricing: price,
        deliveryTime: time
      });
      navigate('/action');
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      navigate('/');
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return selectedUseCase;
    if (currentStep === 2) return true;
    return false;
  };

  return (
    <div className="config-flow">
      <div className="container">
        {/* Header */}
        <div className="config-header">
          <button className="btn btn-secondary" onClick={handleBack}>
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="progress-indicator">
            <span>Step {currentStep} of 2</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentStep / 2) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="config-step"
            >
              <div className="step-header">
                <h1 style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>Choose Your Use Case</h1>
                <p style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>Select the type of SaaS you want to build</p>
              </div>

              <div className="use-case-grid">
                {useCases.map((useCase) => (
                  <div
                    key={useCase.id}
                    className={`use-case-card ${selectedUseCase === useCase.id ? 'selected' : ''}`}
                    onClick={() => handleUseCaseSelect(useCase.id)}
                  >
                    <div className="use-case-icon">
                      {useCase.icon}
                    </div>
                    <h3>{useCase.title}</h3>
                    <p>{useCase.description}</p>
                    <div className="use-case-price">
                      Starting at ₹{useCase.basePrice}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="config-step"
            >
              <div className="step-header">
                <h1 style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>Select Features</h1>
                <p style={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>Choose the features you need for your SaaS</p>
              </div>

              <div className="config-content">
                <div className="features-section">
                  <div className="features-grid">
                    {features.map((feature) => (
                      <div
                        key={feature.id}
                        className={`feature-item ${selectedFeatures.includes(feature.id) ? 'selected' : ''}`}
                        onClick={() => handleFeatureToggle(feature.id)}
                      >
                        <div className="feature-checkbox">
                          {selectedFeatures.includes(feature.id) && <Check size={14} />}
                        </div>
                        <div className="feature-info">
                          <div className="feature-header">
                            <h4>{feature.name}</h4>
                          </div>
                          <div className="feature-price">
                            <strong>+₹{feature.price}</strong> • +{feature.time} {feature.time === 1 ? 'day' : 'days'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pricing-section">
                  <div className="pricing-card">
                    <div className="pricing-content">
                      <h3>Your Custom SaaS</h3>
                      <div className="price">₹{price}</div>
                      <div className="delivery-time">
                        Ready in {time} {time === 1 ? 'day' : 'days'}
                      </div>
                      
                      <div className="pricing-breakdown">
                        <div className="breakdown-item">
                          <span>Base Package</span>
                          <span>₹{useCases.find(uc => uc.id === selectedUseCase)?.basePrice || 0}</span>
                        </div>
                        {selectedFeatures.map(featureId => {
                          const feature = features.find(f => f.id === featureId);
                          return (
                            <div key={featureId} className="breakdown-item">
                              <span>{feature?.name}</span>
                              <span>+₹{feature?.price}</span>
                            </div>
                          );
                        })}
                        <div className="breakdown-total">
                          <span>Total</span>
                          <span>₹{price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="config-navigation">
          <button 
            className="btn btn-primary btn-large" 
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {currentStep === 1 ? (
              <>
                Continue
                <ArrowRight size={20} />
              </>
            ) : (
              <>
                Proceed to Order
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigFlow; 
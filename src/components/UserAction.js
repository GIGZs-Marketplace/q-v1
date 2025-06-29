import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Phone, 
  CheckCircle, 
  Shield, 
  ArrowRight
} from 'lucide-react';
import './UserAction.css';
import { submitOrderToSupabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const UserAction = ({ configData, setUserInfo }) => {
  const navigate = useNavigate();
  const [actionType, setActionType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    domain: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const { user } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOrder = async () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in your name and email');
      return;
    }
    setIsSubmitting(true);
    // Submit order to Supabase
    const order = {
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp,
      domain: formData.domain,
      use_case: configData.useCase,
      features: configData.features,
      pricing: configData.pricing,
      delivery_time: configData.deliveryTime,
      created_at: new Date().toISOString(),
    };
    const { error } = await submitOrderToSupabase(order);
    setIsSubmitting(false);
    if (error) {
      alert('Failed to submit order. Please try again.');
      return;
    }
    setConfirmation('Your order has been received! We will contact you soon.');
  };

  const handleScheduleCall = () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in your name and email');
      return;
    }
    
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setUserInfo({
        ...formData,
        actionType: 'schedule_call',
        amount: configData.pricing
      });
      navigate('/dashboard');
    }, 1500);
  };

  const useCaseTitles = {
    'freelancer': 'Freelancer Portfolio',
    'service-store': 'Digital Service Store',
    'coach-info': 'Info Website for Coach',
    'd2c-product': 'Product Selling (D2C)'
  };

  useEffect(() => {
    async function checkExistingOrder() {
      if (user && user.email) {
        const { data } = await supabase
          .from('orders')
          .select('*')
          .eq('email', user.email)
          .order('created_at', { ascending: false })
          .limit(1);
        if (data && data.length > 0) {
          setConfirmation('Your order has been received! We will contact you soon.');
        }
      }
    }
    checkExistingOrder();
  }, [user]);

  return (
    <div className="user-action">
      <div className="container">
        <motion.div
          className="action-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Complete Your Order</h1>
          <p>You're just one step away from building your SaaS</p>
        </motion.div>
        {confirmation ? (
          <div className="confirmation-message">
            <h3>Order Confirmed</h3>
            <p>{confirmation}</p>
          </div>
        ) : (
          <>
            <div className="action-content">
              {/* Order Summary */}
              <motion.div
                className="order-summary"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="summary-card">
                  <h3>Order Summary</h3>
                  <div className="summary-item">
                    <span>Use Case:</span>
                    <span>{useCaseTitles[configData.useCase]}</span>
                  </div>
                  <div className="summary-item">
                    <span>Features:</span>
                    <span>{configData.features.length} selected</span>
                  </div>
                  <div className="summary-item">
                    <span>Delivery Time:</span>
                    <span>{configData.deliveryTime} {configData.deliveryTime === 1 ? 'day' : 'days'}</span>
                  </div>
                  <div className="summary-total">
                    <span>Total:</span>
                    <span className="total-price">₹{configData.pricing}</span>
                  </div>
                </div>
              </motion.div>

              {/* Action Options */}
              <motion.div
                className="action-options"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {!actionType ? (
                  <div className="options-grid">
                    <div 
                      className="option-card"
                      onClick={() => setActionType('order')}
                    >
                      <div className="option-icon">
                        <CreditCard size={32} />
                      </div>
                      <h3>Order Now</h3>
                      <p>Secure order with Stripe. Get started immediately.</p>
                      <div className="option-features">
                        <div className="feature">
                          <CheckCircle size={16} />
                          <span>Instant processing</span>
                        </div>
                        <div className="feature">
                          <Shield size={16} />
                          <span>Secure order</span>
                        </div>
                        <div className="feature">
                          <CheckCircle size={16} />
                          <span>Immediate start</span>
                        </div>
                      </div>
                      <button className="btn btn-primary">
                        Order ₹{configData.pricing}
                        <ArrowRight size={16} />
                      </button>
                    </div>

                    <div 
                      className="option-card"
                      onClick={() => setActionType('schedule')}
                    >
                      <div className="option-icon">
                        <Phone size={32} />
                      </div>
                      <h3>Schedule a Call</h3>
                      <p>Discuss your requirements with our team first.</p>
                      <div className="option-features">
                        <div className="feature">
                          <CheckCircle size={16} />
                          <span>Free consultation</span>
                        </div>
                        <div className="feature">
                          <CheckCircle size={16} />
                          <span>Custom requirements</span>
                        </div>
                        <div className="feature">
                          <CheckCircle size={16} />
                          <span>No commitment</span>
                        </div>
                      </div>
                      <button className="btn btn-secondary">
                        Schedule Call
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="action-form">
                    <div className="form-header">
                      <h3>
                        {actionType === 'order' ? 'Complete Order' : 'Schedule Your Call'}
                      </h3>
                      <p>
                        {actionType === 'order' 
                          ? 'Enter your details to complete the order' 
                          : 'Fill in your details and we\'ll contact you within 24 hours'
                        }
                      </p>
                    </div>

                    <div className="form-content">
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="input"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            className="input"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">
                            WhatsApp Number
                          </label>
                          <input
                            type="tel"
                            name="whatsapp"
                            className="input"
                            value={formData.whatsapp}
                            onChange={handleInputChange}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">
                            Preferred Domain (Optional)
                          </label>
                          <input
                            type="text"
                            name="domain"
                            className="input"
                            value={formData.domain}
                            onChange={handleInputChange}
                            placeholder="yourdomain.com"
                          />
                        </div>
                      </div>

                      <div className="form-actions">
                        <button 
                          className="btn btn-secondary"
                          onClick={() => setActionType(null)}
                          disabled={isSubmitting}
                        >
                          Back to Options
                        </button>
                        <button 
                          className="btn btn-primary btn-large"
                          onClick={actionType === 'order' ? handleOrder : handleScheduleCall}
                          disabled={isSubmitting || !formData.name || !formData.email}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="loading-spinner"></div>
                              {actionType === 'order' ? 'Processing...' : 'Submitting...'}
                            </>
                          ) : (
                            <>
                              {actionType === 'order' ? `Order ₹${configData.pricing}` : 'Schedule Call'}
                              <ArrowRight size={20} />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserAction; 
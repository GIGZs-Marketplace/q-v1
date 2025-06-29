import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Shield, 
  Users, 
  BarChart3, 
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  ChevronRight
} from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/configure');
  };

  const features = [
    {
      icon: <Rocket size={32} />,
      title: 'Lightning Fast Setup',
      description: 'Get your SaaS up and running in minutes, not months. Our AI-powered platform handles the heavy lifting.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Enterprise Security',
      description: 'Bank-level security with SOC 2 compliance, encryption at rest and in transit, and regular security audits.'
    },
    {
      icon: <Users size={32} />,
      title: 'Scalable Architecture',
      description: 'Built to grow with your business. Auto-scaling infrastructure that handles millions of users seamlessly.'
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'Advanced Analytics',
      description: 'Comprehensive dashboards and insights to track user behavior, revenue, and business metrics.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechFlow',
      content: 'Q. transformed our development process. We went from idea to launch in just 2 weeks!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'CTO, DataSync',
      content: 'The platform is incredibly powerful yet easy to use. Our team productivity increased by 300%.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder, CloudScale',
      content: 'Best investment we made. The ROI was immediate and the support team is exceptional.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Users' },
    { number: '500+', label: 'SaaS Built' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <motion.div 
              className="hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="hero-title">
                Build Your SaaS in
                <span className="gradient-text"> Minutes</span>,
                Not Months
              </h1>
              <p className="hero-subtitle">
                Transform your ideas into professional SaaS applications with our AI-powered platform. 
                No coding required, enterprise-grade features included.
              </p>
              <div className="hero-actions">
                <motion.button 
                  className="btn btn-primary btn-large"
                  onClick={handleGetStarted}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Building Now
                  <ArrowRight size={20} />
                </motion.button>
                <motion.button 
                  className="btn btn-secondary btn-large"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={20} />
                  Watch Demo
                </motion.button>
              </div>
              <div className="hero-stats">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="stat-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              className="hero-visual"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="hero-image">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
                <div className="gradient-orb orb-4"></div>
                <div className="dashboard-preview">
                  <div className="dashboard-header">
                    <div className="dashboard-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="dashboard-content">
                    <div className="dashboard-chart"></div>
                    <div className="dashboard-metrics">
                      <div className="metric-bar"></div>
                      <div className="metric-bar"></div>
                      <div className="metric-bar"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              Everything You Need to Build
              <span className="gradient-text"> Professional SaaS</span>
            </h2>
            <p className="section-subtitle">
              Our comprehensive platform provides all the tools and features you need to create, 
              launch, and scale your SaaS business successfully.
            </p>
          </motion.div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Configuration Section */}
      <section id="config-section" className="config-section">
        <div className="container">
          <div className="config-content">
            <motion.div 
              className="config-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">
                Start Building Your
                <span className="gradient-text"> SaaS Today</span>
              </h2>
              <p className="section-subtitle">
                Choose your use case, select features, and get a custom quote with timeline. 
                Our AI will guide you through the entire process.
              </p>
              <div className="config-benefits">
                <div className="benefit-item">
                  <CheckCircle size={20} />
                  <span>No coding required</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle size={20} />
                  <span>Instant pricing</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle size={20} />
                  <span>Custom timeline</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle size={20} />
                  <span>24/7 support</span>
                </div>
              </div>
              <motion.button 
                className="btn btn-primary btn-large"
                onClick={handleGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Configure Your SaaS
                <ChevronRight size={20} />
              </motion.button>
            </motion.div>
            <motion.div 
              className="config-visual"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="config-preview">
                <div className="config-step active">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Choose Use Case</h4>
                    <p>Select from 50+ pre-built templates</p>
                  </div>
                </div>
                <div className="config-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Select Features</h4>
                    <p>Customize with advanced features</p>
                  </div>
                </div>
                <div className="config-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Get Quote</h4>
                    <p>Instant pricing and timeline</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              Trusted by
              <span className="gradient-text"> Thousands</span>
              of Founders
            </h2>
            <p className="section-subtitle">
              See what our customers have to say about their experience building with Q.
            </p>
          </motion.div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="author-avatar"
                  />
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-role">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="cta-title">
              Ready to Build Your
              <span className="gradient-text"> Dream SaaS</span>?
            </h2>
            <p className="cta-subtitle">
              Join thousands of founders who have already transformed their ideas into successful businesses.
            </p>
            <motion.button 
              className="btn btn-primary btn-large"
              onClick={handleGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Building Now
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 
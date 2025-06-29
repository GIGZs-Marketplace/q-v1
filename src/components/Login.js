import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showBuildModal, setShowBuildModal] = useState(false);

  const { signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (forgotPassword) {
        const { error } = await resetPassword(email);
        if (error) throw error;
        setSuccess('Password reset email sent! Check your inbox.');
        setForgotPassword(false);
      } else if (isSignUp) {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        const { error } = await signUp(email, password);
        if (error) throw error;
        setShowBuildModal(true);
        return;
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        const redirectPath = localStorage.getItem('postLoginRedirect') || '/dashboard';
        localStorage.removeItem('postLoginRedirect');
        navigate(redirectPath);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="login-content">
        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="login-header">
            <button className="back-button" onClick={handleBack}>
              <ArrowLeft size={20} />
              Back
            </button>
            <div className="login-logo">
              <div className="logo-icon">Q.</div>
            </div>
            <h1>{forgotPassword ? 'Reset Password' : (isSignUp ? 'Create Account' : 'Welcome Back')}</h1>
            <p>
              {forgotPassword 
                ? 'Enter your email to receive a password reset link'
                : (isSignUp 
                  ? 'Create your account to get started with Q.'
                  : 'Sign in to your account to continue')
              }
            </p>
          </div>

          {success && (
            <motion.div
              className="success-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CheckCircle size={16} />
              {success}
            </motion.div>
          )}

          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {!forgotPassword && (
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            {isSignUp && !forgotPassword && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            <motion.button
              type="submit"
              className="btn btn-primary btn-large"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Processing...' : (
                forgotPassword ? 'Send Reset Link' : (isSignUp ? 'Create Account' : 'Sign In')
              )}
            </motion.button>
          </form>

          <div className="login-footer">
            {!forgotPassword && (
              <button
                className="forgot-password"
                onClick={() => setForgotPassword(true)}
              >
                Forgot your password?
              </button>
            )}

            {forgotPassword && (
              <button
                className="back-to-login"
                onClick={() => setForgotPassword(false)}
              >
                Back to login
              </button>
            )}

            <div className="auth-toggle">
              <span>
                {forgotPassword 
                  ? 'Remember your password?'
                  : (isSignUp ? 'Already have an account?' : "Don't have an account?")
                }
              </span>
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setSuccess('');
                  setForgotPassword(false);
                }}
              >
                {forgotPassword 
                  ? 'Sign in'
                  : (isSignUp ? 'Sign in' : 'Sign up')
                }
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {showBuildModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Build your web</h2>
            <p>Start building your website by selecting your use case and features.</p>
            <button className="btn btn-primary" onClick={() => navigate('/configure')}>
              Go to Order Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login; 
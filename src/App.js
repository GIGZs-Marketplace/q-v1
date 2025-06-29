import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import ConfigFlow from './components/ConfigFlow';
import UserAction from './components/UserAction';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" replace />;
}

function AppContent() {
  const [configData, setConfigData] = useState({
    useCase: null,
    features: [],
    pricing: 0,
    deliveryTime: 0
  });

  const [userData, setUserData] = useState(null);

  const updateConfig = (newData) => {
    setConfigData(prev => ({ ...prev, ...newData }));
  };

  const setUserInfo = (data) => {
    setUserData(data);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <LandingPage />
                  </motion.div>
                } 
              />
              <Route 
                path="/configure" 
                element={
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ConfigFlow 
                      configData={configData}
                      updateConfig={updateConfig}
                    />
                  </motion.div>
                } 
              />
              <Route 
                path="/action" 
                element={
                  configData.useCase ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <UserAction 
                        configData={configData}
                        setUserInfo={setUserInfo}
                      />
                    </motion.div>
                  ) : (
                    <Navigate to="/configure" replace />
                  )
                } 
              />
              <Route 
                path="/login" 
                element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Login />
                  </motion.div>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Dashboard 
                        configData={configData}
                        userData={userData}
                      />
                    </motion.div>
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App; 
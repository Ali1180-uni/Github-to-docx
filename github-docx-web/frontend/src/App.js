import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FishAnimation from './components/FishAnimation';
import CursorEffect from './components/CursorEffect';
import Header from './components/Header';
import ConverterForm from './components/ConverterForm';
import ProgressPanel from './components/ProgressPanel';
import ResultsPanel from './components/ResultsPanel';
import Footer from './components/Footer';
import './App.css';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  // Poll for job status
  useEffect(() => {
    if (!jobId) return;

    const pollStatus = async () => {
      try {
        const response = await fetch(`${API_BASE}/status/${jobId}`);
        const data = await response.json();
        setStatus(data);

        if (data.status === 'completed') {
          setResults(data.files);
          setIsLoading(false);
        } else if (data.status === 'error') {
          setError(data.error);
          setIsLoading(false);
        }
      } catch (err) {
        setError('Failed to fetch status');
        setIsLoading(false);
      }
    };

    const interval = setInterval(pollStatus, 1000);
    return () => clearInterval(interval);
  }, [jobId]);

  const handleConvert = useCallback(async (formData) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE}/convert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start conversion');
      }

      setJobId(data.job_id);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  const handleDownload = useCallback((filename) => {
    window.open(`${API_BASE}/download/${jobId}/${filename}`, '_blank');
  }, [jobId]);

  const handleReset = useCallback(() => {
    setJobId(null);
    setStatus(null);
    setResults(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return (
    <div className="app">
      {/* Background Effects */}
      <FishAnimation />
      <CursorEffect />
      
      {/* Gradient Orbs */}
      <div className="gradient-orb orb-1" />
      <div className="gradient-orb orb-2" />
      <div className="gradient-orb orb-3" />

      {/* Main Content */}
      <div className="app-content">
        <Header />

        <main className="main-container">
          <AnimatePresence mode="wait">
            {!isLoading && !results && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ConverterForm onSubmit={handleConvert} error={error} />
              </motion.div>
            )}

            {isLoading && status && (
              <motion.div
                key="progress"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProgressPanel status={status} />
              </motion.div>
            )}

            {results && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ResultsPanel
                  files={results}
                  onDownload={handleDownload}
                  onReset={handleReset}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;

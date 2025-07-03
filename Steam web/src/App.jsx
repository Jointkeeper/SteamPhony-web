import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { logEvent, setAnalyticsCookie } from './analytics';
import AppRouter from './router/AppRouter';
import './App.css';

function App() {
  useEffect(() => {
    logEvent('User', 'Visit', 'AppMounted');
    setAnalyticsCookie('visited', 'true');
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <AppRouter />
      </Router>
    </HelmetProvider>
  );
}

export default App;

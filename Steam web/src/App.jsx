import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { logEvent, setAnalyticsCookie } from './analytics';
import AppRouter from './router/AppRouter';
import './App.css';
import { NavigationProvider } from './contexts';

function App() {
  useEffect(() => {
    logEvent('User', 'Visit', 'AppMounted');
    setAnalyticsCookie('visited', 'true');
  }, []);

  return (
    <HelmetProvider>
      <NavigationProvider>
        <Router>
          <AppRouter />
        </Router>
      </NavigationProvider>
    </HelmetProvider>
  );
}

export default App;

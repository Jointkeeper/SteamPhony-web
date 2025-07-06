import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { useEffect, Suspense } from 'react';
import { logEvent, setAnalyticsCookie } from './analytics';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';
import AppRouter from './router/AppRouter';
import { NavigationProvider } from './contexts';
import './App.css';

function App() {
  useEffect(() => {
    logEvent('User', 'Visit', 'AppMounted');
    setAnalyticsCookie('visited', 'true');
  }, []);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Suspense fallback={<Loader fullScreen />}>
          <Router>
            <NavigationProvider>
              <AppRouter />
            </NavigationProvider>
          </Router>
        </Suspense>
      </ErrorBoundary>
      <Toaster position="top-right" reverseOrder={false} />
    </HelmetProvider>
  );
}

export default App;

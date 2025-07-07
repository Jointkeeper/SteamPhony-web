import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs(HelmetProvider, { children: [_jsx(ErrorBoundary, { children: _jsx(Suspense, { fallback: _jsx(Loader, { fullScreen: true }), children: _jsx(Router, { children: _jsx(NavigationProvider, { children: _jsx(AppRouter, {}) }) }) }) }), _jsx(Toaster, { position: "top-right", reverseOrder: false })] }));
}
export default App;

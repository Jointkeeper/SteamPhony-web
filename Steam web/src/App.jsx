import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Services from './pages/Services';
import RestaurantMarketing from './pages/RestaurantMarketing';
import SalonMarketing from './pages/SalonMarketing';
import WebDevelopment from './pages/WebDevelopment';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';
import { useEffect } from 'react';
import { logEvent, setAnalyticsCookie } from './analytics';
import Layout from './components/Layout';
import './App.css';

function App() {
  useEffect(() => {
    logEvent('User', 'Visit', 'AppMounted');
    setAnalyticsCookie('visited', 'true');
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/restaurant-marketing" element={<RestaurantMarketing />} />
            <Route path="/services/salon-marketing" element={<SalonMarketing />} />
            <Route path="/services/web-development" element={<WebDevelopment />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster position="top-right" reverseOrder={false} />
    </HelmetProvider>
  );
}

export default App;

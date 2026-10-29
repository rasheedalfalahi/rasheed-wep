/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { initLenis, getLenis } from './lib/lenis';
import Navigation from './components/Navigation';
import SplashScreen from './components/SplashScreen';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import MobileBottomNav from './components/MobileBottomNav';
import ShortcutManager from './components/ShortcutManager';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import Projects from './pages/Projects';
import Services from './pages/Services';
import TestimonialsPage from './pages/TestimonialsPage';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import RouteSEOUpdater from './components/RouteSEOUpdater';

// If a user opens a legacy hash link (e.g. /#/blog), convert it to a clean path (/blog) before BrowserRouter initializes
if (typeof window !== 'undefined' && window.location.hash.startsWith('#/')) {
  const cleanPath = window.location.hash.slice(1);
  window.history.replaceState(null, '', cleanPath);
}

function LegacyHashRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.startsWith('#/')) {
        const cleanPath = window.location.hash.slice(1);
        navigate(cleanPath, { replace: true });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [navigate]);

  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);
  
  useEffect(() => {
    const prevPath = prevPathRef.current;
    prevPathRef.current = pathname;

    // Skip scrolling to top when returning to /projects from a project detail page
    if (
      pathname === '/projects' &&
      (prevPath.startsWith('/project/') || prevPath.startsWith('/projects/') || sessionStorage.getItem('projects_restore') === 'true')
    ) {
      return;
    }

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="/services" element={<Services />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.remove('light');
    document.documentElement.removeAttribute('data-theme');
    try {
      window.localStorage.removeItem('theme');
    } catch {
      // Ignore storage errors
    }

    // Force scroll to top on initial page load / refresh
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    }, 150);

    const cleanupLenis = initLenis();

    return () => {
      clearTimeout(timer);
      if (cleanupLenis) cleanupLenis();
    };
  }, []);

  return (
    <BrowserRouter>
      <LegacyHashRedirect />
      <RouteSEOUpdater />
      <ScrollToTop />
      <SplashScreen />
      <ShortcutManager />
      <div className="min-h-screen relative bg-bg text-text-main transition-colors duration-500 selection:bg-brand-primary selection:text-white" dir="rtl">
        <Navigation />
        
        <main>
          <AnimatedRoutes />
        </main>

        <BackToTop />
        <FloatingWhatsApp />
        <MobileBottomNav />
        <Footer />
      </div>
    </BrowserRouter>
  );
}



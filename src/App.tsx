/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
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

function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);
  
  useEffect(() => {
    const prevPath = prevPathRef.current;
    prevPathRef.current = pathname;

    // Skip scrolling to top when returning to /projects from a project detail page
    if (
      pathname === '/projects' &&
      (prevPath.startsWith('/project/') || sessionStorage.getItem('projects_restore') === 'true')
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

    // If the URL hash is a raw anchor like '#contact' instead of a router path '#/contact',
    // clean it up to '#/' so the router goes to Home and the browser doesn't auto-scroll to the anchor on reload.
    if (window.location.hash && !window.location.hash.startsWith('#/')) {
      window.location.hash = '#/';
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
    <HashRouter>
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
    </HashRouter>
  );
}



/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { NavItem } from '../types';
import { X, Home, LayoutGrid, Fingerprint, MessageSquare, Quote, Instagram, Facebook, Send, Briefcase, Download, Share, PlusSquare, Smartphone, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Magnetic from './Magnetic';

const navItems: NavItem[] = [
  { label: 'الرئيسية', href: '/', icon: Home },
  { label: 'المشاريع', href: '/projects', icon: LayoutGrid },
  { label: 'الخدمات الإبداعية', href: '/services', icon: Briefcase },
  { label: 'المدونة', href: '/blog', icon: BookOpen },
  { label: 'آراء الـعـملاء', href: '/testimonials', icon: Quote },
  { label: 'تواصل معنا', href: '/contact', icon: MessageSquare },
];

export default function Navigation() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check if device is iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Check if already in standalone mode (installed)
    const isPWA = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    setIsStandalone(isPWA);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle PWA installation event listener
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null);
      console.log('PWA was installed');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User prompt outcome: ${outcome}`);
      setDeferredPrompt(null);
    } else {
      setShowIOSGuide(true);
    }
  };

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled ? 'py-2.5 sm:py-3.5' : 'py-3 sm:py-6 lg:py-8'
        }`}
      >
        <div className="container mx-auto text-start">
          <div className={`relative flex items-center justify-between transition-all duration-700 ${
            isScrolled 
              ? 'bg-[#0a2932]/85 backdrop-blur-[24px] border border-white/10 px-3.5 xs:px-4 sm:px-8 py-2.5 sm:py-3 rounded-2xl sm:rounded-3xl shadow-2xl' 
              : 'bg-transparent'
          }`}
          style={{ WebkitBackdropFilter: isScrolled ? 'blur(24px)' : 'none' }}
        >
            
            {/* Right Side Group (Logo) */}
            <Link to="/" className="flex items-center group/logo shrink-0">
              <div className="relative w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center">
                 <div className="absolute inset-0 bg-brand-primary/5 rounded-xl -rotate-6 group-hover/logo:-rotate-12 transition-transform duration-500"></div>
                 <div 
                   className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-xl border border-white/5 group-hover/logo:border-brand-primary/30 transition-all duration-500"
                   style={{ WebkitBackdropFilter: 'blur(12px)' }}
                 ></div>
                 <div className="relative w-7 h-7 sm:w-9 sm:h-9">
                   <img 
                      src="/images/brand_logo_1780527663741.png" 
                      alt="Logo" 
                      className="w-full h-full object-contain filter group-hover/logo:brightness-125 transition-all duration-700"
                    />
                 </div>
              </div>
            </Link>

            {/* Desktop Navigation Links (Centered) */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10 flex-1 justify-center">
              {navItems.map((item) => (
                <Magnetic key={item.href} strength={0.15}>
                  <Link 
                    to={item.href}
                    className={`relative flex items-center gap-2 text-sm font-bold whitespace-nowrap transition-all group/link py-2 ${
                      location.pathname === item.href ? 'text-white' : 'text-text-muted hover:text-text-main'
                    }`}
                  >
                    {item.icon && <item.icon size={16} className="group-hover/link:text-brand-primary transition-colors opacity-80 group-hover/link:opacity-100 shrink-0" />}
                    <span className="relative z-10">{item.label}</span>
                    <motion.span 
                      className={`absolute -bottom-1 right-0 h-[2px] bg-brand-primary transition-all duration-500 ${
                        location.pathname === item.href ? 'w-full' : 'w-0 group-hover/link:w-full'
                      }`}
                    />
                  </Link>
                </Magnetic>
              ))}
            </div>

            {/* Left Side Group (Actions & Menu) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* PWA Install Button (Navbar - All Devices) */}
              {(!isStandalone && (deferredPrompt || isIOS)) && (
                <Magnetic strength={0.15}>
                  <button
                    onClick={handleInstallClick}
                    className="h-11 sm:h-12 px-3 xs:px-3.5 sm:px-4 gap-1.5 sm:gap-2 flex items-center bg-brand-primary text-white hover:bg-white hover:text-[#032a33] border border-brand-primary/20 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-[0_10px_20px_rgba(0,152,154,0.15)] hover:shadow-[0_15px_30px_rgba(0,152,154,0.3)] font-arabic shrink-0"
                    title="تثبيت التطبيق على جهازك"
                  >
                    <Download size={15} className="shrink-0" />
                    <span className="whitespace-nowrap">تثبيت التطبيق</span>
                  </button>
                </Magnetic>
              )}

              {/* WhatsApp Icon Link */}
              <Magnetic strength={0.2}>
                <a 
                  href="https://wa.me/message/SKHTX76Y7XXIF1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl text-text-muted hover:text-brand-primary hover:border-brand-primary/30 transition-all group shrink-0"
                  title="تواصل معنا عبر واتساب"
                >
                  <img src="/images/whatsapp.svg" alt="WhatsApp" className="w-5 h-5 sm:w-6 sm:h-6 opacity-75 group-hover:opacity-100 transition-opacity" />
                </a>
              </Magnetic>

              {/* Nav Menu Trigger (Mobile) */}
              <div className="flex lg:hidden">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="w-11 h-11 sm:w-12 sm:h-12 flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl text-text-main transition-all relative z-[60] group overflow-hidden active:scale-90"
                  aria-label="Toggle Menu"
                >
                  <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {isMenuOpen ? (
                        <motion.div
                          key="close"
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <X size={22} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ scale: 0, rotate: 90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: -90 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="flex flex-col gap-1.5"
                        >
                          <span className="w-5 sm:w-6 h-[2px] bg-current rounded-full" />
                          <span className="w-3.5 sm:w-4 h-[2px] bg-current rounded-full self-end" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* Refined Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[55] bg-brand-deep/40 backdrop-blur-[24px] lg:hidden"
            style={{ WebkitBackdropFilter: 'blur(24px)' }}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 right-0 w-full sm:w-[440px] bg-[#032a33]/98 backdrop-blur-[50px] border-l border-white/10 flex flex-col px-6 sm:px-10 py-6 sm:py-10 shadow-[0_0_120px_rgba(0,0,0,0.6)] overflow-y-auto no-scrollbar"
              style={{ WebkitBackdropFilter: 'blur(50px)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Top Branding */}
              <div className="flex items-center justify-between gap-3 mb-8 sm:mb-10">
                 <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20 shadow-xl shadow-brand-primary/5 shrink-0">
                       <img src="/images/brand_logo_1780527663741.png" alt="Mini Logo" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
                    </div>
                    <div className="text-start min-w-0">
                       <p className="text-sm sm:text-base font-black text-brand-primary truncate">رشيد الفلاحي</p>
                       <p className="text-xs font-medium text-text-muted/70 truncate">مصمم جرافيك ومهندس بصري</p>
                    </div>
                 </div>
                 <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-11 h-11 flex items-center justify-center bg-white/5 rounded-xl hover:bg-brand-primary hover:text-white transition-all border border-white/10 group active:scale-90 shrink-0"
                  aria-label="إغلاق القائمة"
                 >
                    <X size={20} className="text-text-muted group-hover:text-white transition-colors" />
                 </button>
              </div>

              {/* Navigation List */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between mb-2 px-1">
                  <p className="text-xs font-bold text-brand-primary/70 pe-3">قائمة التنقل</p>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`group relative flex items-center justify-between w-full p-4 sm:p-4.5 rounded-2xl transition-all text-right overflow-hidden active:scale-[0.98] ${
                        location.pathname === item.href 
                          ? 'bg-brand-primary/15 border border-brand-primary/40' 
                          : 'bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10'
                      }`}
                    >
                      {/* Active Background Glow */}
                      {location.pathname === item.href && (
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-transparent opacity-50" />
                      )}

                      <div className="flex items-center gap-3.5 sm:gap-4 relative z-10">
                         <div className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl transition-all shrink-0 ${
                            location.pathname === item.href 
                              ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                              : 'bg-white/5 text-text-muted group-hover:bg-brand-primary group-hover:text-white'
                         }`}>
                             {item.icon && <item.icon size={19} />}
                         </div>
                         <span className={`text-base sm:text-lg font-bold transition-colors ${
                           location.pathname === item.href ? 'text-white' : 'text-slate-200 group-hover:text-white'
                         }`}>
                          {item.label}
                        </span>
                      </div>
                      
                      <div className={`flex items-center gap-2 transition-all ${location.pathname === item.href ? 'translate-x-0' : 'translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}>
                        <Send size={14} className="rotate-180 text-brand-primary" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* PWA Promotion / Install prompt in Mobile Drawer */}
              {(!isStandalone && (deferredPrompt || isIOS)) && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 p-5 rounded-3xl bg-linear-to-br from-brand-primary/15 via-brand-primary/5 to-transparent border border-brand-primary/25 text-right space-y-3.5 relative overflow-hidden group/pwa"
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary/20 flex items-center justify-center text-brand-primary border border-brand-primary/30 shrink-0">
                      <Download size={18} />
                    </div>
                    <div>
                      <span className="text-sm sm:text-base font-bold text-white block">تثبيت التطبيق</span>
                      <span className="text-xs text-brand-primary font-medium">تجربة تصفح سريعة ومباشرة</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-arabic relative z-10">
                    استمتع بتجربة أسرع وأكثر سلاسة من خلال تثبيت التطبيق مباشرة على شاشة جهازك الرئيسية.
                  </p>
                  <button
                    onClick={handleInstallClick}
                    className="w-full py-3 bg-brand-primary hover:bg-white hover:text-brand-deep text-white text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2 relative z-10 active:scale-95"
                  >
                    <Download size={15} />
                    <span>تثبيت الآن</span>
                  </button>
                </motion.div>
              )}

              {/* Drawer Footer */}
              <div className="mt-auto pt-8 sm:pt-10 pb-6">
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <p className="text-xs font-bold text-brand-primary/70 whitespace-nowrap">تواصل معنا</p>
                      <div className="h-px w-full bg-white/10" />
                    </div>
                    <div className="flex gap-3 justify-start">
                      {[
                        { icon: Instagram, href: 'https://www.instagram.com/rasheed_alfalahi/', label: 'Instagram' },
                        { icon: Facebook, href: 'https://www.facebook.com/rasheed.alflahy/', label: 'Facebook' },
                        { icon: MessageSquare, href: 'https://wa.me/message/SKHTX76Y7XXIF1', label: 'WhatsApp' }
                      ].map((social, i) => (
                        <a 
                          key={i}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-text-muted hover:bg-brand-primary hover:text-white border border-white/10 transition-all shadow-lg hover:shadow-brand-primary/20 active:scale-95 group"
                        >
                          <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-xs text-text-muted/60 text-start">
                    © 2026 رشيد الفلاحي — جميع الحقوق محفوظة
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Device Installation Guide Modal */}
      <AnimatePresence>
        {showIOSGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setShowIOSGuide(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#042a33] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-start relative overflow-hidden"
              dir="rtl"
            >
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-5 left-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="إغلاق النافذة"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3.5 mb-6 pe-10">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-primary shrink-0">
                  <Smartphone size={24} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white font-arabic mb-0.5">تثبيت التطبيق على جهازك</h3>
                  <p className="text-xs sm:text-sm text-text-muted font-arabic">لتجربة تصفح سريعة وكاملة الشاشة</p>
                </div>
              </div>

              <div className="space-y-3.5 mb-6">
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="w-7 h-7 rounded-xl bg-brand-primary/20 text-brand-primary font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="text-sm text-slate-200 font-arabic leading-relaxed">
                    اضغط على أيقونة <span className="text-brand-primary font-bold">المشاركة (Share)</span> <Share size={14} className="inline mx-1 text-brand-primary" /> في شريط المتصفح (سفاري أو كروم).
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="w-7 h-7 rounded-xl bg-brand-primary/20 text-brand-primary font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="text-sm text-slate-200 font-arabic leading-relaxed">
                    مرر لأسفل واختر <span className="text-brand-primary font-bold">إضافة إلى الشاشة الرئيسية (Add to Home Screen)</span> <PlusSquare size={14} className="inline mx-1 text-brand-primary" />.
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="w-7 h-7 rounded-xl bg-brand-primary/20 text-brand-primary font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="text-sm text-slate-200 font-arabic leading-relaxed">
                    اضغط على <span className="text-brand-primary font-bold">إضافة (Add)</span> في الزاوية العلوية لتجد أيقونة التطبيق مباشرة على شاشتك.
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-3.5 px-6 rounded-xl bg-brand-primary hover:bg-[#5df3f5] text-[#032a33] font-bold text-sm font-arabic transition-all shadow-lg active:scale-95"
              >
                فهمت ذلك، شكراً
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


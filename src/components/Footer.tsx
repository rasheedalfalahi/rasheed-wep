import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Instagram, Palette, Facebook, ArrowLeft, X, ShieldCheck, FileText, Phone, Mail, Sparkles } from 'lucide-react';
import Magnetic from './Magnetic';
import { getLenis } from '../lib/lenis';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);
  const [showWaTooltip, setShowWaTooltip] = useState(false);
  const waLongPressTimerRef = useRef<number | null>(null);
  const waAutoHideTimerRef = useRef<number | null>(null);

  const clearWaTimers = () => {
    if (waLongPressTimerRef.current) {
      window.clearTimeout(waLongPressTimerRef.current);
      waLongPressTimerRef.current = null;
    }
    if (waAutoHideTimerRef.current) {
      window.clearTimeout(waAutoHideTimerRef.current);
      waAutoHideTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearWaTimers();
  }, []);

  const handleWaTouchStart = () => {
    clearWaTimers();
    waLongPressTimerRef.current = window.setTimeout(() => {
      setShowWaTooltip(true);
      waAutoHideTimerRef.current = window.setTimeout(() => {
        setShowWaTooltip(false);
      }, 3500);
    }, 350);
  };

  const handleWaTouchEnd = () => {
    if (waLongPressTimerRef.current) {
      window.clearTimeout(waLongPressTimerRef.current);
      waLongPressTimerRef.current = null;
    }
  };

  const socialLinks = [
    { icon: <img src="/images/whatsapp.svg" alt="WhatsApp" className="w-5 h-5 opacity-75 group-hover:opacity-100 transition-opacity" />, label: 'WhatsApp', href: 'https://wa.me/message/SKHTX76Y7XXIF1' },
    { icon: <Palette size={19} />, label: 'Behance', href: 'https://www.behance.net/Rasheed_alfalahi' },
    { icon: <Instagram size={19} />, label: 'Instagram', href: 'https://www.instagram.com/rasheed_alfalahi/' },
    { icon: <Facebook size={19} />, label: 'Facebook', href: 'https://www.facebook.com/rasheed.alflahy/' },
    { icon: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, label: 'X', href: 'https://x.com/Rasheed_falahi' },
    { icon: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.82.31-.9.51-1.52 1.43-1.63 2.45-.16.97.23 1.99 1.02 2.58.78.62 1.85.77 2.8.41 1-.36 1.76-1.3 1.84-2.35.03-.5.01-.98.01-1.47V.02z"/></svg>, label: 'TikTok', href: 'https://www.tiktok.com/@rasheed_alfalahi' }
  ];

  const footerLinks = [
    { label: 'الرئيسية', href: '/' },
    { label: 'معرض المشاريع', href: '/projects' },
    { label: 'الخدمات الإبداعية', href: '/services' },
    { label: 'المدونة', href: '/blog' },
    { label: 'من هو رشيد؟', href: '/#about' },
    { label: 'آراء العملاء', href: '/testimonials' },
    { label: 'تواصل معنا', href: '/contact' },
  ];

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      if (location.pathname === '/') {
        const elem = document.getElementById(targetId);
        if (elem) {
          const lenis = getLenis();
          if (lenis) {
            lenis.scrollTo(elem);
          } else {
            elem.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const elem = document.getElementById(targetId);
          if (elem) {
            const lenis = getLenis();
            if (lenis) {
              lenis.scrollTo(elem);
            } else {
              elem.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 200);
      }
    }
  };

  return (
    <footer id="contact" className="relative pt-14 sm:pt-20 lg:pt-28 pb-[max(6.5rem,calc(env(safe-area-inset-bottom,0px)+5.5rem))] sm:pb-12 overflow-hidden bg-[#021f26] border-t border-white/10">
      {/* Subtle Top Accent Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-primary/35 to-transparent" />

      <div className="container relative z-10">
        {/* Top Studio CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-gradient-to-br from-[#043540]/90 via-[#032830]/90 to-[#021d24]/95 border border-white/10 p-6 sm:p-10 lg:p-12 mb-14 sm:mb-20 shadow-2xl"
        >
          {/* Ambient Glow Inside Banner */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-primary/10 rounded-full blur-[90px]" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#25D366]/10 rounded-full blur-[90px]" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Right Side: Pitch & Quote */}
            <div className="lg:col-span-7 flex flex-col items-start text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/25 text-brand-primary mb-4">
                <Sparkles size={14} className="shrink-0" />
                <span className="text-xs font-bold font-arabic">هل لديك فكرة مشروع؟</span>
              </div>

              <h2 className="text-[clamp(1.65rem,4.5vw,3.1rem)] font-black leading-[1.25] mb-4 text-white font-arabic">
                لنحول طموحك إلى <span className="text-brand-primary">حقيقة بصرية</span>
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-slate-200/85 font-normal leading-[1.85] max-w-xl mb-6 font-arabic">
                نحن هنا لمواجهة التحديات الإبداعية وبناء هويات بصرية تترك انطباعاً لا يُنسى في ذهن جمهورك.
              </p>

              <div className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-white/[0.03] border-s-2 border-brand-primary border-y border-e border-y-white/5 border-e-white/5">
                <p className="text-xs sm:text-sm italic font-normal leading-relaxed text-slate-300/90 font-arabic">
                  "الإبداع لا ينمو في منطقة الراحة، بل يتشكل عندما نجرؤ على تجاوز المألوف."
                </p>
              </div>
            </div>

            {/* Left Side: Interactive WhatsApp Card with Tooltip/Popover */}
            <div className="lg:col-span-5 flex items-center lg:justify-end">
              <div
                onMouseEnter={() => setShowWaTooltip(true)}
                onMouseLeave={() => setShowWaTooltip(false)}
                onFocus={() => setShowWaTooltip(true)}
                onBlur={() => setShowWaTooltip(false)}
                onTouchStart={handleWaTouchStart}
                onTouchEnd={handleWaTouchEnd}
                onTouchCancel={handleWaTouchEnd}
                className="relative w-full max-w-md rounded-2xl sm:rounded-3xl bg-[#021c22]/85 border border-white/10 hover:border-[#25D366]/40 p-6 sm:p-7 shadow-xl backdrop-blur-xl flex flex-col gap-5 transition-all duration-300 select-none"
              >
                <AnimatePresence>
                  {showWaTooltip && (
                    <motion.div
                      role="tooltip"
                      initial={{ opacity: 0, y: 8, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.94 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute bottom-full mb-3 start-6 z-30 pointer-events-none whitespace-nowrap"
                    >
                      <div className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#04333e]/95 border border-[#25D366]/35 text-white shadow-xl shadow-black/40 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse shrink-0" />
                        <span className="text-xs sm:text-sm font-bold font-arabic text-slate-100">
                          هل لديك استفسار؟ تواصل معي فوراً
                        </span>
                        {/* Tooltip Arrow */}
                        <span className="absolute -bottom-1.5 start-6 w-3 h-3 rotate-45 bg-[#04333e]/95 border-b border-e border-[#25D366]/35" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-4 text-start">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/25 flex items-center justify-center shrink-0">
                    <img src="/images/whatsapp.svg" alt="WhatsApp" className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-black text-white font-arabic leading-snug">
                      تواصل معنا عبر واتساب
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted/90 font-arabic leading-relaxed">
                      رد سريع ومباشر لمناقشة مشروعك
                    </p>
                  </div>
                </div>

                <a
                  href="https://wa.me/message/SKHTX76Y7XXIF1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-[#032a33] font-bold font-arabic text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-300 shadow-md shadow-[#25D366]/15 active:scale-[0.99]"
                >
                  <img src="/images/whatsapp.svg" alt="" className="w-5 h-5 brightness-0" />
                  <span>ابدأ المحادثة</span>
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Organized Footer Grid */}
        <div className="footer-main-wrap pb-12 sm:pb-16 border-b border-white/10">
          <div className="footer-main-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            
            {/* Column 1 (5 cols): Brand Identity, Bio & Availability */}
            <div className="footer-brand-col lg:col-span-5 flex flex-col items-start text-start space-y-5 lg:pe-8">
              <Link to="/" className="group flex items-center gap-3.5">
                <img 
                  src="/images/projects/log2.png" 
                  alt="Rasheed Falahi Logo" 
                  className="h-9 w-auto object-contain opacity-95 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="text-xl sm:text-2xl font-black text-white group-hover:text-brand-primary transition-colors">
                  Rasheed.<span className="text-brand-primary">Alfalahi</span>
                </span>
              </Link>

              <p className="text-sm sm:text-base font-normal text-text-muted/85 leading-[1.85] max-w-sm font-arabic">
                مصمم جرافيك ومهندس بصري متخصص في بناء الهويات الرقمية والحلول الإبداعية المبتكرة التي تجمع بين الفن والتقنية.
              </p>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-xs font-bold text-emerald-300 font-arabic">متاح لاستقبال مشاريع جديدة</span>
              </div>
            </div>

            {/* Column 2 (3 cols): Quick Navigation */}
            <div className="footer-quick-links lg:col-span-3 flex flex-col items-start text-start space-y-5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                <h4 className="text-xs sm:text-sm font-bold text-white font-arabic">روابط الوصول السريع</h4>
              </div>

              <nav className="grid grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-3 w-full">
                {footerLinks.map((link, idx) => (
                  <Link 
                    key={idx} 
                    to={link.href} 
                    onClick={(e) => handleLinkClick(link.href, e)}
                    className="group inline-flex items-center gap-2 text-sm font-normal text-text-muted hover:text-brand-primary transition-all font-arabic"
                  >
                    <span className="w-1.5 h-px bg-white/20 group-hover:w-3 group-hover:bg-brand-primary transition-all duration-300" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 3 (4 cols): Direct Contact Info & Social Networks */}
            <div className="footer-contact-col lg:col-span-4 flex flex-col items-start text-start space-y-5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                <h4 className="text-xs sm:text-sm font-bold text-white font-arabic">قنوات التواصل المباشر</h4>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <a
                  href="tel:00967778926376"
                  className="group flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-brand-primary/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0 group-hover:scale-105 transition-transform">
                    <Phone size={17} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] text-text-muted/75 font-arabic block">اتصل مباشرة</span>
                    <span className="text-sm sm:text-base font-bold text-white group-hover:text-brand-primary transition-colors font-mono block" dir="ltr">
                      +967 778 926 376
                    </span>
                  </div>
                </a>

                <a
                  href="mailto:rasheedalfalahi778@gmail.com"
                  className="group flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-brand-primary/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0 group-hover:scale-105 transition-transform">
                    <Mail size={17} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] text-text-muted/75 font-arabic block">البريد الإلكتروني</span>
                    <span className="text-xs sm:text-sm font-medium text-white/90 group-hover:text-brand-primary transition-colors break-all block font-mono">
                      rasheedalfalahi778@gmail.com
                    </span>
                  </div>
                </a>
              </div>

              {/* Social Links Row */}
              <div className="pt-1 w-full">
                <span className="text-xs font-medium text-text-muted/75 font-arabic block mb-2.5">
                  تابع أعمالي على المنصات الرقمية
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {socialLinks.map((link, idx) => (
                    <Magnetic key={idx} strength={0.1}>
                      <a 
                        href={link.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        title={link.label}
                        className="group w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-text-muted hover:text-brand-primary hover:border-brand-primary/35 hover:bg-brand-primary/10 transition-all hover:-translate-y-0.5"
                      >
                        {link.icon}
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-start">
          <div className="text-xs sm:text-sm font-medium text-text-muted/75 font-arabic">
            © {currentYear} المصمم رشيد الفلاحي — جميع الحقوق محفوظة.
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-text-muted/80 font-arabic">
            <button 
              onClick={() => setActiveModal('privacy')}
              className="hover:text-brand-primary transition-colors cursor-pointer py-1"
            >
              سياسة الخصوصية
            </button>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <button 
              onClick={() => setActiveModal('terms')}
              className="hover:text-brand-primary transition-colors cursor-pointer py-1"
            >
              الشروط والأحكام
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Information Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#032a33] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-start relative overflow-hidden"
              dir="rtl"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-5 left-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="إغلاق النافذة"
              >
                <X size={18} />
              </button>

              {activeModal === 'privacy' ? (
                <div>
                  <div className="flex items-center gap-3.5 mb-5 pe-10">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center text-brand-primary shrink-0">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-white font-arabic">سياسة الخصوصية</h3>
                      <p className="text-xs sm:text-sm text-text-muted font-arabic">حماية بيانات العملاء وحقوق السرية</p>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm sm:text-base text-slate-200 font-arabic leading-[1.8] max-h-[60vh] overflow-y-auto ps-1 pe-2">
                    <p>
                      نحن نحرص على خصوصية وسرية بيانات عملائنا ومشاريعهم بأعلى المعايير المهنية:
                    </p>
                    <ul className="list-disc list-inside space-y-2.5 text-slate-200/90 text-sm">
                      <li>كافة المعلومات والملفات المستلمة من العميل تُستخدم حصراً لإنجاز المشروع المتفق عليه.</li>
                      <li>لا يتم مشاركة أي ملفات أو تفاصيل تجارية أو أسرار مهنية مع أي طرف ثالث تحت أي ظرف.</li>
                      <li>يحق للمصمم عرض الأعمال المنجزة في معرض أعماله الشخصي ما لم يتم الاتفاق كتابياً على اتفاقية عدم إفصاح (NDA).</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3.5 mb-5 pe-10">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center text-brand-primary shrink-0">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-white font-arabic">الشروط والأحكام</h3>
                      <p className="text-xs sm:text-sm text-text-muted font-arabic">إطار العمل والتعاقد المهني</p>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm sm:text-base text-slate-200 font-arabic leading-[1.8] max-h-[60vh] overflow-y-auto ps-1 pe-2">
                    <ul className="list-disc list-inside space-y-2.5 text-slate-200/90 text-sm">
                      <li>تبدأ مراحل التصميم بعد الاتفاق الواضح على نطاق العمل والمخرجات المحددة والجدول الزمني.</li>
                      <li>تتضمن كل مرحلة تصميمية جولات مراجعة وتعديل محددة لضمان الوصول لأفضل نتيجة مرضية للعميل.</li>
                      <li>يتم تسليم الملفات المصدرية المفتوحة والنسخ الطباعية والرقمية عالية الدقة فور استكمال المشروع.</li>
                      <li>الملكية الفكرية للتصاميم المعتمدة تنتقل للعميل بالكامل بعد اعتماد النسخة النهائية.</li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2.5 rounded-xl bg-brand-primary text-[#032a33] font-bold text-sm font-arabic hover:bg-[#5df3f5] transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}

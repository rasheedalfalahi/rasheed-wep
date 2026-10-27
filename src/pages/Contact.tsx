import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  Clock, 
  ArrowLeft, 
  Sparkles, 
  Check, 
  Copy,
  ShieldCheck,
  FileCheck2
} from 'lucide-react';

export default function Contact() {
  const [copiedField, setCopiedField] = useState<'phone' | 'email' | null>(null);
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

  const copyToClipboard = (text: string, field: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const processSteps = [
    {
      number: '01',
      title: 'استكشاف الفكرة',
      desc: 'مناقشة أهداف المشروع، الجمهور المستهدف، والتوجه البصري الأنسب.'
    },
    {
      number: '02',
      title: 'تحديد النطاق والجدول',
      desc: 'الاتفاق على المخرجات النهائية، الجدول الزمني، وعرض السعر المخصص.'
    },
    {
      number: '03',
      title: 'التنفيذ والتسليم',
      desc: 'مراحل تصميمية تفاعلية مع مراجعات دقيقة وتسليم الملفات المصدرية الكاملة.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen bg-bg overflow-hidden text-start"
      dir="rtl"
    >
      {/* Dark Upper Section: Header & Main Direct Contact Card */}
      <section className="pt-24 xs:pt-28 sm:pt-36 lg:pt-44 pb-12 sm:pb-16 bg-bg relative">
        <div className="container relative z-10 max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="max-w-3xl mb-10 sm:mb-14">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary mb-5"
            >
              <Sparkles size={15} className="shrink-0" />
              <span className="text-xs sm:text-sm font-bold font-arabic">تواصل مباشر ومخصص</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[clamp(1.75rem,5.5vw,3.75rem)] font-black text-white leading-[1.25] mb-4 sm:mb-5 font-arabic"
            >
              لنبدأ محادثة تثمر عن <br className="hidden sm:inline" />
              <span className="text-brand-primary">عمل إبداعي متميز.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-text-muted/90 leading-[1.85] font-arabic max-w-2xl"
            >
              تواصل مباشرة مع المصمم بدون نماذج معقدة أو فترات انتظار طويلة، لمناقشة فكرتك وتحديد المسار الأمثل لتنفيذ مشروعك القادم.
            </motion.p>
          </div>

          {/* Main Direct Contact Card */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="rounded-2xl sm:rounded-3xl bg-[#03262e]/50 border border-white/10 p-5 xs:p-6 sm:p-10 lg:p-12 backdrop-blur-xl shadow-2xl relative"
          >
            {/* Subtle Ambient Glow */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden pointer-events-none">
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-primary/10 rounded-full blur-[90px]" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Simplified Direct WhatsApp Card */}
              <div 
                onMouseEnter={() => setShowWaTooltip(true)}
                onMouseLeave={() => setShowWaTooltip(false)}
                onFocus={() => setShowWaTooltip(true)}
                onBlur={() => setShowWaTooltip(false)}
                onTouchStart={handleWaTouchStart}
                onTouchEnd={handleWaTouchEnd}
                onTouchCancel={handleWaTouchEnd}
                className="relative lg:col-span-7 flex flex-col items-start justify-between gap-6 select-none"
              >
                <AnimatePresence>
                  {showWaTooltip && (
                    <motion.div
                      role="tooltip"
                      initial={{ opacity: 0, y: 8, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.94 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute bottom-full mb-3 start-0 z-20 pointer-events-none whitespace-nowrap"
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

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/25 flex items-center justify-center shrink-0">
                    <img src="/images/whatsapp.svg" alt="WhatsApp" className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-black text-white font-arabic leading-snug">
                      تواصل معنا عبر واتساب
                    </h2>
                    <p className="text-sm sm:text-base text-text-muted/90 font-arabic leading-relaxed">
                      نحن هنا لمساعدتك
                    </p>
                  </div>
                </div>

                <a
                  href="https://wa.me/message/SKHTX76Y7XXIF1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full sm:w-auto sm:min-w-[230px] items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-[#032a33] font-bold font-arabic text-sm sm:text-base transition-all duration-300 shadow-md shadow-[#25D366]/15 active:scale-[0.98]"
                >
                  <img src="/images/whatsapp.svg" alt="" className="w-5 h-5 brightness-0" />
                  <span>ابدأ المحادثة</span>
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform shrink-0" />
                </a>
              </div>

              {/* Right Column: Direct Phone & Email + Reassurance */}
              <div className="lg:col-span-5 lg:border-s lg:border-white/10 lg:ps-10 space-y-4">
                <h3 className="text-xs sm:text-sm font-bold text-text-muted/80 font-arabic mb-3">
                  قنوات الاتصال المباشرة الإضافية
                </h3>

                {/* Phone Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/5 flex items-center justify-center text-brand-primary shrink-0">
                      <Phone size={18} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs text-text-muted font-arabic block mb-0.5">الهاتف المباشر</span>
                      <a 
                        href="tel:00967778926376" 
                        className="text-sm sm:text-base font-bold text-white hover:text-brand-primary transition-colors font-mono block truncate"
                      >
                        00967 778926376
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('00967778926376', 'phone')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-colors shrink-0"
                    title="نسخ الرقم"
                    aria-label="نسخ الرقم"
                  >
                    {copiedField === 'phone' ? <Check size={16} className="text-brand-primary" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Email Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/5 flex items-center justify-center text-brand-primary shrink-0">
                      <Mail size={18} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs text-text-muted font-arabic block mb-0.5">البريد الإلكتروني</span>
                      <a 
                        href="mailto:rasheedalfalahi778@gmail.com" 
                        className="text-xs sm:text-sm font-bold text-white hover:text-brand-primary transition-colors font-mono truncate block"
                      >
                        rasheedalfalahi778@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('rasheedalfalahi778@gmail.com', 'email')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-colors shrink-0"
                    title="نسخ البريد"
                    aria-label="نسخ البريد الإلكتروني"
                  >
                    {copiedField === 'email' ? <Check size={16} className="text-brand-primary" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Quick Peace-of-Mind Points */}
                <div className="pt-3 grid grid-cols-1 gap-2.5">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-text-muted/85 font-arabic">
                    <Clock size={15} className="text-brand-primary shrink-0" />
                    <span>مواعيد العمل: السبت – الخميس (9 ص – 9 م)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-text-muted/85 font-arabic">
                    <ShieldCheck size={15} className="text-brand-primary shrink-0" />
                    <span>خصوصية وسرية تامة لكافة أفكار وبيانات مشروعك</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-text-muted/85 font-arabic">
                    <FileCheck2 size={15} className="text-brand-primary shrink-0" />
                    <span>تسليم كافة الملفات المصدرية المفتوحة المعتمدة</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Light Section: Process Roadmap */}
      <section className="py-14 sm:py-20 bg-[#f8fafc] border-y border-slate-200/80 relative">
        <div className="container relative z-10 max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl font-black text-[#032a33] font-arabic mb-2">
              مسار العمل بعد بدء المحادثة
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-arabic leading-[1.8]">
              خطوات واضحة ومنظمة تضمن تحويل فكرتك إلى تصميم متكامل يفوق التوقعات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {processSteps.map((step, idx) => (
              <div 
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-[0_12px_30px_-15px_rgba(3,42,51,0.07)] hover:border-brand-primary/40 hover:shadow-[0_18px_40px_-15px_rgba(0,152,154,0.15)] transition-all text-start"
              >
                <span className="text-xs sm:text-sm font-mono font-bold text-[#045063] bg-brand-primary/10 border border-brand-primary/20 px-3 py-1 rounded-lg mb-3.5 inline-block">
                  {step.number}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-[#032a33] font-arabic mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-slate-600 font-arabic leading-[1.8]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}

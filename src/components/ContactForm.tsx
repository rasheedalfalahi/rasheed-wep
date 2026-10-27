import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Sparkles, User, Mail, MessageSquare, ArrowLeft, Loader2 } from 'lucide-react';
import Magnetic from './Magnetic';

interface ContactFormProps {
  variant?: 'compact' | 'full';
  className?: string;
  title?: string;
  subtitle?: string;
}

const serviceOptions = [
  'تصميم هوية بصرية',
  'تصميم واجهات UI/UX',
  'موشن جرافيك ومونتاج',
  'مطبوعات وسوشيال ميديا',
  'استشارة إبداعية'
];

export default function ContactForm({ variant = 'full', className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 24, 
      filter: 'blur(6px)',
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      scale: 1,
      transition: { 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMsg('الرجاء تعبئة جميع الحقول المطلوبة');
      return;
    }

    setStatus('loading');
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.service 
          ? `[نوع المشروع: ${formData.service}]\n${formData.message.trim()}`
          : formData.message.trim()
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus('success');
        setStatusMsg(data.message || 'تم إرسال رسالتك بنجاح! سنعاود التواصل معك قريباً.');
        setFormData({ name: '', email: '', service: '', message: '' });
      } else {
        setStatus('error');
        setStatusMsg(data.error || 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      setStatus('error');
      setStatusMsg('تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت أو التواصل عبر واتساب مباشرة.');
    }
  };

  const toggleService = (svc: string) => {
    setFormData(prev => ({
      ...prev,
      service: prev.service === svc ? '' : svc
    }));
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
      className={`relative rounded-[1.8rem] sm:rounded-[2.5rem] bg-brand-deep/20 border border-white/10 backdrop-blur-2xl p-6 xs:p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden ${className}`}
    >
      {/* Ambient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      <form className="relative z-10 space-y-6 sm:space-y-7" onSubmit={handleSubmit} noValidate>
        
        {/* Header Eyebrow inside the form */}
        <motion.div variants={itemVariants} className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
              <Sparkles size={14} />
            </div>
            <span className="text-xs font-bold text-white font-arabic">نموذج التواصل السريع</span>
          </div>
          <span className="text-[10px] font-mono text-brand-primary/60 tracking-wider uppercase">Direct Dispatch</span>
        </motion.div>

        {/* Form Inputs Grid (Name & Email) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 text-start">
          {/* Name Field */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="flex items-center justify-between text-[11px] font-bold tracking-wide text-slate-300 font-arabic">
              <span className="flex items-center gap-1.5">
                <User size={12} className="text-brand-primary" />
                الاسم واللقب
              </span>
              <span className="text-[9px] text-brand-primary/50 font-mono">مطلوب *</span>
            </label>
            <div className={`relative rounded-xl transition-all duration-300 ${
              focusedField === 'name' 
                ? 'bg-white/[0.07] ring-1 ring-brand-primary/50' 
                : 'bg-white/[0.03] hover:bg-white/[0.05]'
            }`}>
              <input
                type="text"
                id="contact-name"
                name="name"
                required
                value={formData.name}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 outline-none text-white placeholder-slate-500 text-sm font-arabic transition-all focus:border-brand-primary"
                placeholder="مثال: محمد العمري"
              />
            </div>
          </motion.div>

          {/* Email Field */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="flex items-center justify-between text-[11px] font-bold tracking-wide text-slate-300 font-arabic">
              <span className="flex items-center gap-1.5">
                <Mail size={12} className="text-brand-primary" />
                البريد الإلكتروني
              </span>
              <span className="text-[9px] text-brand-primary/50 font-mono">مطلوب *</span>
            </label>
            <div className={`relative rounded-xl transition-all duration-300 ${
              focusedField === 'email' 
                ? 'bg-white/[0.07] ring-1 ring-brand-primary/50' 
                : 'bg-white/[0.03] hover:bg-white/[0.05]'
            }`}>
              <input
                type="email"
                id="contact-email"
                name="email"
                required
                dir="ltr"
                value={formData.email}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 outline-none text-white placeholder-slate-500 text-sm font-sans transition-all focus:border-brand-primary text-right sm:text-left"
                placeholder="name@example.com"
              />
            </div>
          </motion.div>
        </div>

        {/* Optional Project Category Selector */}
        <motion.div variants={itemVariants} className="space-y-2.5 text-start">
          <label className="text-[11px] font-bold tracking-wide text-slate-300 flex items-center gap-1.5 font-arabic">
            <Sparkles size={12} className="text-brand-primary" />
            مجال العمل أو المشروع (اختياري)
          </label>
          <div className="flex flex-wrap gap-2 pt-1">
            {serviceOptions.map((svc) => {
              const isSelected = formData.service === svc;
              return (
                <button
                  key={svc}
                  type="button"
                  onClick={() => toggleService(svc)}
                  className={`text-xs px-3.5 py-1.5 rounded-full transition-all duration-300 font-arabic border ${
                    isSelected
                      ? 'bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/20 scale-[1.02]'
                      : 'bg-white/[0.03] text-slate-400 border-white/10 hover:border-brand-primary/40 hover:text-white'
                  }`}
                >
                  {svc}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Message Field */}
        <motion.div variants={itemVariants} className="space-y-2 text-start">
          <label className="flex items-center justify-between text-[11px] font-bold tracking-wide text-slate-300 font-arabic">
            <span className="flex items-center gap-1.5">
              <MessageSquare size={12} className="text-brand-primary" />
              تفاصيل الفكرة أو المشروع
            </span>
            <span className="text-[9px] text-brand-primary/50 font-mono">مطلوب *</span>
          </label>
          <div className={`relative rounded-xl transition-all duration-300 ${
            focusedField === 'message' 
              ? 'bg-white/[0.07] ring-1 ring-brand-primary/50' 
              : 'bg-white/[0.03] hover:bg-white/[0.05]'
          }`}>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={3}
              value={formData.message}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 outline-none text-white placeholder-slate-500 text-sm font-arabic transition-all focus:border-brand-primary resize-none min-h-[95px] leading-relaxed"
              placeholder="اكتب نبذة عن مشروعك، الأهداف، والجدول الزمني المقترح..."
            />
          </div>
        </motion.div>

        {/* Action Button & Status Bar */}
        <motion.div variants={itemVariants} className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <Magnetic strength={0.15}>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="relative group w-full sm:w-auto overflow-hidden rounded-xl sm:rounded-2xl bg-brand-primary text-white font-arabic font-bold text-xs sm:text-sm px-8 py-4 flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_10px_25px_rgba(0,152,154,0.3)] hover:shadow-[0_15px_35px_rgba(0,152,154,0.5)] disabled:opacity-60 cursor-pointer active:scale-95"
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              
              {status === 'loading' ? (
                <>
                  <Loader2 size={16} className="animate-spin text-white" />
                  <span>جاري الإرسال...</span>
                </>
              ) : (
                <>
                  <Send size={15} className="group-hover:-translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  <span>إرسال الرسالة الآن</span>
                </>
              )}
            </button>
          </Magnetic>

          <p className="text-[10px] text-slate-400/80 font-arabic text-center sm:text-start">
            🔒 يتم التعامل مع جميع البيانات بسرية تامة.
          </p>
        </motion.div>

        {/* Animated Feedback Banner */}
        <AnimatePresence mode="wait">
          {status !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-arabic ${
                status === 'success'
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                  : status === 'error'
                  ? 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                  : 'bg-white/5 border-white/10 text-slate-300'
              }`}
            >
              {status === 'success' && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
              {status === 'error' && <AlertCircle size={18} className="text-rose-400 shrink-0" />}
              {status === 'loading' && <Loader2 size={18} className="text-brand-primary animate-spin shrink-0" />}
              <span className="leading-relaxed">{statusMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

      </form>
    </motion.div>
  );
}

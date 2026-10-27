import React from 'react';
import { motion } from 'motion/react';
import { Paintbrush, AppWindow, Video, Printer, Layers, LayoutGrid, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const servicesList = [
    { 
      id: '01', 
      titleAr: 'الهوية البصرية', 
      titleEn: 'Brand Identity',
      icon: Paintbrush,
    },
    { 
      id: '02', 
      titleAr: 'واجهات المستخدم', 
      titleEn: 'UI / UX Design',
      icon: AppWindow,
    },
    { 
      id: '03', 
      titleAr: 'المحتوى الرقمي', 
      titleEn: 'Social Media',
      icon: Layers,
    },
    { 
      id: '04', 
      titleAr: 'المطبوعات والنشر', 
      titleEn: 'Editorial & Print',
      icon: Printer,
    },
    { 
      id: '05', 
      titleAr: 'الموشن جرافيك', 
      titleEn: 'Motion Graphics',
      icon: Video,
    },
    { 
      id: '06', 
      titleAr: 'تصميم الإنفوجرافيك', 
      titleEn: 'Infographic Design',
      icon: LayoutGrid,
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="min-h-screen bg-bg overflow-hidden"
    >
      {/* Dark Editorial Header Section */}
      <section className="pt-24 xs:pt-28 sm:pt-36 lg:pt-44 pb-10 sm:pb-14 bg-bg relative">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 relative z-10 text-start">
            <div>
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs sm:text-sm font-bold text-brand-primary mb-2 relative z-10"
              >
                مجالات التخصص الإبداعي
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[clamp(1.85rem,6vw,3.5rem)] font-black relative z-10 text-white leading-[1.2]"
              >
                الخدمات <span className="text-brand-primary">الإبداعية</span>
              </motion.h1>
            </div>
            <span className="text-xs sm:text-sm font-bold text-text-muted/70 font-outfit">
              Creative Services · 01 — 06
            </span>
          </div>
        </div>
      </section>

      {/* Light Services Grid Section */}
      <section className="py-12 sm:py-20 bg-[#f8fafc] border-y border-slate-200/80 relative">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative z-10">
            {servicesList.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative bg-white hover:bg-[#f4fbfb] border border-slate-200/90 hover:border-brand-primary/45 p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 shadow-[0_12px_32px_-12px_rgba(3,42,51,0.07)] hover:shadow-[0_20px_45px_-15px_rgba(0,152,154,0.18)] flex flex-col justify-between min-h-[165px] sm:min-h-[195px] text-start overflow-hidden"
                >
                  {/* Subtle Ambient Hover Glow */}
                  <div className="absolute -top-12 -left-12 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-brand-primary/15 transition-colors duration-500" />

                  {/* Top Row: Icon & Number */}
                  <div className="flex items-center justify-between gap-4 relative z-10">
                    <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 shrink-0">
                      <IconComponent size={22} className="stroke-[1.75]" />
                    </div>
                    <span className="text-xl sm:text-2xl font-black font-outfit text-slate-300 group-hover:text-brand-primary transition-colors leading-none">
                      {service.id}
                    </span>
                  </div>

                  {/* Bottom Row: Concise Bilingual Titles */}
                  <div className="relative z-10 pt-6 mt-auto border-t border-slate-100 flex items-baseline justify-between gap-3 flex-wrap">
                    <h2 className="text-xl sm:text-2xl font-black text-[#032a33] group-hover:text-brand-primary transition-colors leading-snug font-arabic">
                      {service.titleAr}
                    </h2>
                    <span className="text-xs sm:text-sm font-bold text-slate-500 group-hover:text-[#045063] transition-colors font-outfit" dir="ltr">
                      {service.titleEn}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dark CTA Section */}
      <section className="py-12 sm:py-20 bg-bg">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#045063] to-[#032a33]/40 border border-white/15 text-center relative overflow-hidden"
          >
            <div className="relative z-10 max-w-xl mx-auto space-y-4 sm:space-y-5">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center text-brand-primary mx-auto">
                <Heart size={20} />
              </div>
              
              <h2 className="text-xl sm:text-3xl font-black text-white leading-[1.3]">هل لديك مشروع جديد؟</h2>

              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <a 
                  href="https://wa.me/message/SKHTX76Y7XXIF1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-primary hover:bg-[#5df3f5] text-[#032a33] px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-md flex items-center justify-center gap-2.5"
                >
                  <img src="/images/whatsapp.svg" alt="WhatsApp" className="w-4.5 h-4.5 brightness-0" />
                  <span>تواصل الآن عبر واتساب</span>
                </a>
                <Link 
                  to="/projects"
                  className="bg-white/5 hover:bg-white/10 border border-white/15 text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center"
                >
                  استعراض المشاريع
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

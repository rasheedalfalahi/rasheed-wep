/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpLeft, Sparkles, Compass, ShieldAlert, Cpu, Award } from 'lucide-react';
import Magnetic from './Magnetic';
import SkeletonImage from './SkeletonImage';

export default function Hero() {
  return (
    <section id="home" className="hero-section relative min-h-screen flex flex-col justify-center overflow-hidden bg-bg pt-24 xs:pt-28 sm:pt-36 lg:pt-40 pb-14 sm:pb-24">
      {/* Premium Minimal Grid System (Invisible structure look) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] pointer-events-none" />

      {/* Outer Studio Technical Borders */}
      <div className="absolute top-24 bottom-12 left-6 right-6 border border-white/[0.03] pointer-events-none hidden xl:block rounded-[2.5rem]" />

      <div className="container relative z-20">
        <div className="hero-grid grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-14 items-center">
          
          {/* Main Copy / Typographic Block */}
          <div className="hero-copy-col lg:col-span-6 flex flex-col items-start text-start order-2 lg:order-1 relative">
            
            {/* Premium Interactive Tag/Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="hero-badges mb-4 sm:mb-7 flex flex-wrap items-center gap-2 sm:gap-3"
            >
              <div className="hero-badge-item inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-xl border border-white/10 bg-[#042a33]/60 text-white text-xs sm:text-sm font-bold backdrop-blur-md">
                <Sparkles size={13} className="text-brand-primary shrink-0" />
                <span>مهندس بصري</span>
              </div>
              <div className="hero-badge-item inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-xl border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-xs sm:text-sm font-bold backdrop-blur-md font-arabic">
                <span className="w-1.5 h-1.5 rounded-sm bg-brand-primary shrink-0" />
                <span>مصمم جرافيك</span>
              </div>
            </motion.div>

            {/* Rebalanced, Elegant and Highly Refined Typography */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="hero-heading-wrap space-y-2.5 sm:space-y-4 mb-4 sm:mb-6"
            >
              <h1 className="hero-title text-[clamp(1.85rem,6.5vw,3.75rem)] font-black leading-[1.25] text-white">
                رشيد الفلاحي
                <span className="hero-subtitle text-transparent bg-clip-text bg-gradient-to-l from-brand-primary to-[#5df3f5] font-medium font-outfit text-[clamp(1.15rem,4vw,2.25rem)] block mt-1.5 sm:mt-3">
                  Rasheed Alfalahi
                </span>
              </h1>
            </motion.div>

            {/* Refined Copywriting with sophisticated Arabic tone */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="hero-desc text-base sm:text-lg lg:text-xl text-slate-200 max-w-xl leading-[1.85] mb-6 sm:mb-9 font-arabic font-normal"
            >
              أحوّل الأفكار المعقدة إلى هويات وتجارب بصرية واضحة بلمسة عصرية تترك أثراً لا يُنسى.
            </motion.p>

            {/* Tactical Interactive Action Triggers */}
            <div className="hero-actions flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start w-full sm:w-auto mb-2 sm:mb-4 relative z-20">
              <Magnetic strength={0.12}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45 }}
                  className="w-full sm:w-auto"
                >
                  <Link 
                    to="/projects" 
                    className="hero-primary-btn group relative h-12 sm:h-14 px-6 sm:px-8 flex items-center justify-center bg-white text-[#032a33] hover:text-white rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,152,154,0.12)] hover:shadow-[0_20px_40px_rgba(0,152,154,0.25)] transition-all duration-500 text-sm sm:text-base font-bold w-full sm:min-w-[210px]"
                  >
                    {/* Premium glare/shine sweep effect */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-primary to-[#00b2b5] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                    
                    {/* Oblique white glare sweep line */}
                    <span className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-[shine_0.75s_ease-out_forwards]" />
                    
                    <span className="relative z-10 flex items-center gap-2.5">
                      <span>استكشف صالة المشاريع</span>
                      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300 shrink-0" />
                    </span>
                  </Link>
                </motion.div>
              </Magnetic>
              
              <Magnetic strength={0.18}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 }}
                  className="w-full sm:w-auto"
                >
                  <a 
                    href="#contact" 
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('contact');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="hero-secondary-btn group relative h-12 sm:h-14 px-6 sm:px-8 flex items-center justify-center border border-white/15 hover:border-brand-primary/40 bg-white/5 hover:bg-white/[0.08] rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold text-white transition-all duration-300 w-full sm:min-w-[180px] overflow-hidden"
                  >
                    {/* Interactive hover subtle light sweep */}
                    <span className="absolute inset-0 w-full h-full bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <span className="relative z-10 flex items-center gap-2.5">
                      <span>ابدأ مشروعك معنا</span>
                      <ArrowUpLeft size={16} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                    </span>
                  </a>
                </motion.div>
              </Magnetic>
            </div>

          </div>

          {/* Right Column: Sleek, high-concept visual structure */}
          <div className="hero-visual-col lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2 relative w-full gap-4 sm:gap-5 lg:gap-0">
            {/* The Clean Image Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [6, -4, 6] 
              }}
              transition={{ 
                opacity: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 },
                scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 },
                y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
              }}
              className="hero-image-frame relative w-full max-w-[230px] xs:max-w-[280px] sm:max-w-[380px] lg:max-w-[520px] xl:max-w-[580px] group flex justify-center items-center"
            >
              <SkeletonImage 
                src="/images/projects/454.png" 
                alt="رشيد الفلاحي"
                className="hero-portrait-img w-full h-auto max-h-[280px] xs:max-h-[340px] sm:max-h-[450px] lg:max-h-[580px] object-contain group-hover:scale-[1.02] transition-all duration-1000"
                referrerPolicy="no-referrer"
              />

              {/* FLOATING BADGE 1: Projects - Visible on Desktop (xl+) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute top-[18%] -right-4 xl:-right-8 z-10 
                           bg-[#042a33]/90 backdrop-blur-xl border border-brand-primary/25 hover:border-brand-primary/40
                           p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,152,154,0.2)] hidden xl:flex items-center gap-3.5 
                           transition-all duration-300 group/badge pointer-events-auto"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20 shrink-0">
                  <Sparkles size={18} />
                </div>
                <div className="text-start min-w-[125px]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black font-outfit text-transparent bg-clip-text bg-gradient-to-l from-brand-primary to-[#5df3f5] leading-none">+100</span>
                    <span className="text-xs text-white/70 font-arabic font-medium">مشروع</span>
                  </div>
                  <span className="text-xs font-bold text-white block font-arabic mt-1 leading-snug">مشاريع استراتيجية</span>
                  <span className="text-[11px] text-white/60 font-arabic block leading-snug">حلول إبداعية متكاملة</span>
                </div>
              </motion.div>

              {/* FLOATING BADGE 2: Experience - Visible on Desktop (xl+) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="absolute bottom-[18%] -left-4 xl:-left-8 z-[5] 
                           bg-[#031d23]/90 backdrop-blur-xl border border-white/10 hover:border-brand-primary/25
                           p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] hidden xl:flex items-center gap-3.5 
                           transition-all duration-300 pointer-events-auto"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#5df3f5] border border-white/10 shrink-0">
                  <Award size={18} />
                </div>
                <div className="text-start min-w-[125px]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black font-outfit text-transparent bg-clip-text bg-gradient-to-l from-[#5df3f5] to-brand-primary leading-none">+5</span>
                    <span className="text-xs text-white/70 font-arabic font-medium">سنوات</span>
                  </div>
                  <span className="text-xs font-bold text-white block font-arabic mt-1 leading-snug">خبرة في التصميم</span>
                  <span className="text-[11px] text-white/60 font-arabic block leading-snug">البصري والهويات</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Mobile & Tablet Stats Container - Clean 2-Column Grid below the Image without text truncation */}
            <div className="hero-stats-mobile grid grid-cols-2 xl:hidden w-full max-w-md gap-3 sm:gap-4 z-10">
              {/* Badge 1: Projects */}
              <div className="hero-stat-card bg-[#042a33]/90 backdrop-blur-xl border border-brand-primary/20 p-3.5 sm:p-4 rounded-2xl shadow-[0_15px_30px_rgba(0,152,154,0.15)] flex flex-col justify-between text-start">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-baseline gap-1">
                    <span className="hero-stat-num text-xl sm:text-2xl font-black font-outfit text-transparent bg-clip-text bg-gradient-to-l from-brand-primary to-[#5df3f5] leading-none">+100</span>
                    <span className="hero-stat-unit text-xs text-white/75 font-arabic font-medium">مشروع</span>
                  </div>
                  <div className="hero-stat-icon w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20 shrink-0">
                    <Sparkles size={15} />
                  </div>
                </div>
                <span className="hero-stat-label text-xs sm:text-sm font-bold text-white block font-arabic mt-2 leading-snug">مشاريع استراتيجية</span>
              </div>

              {/* Badge 2: Experience */}
              <div className="hero-stat-card bg-[#031d23]/85 backdrop-blur-xl border border-white/10 p-3.5 sm:p-4 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.2)] flex flex-col justify-between text-start">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-baseline gap-1">
                    <span className="hero-stat-num text-xl sm:text-2xl font-black font-outfit text-transparent bg-clip-text bg-gradient-to-l from-[#5df3f5] to-brand-primary leading-none">+5</span>
                    <span className="hero-stat-unit text-xs text-white/75 font-arabic font-medium">سنوات</span>
                  </div>
                  <div className="hero-stat-icon w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 flex items-center justify-center text-[#5df3f5] border border-white/10 shrink-0">
                    <Award size={15} />
                  </div>
                </div>
                <span className="hero-stat-label text-xs sm:text-sm font-bold text-white block font-arabic mt-2 leading-snug">خبرة بالتصميم البصري</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Modern Wave-Inspired Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

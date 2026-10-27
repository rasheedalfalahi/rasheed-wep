import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, MessageSquare, ChevronRight, ChevronLeft, Star } from 'lucide-react';
import SkeletonImage from './SkeletonImage';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'عفان سليم',
      role: 'شاعر ومؤلف',
      content: 'التعامل مع المهندس رشيد كان تجربة استثنائية. يتميز بدقة متناهية وفهم عميق، وله قدرة فائقة على ترجمة الأفكار المعقدة إلى هويات بصرية مبسطة وقوية.',
      image: '/images/projects/afn.jpg'
    },
    {
      id: 2,
      name: "خالد منصور",
      role: "رائد أعمال",
      content: "شغلك فوق الممتاز بكل المقاييس. إبداع، سرعة في التنفيذ، وجودة عالية. من أفضل المصممين الذين تعاملت معهم على الإطلاق.",
      image: '/images/projects/ssm.png'
    },
    {
      id: 3,
      name: "محمد الجوفي",
      role: "مصور فوتوغرافي",
      content: "الهوية البصرية التي نفذها لي المهندس رشيد جاءت احترافية وتعكس شخصيتي كمصور فوتوغرافي بشكل مميز. كان التنفيذ سريعًا، مع اهتمام كبير بالتفاصيل.",
      image: '/images/projects/mjah.jpg'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden bg-bg">
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="text-start max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-primary shrink-0">
                 <MessageSquare size={22} className="stroke-[2]" />
               </div>
               <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-brand-primary">شراكات نـعتز بـها</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-tight">
               شـركاء في <br /><span className="text-brand-primary">رحلة الإبداع</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-3 mb-2">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-primary hover:border-brand-primary transition-all duration-300 group active:scale-90"
            >
              <ChevronRight size={20} className="group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-primary hover:border-brand-primary transition-all duration-300 group active:scale-90"
            >
              <ChevronLeft size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative min-h-[400px] sm:min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <div className="w-full bg-card/30 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 sm:p-14 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 relative overflow-hidden group">
                 
                 {/* Quote Icon Background */}
                 <div className="absolute -top-12 -left-12 text-brand-primary opacity-[0.03] select-none pointer-events-none hidden sm:block rotate-12">
                    <Quote size={240} fill="currentColor" strokeWidth={0} />
                 </div>

                 {/* Profile Section */}
                 <div className="shrink-0 flex flex-col items-center md:items-start gap-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-brand-primary rounded-3xl blur-xl opacity-20" />
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border border-white/10 p-1 bg-white/[0.02] shadow-2xl">
                         <SkeletonImage 
                           src={testimonials[currentIndex].image} 
                           alt={testimonials[currentIndex].name}
                           className="w-full h-full object-cover rounded-2xl"
                           referrerPolicy="no-referrer"
                         />
                      </div>
                    </div>

                    <div className="text-center md:text-start">
                       <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">{testimonials[currentIndex].name}</h4>
                       <div className="flex flex-col items-center md:items-start gap-1.5 mt-2">
                          <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] bg-brand-primary/10 px-3 py-1 rounded-full border border-brand-primary/20">
                             {testimonials[currentIndex].role}
                          </span>
                       </div>
                    </div>
                 </div>

                 {/* Quote Content Section */}
                 <div className="flex-1 text-center md:text-start w-full md:border-r border-white/10 md:pr-16">
                    <div className="flex gap-1 mb-6 justify-center md:justify-start">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-brand-primary text-brand-primary" />
                      ))}
                    </div>
                    <p className="text-xl sm:text-2xl md:text-3xl font-medium text-text-main leading-relaxed italic font-arabic opacity-95">
                       "{testimonials[currentIndex].content}"
                    </p>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center md:justify-start gap-2 mt-8 px-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentIndex === idx ? 'w-8 bg-brand-primary' : 'w-2 bg-white/10 hover:bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


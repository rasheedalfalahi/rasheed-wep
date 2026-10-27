import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Quote, 
  Star, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  ExternalLink, 
  Building2, 
  Award, 
  HeartHandshake, 
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SkeletonImage from '../components/SkeletonImage';
import AnimatedDivider from '../components/AnimatedDivider';

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}

export default function TestimonialsPage() {
  const testimonials: TestimonialItem[] = [
    {
      id: 1,
      name: 'محمد الجوفي',
      role: 'مصور فوتوغرافي',
      content: 'الهوية البصرية التي نفذها لي المهندس رشيد جاءت احترافية وتعكس شخصيتي كمصور فوتوغرافي بشكل مميز. كان التنفيذ سريعًا، مع اهتمام كبير بأدق التفاصيل واستجابة ممتازة لكافة التعديلات. سعيد جدًا بالنتيجة، وأوصي بالتعامل معه لكل من يبحث عن عمل احترافي يترك بصمة.',
      image: '/images/projects/mjah.jpg',
      rating: 5
    },
    {
      id: 2,
      name: 'خالد منصور',
      role: 'رائد أعمال',
      content: 'شغلك فوق الممتاز بكل المقاييس. إبداع حقيقي، سرعة استثنائية في التنفيذ، وجودة إخراج تفوق التوقعات. من أفضل المصممين الذين تعاملت معهم على الإطلاق، استطاع تحويل تجربة عملائنا إلى قصة بصرية جذابة رفعت من تفاعل وحجم مبيعات المتجر.',
      image: '/images/projects/ssm.png',
      rating: 5
    },
    {
      id: 3,
      name: 'عفان سليم',
      role: 'شاعر وأديب ومؤلف',
      content: 'التعامل مع المهندس رشيد كان تجربة استثنائية ومثمرة للغاية. يتميز بدقة متناهية وفهم عميق للروح الأدبية للنصوص، وله قدرة فائقة على ترجمة المعاني الشعرية المعقدة إلى تكوينات بصرية مبسطة وقوية تجمع بين عراقة التراث ورشاقة الحداثة.',
      image: '/images/projects/afn.jpg',
      rating: 5
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
      {/* Dark Hero Header Section */}
      <section className="pt-24 xs:pt-28 sm:pt-36 lg:pt-44 pb-12 sm:pb-16 bg-bg relative">
        <div className="container relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary mb-5 shadow-inner"
            >
              <Sparkles size={15} className="text-brand-primary shrink-0" />
              <span className="text-xs sm:text-sm font-bold font-arabic">سجل الشراكات والشهادات الحقيقية</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[clamp(1.75rem,5.5vw,3.75rem)] font-black text-white leading-[1.25] mb-4 sm:mb-5 font-arabic"
            >
              آراء <span className="text-brand-primary">نعتز بها</span>، وقصص نجاح مشتركة
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-text-muted/90 max-w-2xl mx-auto font-arabic font-normal leading-[1.85]"
            >
              شهادات وتجارب موثقة من عملاء وشركاء نجاح جمعتنا بهم مشاريع تصميمية متكاملة، عكست التزامنا بالجودة، الدقة، والأثر البصري الملموس.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Light Testimonials Showcase Section */}
      <section className="py-12 sm:py-20 bg-[#f8fafc] border-y border-slate-200/80 relative">
        <div className="container relative z-10 max-w-7xl mx-auto">
          {/* Testimonials Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {testimonials.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative flex flex-col justify-between bg-white border border-slate-200/90 hover:border-brand-primary/45 rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-400 shadow-[0_14px_35px_-15px_rgba(3,42,51,0.07)] hover:shadow-[0_22px_50px_-15px_rgba(0,152,154,0.16)]"
              >
                {/* Background Subtle Gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-primary/10 transition-colors" />

                <div>
                  {/* Top Row: Quote Icon & Stars */}
                  <div className="flex items-center justify-between gap-2 mb-5 pb-4 border-b border-slate-100">
                    <div className="text-brand-primary/35 group-hover:text-brand-primary/65 transition-colors">
                      <Quote size={28} className="rotate-180" />
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {[...Array(item.rating)].map((_, starIdx) => (
                        <Star key={starIdx} size={15} className="fill-brand-primary text-brand-primary" />
                      ))}
                    </div>
                  </div>

                  {/* Main Quote Content */}
                  <p className="text-[#032a33] text-base sm:text-lg font-arabic leading-[1.85] font-normal mb-6 selection:bg-brand-primary/20">
                    "{item.content}"
                  </p>
                </div>

                {/* Card Footer: Client Info Only */}
                <div className="pt-5 border-t border-slate-100 flex items-center gap-3.5">
                  <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                    <SkeletonImage 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-[#032a33] font-arabic truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-primary font-arabic font-medium truncate mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Quality & Work Ethic Highlights + Bottom CTA */}
      <section className="py-14 sm:py-24 bg-bg relative">
        <div className="container relative z-10 max-w-7xl mx-auto">
          <div>
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-black text-white font-arabic mb-3">
                ركائز العمل التي تضمن رضا كل شريك
              </h2>
              <p className="text-sm sm:text-base text-text-muted font-arabic leading-[1.8]">
                معايير مهنية صارمة نلتزم بها منذ استلام الفكرة وحتى التسليم النهائي للملفات المصدرية
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-5 xs:p-6 rounded-2xl bg-[#042a33]/35 border border-white/10 hover:border-brand-primary/30 transition-all text-start">
                <div className="w-11 h-11 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-4">
                  <ShieldCheck size={22} />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white font-arabic mb-2">أصالة وابتكار 100%</h4>
                <p className="text-sm text-text-muted font-arabic leading-[1.8]">
                  تصاميم مصممة خصيصاً لهوية العميل دون الاعتماد على قوالب جاهزة مكررة.
                </p>
              </div>

              <div className="p-5 xs:p-6 rounded-2xl bg-[#042a33]/35 border border-white/10 hover:border-brand-primary/30 transition-all text-start">
                <div className="w-11 h-11 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-4">
                  <HeartHandshake size={22} />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white font-arabic mb-2">تواصل تفاعلي مرن</h4>
                <p className="text-sm text-text-muted font-arabic leading-[1.8]">
                  متابعة مستمرة وجولات تعديل مدروسة لضمان توافق النتيجة تماماً مع رؤية العميل.
                </p>
              </div>

              <div className="p-5 xs:p-6 rounded-2xl bg-[#042a33]/35 border border-white/10 hover:border-brand-primary/30 transition-all text-start">
                <div className="w-11 h-11 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-4">
                  <Briefcase size={22} />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white font-arabic mb-2">تسليم مكتمل وجاهز</h4>
                <p className="text-sm text-text-muted font-arabic leading-[1.8]">
                  توفير كافة الصيغ الاحترافية (AI, PSD, PDF, SVG) المعدة للطباعة والوسائط الرقمية.
                </p>
              </div>

              <div className="p-5 xs:p-6 rounded-2xl bg-[#042a33]/35 border border-white/10 hover:border-brand-primary/30 transition-all text-start">
                <div className="w-11 h-11 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-4">
                  <Award size={22} />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white font-arabic mb-2">انضباط في المواعيد</h4>
                <p className="text-sm text-text-muted font-arabic leading-[1.8]">
                  احترام الجداول الزمنية والالتزام بالمواعيد المتفق عليها دون أي تأخير.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Call to Action for Collaboration */}
          <div className="mt-12 sm:mt-20 p-6 sm:p-12 rounded-2xl sm:rounded-3xl bg-linear-to-r from-[#042a33] to-[#031e24] border border-brand-primary/25 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <h3 className="text-xl sm:text-3xl font-black text-white font-arabic leading-[1.3]">
                هل أنت جاهز لتكون قصة نجاحنا القادمة؟
              </h3>
              <p className="text-sm sm:text-base text-text-muted font-arabic leading-[1.8]">
                دعنا نتحدث عن مشروعك القادم ونبني معاً هوية بصرية متميزة تعزز من مكانة علامتك في السوق.
              </p>
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-primary hover:bg-[#5df3f5] text-[#032a33] font-bold text-sm font-arabic transition-all shadow-lg active:scale-95"
                >
                  ابدأ مشروعك الآن
                </Link>
                <Link
                  to="/projects"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm font-arabic transition-all border border-white/15"
                >
                  تصفح كافة المشاريع
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

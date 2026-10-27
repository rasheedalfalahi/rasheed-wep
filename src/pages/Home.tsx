import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SkeletonImage from '../components/SkeletonImage';
import AnimatedDivider from '../components/AnimatedDivider';
import { motion } from 'motion/react';
import { AppWindow, Activity, BookOpen, Zap, User, Cpu, ArrowUpLeft, Compass } from 'lucide-react';
import { projects } from '../data/projects';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <>
      <Hero />
      
      {/* High-Contrast Infinite Scrolling Creative Ticker */}
      <div className="creative-ticker relative py-5 sm:py-8 lg:py-10 overflow-hidden bg-[#045063] border-y border-white/10 select-none">
        <div className="absolute inset-y-0 left-0 w-10 xs:w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-[#045063] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-10 xs:w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-[#045063] to-transparent z-10 pointer-events-none" />
        
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex gap-10 sm:gap-16 md:gap-24 items-center shrink-0 animate-marquee">
            {[
              { text: 'CREATIVE DIRECTION', style: 'solid-white' },
              { text: 'BRAND IDENTITY', style: 'stroke' },
              { text: 'UI/UX DESIGN', style: 'solid-primary' },
              { text: 'MOTION GRAPHICS', style: 'stroke' },
              { text: '3D MODELING', style: 'solid-white' },
              { text: 'EDITORIAL DESIGN', style: 'stroke' },
              { text: 'AFTER EFFECTS', style: 'solid-primary' },
              { text: 'BLENDER', style: 'stroke' },
              { text: 'ILLUSTRATOR', style: 'solid-white' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 sm:gap-6 text-xs sm:text-base font-black tracking-[0.25em] sm:tracking-[0.35em] font-outfit">
                {item.style === 'solid-white' && <span className="text-white">{item.text}</span>}
                {item.style === 'solid-primary' && <span className="text-[#5df3f5]">{item.text}</span>}
                {item.style === 'stroke' && <span className="text-stroke-primary text-white/50 uppercase">{item.text}</span>}
                <span className="text-white/20 text-base sm:text-xl">✦</span>
              </div>
            ))}
          </div>
          {/* Duplicate to ensure seamless loop */}
          <div className="flex gap-10 sm:gap-16 md:gap-24 items-center shrink-0 animate-marquee" aria-hidden="true">
            {[
              { text: 'CREATIVE DIRECTION', style: 'solid-white' },
              { text: 'BRAND IDENTITY', style: 'stroke' },
              { text: 'UI/UX DESIGN', style: 'solid-primary' },
              { text: 'MOTION GRAPHICS', style: 'stroke' },
              { text: '3D MODELING', style: 'solid-white' },
              { text: 'EDITORIAL DESIGN', style: 'stroke' },
              { text: 'AFTER EFFECTS', style: 'solid-primary' },
              { text: 'BLENDER', style: 'stroke' },
              { text: 'ILLUSTRATOR', style: 'solid-white' }
            ].map((item, idx) => (
              <div key={`dup-${idx}`} className="flex items-center gap-4 sm:gap-6 text-xs sm:text-base font-black tracking-[0.25em] sm:tracking-[0.35em] font-outfit">
                {item.style === 'solid-white' && <span className="text-white">{item.text}</span>}
                {item.style === 'solid-primary' && <span className="text-[#5df3f5]">{item.text}</span>}
                {item.style === 'stroke' && <span className="text-stroke-primary text-white/50 uppercase">{item.text}</span>}
                <span className="text-white/20 text-base sm:text-xl">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatedDivider />

      {/* About Section - Light Studio Canvas */}
      <section id="about" className="py-12 sm:py-20 lg:py-28 relative overflow-hidden bg-[#f8fafc] border-y border-slate-200/80">
        {/* Soft Ambient Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(4,80,99,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(4,80,99,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:3rem_3rem] pointer-events-none" />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 lg:gap-20 items-center">
            
            {/* Image Column (Clean, Frameless and Full Image) */}
            <div className="md:col-span-5 order-2 md:order-1 relative w-full max-w-[230px] xs:max-w-[290px] sm:max-w-sm mx-auto md:max-w-none flex justify-center items-center group">
              <div className="relative w-full flex justify-center items-center">
                <SkeletonImage 
                  src="/images/projects/455.png" 
                  alt="رشيد الفلاحي"
                  className="w-full h-auto max-h-[300px] xs:max-h-[380px] md:max-h-[540px] object-contain transition-transform duration-1000 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="md:col-span-7 text-start order-1 md:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-5 sm:space-y-8"
              >
                <div>
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-primary shrink-0 hover:scale-105 transition-transform duration-300">
                      <User size={20} className="stroke-[2]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-brand-primary">من هو رشيد ؟</span>
                  </div>
                  
                  <h2 className="text-[clamp(1.625rem,5vw,3.25rem)] font-black text-[#032a33] leading-[1.3] mb-4 sm:mb-6">
                    أنا رشيد الفلاحي
                    <br />
                    <span className="text-brand-primary">مبدع، مبتكر، وبسيط.</span>
                  </h2>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-[1.85] font-normal max-w-2xl font-arabic">
                    أقوم بإيجاد الأفكار وحل المشكلات بطريقة مبتكرة وإبداعية، متخصص في الشعارات والهوية البصرية وتصميم تجربة المستخدم وصناعة المحتوى الرقمي.
                  </p>
                </div>

                <div className="pt-1 sm:pt-4 flex justify-start">
                  <a 
                    href="#skills" 
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('skills');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="group flex items-center gap-3.5 sm:gap-4 text-sm sm:text-base font-bold text-[#045063] hover:text-brand-primary transition-colors py-1"
                  >
                    <div className="w-8 h-[2px] sm:w-10 bg-brand-primary/50 group-hover:w-14 group-hover:bg-brand-primary transition-all duration-500"></div>
                    <span>اكتشف القدرات الإبداعية</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <AnimatedDivider />

      {/* Dynamic Skills & Tools Section */}
      <section id="skills" className="py-12 sm:py-20 lg:py-28 bg-bg relative overflow-hidden">
        <div className="container relative z-10">
          {/* Header Section Centered */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 sm:mb-16 max-w-2xl mx-auto text-center"
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-primary shrink-0">
                  <Cpu size={18} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-brand-primary">القدرات المهنية</span>
              </div>
              <h2 className="text-[clamp(1.625rem,5vw,3.25rem)] font-black text-white leading-[1.3]">
                المهارات <span className="text-brand-primary">الجوهرية والعملية</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-text-muted/90 leading-[1.8] font-arabic mt-3 sm:mt-4 max-w-xl">
                ركائز أساسية تضمن تنفيذ مشاريعك بأعلى درجات الكفاءة الفنية والتنظيمية لتحقيق حضور رقمي استثنائي.
              </p>
            </div>
          </motion.div>

          {/* Symmetrical 4-Column Grid for Core Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 w-full">
            {[
              {
                title: 'إدارة الوقت',
                desc: 'تنظيم دقيق لخطوات ومراحل العمل يضمن تسليم مشاريعك في مواعيدها وبأعلى معايير الإتقان.',
                icon: <Activity size={22} />
              },
              {
                title: 'صناعة المحتوى الإبداعي',
                desc: 'تطوير سيناريوهات وأفكار إبداعية تجذب الجمهور المستهدف بصرياً وتحقق التفاعل المنشود.',
                icon: <BookOpen size={22} />
              },
              {
                title: 'المؤثرات البصرية',
                desc: 'إضافة لمسات سحرية وتقنيات متقدمة تزيد من جاذبية العمل النهائي وتعزز من جودته الفنية.',
                icon: <Zap size={22} />
              },
              {
                title: 'UI & UX Design',
                desc: 'تصميم واجهات رقمية عصرية سهلة الاستخدام ومريحة تركز بالكامل على سلاسة وسرعة التفاعل.',
                icon: <AppWindow size={22} />
              }
            ].map((skill, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 xs:p-6 sm:p-8 bg-[#042a33]/25 border border-white/10 hover:border-brand-primary/30 rounded-2xl sm:rounded-3xl flex flex-col items-start text-start group hover:bg-[#045063]/15 transition-all duration-500 shadow-xl relative"
              >
                {/* Tech corner lines for professional aesthetic */}
                <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-t border-r border-white/5 rounded-tr-2xl sm:rounded-tr-3xl pointer-events-none group-hover:border-brand-primary/30 transition-colors" />
                
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4 sm:mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 shadow-md shrink-0">
                  {skill.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-brand-primary transition-colors font-arabic leading-snug">
                  {skill.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-200/85 leading-[1.8] font-arabic">
                  {skill.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedDivider />

      {/* Symmetric Featured Projects Showcase Section (Balanced Light Studio Layout) */}
      <section id="featured-works" className="py-12 sm:py-20 lg:py-28 relative overflow-hidden bg-[#f8fafc] border-y border-slate-200/80">
        {/* Soft Ambient Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(4,80,99,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(4,80,99,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:3rem_3rem] pointer-events-none" />

        <div className="container relative z-10">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 sm:gap-6 mb-10 sm:mb-20 text-start">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-primary shrink-0">
                  <Compass size={18} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-brand-primary">الأعمال المختارة</span>
              </div>
              <h2 className="text-[clamp(1.625rem,5vw,3.25rem)] font-black text-[#032a33] leading-[1.3]">
                روائع إبداعية <br /> <span className="text-brand-primary">تتحدث بالنيابة عنك</span>
              </h2>
            </div>
            
            <div className="flex flex-col items-start gap-4 sm:gap-5">
              <p className="text-sm sm:text-base text-slate-600 max-w-md leading-[1.8] font-arabic">
                استعراض لأبرز المشاريع الإبداعية، حيث تلتقي الأصالة الفنية بالفكر الاستراتيجي لتقديم قيمة استثنائية.
              </p>
              <Link 
                to="/projects" 
                className="group inline-flex items-center gap-3 sm:gap-4 text-sm sm:text-base font-bold text-[#045063] hover:text-brand-primary transition-colors py-1"
              >
                <div className="w-6 h-[2px] sm:w-8 bg-brand-primary/50 group-hover:w-14 group-hover:bg-brand-primary transition-all duration-500" />
                <span>استكشف ملف الأعمال كاملاً</span>
              </Link>
            </div>
          </div>

          {/* Symmetrical 3-Column Clean Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {projects.slice(0, 3).map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group h-full"
              >
                <Link
                  to={`/project/${project.id}`}
                  className="flex flex-col h-full rounded-2xl sm:rounded-[1.75rem] bg-white border border-slate-200/90 hover:border-brand-primary/45 overflow-hidden shadow-[0_12px_35px_-15px_rgba(3,42,51,0.08)] hover:shadow-[0_22px_50px_-15px_rgba(0,152,154,0.2)] transition-all duration-500"
                >
                  {/* Image Canvas */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <SkeletonImage 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#032a33]/25 via-transparent to-transparent opacity-35 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* Clean Title-Only Bar */}
                  <div className="p-5 sm:p-6 flex items-center justify-between gap-4 flex-1 bg-white border-t border-slate-100 group-hover:bg-[#f0f9fa]/60 transition-colors duration-500">
                    <h3 className="text-base sm:text-lg font-bold text-[#032a33] group-hover:text-brand-primary transition-colors leading-[1.5] text-start">
                      {project.title}
                    </h3>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 border border-slate-200/80 group-hover:bg-brand-primary group-hover:border-brand-primary flex items-center justify-center text-[#032a33] group-hover:text-white transition-all duration-300 shrink-0">
                      <ArrowUpLeft size={18} className="group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
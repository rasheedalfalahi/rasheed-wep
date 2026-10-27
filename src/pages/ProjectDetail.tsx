import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { projects } from '../data/projects';
import { getCategoryArabicLabel } from './Projects';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
  Share2,
  Maximize2,
  Eye,
  User,
  Layers,
  Calendar,
  Wrench,
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import SkeletonImage from '../components/SkeletonImage';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const allImages = project ? [project.image, ...(project.gallery || [])] : [];
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (!project) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedSuccess(true);
        setTimeout(() => setCopiedSuccess(false), 2500);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') navigateImage(-1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') navigateImage(1);
      if (e.key === 'Escape') setSelectedImage(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const navigateImage = (step: number) => {
    if (selectedImage === null || allImages.length === 0) return;
    const newIdx = (selectedImage + step + allImages.length) % allImages.length;
    setSelectedImage(newIdx);
  };

  useEffect(() => {
    if (id && sessionStorage.getItem('projects_restore') === 'true') {
      sessionStorage.setItem('projects_current_id', id);
    }
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, [id]);

  // Prevent background scroll when gallery is active
  useEffect(() => {
    if (selectedImage !== null) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.documentElement.style.overflow = 'hidden';
      galleryRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedImage]);

  if (loading) {
    return <ProjectSkeleton />;
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text-main" dir="rtl">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black font-arabic">المشروع غير موجود</h2>
          <Link
            to="/projects"
            className="text-brand-primary hover:underline inline-flex items-center justify-center gap-2 font-arabic font-bold"
          >
            <ChevronRight size={20} /> العودة لمعرض المشاريع
          </Link>
        </div>
      </div>
    );
  }

  const currentIdx = projects.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIdx !== -1
      ? currentIdx > 0
        ? projects[currentIdx - 1]
        : projects[projects.length - 1]
      : null;
  const nextProject =
    currentIdx !== -1
      ? currentIdx < projects.length - 1
        ? projects[currentIdx + 1]
        : projects[0]
      : null;

  const galleryImages = project.gallery || [];
  const isOddGallery = galleryImages.length > 2 && galleryImages.length % 2 === 1;

  return (
    <div
      className="min-h-screen bg-bg text-text-main relative selection:bg-brand-primary selection:text-white"
      dir="rtl"
    >
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-[100] origin-right"
        style={{ scaleX }}
      />

      {/* Copy notification popup */}
      <AnimatePresence>
        {copiedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-28 left-1/2 -translate-x-1/2 z-[1001] px-6 py-3.5 bg-brand-deep border border-brand-primary/40 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl"
          >
            <CheckCircle2 className="text-brand-primary shrink-0" size={18} />
            <span className="text-xs sm:text-sm font-bold text-white font-arabic whitespace-nowrap">
              تم نسخ رابط المشروع بنجاح
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox Viewer */}
      <AnimatePresence>
        {selectedImage !== null && allImages.length > 0 && (
          <motion.div
            ref={galleryRef}
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1010] bg-[#022229]/98 backdrop-blur-2xl overflow-y-auto overscroll-none outline-none"
          >
            {/* Lightbox Header */}
            <div className="sticky top-0 left-0 right-0 h-18 sm:h-20 px-4 sm:px-8 flex items-center justify-between gap-4 z-[220] bg-bg/90 backdrop-blur-md border-b border-white/10">
              <div className="flex flex-col gap-0.5 text-start min-w-0">
                <span className="text-xs font-bold text-brand-primary font-arabic truncate">
                  {getCategoryArabicLabel(project.category)}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white font-arabic truncate">
                  {project.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono tabular-nums text-text-muted">
                  <span className="text-white font-bold">
                    {String(selectedImage + 1).padStart(2, '0')}
                  </span>
                  <span className="opacity-40">/</span>
                  <span>{String(allImages.length).padStart(2, '0')}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-2 bg-white/10 hover:bg-brand-primary text-white hover:text-bg font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 font-arabic"
                >
                  <span>إغلاق العرض</span>
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Lightbox Main Stage */}
            <div className="relative z-10 w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center py-6 sm:py-10 px-4 sm:px-8">
              <div className="max-w-6xl w-full flex flex-col items-center justify-center gap-6">
                <div className="relative w-full flex items-center justify-center">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl max-h-[70vh] flex items-center justify-center"
                  >
                    <SkeletonImage
                      src={allImages[selectedImage]}
                      alt={`${project.title} - صورة ${selectedImage + 1}`}
                      className="max-w-full max-h-[70vh] object-contain select-none"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>

                  {allImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateImage(-1);
                        }}
                        className="absolute right-2 sm:right-4 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-bg/85 border border-white/15 hover:border-brand-primary text-white hover:text-brand-primary flex items-center justify-center transition-colors duration-200 backdrop-blur-md z-[20] shadow-xl cursor-pointer"
                        title="الصورة السابقة"
                      >
                        <ChevronRight size={22} />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateImage(1);
                        }}
                        className="absolute left-2 sm:left-4 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-bg/85 border border-white/15 hover:border-brand-primary text-white hover:text-brand-primary flex items-center justify-center transition-colors duration-200 backdrop-blur-md z-[20] shadow-xl cursor-pointer"
                        title="الصورة التالية"
                      >
                        <ChevronLeft size={22} />
                      </button>
                    </>
                  )}
                </div>

                {/* Lightbox Thumbnails */}
                {allImages.length > 1 && (
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-xs font-medium text-text-muted/80 font-arabic tabular-nums">
                      صورة {selectedImage + 1} من أصل {allImages.length}
                    </span>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-xl">
                      {allImages.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedImage(idx)}
                          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 relative cursor-pointer ${
                            idx === selectedImage
                              ? 'border-brand-primary scale-105 shadow-md'
                              : 'border-white/10 opacity-50 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: CALM EDITORIAL HEADER (DARK SURFACE) */}
      <header className="relative pt-28 xs:pt-32 sm:pt-36 lg:pt-44 pb-10 sm:pb-14 bg-bg">
        <div className="container max-w-6xl mx-auto text-start">
          {/* Top Action Row: Back Link & Share */}
          <div className="flex items-center justify-between gap-4 pb-6 mb-8 sm:mb-10 border-b border-white/10">
            <Link
              to="/projects"
              className="inline-flex items-center gap-3 text-sm sm:text-base font-bold text-text-muted hover:text-white transition-colors duration-200 group font-arabic whitespace-nowrap shrink-0"
            >
              <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 bg-white/[0.03] group-hover:bg-brand-primary group-hover:border-brand-primary flex items-center justify-center transition-colors duration-200 shrink-0">
                <ChevronRight
                  size={18}
                  className="text-text-muted group-hover:text-bg transition-colors"
                />
              </span>
              <span>العودة إلى المشاريع</span>
            </Link>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-brand-primary/50 text-xs sm:text-sm font-bold text-text-muted hover:text-white transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 font-arabic"
              title="مشاركة رابط المشروع"
            >
              <Share2 size={15} className="text-brand-primary shrink-0" />
              <span>مشاركة المشروع</span>
            </button>
          </div>

          {/* Kicker, Title & Summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl space-y-4 sm:space-y-5"
          >
            {/* Unboxed Metadata Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-brand-primary font-arabic">
              <span>{getCategoryArabicLabel(project.category)}</span>
              {project.year && (
                <>
                  <span aria-hidden="true" className="text-white/30">
                    ·
                  </span>
                  <span className="text-text-muted font-mono tabular-nums">{project.year}</span>
                </>
              )}
            </div>

            <h1
              className="text-[clamp(1.65rem,4.2vw,3.1rem)] font-black leading-[1.3] text-white font-arabic"
              style={{ textWrap: 'balance' }}
            >
              {project.title}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-text-muted/95 leading-[1.9] font-normal max-w-3xl font-arabic">
              {project.description}
            </p>
          </motion.div>

          {/* Clean Metadata Grid with Ordered Icons */}
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Client */}
            <div className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-primary shrink-0">
                <User size={19} />
              </div>
              <div className="min-w-0 space-y-1">
                <span className="block text-xs text-text-muted/75 font-arabic">العميل</span>
                <p className="text-sm sm:text-base font-bold text-white font-arabic leading-snug">
                  {project.client || 'مشروع خاص'}
                </p>
              </div>
            </div>

            {/* Category */}
            <div className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-primary shrink-0">
                <Layers size={19} />
              </div>
              <div className="min-w-0 space-y-1">
                <span className="block text-xs text-text-muted/75 font-arabic">التصنيف</span>
                <p className="text-sm sm:text-base font-bold text-white font-arabic leading-snug">
                  {getCategoryArabicLabel(project.category)}
                </p>
              </div>
            </div>

            {/* Year */}
            <div className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-primary shrink-0">
                <Calendar size={19} />
              </div>
              <div className="min-w-0 space-y-1">
                <span className="block text-xs text-text-muted/75 font-arabic">سنة التنفيذ</span>
                <p className="text-sm sm:text-base font-bold text-white font-mono tabular-nums leading-snug">
                  {project.year || '2025'}
                </p>
              </div>
            </div>

            {/* Tools */}
            <div className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-primary shrink-0">
                <Wrench size={19} />
              </div>
              <div className="min-w-0 space-y-1">
                <span className="block text-xs text-text-muted/75 font-arabic">الأدوات المستخدمة</span>
                <p className="text-sm sm:text-base font-bold text-white leading-snug">
                  {project.tools && project.tools.length > 0
                    ? project.tools.join(' · ')
                    : 'Adobe Creative Cloud'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 2: UNIFIED LIGHT SHOWCASE & GALLERY CANVAS */}
      <main className="bg-[#f8fafc] border-y border-slate-200/80 py-10 sm:py-16 lg:py-20 text-slate-900">
        <div className="container max-w-6xl mx-auto space-y-12 sm:space-y-16 text-start">
          {/* 2A. Featured Cover Artwork */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelectedImage(0)}
            className="group relative w-full cursor-pointer"
          >
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(3,42,51,0.12)] bg-slate-900">
              <SkeletonImage
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.015]"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-[#032a33]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="px-5 py-3 rounded-xl bg-white/95 text-[#032a33] font-bold text-xs sm:text-sm font-arabic flex items-center gap-2 shadow-xl">
                  <Eye size={18} className="text-brand-primary" />
                  <span>تكبير الصورة</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2B. Spacious Editorial Gallery */}
          {galleryImages.length > 0 && (
            <div className="space-y-6 sm:space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div className="space-y-1">
                  <span className="text-xs sm:text-sm font-bold text-brand-primary font-arabic">
                    استعراض التفاصيل
                  </span>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#032a33] font-arabic">
                    معرض صور المشروع
                  </h2>
                </div>
                <span className="text-xs sm:text-sm text-slate-500 font-arabic">
                  اضغط على أي صورة لعرضها بالحجم الكامل ({galleryImages.length} صور)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {galleryImages.map((img, idx) => {
                  const isWideFeature = isOddGallery && idx === 0;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-8%' }}
                      transition={{
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                        delay: (idx % 2) * 0.06,
                      }}
                      onClick={() => setSelectedImage(idx + 1)}
                      className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_12px_35px_-15px_rgba(3,42,51,0.08)] hover:border-brand-primary/45 transition-all duration-300 cursor-pointer ${
                        isWideFeature
                          ? 'md:col-span-2 aspect-[16/10] sm:aspect-[16/9]'
                          : 'aspect-[4/3]'
                      }`}
                    >
                      <SkeletonImage
                        src={img}
                        alt={`${project.title} - شريحة ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.02]"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-[#032a33]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-11 h-11 rounded-xl bg-white/95 text-[#032a33] flex items-center justify-center shadow-lg">
                          <Maximize2 size={18} className="text-brand-primary" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* SECTION 3: PREV / NEXT PROJECTS & CTA (DARK SURFACE) */}
      <section className="py-12 sm:py-16 lg:py-20 bg-bg">
        <div className="container max-w-6xl mx-auto space-y-12 sm:space-y-16">
          {/* Next / Previous Navigation with Thumbnails */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 text-start">
            {prevProject && (
              <Link
                to={`/project/${prevProject.id}`}
                className="group flex items-center gap-4 sm:gap-5 p-4 sm:p-5 bg-white/[0.03] border border-white/10 hover:border-brand-primary/40 rounded-2xl transition-colors duration-300"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white/5 shrink-0 border border-white/10">
                  <SkeletonImage
                    src={prevProject.image}
                    alt={prevProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <span className="text-xs font-bold text-brand-primary flex items-center gap-1 font-arabic">
                    <ChevronRight size={14} />
                    <span>المشروع السابق</span>
                  </span>
                  <h4 className="text-sm sm:text-base lg:text-lg font-bold text-white group-hover:text-brand-primary transition-colors line-clamp-1 font-arabic">
                    {prevProject.title}
                  </h4>
                </div>
              </Link>
            )}

            {nextProject && (
              <Link
                to={`/project/${nextProject.id}`}
                className="group flex items-center justify-between gap-4 sm:gap-5 p-4 sm:p-5 bg-white/[0.03] border border-white/10 hover:border-brand-primary/40 rounded-2xl transition-colors duration-300"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <span className="text-xs font-bold text-brand-primary flex items-center gap-1 font-arabic">
                    <span>المشروع التالي</span>
                    <ChevronLeft size={14} />
                  </span>
                  <h4 className="text-sm sm:text-base lg:text-lg font-bold text-white group-hover:text-brand-primary transition-colors line-clamp-1 font-arabic">
                    {nextProject.title}
                  </h4>
                </div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white/5 shrink-0 border border-white/10">
                  <SkeletonImage
                    src={nextProject.image}
                    alt={nextProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </Link>
            )}
          </div>

          {/* Calm Contact CTA */}
          <div className="p-7 sm:p-10 lg:p-12 rounded-3xl bg-white/[0.03] border border-white/10 text-start">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8">
              <div className="space-y-2.5 max-w-xl">
                <span className="text-xs sm:text-sm font-bold text-brand-primary block font-arabic">
                  ابدأ مشروعك القادم
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-[1.35] font-arabic">
                  هل تبحث عن هوية بصرية أو تصميم يميز مشروعك؟
                </h3>
                <p className="text-sm sm:text-base font-normal text-text-muted leading-[1.85] font-arabic">
                  دعنا نتحدث حول تفاصيل مشروعك ونحول أفكارك إلى تجربة بصرية متكاملة ومدروسة.
                </p>
              </div>

              <Link
                to="/contact"
                className="shrink-0 w-full sm:w-auto justify-center px-7 py-3.5 bg-brand-primary hover:bg-white text-bg font-black text-sm sm:text-base rounded-xl flex items-center gap-3 transition-colors duration-200 shadow-lg font-arabic whitespace-nowrap"
              >
                <span>تواصل معي الآن</span>
                <ArrowRight size={18} className="rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectSkeleton() {
  return (
    <div className="min-h-screen bg-bg text-text-main overflow-hidden" dir="rtl">
      <section className="pt-28 xs:pt-32 sm:pt-36 lg:pt-44 pb-10 sm:pb-14">
        <div className="container max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="w-36 h-9 bg-white/5 rounded-xl animate-pulse" />
            <div className="w-28 h-9 bg-white/5 rounded-xl animate-pulse" />
          </div>
          <div className="space-y-4 max-w-3xl">
            <div className="w-28 h-4 bg-white/5 rounded animate-pulse" />
            <div className="w-3/4 h-10 sm:h-12 bg-white/5 rounded-xl animate-pulse" />
            <div className="w-full h-6 bg-white/5 rounded-lg animate-pulse opacity-60" />
          </div>
          <div className="pt-6 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="w-16 h-3 bg-white/5 rounded animate-pulse" />
                <div className="w-28 h-5 bg-white/5 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-10 sm:py-16 bg-[#f8fafc]">
        <div className="container max-w-6xl mx-auto">
          <div className="aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl sm:rounded-3xl bg-slate-200/70 animate-pulse" />
        </div>
      </section>
    </div>
  );
}

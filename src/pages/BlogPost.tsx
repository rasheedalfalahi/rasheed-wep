import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  Share2,
  CheckCircle2,
  ArrowRight,
  User,
} from 'lucide-react';
import { blogPosts } from '../data/blog';
import SkeletonImage from '../components/SkeletonImage';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id || p.slug === id);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = async () => {
    if (!post) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedSuccess(true);
        setTimeout(() => setCopiedSuccess(false), 2500);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  if (!post) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-bg text-text-main"
        dir="rtl"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black font-arabic">
            المقال غير موجود
          </h2>
          <Link
            to="/blog"
            className="text-brand-primary hover:underline inline-flex items-center justify-center gap-2 font-arabic font-bold"
          >
            <ChevronRight size={20} /> العودة لقائمة المقالات
          </Link>
        </div>
      </div>
    );
  }

  const currentIdx = blogPosts.findIndex((p) => p.id === post.id);
  const prevPost =
    currentIdx !== -1
      ? currentIdx > 0
        ? blogPosts[currentIdx - 1]
        : blogPosts[blogPosts.length - 1]
      : null;
  const nextPost =
    currentIdx !== -1
      ? currentIdx < blogPosts.length - 1
        ? blogPosts[currentIdx + 1]
        : blogPosts[0]
      : null;

  return (
    <div
      className="min-h-screen bg-bg text-text-main relative selection:bg-brand-primary selection:text-white"
      dir="rtl"
    >
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-[100] origin-right"
        style={{ scaleX }}
      />

      {/* Copy Notification Toast */}
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
              تم نسخ رابط المقال بنجاح
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: ARTICLE HEADER (DARK STUDIO SURFACE) */}
      <header className="relative pt-28 xs:pt-32 sm:pt-36 lg:pt-44 pb-10 sm:pb-14 bg-bg">
        <div className="container max-w-5xl mx-auto text-start">
          {/* Top Navigation Bar: Back to Articles & Share */}
          <div className="flex items-center justify-between gap-4 pb-6 mb-8 sm:mb-10 border-b border-white/10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-3 text-sm sm:text-base font-bold text-text-muted hover:text-white transition-colors duration-200 group font-arabic whitespace-nowrap shrink-0"
            >
              <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 bg-white/[0.03] group-hover:bg-brand-primary group-hover:border-brand-primary flex items-center justify-center transition-colors duration-200 shrink-0">
                <ChevronRight
                  size={18}
                  className="text-text-muted group-hover:text-bg transition-colors"
                />
              </span>
              <span>العودة لقائمة المقالات</span>
            </Link>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-brand-primary/50 text-xs sm:text-sm font-bold text-text-muted hover:text-white transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 font-arabic"
              title="مشاركة رابط المقال"
            >
              <Share2 size={15} className="text-brand-primary shrink-0" />
              <span>مشاركة المقال</span>
            </button>
          </div>

          {/* Article Title & Lead Summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl space-y-4 sm:space-y-5"
          >
            <h1
              className="text-[clamp(1.65rem,4.2vw,3rem)] font-black leading-[1.35] text-white font-arabic"
              style={{ textWrap: 'balance' }}
            >
              {post.title}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-text-muted/95 leading-[1.9] font-normal max-w-3xl font-arabic">
              {post.excerpt}
            </p>
          </motion.div>

          {/* Clean Article Metadata Strip with Icons */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-primary shrink-0">
                <User size={18} />
              </div>
              <div className="min-w-0">
                <span className="block text-xs text-text-muted/75 font-arabic">الكاتب</span>
                <p className="text-sm font-bold text-white font-arabic truncate">
                  رشيد الفلاحي
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-primary shrink-0">
                <Calendar size={18} />
              </div>
              <div className="min-w-0">
                <span className="block text-xs text-text-muted/75 font-arabic">تاريخ النشر</span>
                <p className="text-sm font-bold text-white font-arabic truncate">
                  {post.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-primary shrink-0">
                <Clock size={18} />
              </div>
              <div className="min-w-0">
                <span className="block text-xs text-text-muted/75 font-arabic">وقت القراءة</span>
                <p className="text-sm font-bold text-white font-arabic truncate">
                  {post.readTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 2: EYE-COMFORTABLE READING CANVAS (LIGHT SURFACE) */}
      <main className="bg-[#f8fafc] border-y border-slate-200/80 py-10 sm:py-16 lg:py-20 text-slate-900">
        <div className="container max-w-4xl mx-auto space-y-10 sm:space-y-12 text-start">
          {/* Cover Image */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(3,42,51,0.12)] bg-slate-900"
          >
            <SkeletonImage
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Article Body Container */}
          <article className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 border border-slate-200/90 shadow-[0_12px_35px_-15px_rgba(3,42,51,0.06)] space-y-8 sm:space-y-10">
            {post.sections.map((section, idx) => (
              <div key={idx} className="space-y-5">
                {section.heading && (
                  <h2 className="text-xl sm:text-2xl font-black text-[#032a33] leading-[1.4] font-arabic pt-2">
                    {section.heading}
                  </h2>
                )}

                {section.paragraphs.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-base sm:text-lg text-slate-700 leading-[2.05] font-normal font-arabic"
                  >
                    {para}
                  </p>
                ))}

                {section.quote && (
                  <blockquote className="my-6 p-6 sm:p-8 rounded-2xl bg-[#f0f9fa] border border-brand-primary/25 text-[#032a33] font-bold text-base sm:text-lg leading-[1.9] font-arabic">
                    «{section.quote.replace(/^[«\s]+|[»\s]+$/g, '')}»
                  </blockquote>
                )}

                {section.points && section.points.length > 0 && (
                  <ul className="space-y-3.5 pt-2">
                    {section.points.map((point, ptIdx) => (
                      <li
                        key={ptIdx}
                        className="flex items-start gap-3 text-sm sm:text-base lg:text-lg text-slate-700 leading-[1.9] font-arabic"
                      >
                        <span className="w-6 h-6 rounded-lg bg-brand-primary/15 text-brand-primary font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-1">
                          {ptIdx + 1}
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Bottom Return & Share Bar inside Article Card */}
            <div className="pt-8 mt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <Link
                to="/blog"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#032a33] hover:bg-brand-primary text-white font-bold text-xs sm:text-sm font-arabic transition-colors duration-200"
              >
                <ChevronRight size={17} />
                <span>العودة لقائمة المقالات</span>
              </Link>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-[#032a33] font-bold text-xs sm:text-sm font-arabic transition-colors duration-200 cursor-pointer"
              >
                <Share2 size={16} className="text-brand-primary" />
                <span>مشاركة هذا المقال</span>
              </button>
            </div>
          </article>
        </div>
      </main>

      {/* SECTION 3: NEXT / PREV ARTICLES & CTA (DARK SURFACE) */}
      <section className="py-12 sm:py-16 lg:py-20 bg-bg">
        <div className="container max-w-5xl mx-auto space-y-12 sm:space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 text-start">
            {prevPost && (
              <Link
                to={`/blog/${prevPost.id}`}
                className="group flex items-center gap-4 sm:gap-5 p-4 sm:p-5 bg-white/[0.03] border border-white/10 hover:border-brand-primary/40 rounded-2xl transition-colors duration-300"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white/5 shrink-0 border border-white/10">
                  <SkeletonImage
                    src={prevPost.coverImage}
                    alt={prevPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <span className="text-xs font-bold text-brand-primary flex items-center gap-1 font-arabic">
                    <ChevronRight size={14} />
                    <span>المقال السابق</span>
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-brand-primary transition-colors line-clamp-1 font-arabic">
                    {prevPost.title}
                  </h4>
                </div>
              </Link>
            )}

            {nextPost && (
              <Link
                to={`/blog/${nextPost.id}`}
                className="group flex items-center justify-between gap-4 sm:gap-5 p-4 sm:p-5 bg-white/[0.03] border border-white/10 hover:border-brand-primary/40 rounded-2xl transition-colors duration-300"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <span className="text-xs font-bold text-brand-primary flex items-center gap-1 font-arabic">
                    <span>المقال التالي</span>
                    <ChevronLeft size={14} />
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-brand-primary transition-colors line-clamp-1 font-arabic">
                    {nextPost.title}
                  </h4>
                </div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white/5 shrink-0 border border-white/10">
                  <SkeletonImage
                    src={nextPost.coverImage}
                    alt={nextPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </Link>
            )}
          </div>

          {/* Contact CTA */}
          <div className="p-7 sm:p-10 lg:p-12 rounded-3xl bg-white/[0.03] border border-white/10 text-start">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8">
              <div className="space-y-2.5 max-w-xl">
                <span className="text-xs sm:text-sm font-bold text-brand-primary block font-arabic">
                  استشارة بصرية لمشروعك
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-[1.35] font-arabic">
                  هل ترغب في تحويل فكرتك إلى هوية بصرية متكاملة؟
                </h3>
                <p className="text-sm sm:text-base font-normal text-text-muted leading-[1.85] font-arabic">
                  تواصل معي مباشرة لمناقشة أهداف علامتك التجارية وبناء حضور بصري يليق بطموحك.
                </p>
              </div>

              <Link
                to="/contact"
                className="shrink-0 w-full sm:w-auto justify-center px-7 py-3.5 bg-brand-primary hover:bg-white text-bg font-black text-sm sm:text-base rounded-xl flex items-center gap-3 transition-colors duration-200 shadow-lg font-arabic whitespace-nowrap"
              >
                <span>ابدأ مشروعك معنا</span>
                <ArrowRight size={18} className="rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

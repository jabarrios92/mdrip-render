/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { 
  Droplets, 
  Home, 
  Zap, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ChevronRight, 
  ChevronLeft,
  Quote,
  Menu, 
  X,
  Instagram,
  Phone,
  Star,
  Send,
  CheckCircle2
} from 'lucide-react';

const WhatsappIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative h-14 w-14 flex items-center justify-center"
          >
            <img 
              src="/logo.webp" 
              alt="MDRIP Logo" 
              className="h-full w-full object-contain mix-blend-screen brightness-125 contrast-125 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]"
              onError={(e) => {
                e.currentTarget.src = 'https://picsum.photos/seed/medical/100/100';
              }}
            />
          </motion.div>
          <span className="text-2xl font-bold tracking-tighter text-gradient hidden sm:block group-hover:brightness-125 transition-all">MDRIP</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Services', 'How it Works', 'About', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-white/70 hover:text-[#00ffff] transition-colors"
            >
              {item}
            </a>
          ))}
          <a 
            href="https://wa.me/573218210894"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-[#008080] hover:bg-[#00ffff] text-white hover:text-black font-semibold rounded-full transition-all duration-300 shadow-lg shadow-teal-500/20"
          >
            Book Now
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white/90 backdrop-blur-2xl absolute top-20 left-0 w-full p-6 flex flex-col gap-4 border-b border-white/20 shadow-2xl will-change-[transform,opacity]"
          style={{ transform: "translateZ(0)" }}
        >
          {['Services', 'How it Works', 'About', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-lg font-medium text-black/80 hover:text-[#008080] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <a 
            href="https://wa.me/573218210894"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-[#008080] text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-center"
            onClick={() => setIsOpen(false)}
          >
            Book Now
          </a>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Logo specific scroll animations
  const logoScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);
  const logoRotate = useTransform(scrollYProgress, [0, 0.3], [0, -10]);
  const logoBlur = useTransform(scrollYProgress, [0, 0.3], [0, 10]);

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y: bgY, transform: "translateZ(0)" }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <div 
          className="absolute inset-0 bg-[url('/hero-bg.webp')] bg-cover bg-center opacity-30"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]" />
      </motion.div>

      <motion.div 
        style={{ y: textY, opacity, transform: "translateZ(0)" }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center -mt-20 md:-mt-32 will-change-[transform,opacity]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 mt-[10vh] inline-block will-change-transform"
        >
          <motion.div 
            style={{ 
              scale: logoScale, 
              rotate: logoRotate,
              filter: `blur(${logoBlur}px)`,
              transform: "translateZ(0)"
            }}
            className="relative"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -inset-20 bg-cyan-500/20 blur-[100px] rounded-full will-change-transform" 
            />
            <img 
              src="/Logohero.webp" 
              alt="MDrip Logo" 
              className="w-[260px] md:w-[345px] mx-auto relative drop-shadow-[0_0_50px_rgba(0,255,255,0.6)]"
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              onError={(e) => {
                // Fallback if Logohero.webp isn't available
                e.currentTarget.src = 'https://picsum.photos/seed/medical/400/400';
              }}
            />
          </motion.div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight will-change-transform"
        >
          Premium IV Therapy <br />
          <span className="text-gradient italic font-serif">At Your Doorstep</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto font-light will-change-transform"
        >
          Experience professional medical hydration and wellness treatments in the comfort of your home.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 will-change-transform"
        >
          <a 
            href="https://wa.me/573218210894"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-4 bg-[#008080] hover:bg-[#00ffff] text-white hover:text-black font-bold rounded-full transition-all duration-300 text-lg shadow-xl shadow-teal-500/20 text-center"
          >
            Book Now
          </a>
          <a 
            href="#about"
            className="w-full sm:w-auto px-10 py-4 glass hover:bg-white/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:border-[#00ffff]/50 hover:text-[#00ffff] text-white font-bold rounded-full transition-all duration-300 text-lg text-center"
          >
            How it Works
          </a>
        </motion.div>
      </motion.div>


    </section>
  );
};

const Features = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const yTransforms = [y1, y2, y3];

  const features = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Home Comfort",
      desc: "No travel needed. We bring the clinic to your living room or office."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Medical Grade",
      desc: "Administered by certified physicians with premium-grade medical ingredients."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast Recovery",
      desc: "Direct-to-bloodstream hydration for immediate results and energy boost."
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              style={{ y: yTransforms[i], transform: "translateZ(0)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-8 rounded-3xl glass hover:border-[#00ffff]/30 transition-all group will-change-[transform,opacity]"
            >
              <div className="w-16 h-16 bg-[#008080]/10 rounded-2xl flex items-center justify-center mb-6 text-[#00ffff] group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-white/50 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard: React.FC<{ s: any, i: number }> = ({ s, i }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-15px", "15px"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-15px", "15px"]);

  // Mobile scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isMobile = window.innerWidth < 768;
        if (!isMobile) return;

        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {});
            } else {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    const isMobile = window.innerWidth < 768;
    if (!isMobile && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    const isMobile = window.innerWidth < 768;
    if (!isMobile && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group cursor-pointer will-change-[transform,opacity]"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000, transform: "translateZ(0)" }}
    >
      <motion.div 
        className="relative h-80 rounded-3xl overflow-hidden mb-6 will-change-transform"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", transform: "translateZ(0)" }}
      >
        {s.video ? (
          <motion.video
            ref={videoRef}
            src={s.video}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
            style={{ x: translateX, y: translateY, scale: 1.15, transform: "translateZ(0)" }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <motion.img 
            src={isHovered && s.gif ? s.gif : s.image} 
            alt={s.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
            style={{ x: translateX, y: translateY, scale: 1.15, transform: "translateZ(0)" }}
            referrerPolicy="no-referrer"
            fetchPriority={i < 4 ? "high" : "auto"}
            loading={i < 4 ? "eager" : "lazy"}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60 pointer-events-none" />
        
        {/* Elegant Aura Effect for Blue Bag */}
        {/* Radiant Glow Effect for Immunity Boost */}
        {s.title === "Immunity Boost" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none" style={{ transform: "translateZ(30px) translate(-50%, -50%)" }}>
            {/* Soft Yellow Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-500/15 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            {/* Floating Sparkles */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={`sparkle-yellow-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:animate-[drift-upwards_3s_ease-in-out_infinite]"
                style={{
                  left: `${Math.random() * 100 - 50}px`,
                  top: `${Math.random() * 100 - 50}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  boxShadow: '0 0 8px 2px rgba(234, 179, 8, 0.6)'
                }}
              />
            ))}
          </div>
        )}

        {/* Radiant Glow Effect for The Hangover Cure */}
        {s.title === "The Hangover Cure" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none" style={{ transform: "translateZ(30px) translate(-50%, -50%)" }}>
            {/* Soft Blue Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            {/* Floating Sparkles */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={`sparkle-blue-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:animate-[drift-upwards_3s_ease-in-out_infinite]"
                style={{
                  left: `${Math.random() * 100 - 50}px`,
                  top: `${Math.random() * 100 - 50}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  boxShadow: '0 0 8px 2px rgba(0, 255, 255, 0.6)'
                }}
              />
            ))}
          </div>
        )}

        {/* Radiant Glow Effect for Myers Cocktail */}
        {s.title === "Myers Cocktail" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none" style={{ transform: "translateZ(30px) translate(-50%, -50%)" }}>
            {/* Soft Green Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-500/15 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            {/* Floating Sparkles */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={`sparkle-green-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:animate-[drift-upwards_3s_ease-in-out_infinite]"
                style={{
                  left: `${Math.random() * 100 - 50}px`,
                  top: `${Math.random() * 100 - 50}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  boxShadow: '0 0 8px 2px rgba(16, 185, 129, 0.6)'
                }}
              />
            ))}
          </div>
        )}

        {/* Radiant Glow Effect for Ultra Recovery */}
        {s.title === "Ultra Recovery" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none" style={{ transform: "translateZ(30px) translate(-50%, -50%)" }}>
            {/* Soft Purple Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            {/* Floating Sparkles */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={`sparkle-purple-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:animate-[drift-upwards_3s_ease-in-out_infinite]"
                style={{
                  left: `${Math.random() * 100 - 50}px`,
                  top: `${Math.random() * 100 - 50}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  boxShadow: '0 0 8px 2px rgba(168, 85, 247, 0.6)'
                }}
              />
            ))}
          </div>
        )}

        {/* Radiant Glow Effect for Beauty & Glow */}
        {s.title === "Beauty & Glow" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none" style={{ transform: "translateZ(30px) translate(-50%, -50%)" }}>
            {/* Soft Emerald Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#10b981]/15 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            {/* Floating Sparkles */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:animate-[drift-upwards_3s_ease-in-out_infinite]"
                style={{
                  left: `${Math.random() * 100 - 50}px`,
                  top: `${Math.random() * 100 - 50}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  boxShadow: '0 0 8px 2px rgba(16, 185, 129, 0.6)'
                }}
              />
            ))}
          </div>
        )}

        {/* Radiant Glow Effect for Athletic Recovery */}
        {s.title === "Athletic Recovery" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none" style={{ transform: "translateZ(30px) translate(-50%, -50%)" }}>
            {/* Soft Purple Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#8b5cf6]/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            {/* Floating Sparkles */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={`sparkle-purple-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:animate-[drift-upwards_3s_ease-in-out_infinite]"
                style={{
                  left: `${Math.random() * 100 - 50}px`,
                  top: `${Math.random() * 100 - 50}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  boxShadow: '0 0 8px 2px rgba(139, 92, 246, 0.6)'
                }}
              />
            ))}
          </div>
        )}

        {/* Floating Ingredients */}
        {s.ingredients && s.ingredients.map((ing: string, idx: number) => {
          const isBeautyGlow = s.title === "Beauty & Glow";

          if (isBeautyGlow) {
            const sidePositions = [
              { left: '10%', top: '25%' },
              { right: '10%', top: '45%' },
              { left: '15%', bottom: '20%' },
            ];
            const pos = sidePositions[idx % sidePositions.length];

            return (
              <div 
                key={ing}
                className="absolute z-20 pointer-events-none"
                style={{ 
                  ...pos,
                  transform: `translateZ(${40 + idx * 10}px)`
                }}
              >
                <div 
                  className="opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-auto translate-y-8 group-hover:translate-y-0"
                  style={{ transitionDelay: `${idx * 200}ms`, transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                >
                  <div 
                    className="animate-float relative bg-gradient-to-br from-[#10b981]/80 to-[#059669]/80 backdrop-blur-md border border-white/30 shadow-[0_8px_32px_rgba(16,185,129,0.4)] text-white text-[11px] font-bold px-5 py-2.5 rounded-full whitespace-nowrap hover:scale-110 transition-transform duration-500 cursor-pointer"
                    style={{ animationDelay: `${idx * 0.7}s` }}
                  >
                    <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] tracking-wider">{ing}</span>
                    <div className="absolute inset-0 rounded-full border border-white/20 opacity-0 group-hover:animate-[ping_3s_ease-in-out_infinite]" style={{ animationDelay: `${idx * 0.5}s` }} />
                  </div>
                </div>
              </div>
            );
          }

          const transforms = [
            "group-hover:-translate-x-28 group-hover:-translate-y-28 group-hover:-rotate-6",
            "group-hover:translate-x-24 group-hover:-translate-y-20 group-hover:rotate-12",
            "group-hover:-translate-x-24 group-hover:translate-y-28 group-hover:-rotate-12",
            "group-hover:translate-x-28 group-hover:translate-y-24 group-hover:rotate-6",
          ];
          const delays = [
            "delay-0",
            "delay-75",
            "delay-150",
            "delay-200",
          ];
          return (
            <div 
              key={ing}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
              style={{ transform: "translateZ(40px) translate(-50%, -50%)" }}
            >
              <div 
                className={`opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 ${transforms[idx % transforms.length]} transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${delays[idx % delays.length]}`}
              >
                <div 
                  className="relative water-droplet rounded-full text-white text-[11px] font-bold px-4 py-2 animate-float whitespace-nowrap overflow-hidden"
                  style={{ animationDelay: `${idx * 0.5}s` }}
                >
                  <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{ing}</span>
                </div>
              </div>
            </div>
          );
        })}

        {s.title === "Ultra Recovery" && (
          <div className="absolute bottom-6 left-6" style={{ transform: "translateZ(20px)" }}>
            <span className="px-3 py-1 bg-[#00ffff] text-black text-xs font-bold rounded-full uppercase tracking-widest">
              Popular
            </span>
          </div>
        )}
      </motion.div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-[#00ffff] transition-colors">{s.title}</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {s.tags.map((t: string) => (
          <span key={t} className="text-[10px] uppercase tracking-wider text-white/40 border border-white/10 px-2 py-0.5 rounded">
            {t}
          </span>
        ))}
      </div>
      
      {isExpanded && s.description && (
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-white/60 text-sm mb-4"
        >
          {s.description}
        </motion.p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-[#00ffff]">{s.price}</span>
        <div className="flex gap-2">
          {s.description && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-[#00ffff] underline"
            >
              {isExpanded ? 'See Less' : 'See More'}
            </button>
          )}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#00ffff] group-hover:border-[#00ffff] group-hover:text-black transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const AboutUs = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="about" ref={ref} className="py-24 relative overflow-hidden bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 will-change-[transform,opacity]"
            style={{ transform: "translateZ(0)" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ffff]/10 border border-[#00ffff]/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00ffff] animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#00ffff]">Our Mission</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gradient leading-tight">Physician-Led <br />Medical Care</h2>
            <div className="space-y-6 text-lg text-white/70 leading-relaxed">
              <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#00ffff] first-letter:mr-3 first-letter:float-left">
                MDrip provides physician-led medical care in the comfort of your accommodation. 
                Our licensed physicians bring high quality and discreet professional medical 
                evaluation and IV therapy directly to your Airbnb or hotel room in Medellín.
              </p>
              <p>
                We specialize in medical treatment for travelers and residents who need 
                professional care without visiting a clinic. Every visit includes a thorough 
                medical evaluation to ensure IV therapy is safe and appropriate for your condition.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold text-[#00ffff] mb-1">100%</p>
                <p className="text-xs text-white/40 uppercase tracking-wider">Licensed MDs</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold text-[#00ffff] mb-1">24/7</p>
                <p className="text-xs text-white/40 uppercase tracking-wider">Availability</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative will-change-[transform,opacity]"
            style={{ transform: "translateZ(0)" }}
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 relative group">
              <motion.div style={{ y: imgY, height: "130%", top: "-15%", position: "absolute", width: "100%", transform: "translateZ(0)" }} className="will-change-transform">
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000" 
                  alt="Medical Professional in Medellín" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-8 left-8 right-8 p-8 glass rounded-3xl border border-white/20 backdrop-blur-xl">
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-[#00ffff]/20 flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <ShieldCheck className="w-8 h-8 text-[#00ffff]" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-white">Premium Care</p>
                    <p className="text-sm text-white/50">Discreet & Professional</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#00ffff]/5 blur-[100px] rounded-full animate-pulse" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#008080]/5 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Immunity Boost",
      price: "$130",
      video: "/Animacionamarilla.webm",
      tags: ["Vitamin C", "Electrolytes", "Antioxidants"],
      ingredients: ["Vitamin C", "Zinc", "Magnesium"],
      description: "Strengthen your body’s natural defenses with a treatment centered around high-dose Vitamin C, a potent antioxidant known for its role in immune health, cellular protection, and inflammation reduction. Perfect for staying healthy during travel or when feeling run down."
    },
    {
      title: "The Hangover Cure",
      price: "$120",
      video: "/Animacionazul.webm",
      tags: ["RINGER LACTATE", "B-Complex", "THIAMINE"],
      ingredients: ["B-Complex", "Electrolytes", "Saline"],
      description: "Recover quickly from a night out with our specialized hangover treatment, designed to rehydrate, replenish nutrients, and soothe nausea."
    },
    {
      title: "Myers Cocktail",
      price: "$135",
      video: "/Animacionverde.webm",
      tags: ["CALCIUM GLUCONATE", "B-COMPLEX", "VITAMIN C"],
      ingredients: ["Calcium", "B-Complex", "Vitamin C"],
      description: "Boost your overall wellness with a potent blend of Calcium Gluconate, B-Complex, and Vitamin C, designed to support energy levels, immune function, and overall health."
    },
    {
      title: "Ultra Recovery",
      price: "$125",
      video: "/Animacionmorada.webm",
      tags: ["THIAMINE", "VITAMIN B2", "VITAMIN B6", "VITAMIN B12", "ELECTROLYTES", "RINGER LACTATE"],
      ingredients: ["B12", "Electrolytes", "Thiamine"],
      description: "Accelerate your recovery with a comprehensive blend of Thiamine, Vitamin B2, Vitamin B6, Vitamin B12, Electrolytes, and Ringer Lactate, designed to replenish essential nutrients and support optimal performance."
    }
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Drip Menu</h2>
          <p className="text-white/50 max-w-xl mx-auto">Tailored infusions designed to help you feel your best, wherever you are.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={i} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Choose Your Drip",
      desc: "Select the infusion that matches your needs from our curated menu. Our physicians will be there to guide you every step of the way."
    },
    {
      num: "02",
      title: "Schedule a Time",
      desc: "Pick a time that works for you."
    },
    {
      num: "03",
      title: "We Come to You",
      desc: "A certified physician will assess you at your location."
    },
    {
      num: "04",
      title: "Feel Better",
      desc: "Relax and enjoy your treatment. Most sessions take 45-60 minutes."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white/5 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How it Works</h2>
          <p className="text-white/50 max-w-xl mx-auto">Professional medical care delivered to your doorstep in four simple steps.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 p-8 rounded-3xl glass border border-white/5 will-change-[transform,opacity]"
              style={{ transform: "translateZ(0)" }}
            >
              <span className="text-4xl font-serif italic text-[#00ffff]/30 font-bold">{step.num}</span>
              <div className="text-left">
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "MDrip saved my vacation! I was feeling terrible after a long flight and a bit of altitude sickness. The doctor arrived at my Airbnb within an hour and I felt like a new person shortly after the infusion.",
      author: "Sarah J.",
      role: "Traveler",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "Professional, discreet, and incredibly convenient. As a digital nomad in Medellín, having this service available 24/7 is a game changer. Highly recommend the Energy & Focus drip.",
      author: "Michael T.",
      role: "Digital Nomad",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "The medical evaluation was very thorough. I felt safe and well-cared for. Much better than having to navigate a local hospital for something that could be treated at home.",
      author: "Elena R.",
      role: "Resident",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "Excellent service. The team is punctual and the equipment is top-notch. The hydration therapy really helped me recover after a weekend of hiking in Guatapé.",
      author: "David L.",
      role: "Adventure Traveler",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-white/50 max-w-xl mx-auto">Real experiences from travelers and residents in Medellín.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div 
              className="flex will-change-transform"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ transform: "translateZ(0)" }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="min-w-full px-4">
                  <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative">
                    <Quote className="absolute top-8 right-8 w-12 h-12 text-[#00ffff]/10" />
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#00ffff]/20 mb-6">
                        <img src={t.image} alt={t.author} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xl md:text-2xl text-white/90 italic mb-8 leading-relaxed">
                        "{t.quote}"
                      </p>
                      <div>
                        <h4 className="font-bold text-white text-lg">{t.author}</h4>
                        <p className="text-[#00ffff] text-sm uppercase tracking-widest font-semibold">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-[#00ffff]/20 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-[#00ffff]/20 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${currentIndex === i ? 'w-8 bg-[#00ffff]' : 'bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', rating: 5 });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="py-24 bg-[#0d0d0d]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="glass p-8 md:p-12 rounded-[3rem] border border-white/10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Share Your Experience</h2>
            <p className="text-white/50">Your feedback helps us provide the best care possible.</p>
          </div>

          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 will-change-[transform,opacity]"
              style={{ transform: "translateZ(0)" }}
            >
              <CheckCircle2 className="w-16 h-16 text-[#00ffff] mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p className="text-white/50">Your feedback has been sent successfully.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2 uppercase tracking-widest">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#00ffff]/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2 uppercase tracking-widest">Email (Optional)</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#00ffff]/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2 uppercase tracking-widest">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({...formData, rating: star})}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`w-8 h-8 transition-colors ${formData.rating >= star ? 'text-[#00ffff] fill-[#00ffff]' : 'text-white/20'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2 uppercase tracking-widest">Your Experience</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#00ffff]/50 transition-colors resize-none"
                  placeholder="Tell us about your treatment..."
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-5 bg-[#008080] hover:bg-[#00ffff] text-white hover:text-black font-bold rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : (
                  <>
                    Send Feedback
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
              
              {status === 'error' && (
                <p className="text-red-400 text-center text-sm">Something went wrong. Please try again.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};


const CTA = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-[3rem] overflow-hidden p-12 md:p-24 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#008080] to-[#00ffff] opacity-90 z-0" />
          <motion.div 
            style={{ y: bgY, height: "140%", top: "-20%", left: 0, position: "absolute", width: "100%", transform: "translateZ(0)" }}
            className="bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-20 z-10 will-change-transform"
            aria-hidden="true"
          />
          <div className="relative z-20">
            <h2 className="text-4xl md:text-6xl font-bold text-black mb-8">Ready to feel your best?</h2>
            <p className="text-black/70 text-xl mb-12 max-w-xl mx-auto">
              Book your first session today and get 20% off with code <span className="font-bold">FIRSTDRIP</span>
            </p>
            <a 
              href="https://wa.me/573218210894"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-5 bg-black text-white font-bold rounded-full text-xl hover:scale-105 transition-transform shadow-2xl inline-block"
            >
              Book Your Session Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo.webp" 
                  alt="MDRIP Logo" 
                  className="h-full w-full object-contain mix-blend-screen brightness-125"
                  onError={(e) => {
                    e.currentTarget.src = 'https://picsum.photos/seed/medical/100/100';
                  }}
                />
              </div>
              <span className="text-3xl font-bold tracking-tighter text-gradient">MDRIP</span>
            </div>
            <p className="text-white/40 max-w-md mb-8">
              Redefining wellness with premium home-care IV therapy. Professional, safe and discreet medical hydration delivered to your door.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/mdrip.med/" },
                { Icon: WhatsappIcon, href: "https://wa.me/573218210894" }
              ].map(({ Icon, href }, i) => (
                <motion.a 
                  key={i} 
                  href={href}
                  target={href !== "#" ? "_blank" : undefined}
                  rel={href !== "#" ? "noopener noreferrer" : undefined}
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: [
                      "0 0 15px rgba(0, 255, 255, 0.2)",
                      "0 0 25px rgba(0, 255, 255, 0.4)",
                      "0 0 15px rgba(0, 255, 255, 0.2)"
                    ],
                    borderColor: "rgba(0, 255, 255, 0.5)",
                    color: "#00ffff"
                  }}
                  transition={{ 
                    boxShadow: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    scale: {
                      type: "spring", 
                      stiffness: 400, 
                      damping: 10 
                    }
                  }}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 border border-white/5 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-white/40">
              <li><a href="#" className="hover:text-white transition-colors">Drip Menu</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Memberships</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Locations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-white/40">
              <li>
                <a 
                  href="https://wa.me/573218210894" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-[#00ffff] transition-colors group"
                >
                  <svg className="w-6 h-6 text-[#00ffff] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="font-medium">+57 321 821 0894</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-[#00ffff]" strokeWidth={2.5} />
                <span>Medellín, ANT. & Surrounding Areas</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-[#00ffff]" strokeWidth={2.5} />
                <span>Available 24/7</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/20 uppercase tracking-widest">
          <p>© 2026 MDRIP IV THERAPY. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};


import { AIChatbot } from './components/AIChatbot';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <AboutUs />
        <Services />
        <HowItWorks />
        <Testimonials />
        <Feedback />
        <CTA />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
}

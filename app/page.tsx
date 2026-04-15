"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Terminal, ChevronRight, Share2, ShieldCheck, Cpu } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlowCard } from "@/components/ui/GlowCard";
import { FeatureBento } from "@/components/ui/FeatureBento";

// Le plugin sera enregistré dans le useEffect pour éviter les erreurs SSR.

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Hero Entrance
      const tl = gsap.timeline();
      tl.from(logoRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      })
      .from(".hero-text", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power4.out"
      }, "-=0.5")
      .from(".hero-cta", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4");

      // Scroll Animations
      gsap.from(".scroll-reveal", {
        scrollTrigger: {
          trigger: ".scroll-reveal",
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-charcoal text-slate-100 selection:bg-brand-yellow/30 overflow-x-hidden">
      {/* Dynamic Background with Hero Image */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-slate-950">
        <Image 
          src="/trust-up/assets/hero-bg.png" 
          alt="Hero Background" 
          fill 
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal to-charcoal" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full h-20 px-8 flex items-center justify-between z-50 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image src="/trust-up/assets/icon-trustup-white-yellow-1.png" alt="TrustUp Logo" fill className="object-contain" />
          </div>
          <span className="text-lg font-bold tracking-tighter font-[family-name:var(--font-helvetica)] uppercase">TRUST UP <span className="text-brand-yellow font-sans">SMART-BATI</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a>
          <a href="#tech" className="hover:text-white transition-colors">Technologie</a>
          <a href="#docs" className="hover:text-white transition-colors">Documentation</a>
        </div>

        <Link href="/agent">
          <button className="px-5 py-2.5 rounded-full border border-brand-yellow/30 text-brand-yellow font-bold text-sm hover:bg-brand-yellow/10 transition-all flex items-center gap-2">
            Launch Engine <ChevronRight className="w-4 h-4" />
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-40 pb-20 px-6 flex flex-col items-center text-center">
        <div ref={logoRef} className="w-24 h-24 mb-10 relative">
          <div className="absolute inset-0 bg-brand-yellow blur-[40px] opacity-20 animate-pulse" />
          <Image src="/trust-up/assets/icon-trustup-white-yellow-1.png" alt="Logo TrustUp" fill className="object-contain relative z-10" />
        </div>
        
        <h1 className="hero-text text-5xl md:text-8xl font-black tracking-tight leading-[0.95] max-w-5xl mb-8 uppercase text-balance">
          L&apos;IA Architecte de votre <span className="text-brand-yellow">Chantier</span>
        </h1>
        
        <p className="hero-text text-lg md:text-xl text-slate-400 max-w-3xl mb-12 leading-relaxed">
          Transformez vos notes vocales et écrits de chantier en spécifications techniques structurées grâce à notre agent IA natif de nouvelle génération.
        </p>

        <div className="hero-cta flex flex-wrap justify-center gap-4">
          <Link href="/agent">
            <button className="btn-primary">
              <Sparkles className="w-5 h-5" /> Start Analyzing Now
            </button>
          </Link>
          <div className="flex items-center gap-3 px-6 py-4 rounded-xl border border-white/5 bg-white/5 text-slate-300 font-bold hover:bg-white/10 transition-all cursor-pointer">
            <Terminal className="w-5 h-5" /> Get Started Docs
          </div>
        </div>

        {/* Dynamic Badge */}
        <div className="mt-20 hero-text">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-slate-900/40 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
             <Cpu className="w-3 h-3 text-brand-yellow" /> Powered by Gemini 1.5 Flash
          </div>
        </div>
      </section>

      {/* Bento Feature Section */}
      <section id="features" className="scroll-reveal">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase">Le Futur du <span className="text-brand-yellow">Bâtiment</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Une ingénierie de pointe au service des artisans et entrepreneurs du BTP.</p>
        </div>
        <FeatureBento />
      </section>

      {/* Documentation / Installation Styling Section */}
      <section id="docs" className="py-24 max-w-6xl mx-auto px-6 scroll-reveal">
        <GlowCard className="p-0 border-white/5 overflow-hidden">
          <div className="bg-slate-900/80 p-6 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
               <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
               </div>
               <span className="text-xs font-mono text-slate-500 ml-4">setup.sh — trustup-agent</span>
            </div>
            <Terminal className="w-4 h-4 text-slate-600" />
          </div>
          <div className="p-8 md:p-12 font-mono text-sm leading-relaxed overflow-x-auto">
            <div className="mb-8">
              <span className="text-brand-yellow"># 01. Installez les dépendances</span><br/>
              <span className="text-slate-300">$ npm install</span><br/>
              <span className="text-emerald-500">✓ 842 packages installed in 4.2s</span>
            </div>
            <div className="mb-8">
              <span className="text-brand-yellow"># 02. Configurez l&apos;environnement</span><br/>
              <span className="text-slate-300">$ cp .env.example .env.local</span><br/>
              <span className="text-slate-500"># Ajoutez votre GOOGLE_GENERATIVE_AI_API_KEY</span>
            </div>
            <div>
              <span className="text-brand-yellow"># 03. Lancez le développement</span><br/>
              <span className="text-slate-300">$ npm run dev</span><br/>
              <span className="text-brand-yellow">→ Local: </span><span className="text-white underline italic">http://localhost:3000</span>
            </div>
          </div>
        </GlowCard>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 grayscale opacity-60">
             <Image src="/trust-up/assets/icon-trustup-white-yellow-1.png" alt="Logo" width={24} height={24} />
             <span className="text-sm font-bold font-[family-name:var(--font-helvetica)] uppercase">TRUST UP</span>
          </div>
          
          <p className="text-slate-600 text-xs">© 2026 TrustUp Smart-Bati Engine. All rights reserved.</p>

          <div className="flex gap-6">
            <ShieldCheck className="w-5 h-5 text-slate-700 hover:text-brand-yellow transition-colors cursor-pointer" />
            <Share2 className="w-5 h-5 text-slate-700 hover:text-brand-yellow transition-colors cursor-pointer" />
          </div>
        </div>
      </footer>
    </main>
  );
}

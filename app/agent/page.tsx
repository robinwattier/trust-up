"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Send, Zap, RotateCcw, Quote, Hammer, Sparkles, Home } from "lucide-react";
import gsap from "gsap";
import Link from "next/link";
import ThoughtTrace from "@/components/ThoughtTrace";
import SpecViewer from "@/components/SpecViewer";
import { cn } from "@/lib/utils";
import { useAgentChat } from "@/hooks/use-agent-chat";

export default function AgentPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  const { 
    isLoading, 
    input, 
    setInput, 
    sendMessage, 
    traceEntries, 
    specData, 
    reset 
  } = useAgentChat();

  // GSAP Intro Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
      gsap.from(".anim-stagger", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <main ref={containerRef} className="min-h-screen flex flex-col bg-[#020617] selection:bg-brand-yellow/30 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-yellow/10 rounded-full blur-[120px] animate-pulse-subtle" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-800/20 rounded-full blur-[120px] animate-pulse-subtle" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <nav ref={headerRef} className="h-20 px-8 border-b border-white/5 flex items-center justify-between glass-card rounded-none border-x-0 border-t-0 bg-slate-950/80 sticky top-0 z-50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white" title="Retour à l'accueil">
            <Home className="w-5 h-5" />
          </Link>
          <div className="w-px h-6 bg-white/10 mx-2" />
          <div className="w-10 h-10 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-brand-yellow blur-[15px] opacity-20 animate-pulse" />
            <Image src="/trust-up/assets/icon-trustup-white-yellow-1.png" alt="Logo" fill className="object-contain relative z-10" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white leading-tight tracking-tight font-[family-name:var(--font-helvetica)] uppercase">
              TrustUp <span className="text-brand-yellow font-sans normal-case">Smart-Bati</span>
            </h1>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-brand-yellow/60" />
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Engine Instance</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          {!process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY && (
            <div className="flex items-center gap-2 px-3 py-1 bg-brand-yellow/10 border border-brand-yellow/30 rounded-full animate-pulse">
              <Sparkles className="w-3 h-3 text-brand-yellow" />
              <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-wider">Demo Mode</span>
            </div>
          )}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-900/50 rounded-full border border-white/5">
            <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(255,194,0,0.5)]" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Gemini 1.5 Flash</span>
          </div>
          <button 
            onClick={reset} 
            className="p-2.5 hover:bg-white/5 rounded-xl transition-all text-slate-400 hover:text-white hover:rotate-180 duration-500"
            title="Réinitialiser"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 max-w-[1800px] mx-auto w-full overflow-hidden">
        
        {/* Left Column - Input & Trace */}
        <div className="lg:col-span-5 flex flex-col gap-8 overflow-hidden">
          <div className="anim-stagger space-y-4">
            <div className="flex items-center gap-3 text-slate-400 px-1">
              <Quote className="w-4 h-4 text-brand-yellow" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Note de l&apos;Artisan / Chantier</span>
            </div>
            <form onSubmit={handleSubmit} className="relative group">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ex: Pose de 25m2 de carrelage dans la cuisine après dépose de l'ancien revêtement..."
                className="w-full glass-input h-40 resize-none pr-12 pt-5 leading-relaxed text-base bg-slate-900/40 border-white/5 focus:border-brand-yellow/30 placeholder:text-slate-600 transition-all shadow-inner"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading || !input.trim()}
                className={cn(
                  "absolute bottom-5 right-5 w-10 h-10 flex items-center justify-center rounded-xl bg-brand-yellow text-white transition-all shadow-[0_0_20px_rgba(255,194,0,0.4)] disabled:opacity-30 disabled:shadow-none disabled:scale-100",
                  isLoading && "animate-pulse"
                )}
              >
                {isLoading ? <Zap className="w-5 h-5 animate-spin text-white" /> : <Send className="w-5 h-5" />}
              </motion.button>
            </form>
          </div>

          <div className="anim-stagger flex-1 overflow-hidden min-h-[400px]">
            <ThoughtTrace entries={traceEntries} />
          </div>
        </div>

        {/* Right Column - Spec Viewer */}
        <div className="anim-stagger lg:col-span-7 flex flex-col overflow-hidden">
          <SpecViewer data={specData} />
        </div>
      </div>
    </main>
  );
}

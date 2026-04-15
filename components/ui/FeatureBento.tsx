"use client";

import React from "react";
import Image from "next/image";
import { GlowCard } from "./GlowCard";
import { Sparkles, Cpu, Zap, Database } from "lucide-react";

export const FeatureBento = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 h-full max-w-7xl mx-auto px-6 py-20">
      {/* AI Reasoning - Large Card */}
      <div className="md:col-span-3 md:row-span-2">
        <GlowCard className="h-full flex flex-col p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-brand-yellow/20 flex items-center justify-center border border-brand-yellow/30">
              <Cpu className="w-5 h-5 text-brand-yellow" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Agent Thought Trace</h3>
              <p className="text-sm text-slate-400">Raisonnement en temps réel</p>
            </div>
          </div>
          <div className="flex-1 relative min-h-[300px] mb-6 rounded-xl overflow-hidden border border-white/5 bg-slate-900/50">
            <Image 
              src="/assets/thought-trace.png" 
              alt="Reasoning Visualization" 
              fill 
              className="object-cover opacity-80"
            />
          </div>
          <p className="text-slate-400 leading-relaxed text-sm">
            Visualisez chaque étape de l&apos;analyse. Notre agent ne se contente pas de répondre, il explique comment il interprète vos notes de chantier pour une précision chirurgicale.
          </p>
        </GlowCard>
      </div>

      {/* Structured Specs - Wide Card */}
      <div className="md:col-span-3">
        <GlowCard className="h-full flex flex-col p-8">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-brand-yellow" />
            <h3 className="text-lg font-bold text-white">Spec-Driven Output</h3>
          </div>
          <div className="flex-1 flex gap-6 items-center">
            <div className="flex-1">
              <p className="text-slate-400 text-sm leading-relaxed">
                Conversion intelligente de notes brutes en JSON technique. Prêt pour l&apos;import immédiat dans vos logiciels de devis.
              </p>
            </div>
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-white/10 shrink-0">
               <Image 
                src="/assets/specs.png" 
                alt="Technical Specs Visualization" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </GlowCard>
      </div>

      {/* MCP Integration */}
      <div className="md:col-span-2">
        <GlowCard className="h-full p-8 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-brand-yellow" />
            <h3 className="text-lg font-bold text-white">Intégration MCP</h3>
          </div>
          <p className="text-slate-400 text-sm mt-4">
            Connexion directe à vos serveurs de prix via le Model Context Protocol. Catalogues de prix mis à jour en temps réel.
          </p>
        </GlowCard>
      </div>

      {/* Streaming AI */}
      <div className="md:col-span-1">
        <GlowCard className="h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-brand-yellow/20 flex items-center justify-center animate-pulse mb-3">
            <Sparkles className="w-6 h-6 text-brand-yellow" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow">Streaming</span>
          <span className="text-[10px] text-slate-500 mt-1">Vercel AI SDK v6</span>
        </GlowCard>
      </div>
    </div>
  );
};

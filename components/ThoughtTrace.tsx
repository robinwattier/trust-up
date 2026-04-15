"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Database, Cpu, CheckCircle2, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

interface TraceEntry {
  id: string;
  type: "thinking" | "tool_call" | "tool_result" | "info";
  message: string;
  timestamp: Date;
}

export default function ThoughtTrace({ entries }: { entries: TraceEntry[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  return (
    <div className="glass-card flex flex-col h-full overflow-hidden border-brand-yellow/10">
      <div className="px-4 py-3 border-b border-glass-border flex items-center justify-between bg-brand-yellow/5">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-brand-yellow" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Agent Thought Trace</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
          <span className="text-[10px] text-brand-yellow font-medium">REAL-TIME</span>
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm scroll-smooth">
        <AnimatePresence initial={false}>
          {entries.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-600 italic text-xs">
              Waiting for artisan input...
            </div>
          ) : (
            entries.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex gap-3 group"
              >
                <div className="flex flex-col items-center">
                  <div className={`p-1.5 rounded-lg ${
                    entry.type === "tool_call" ? "bg-amber-500/10 text-amber-500" :
                    entry.type === "tool_result" ? "bg-green-500/10 text-green-500" :
                    entry.type === "thinking" ? "bg-brand-yellow/10 text-brand-yellow" :
                    "bg-slate-500/10 text-slate-500"
                  }`}>
                    {entry.type === "tool_call" && <Database className="w-3.5 h-3.5" />}
                    {entry.type === "tool_result" && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {entry.type === "thinking" && <Cpu className="w-3.5 h-3.5 animate-spin-slow" />}
                    {entry.type === "info" && <ChevronRight className="w-3.5 h-3.5" />}
                  </div>
                  {i < entries.length - 1 && (
                    <div className="w-px h-full bg-glass-border my-1" />
                  )}
                </div>
                
                <div className="flex-1 pt-0.5">
                  <p className={`leading-relaxed ${
                    entry.type === "tool_call" ? "text-amber-200" :
                    entry.type === "tool_result" ? "text-green-200" :
                    entry.type === "thinking" ? "text-brand-yellow" :
                    "text-slate-400"
                  }`}>
                    {entry.message}
                  </p>
                  <span className="text-[10px] text-slate-600 mt-1 block group-hover:text-slate-500 transition-colors">
                    {entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

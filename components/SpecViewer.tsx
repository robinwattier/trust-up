"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileText, Calculator, Package, Clock, ShieldCheck, Download } from "lucide-react";

interface Task {
  task: string;
  quantity: number;
  unit: string;
  material_cost?: number;
  labor_cost?: number;
  estimated_duration: string;
  materials?: string[];
}

interface SpecData {
  project_id: string;
  client_context: string;
  tasks: Task[];
  agent_confidence_score: number;
  total_estimate?: number;
}

export default function SpecViewer({ data }: { data: SpecData | null }) {
  if (!data) {
    return (
      <div className="glass-card h-full flex flex-col items-center justify-center p-12 text-center bg-slate-900/40 border-dashed border-white/5 opacity-80">
        <div className="w-20 h-20 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 bg-brand-yellow/10 rounded-2xl blur-xl" />
          <FileText className="w-10 h-10 text-slate-600 relative z-10" />
        </div>
        <h3 className="text-xl font-semibold text-slate-300 mb-3">Spécification Technique AI</h3>
        <p className="text-sm text-slate-500 max-w-[280px] leading-relaxed">
          Décrivez votre projet à l&apos;agent pour générer automatiquement une nomenclature structurée et chiffrée.
        </p>
      </div>
    );
  }

  const tasks = data.tasks || [];
  const totalPrice = tasks.reduce((acc, t) => acc + (t.material_cost || 0) + (t.labor_cost || 0), 0);

  return (
    <div className="glass-card flex flex-col h-full bg-white/[0.02] border-white/10 shadow-2xl relative overflow-hidden group/viewer">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-yellow via-brand-yellow/50 to-brand-yellow bg-[length:200%_auto] animate-gradient-x" />
      
      <div className="px-8 py-6 border-b border-glass-border flex items-center justify-between bg-slate-950/40">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-brand-yellow/20 rounded-xl shadow-inner">
            <ShieldCheck className="w-6 h-6 text-brand-yellow" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Technical Specification</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-brand-yellow font-black uppercase tracking-widest">{data.project_id || "REF-TEMP"}</span>
              <span className="w-1 h-1 rounded-full bg-slate-700" />
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Validée par IA</span>
            </div>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 hover:bg-white/5 rounded-xl transition-all group/btn"
        >
          <Download className="w-5 h-5 text-slate-400 group-hover/btn:text-white" />
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-white/[0.03] rounded-2xl border border-white/5 shadow-sm">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-2">Contexte Client</span>
            <p className="text-sm font-medium text-slate-200 leading-relaxed">{data.client_context}</p>
          </div>
          <div className="p-5 bg-white/[0.03] rounded-2xl border border-white/5 shadow-sm flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Score de Précision</span>
              <span className="text-xs font-black text-brand-yellow">{Math.round((data.agent_confidence_score || 0) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(data.agent_confidence_score || 0) * 100}%` }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-full bg-gradient-to-r from-brand-yellow to-brand-yellow/50" 
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Nomenclature des tâches</h3>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          
          <AnimatePresence mode="popLayout">
            {tasks.map((task, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="p-6 glass-card bg-slate-900/20 hover:bg-slate-900/40 transition-all border-white/[0.05] hover:border-brand-yellow/20 group/task shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div className="flex gap-4">
                    <div className="mt-1 p-2 bg-slate-800/80 rounded-xl group-hover/task:bg-brand-yellow/10 transition-colors">
                      <Package className="w-4 h-4 text-slate-400 group-hover/task:text-brand-yellow" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white group-hover/task:text-brand-yellow transition-colors">{task.task}</h4>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">{task.quantity} {task.unit}</p>
                    </div>
                  </div>
                  <div className="bg-slate-950/50 px-4 py-2 rounded-xl border border-white/5">
                    <span className="text-sm font-black text-brand-yellow">
                      {((task.material_cost || 0) + (task.labor_cost || 0)).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Durée Est.</span>
                    </div>
                    <p className="text-sm font-bold text-slate-300">{task.estimated_duration}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Calculator className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Main d&apos;œuvre</span>
                    </div>
                    <p className="text-sm font-bold text-slate-300">{task.labor_cost?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                  </div>
                  <div className="space-y-1 md:col-span-1 col-span-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Package className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Matériaux</span>
                    </div>
                    <p className="text-sm font-bold text-slate-300">{task.material_cost?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                  </div>
                </div>

                {task.materials && task.materials.length > 0 && (
                  <div className="mt-5 pt-5 border-t border-white/5">
                    <div className="flex flex-wrap gap-2">
                      {task.materials.map((m, i) => (
                        <span key={i} className="text-[9px] font-bold px-2.5 py-1 bg-brand-yellow/5 text-brand-yellow rounded-lg border border-brand-yellow/10 uppercase tracking-tighter">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="p-8 bg-brand-yellow/10 border-t border-brand-yellow/20 rounded-b-2xl relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-yellow/5 to-transparent animate-shimmer" />
        <div className="flex items-center justify-between relative z-10">
          <div>
            <span className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.4em] block mb-1">Total Devis Estimatif</span>
            <p className="text-xs text-slate-500 font-medium italic">Incluant matériaux et main d&apos;œuvre</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-white tracking-tighter">
              {totalPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

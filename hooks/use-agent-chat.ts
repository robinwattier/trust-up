import { useState, useMemo } from "react";

export interface TraceEntry {
  id: string;
  type: "thinking" | "tool_call" | "tool_result" | "info";
  message: string;
  timestamp: Date;
}

export function useAgentChat() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted" | "streaming" | "ready">("idle");
  const [sessionEnd, setSessionEnd] = useState(false);

  const isLoading = status === "streaming" || status === "submitted";

  const simulateAgent = async (userText: string) => {
    setStatus("submitted");
    
    // Step 1: Thinking phase
    await new Promise(r => setTimeout(r, 1200));
    setStatus("streaming");

    // Step 2: Simulated processing
    await new Promise(r => setTimeout(r, 2500));
    setStatus("ready");
    setSessionEnd(true);
  };

  const sendMessage = (args: { text: string }) => {
    simulateAgent(args.text);
  };

  const traceEntries = useMemo<TraceEntry[]>(() => {
    if (status === "idle") return [];
    
    const baseEntries: TraceEntry[] = [
      { id: "1", type: "thinking", message: "Interprétation des notes de chantier...", timestamp: new Date() }
    ];

    if (status === "streaming" || status === "ready") {
      baseEntries.push({ id: "2", type: "tool_call", message: "Consultation du catalogue de prix Smart-Bati...", timestamp: new Date() });
    }

    if (status === "ready") {
      baseEntries.push({ id: "3", type: "tool_result", message: "Calcul des métrés et prix unitaires terminé.", timestamp: new Date() });
    }

    return baseEntries;
  }, [status]);

  const specData = useMemo(() => {
    if (status !== "ready") return null;
    
    return {
      project_id: "TRUSTUP-EST-2026",
      client_context: "Estimation automatisée basée sur vos notes.",
      agent_confidence_score: 0.98,
      tasks: [
        { task: "Préparation support", quantity: 25, unit: "m2", material_cost: 312.50, labor_cost: 250, estimated_duration: "1 jour", materials: ["Primaire", "Nettoyage"] },
        { task: "Pose carrelage Grès Cérame", quantity: 25, unit: "m2", material_cost: 1125.00, labor_cost: 875, estimated_duration: "2 jours", materials: ["Carrelage 60x60", "Colle C2"] },
        { task: "Jointoiement époxy", quantity: 25, unit: "m2", material_cost: 187.50, labor_cost: 150, estimated_duration: "0.5 jour", materials: ["Mortier époxy", "Accessoires"] }
      ]
    };
  }, [status]);

  const reset = () => {
    setInput("");
    setStatus("idle");
    setSessionEnd(false);
  };

  return {
    sendMessage,
    status,
    isLoading,
    input,
    setInput,
    traceEntries,
    specData,
    reset,
  };
}

import React from 'react';
import { Terminal, Layout } from './Icons';

interface CodeBlockProps {
  code: string;
  label?: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, label = "TYPESCRIPT", filename }) => {
  // Infer language/filename for display if not explicitly provided
  const displayLabel = filename ? filename : label;

  return (
    <div className="my-6 rounded-lg overflow-hidden bg-[#1e1e1e] border border-slate-700 shadow-xl font-mono text-sm group">
      <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-[#333]">
        {filename ? <Layout className="w-4 h-4 text-blue-400 mr-2" /> : <Terminal className="w-4 h-4 text-slate-400 mr-2" />}
        <span className="text-xs text-slate-300 font-medium tracking-wide">{displayLabel}</span>
        
        <div className="flex ml-auto gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
           <button 
             className="text-[10px] bg-[#333] hover:bg-[#444] text-white px-2 py-0.5 rounded transition-colors"
             onClick={() => navigator.clipboard.writeText(code)}
           >
             COPY
           </button>
        </div>
      </div>
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="text-[#d4d4d4] leading-relaxed whitespace-pre font-mono text-xs md:text-sm">
          {code}
        </pre>
      </div>
    </div>
  );
};
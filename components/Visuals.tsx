import React from 'react';
import { Cloud, Layout, Terminal, Server, Code, Box } from './Icons';

export const VisualGitHub = () => (
  <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden font-sans">
    <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-red-400"></div>
      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
      <div className="w-3 h-3 rounded-full bg-green-400"></div>
      <div className="ml-4 text-xs text-slate-500 font-medium">github.com/user/gemini-app</div>
    </div>
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">U</div>
        <div className="text-sm">
          <div className="font-bold text-slate-800">gemini-app</div>
          <div className="text-xs text-slate-500">Public repository</div>
        </div>
        <div className="ml-auto px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-md shadow-sm">
          Code
        </div>
      </div>
      <div className="border border-slate-200 rounded-md overflow-hidden text-sm">
        <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 text-xs text-slate-500 flex justify-between">
            <span>master</span>
            <span>2 minutes ago</span>
        </div>
        {[
          { icon: '📁', name: 'src', msg: 'Initialize project' },
          { icon: '📁', name: 'public', msg: 'Add assets' },
          { icon: '📄', name: 'index.html', msg: 'Update entry point' },
          { icon: '📄', name: 'package.json', msg: 'Add dependencies' },
          { icon: '📄', name: 'vite.config.ts', msg: 'Config build' },
        ].map((file, i) => (
            <div key={i} className="px-3 py-2 bg-white border-b border-slate-100 last:border-0 flex items-center gap-3 hover:bg-slate-50">
                <span className="opacity-70">{file.icon}</span>
                <span className="font-medium text-slate-700 w-32">{file.name}</span>
                <span className="text-slate-400 text-xs">{file.msg}</span>
            </div>
        ))}
      </div>
    </div>
  </div>
);

export const VisualNextJsRefactor = () => (
  <div className="w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden p-6 text-white relative">
    <div className="absolute top-0 right-0 p-3 opacity-10">
        <Layout className="w-32 h-32" />
    </div>
    
    <div className="flex items-center justify-between gap-4 relative z-10">
        {/* Old Structure */}
        <div className="flex-1 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <div className="text-xs font-bold text-red-400 mb-2 uppercase tracking-wide">Before (Static)</div>
            <div className="space-y-2 font-mono text-xs text-slate-400">
                <div className="flex items-center gap-2"><div className="w-1 h-4 bg-slate-600"></div> index.html</div>
                <div className="flex items-center gap-2"><div className="w-1 h-4 bg-slate-600"></div> src/App.tsx</div>
                <div className="flex items-center gap-2 text-red-400/80"><div className="w-1 h-4 bg-red-500"></div> API Key (Exposed!)</div>
            </div>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/50">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </div>
            <div className="text-[10px] text-brand-400 font-bold mt-2 bg-slate-900 px-2 py-0.5 rounded-full border border-brand-900">AI Refactor</div>
        </div>

        {/* New Structure */}
        <div className="flex-1 bg-slate-800/50 p-4 rounded-lg border border-brand-500/30 bg-gradient-to-br from-brand-900/10 to-transparent">
            <div className="text-xs font-bold text-brand-400 mb-2 uppercase tracking-wide">After (Next.js)</div>
            <div className="space-y-2 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2"><div className="w-1 h-4 bg-slate-600"></div> app/page.tsx</div>
                <div className="flex items-center gap-2 p-1 bg-emerald-900/30 rounded border border-emerald-500/20 text-emerald-300">
                    <div className="w-1 h-4 bg-emerald-500"></div> 
                    api/route.ts (Safe)
                </div>
                <div className="flex items-center gap-2 opacity-50"><div className="w-1 h-4 bg-slate-600"></div> .env.local</div>
            </div>
        </div>
    </div>
  </div>
);

export const VisualGCPDeploy = () => (
  <div className="w-full bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-[#1a73e8] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
              <Cloud className="w-5 h-5" />
              <span className="font-bold">Google Cloud Run</span>
          </div>
          <div className="px-2 py-0.5 bg-white/20 text-white text-xs rounded">
              US-CENTRAL1
          </div>
      </div>
      <div className="p-6">
          <div className="flex items-start gap-4">
               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                   <Server className="w-6 h-6" />
               </div>
               <div className="flex-1">
                   <h4 className="font-bold text-slate-800 text-lg">gemini-service</h4>
                   <div className="flex items-center gap-2 mt-1">
                       <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                       <span className="text-sm text-green-700 font-medium">Healthy • Deployed just now</span>
                   </div>
                   <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded font-mono text-xs text-slate-600 break-all flex items-center justify-between">
                       <span>https://gemini-service-x82na-uc.a.run.app</span>
                       <span className="text-blue-600 font-bold cursor-pointer">OPEN</span>
                   </div>
               </div>
          </div>
          <div className="mt-6 border-t border-slate-100 pt-4">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Logs</div>
              <div className="font-mono text-xs text-slate-600 space-y-1">
                  <div>[INFO] Container starting...</div>
                  <div>[INFO] Listening on port 8080</div>
                  <div className="text-blue-600">[INFO] Gemini API Client Initialized (Secure Mode)</div>
              </div>
          </div>
      </div>
  </div>
);

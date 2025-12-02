import React, { useState, useMemo } from 'react';
import { Platform, AppType } from './types';
import { DEPLOYMENT_GUIDES } from './constants';
import { PlatformSelector } from './components/PlatformSelector';
import { CodeBlock } from './components/CodeBlock';
import { FlowAnimation } from './components/FlowAnimation';
import { GeminiDemo } from './components/GeminiDemo';
import { Server, Layout, CheckCircle, ShieldAlert, Globe, Box } from './components/Icons';

function App() {
  const [activePlatform, setActivePlatform] = useState<Platform>(Platform.VERCEL);
  const [activeAppType, setActiveAppType] = useState<AppType>(AppType.STATIC);

  const activeGuide = useMemo(() => {
    return DEPLOYMENT_GUIDES.find(g => g.platform === activePlatform && g.appType === activeAppType);
  }, [activePlatform, activeAppType]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      
      {/* Sidebar / Navigation */}
      <aside className="w-full md:w-80 bg-slate-100 border-r border-slate-200 flex flex-col flex-shrink-0 h-auto md:h-screen sticky top-0 z-50">
        <div className="p-6 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2 mb-1">
             <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold">D</div>
             <h1 className="text-xl font-bold text-slate-900 tracking-tight">DeployMaster</h1>
          </div>
          <p className="text-xs text-slate-500">Gemini 应用部署教程</p>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">1. 选择部署平台</h2>
            <PlatformSelector current={activePlatform} onSelect={setActivePlatform} />
          </div>

          <div>
             <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">2. 选择应用类型</h2>
             <div className="space-y-2">
               <button
                 onClick={() => setActiveAppType(AppType.STATIC)}
                 className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all duration-200
                   ${activeAppType === AppType.STATIC 
                     ? 'bg-white text-brand-600 shadow-lg ring-1 ring-brand-100' 
                     : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'}`}
               >
                 <Layout className="w-5 h-5" />
                 <div className="text-left">
                    <span className="block font-bold">纯前端项目 (Static)</span>
                    <span className="text-[10px] opacity-70">不涉及 Gemini API 调用</span>
                 </div>
               </button>
               <button
                  onClick={() => setActiveAppType(AppType.GEMINI)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all duration-200
                   ${activeAppType === AppType.GEMINI 
                     ? 'bg-white text-purple-600 shadow-lg ring-1 ring-purple-100' 
                     : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'}`}
               >
                 <Server className="w-5 h-5" />
                 <div className="text-left">
                    <span className="block font-bold">AI 功能项目 (Gemini)</span>
                    <span className="text-[10px] opacity-70">需保护 API Key 安全</span>
                 </div>
               </button>
             </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-slate-200 bg-white text-xs text-slate-400 flex flex-col gap-2">
          <div className="flex justify-between">
            <span>Guide v3.0</span>
            <span className="text-brand-600 font-bold">PDF Optimized</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-screen scroll-smooth">
        <div className="max-w-5xl mx-auto p-6 md:p-12 pb-32">
          
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wide">
                  Tutorial
                </span>
                <span className="text-slate-300">/</span>
                <span className="text-brand-600 font-semibold">{activePlatform}</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              {activeAppType === AppType.STATIC 
                ? '纯前端项目部署' 
                : 'AI 全栈应用部署'}
            </h2>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              {activeAppType === AppType.STATIC 
                ? `学习如何将不包含 AI 功能的静态 React 应用部署到 ${activePlatform}。这非常适合个人主页、博客或展示型网站。`
                : `当使用 Gemini 等付费 API 时，安全性至关重要。学习如何利用 ${activePlatform} 的服务端能力（Serverless/Edge）来隐藏你的 API Key。`}
            </p>
          </header>

          {/* Architecture Visualization */}
          {activeAppType === AppType.GEMINI && (
            <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      安全请求原理 (Reverse Proxy / Backend Relay)
                    </h3>
                </div>
                {/* Dynamically pass the platform to animate the specific tech stack (e.g., Netlify Functions) */}
                <FlowAnimation platform={activePlatform} />
            </div>
          )}

          {/* Interactive Playground (Only for Gemini App) */}
          {activeAppType === AppType.GEMINI && (
            <div className="mb-16">
              <GeminiDemo />
            </div>
          )}

          {/* Guide Steps */}
          <div className="space-y-16">
            {activeGuide ? (
              <>
                {/* Prerequisites Box */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-16 -mt-16 z-0"></div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-800">
                      <CheckCircle className="text-brand-500 w-6 h-6" />
                      前置条件 (Prerequisites)
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {activeGuide.prerequisites.map((req, i) => (
                        <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div>
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Steps Loop */}
                <div className="border-l-2 border-slate-200 pl-8 md:pl-12 space-y-16">
                    {activeGuide.steps.map((step, index) => (
                      <div key={index} className="relative group">
                        {/* Step Marker */}
                        <div className="absolute -left-[43px] md:-left-[59px] top-0 w-8 h-8 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center font-bold text-sm group-hover:border-brand-500 group-hover:text-brand-600 transition-colors bg-slate-50 z-10">
                          {index + 1}
                        </div>
                        
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-brand-700 transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                            {step.description}
                          </p>
                        </div>
                        
                        {step.warning && (
                          <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl flex gap-4 text-amber-900 shadow-sm">
                            <ShieldAlert className="w-6 h-6 flex-shrink-0 text-amber-600" />
                            <div className="space-y-1">
                                <p className="font-bold text-sm uppercase tracking-wide text-amber-700">注意 / Warning</p>
                                <p className="text-sm opacity-90">{step.warning}</p>
                            </div>
                          </div>
                        )}

                        {step.code && (
                           <div className="mt-6">
                               <CodeBlock 
                                 code={step.code} 
                                 filename={
                                    step.code.includes('package.json') ? 'package.json' : 
                                    step.code.includes('vercel.json') ? 'vercel.json' :
                                    step.code.includes('netlify.toml') ? 'netlify.toml' :
                                    step.code.includes('Dockerfile') ? 'Dockerfile' :
                                    step.code.includes('index.html') ? 'index.html' :
                                    step.code.includes('提示词') ? 'Prompt (提示词)' :
                                    'Code / Terminal'
                                  } 
                                />
                           </div>
                        )}
                        
                        {/* Visual Component Rendering */}
                        {step.visual ? (
                          <div className="mt-6 shadow-lg max-w-2xl">
                            {step.visual}
                          </div>
                        ) : step.image ? (
                          <div className="mt-6 rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 max-w-2xl">
                             {step.image.startsWith('http') ? (
                                <img src={step.image} alt={step.title} className="w-full h-auto object-cover" />
                             ) : (
                                <div className="h-48 bg-slate-200 flex items-center justify-center text-slate-400">
                                   <Box className="w-12 h-12" />
                                </div>
                             )}
                          </div>
                        ) : null}
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <div className="text-center p-16 bg-slate-50 rounded-2xl border-dashed border-2 border-slate-300">
                <p className="text-slate-500 font-medium">Coming Soon</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

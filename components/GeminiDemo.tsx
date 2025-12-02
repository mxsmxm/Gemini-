import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import { Zap, ShieldAlert, Play, Code, Lock, Unlock } from './Icons';
import { CodeBlock } from './CodeBlock';

export const GeminiDemo: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState<'client' | 'server'>('client');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setImage(null);
    try {
      const result = await generateImage(prompt);
      setImage(result);
    } catch (err) {
      setError("生成失败，请检查 API Key 或网络连接。");
    } finally {
      setLoading(false);
    }
  };

  const clientCode = `// ❌ 不安全代码：前端直接调用
// 如果你这样写，API Key 会在浏览器中暴露，任何人都能偷走你的额度！

import { GoogleGenAI } from "@google/genai";

// 这里的 API Key 会被打包到 JS 文件中
const ai = new GoogleGenAI({ 
  apiKey: "AIzaSy..." 
});

const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash-image',
  contents: { parts: [{ text: prompt }] }
});`;

  const serverCode = `// ✅ 安全代码：前后端分离 / Serverless
// Key 存放在服务端环境变量中

// 1. 前端代码 (Client):
const response = await fetch('/api/generate-image', {
  method: 'POST',
  body: JSON.stringify({ prompt })
});

// 2. 后端代码 (Server / API Route):
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ 
  // 只有服务端能读取到 process.env
  apiKey: process.env.API_KEY 
});

// 在这里处理逻辑，用户永远看不到 Key`;

  return (
    <div className="mt-8 bg-slate-900 rounded-2xl border border-slate-800 text-white shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Zap className="w-64 h-64 text-brand-500" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-brand-500/20 p-2 rounded-lg text-brand-400">
              <Play className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">交互式演示</h3>
              <p className="text-slate-400 text-sm">代码对比学习</p>
            </div>
          </div>
          
          <div className="flex bg-slate-800 rounded-lg p-1 gap-1">
             <button 
               onClick={() => setShowCode('client')}
               className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-2 transition-all ${showCode === 'client' ? 'bg-red-500/20 text-red-400' : 'text-slate-400 hover:text-white'}`}
             >
               <Unlock className="w-3 h-3" />
               不安全模式
             </button>
             <button 
               onClick={() => setShowCode('server')}
               className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-2 transition-all ${showCode === 'server' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
             >
               <Lock className="w-3 h-3" />
               安全模式 (推荐)
             </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2">
          {/* Left: Interactive Input */}
          <div className="p-6 border-b lg:border-b-0 lg:border-r border-slate-700">
             
             {showCode === 'client' && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg flex gap-3 animate-pulse-slow">
                  <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <div className="text-xs text-red-200">
                    <p className="font-bold">警告：KEY 泄露风险</p>
                    <p className="opacity-80 mt-1">
                      当前的演示代码运行在浏览器中。请勿在生产环境中这样使用！
                    </p>
                  </div>
                </div>
             )}

             {showCode === 'server' && (
                <div className="mb-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg flex gap-3">
                  <Lock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div className="text-xs text-emerald-200">
                    <p className="font-bold">生产环境就绪</p>
                    <p className="opacity-80 mt-1">
                      这是 PDF 和视频教程中推荐的最佳实践方案。
                    </p>
                  </div>
                </div>
             )}

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-300">图片提示词 (Prompt)</label>
              <textarea
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all outline-none font-mono text-sm"
                rows={3}
                placeholder="例如：一只在太空中写代码的猫"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt}
                className={`w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all
                  ${loading || !prompt 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                    : 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-500/20 hover:scale-[1.02]'
                  }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    生成中...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    生成图片
                  </>
                )}
              </button>
            </div>

            {image && (
              <div className="mt-6 rounded-lg overflow-hidden border border-slate-700 bg-black/50">
                 <img src={image} alt="Generated" className="w-full h-auto" />
                 <div className="p-2 bg-slate-950 text-xs text-slate-400 font-mono text-center">
                   Generated with gemini-2.5-flash-image
                 </div>
              </div>
            )}
          </div>

          {/* Right: Code Explanation */}
          <div className="p-6 bg-[#1e1e1e] flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-slate-400 text-xs uppercase font-bold tracking-wider">
               <Code className="w-4 h-4" />
               {showCode === 'client' ? '当前代码 (浏览器直连)' : '应部署的代码 (后端代理)'}
            </div>
            
            <div className="flex-1 overflow-auto custom-scrollbar">
              <CodeBlock 
                code={showCode === 'client' ? clientCode : serverCode} 
                filename={showCode === 'client' ? 'App.tsx' : 'api/route.ts'} 
              />
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-500">
               {showCode === 'client' 
                 ? "注意：在前端初始化 GoogleGenAI 时传入 Key 是极其危险的，因为可以通过 F12 网络面板直接看到。"
                 : "通过服务端（Next.js API 或 Cloud Functions），Key 永远不会发送到用户的浏览器。"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Platform } from '../types';

interface FlowAnimationProps {
  platform?: string;
}

export const FlowAnimation: React.FC<FlowAnimationProps> = ({ platform = Platform.VERCEL }) => {
  
  // Dynamic configurations based on platform
  const getConfig = () => {
    switch (platform) {
      case Platform.NETLIFY:
        return {
          color: '#00C7B7', // Netlify Teal
          bg: 'fill-[#00C7B7]/20',
          stroke: 'stroke-[#00C7B7]',
          label: 'Netlify Functions',
          subLabel: 'SERVERLESS'
        };
      case Platform.EDGEONE:
        return {
          color: '#3b82f6', // EO Blue
          bg: 'fill-blue-500/20',
          stroke: 'stroke-blue-500',
          label: 'EdgeOne Functions',
          subLabel: 'EDGE NODE'
        };
      case Platform.GCP:
        return {
          color: '#fbbc04', // Google Yellow
          bg: 'fill-yellow-500/20',
          stroke: 'stroke-yellow-500',
          label: 'Cloud Run / Gateway',
          subLabel: 'CONTAINER'
        };
      case Platform.VERCEL:
      default:
        return {
          color: '#ffffff', // Vercel White
          bg: 'fill-white/10',
          stroke: 'stroke-white',
          label: 'Vercel Edge / API',
          subLabel: 'SERVERLESS'
        };
    }
  };

  const config = getConfig();

  return (
    <div className="w-full h-64 bg-slate-950 rounded-xl overflow-hidden relative flex items-center justify-center mb-8 border border-slate-800 shadow-2xl">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <svg className="w-full h-full max-w-3xl px-4" viewBox="0 0 800 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        
        {/* === CLIENT SIDE === */}
        <g transform="translate(100, 120)">
          <rect x="-40" y="-30" width="80" height="60" rx="8" className="fill-slate-800 stroke-slate-600 stroke-2" />
          <path d="M-20 0 H20 M-20 -10 H10" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
          <text x="0" y="50" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontWeight="bold">浏览器 (Client)</text>
          {/* Pulse effect for origin */}
          <circle cx="0" cy="0" r="45" className="stroke-slate-700 stroke-1 opacity-50">
            <animate attributeName="r" values="45;55;45" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* === MIDDLEWARE (Dynamic) === */}
        <g transform="translate(400, 120)">
          {/* Connection Line Left */}
          <path d="M-260 0 L-60 0" stroke="#475569" strokeWidth="2" strokeDasharray="6 4" />
          
          {/* Main Node Box */}
          <rect x="-60" y="-45" width="120" height="90" rx="12" className={`${config.bg} ${config.stroke} stroke-2 transition-all duration-500`} />
          
          {/* Internal Chip Visualization */}
          <rect x="-40" y="-20" width="80" height="40" rx="4" className="fill-slate-900/80" />
          <text x="0" y="5" textAnchor="middle" fill={config.color} fontSize="10" fontFamily="monospace" className="transition-colors duration-500">
            {config.subLabel}
          </text>
          
          {/* Label */}
          <text x="0" y="65" textAnchor="middle" fill={config.color} fontSize="14" fontWeight="bold" className="transition-colors duration-500">
            {config.label}
          </text>
          
          {/* The Key (Securely stored here) */}
          <g transform="translate(0, -60)">
             <path d="M-7 -7 H7 V7 H-7 Z" fill="#eab308" />
             <path d="M0 -14 V -7" stroke="#eab308" strokeWidth="2" />
             <text x="0" y="-18" textAnchor="middle" fill="#facc15" fontSize="10" fontWeight="bold">ENV KEY</text>
          </g>
        </g>

        {/* === GOOGLE GEMINI === */}
        <g transform="translate(700, 120)">
          {/* Connection Line Right */}
          <path d="M-240 0 L-40 0" stroke="#475569" strokeWidth="2" />

          <circle cx="0" cy="0" r="35" className="fill-purple-900/40 stroke-purple-500 stroke-2" />
          {/* Gemini Sparkle Icon */}
          <path d="M0 -20 L5 -5 L20 0 L5 5 L0 20 L-5 5 L-20 0 L-5 -5 Z" fill="#e879f9" opacity="0.8">
             <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="10s" repeatCount="indefinite" />
          </path>
          <text x="0" y="55" textAnchor="middle" fill="#e879f9" fontSize="12" fontWeight="bold">Gemini AI</text>
        </g>

        {/* === PACKET ANIMATIONS === */}
        
        {/* Request: Client -> Middleware (Blue Packet) */}
        <circle r="6" fill="#38bdf8">
          <animateMotion 
            dur="2s" 
            repeatCount="indefinite" 
            path="M140 120 L340 120" 
            keyPoints="0;1" 
            keyTimes="0;1" 
            calcMode="linear" 
          />
        </circle>
        
        {/* Request: Middleware -> Google (Yellow Packet - Authorized) */}
        <g>
          <circle r="6" fill="#facc15">
            <animateMotion 
              dur="2s"
              begin="1s" 
              repeatCount="indefinite" 
              path="M460 120 L665 120" 
              keyPoints="0;1" 
              keyTimes="0;1" 
              calcMode="linear" 
            />
          </circle>
        </g>

        {/* Response: Google -> Client (Purple Packet) */}
        <circle r="5" fill="#a855f7">
           <animateMotion 
              dur="2s"
              begin="0.5s" 
              repeatCount="indefinite" 
              path="M665 130 L460 130 M340 130 L140 130" 
              keyPoints="0;0.45;0.55;1" 
              keyTimes="0;0.45;0.55;1" 
              calcMode="linear" 
            />
        </circle>

      </svg>
    </div>
  );
};
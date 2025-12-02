import React from 'react';
import { Platform } from '../types';
import { IconVercel, IconNetlify, Globe, Cloud } from './Icons';

interface PlatformSelectorProps {
  current: Platform;
  onSelect: (p: Platform) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({ current, onSelect }) => {
  const platforms = [
    { id: Platform.VERCEL, icon: IconVercel, color: 'text-white', description: 'Serverless 首选' },
    { id: Platform.NETLIFY, icon: IconNetlify, color: 'text-[#00C7B7]', description: 'Jamstack 鼻祖' },
    { id: Platform.EDGEONE, icon: Globe, color: 'text-blue-400', description: '国内访问优化' },
    { id: Platform.GCP, icon: Cloud, color: 'text-yellow-500', description: '企业级部署' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
      {platforms.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(p.id)}
          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 border text-left group
            ${current === p.id 
              ? 'bg-slate-800 border-brand-500 shadow-brand-500/20 shadow-lg ring-1 ring-brand-500' 
              : 'bg-white border-slate-200 hover:border-brand-200 hover:bg-slate-50 text-slate-600'
            }`}
        >
          <div className={`p-2 rounded-lg transition-colors ${current === p.id ? 'bg-slate-900 text-brand-400' : 'bg-slate-100 text-slate-400 group-hover:text-brand-500'}`}>
            <p.icon />
          </div>
          <div className="min-w-0">
            <span className={`block font-bold truncate ${current === p.id ? 'text-white' : 'text-slate-900'}`}>
              {p.id}
            </span>
            <span className={`text-[10px] uppercase tracking-wider ${current === p.id ? 'text-slate-400' : 'text-slate-400'}`}>
              {p.description}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};
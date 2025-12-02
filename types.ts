import React from 'react';

export enum Platform {
  VERCEL = 'Vercel',
  NETLIFY = 'Netlify',
  EDGEONE = 'EdgeOne',
  GCP = 'Google Cloud',
}

export enum AppType {
  STATIC = 'Static App',
  GEMINI = 'Gemini AI App',
}

export interface Step {
  title: string;
  description: string;
  code?: string;
  image?: string;
  visual?: React.ReactNode;
  warning?: string;
}

export interface GuideData {
  platform: Platform;
  appType: AppType;
  prerequisites: string[];
  steps: Step[];
}
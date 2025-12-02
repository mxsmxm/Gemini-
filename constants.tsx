import React from 'react';
import { GuideData, Platform, AppType } from './types';
import { VisualGitHub, VisualNextJsRefactor, VisualGCPDeploy } from './components/Visuals';

export const DEPLOYMENT_GUIDES: GuideData[] = [
  // =========================================================================
  // VERCEL
  // =========================================================================
  {
    platform: Platform.VERCEL,
    appType: AppType.STATIC,
    prerequisites: ['Node.js', 'GitHub 账号', 'Vercel 账号'],
    steps: [
      {
        title: '1. 同步代码到 GitHub',
        description: '将 Gemini 生成的代码推送到 GitHub 仓库。Gemini 默认生成的是 React 项目结构。请确保你的仓库文件结构如下所示。',
        visual: <VisualGitHub />,
      },
      {
        title: '2. 关键步骤：修改 index.html',
        description: '在 GitHub 中打开 index.html 文件。为了确保 Vercel 能正确识别入口，你需要手动添加脚本引用（这是 PDF 中强调的关键点）。',
        code: `<body>
  <div id="root"></div>
  <!-- 新增下面这一行 -->
  <script type="module" src="/index.tsx"></script>
</body>`,
        warning: '如果不添加这行代码，部署后的页面可能会显示空白。'
      },
      {
        title: '3. 导入项目',
        description: '登录 Vercel 后台，点击 "Add New..." -> "Project"，选择你的 GitHub 仓库。框架预设通常会自动识别为 Vite。',
      },
      {
        title: '4. 环境变量（可选）',
        description: '因为是纯前端项目不涉及 AI 调用，如果系统提示输入 GEMINI_API_KEY，你可以随意填入一个占位符。',
      }
    ]
  },
  {
    platform: Platform.VERCEL,
    appType: AppType.GEMINI,
    prerequisites: ['Gemini API Key', 'GitHub', 'AI 辅助工具'],
    steps: [
      {
        title: '方案 A：改造成 Next.js 前后端项目 (PDF 推荐)',
        description: '这是最正规的方式。将纯前端项目改造成 Next.js，利用其 API Routes 功能在后端隐藏 Key。你可以直接使用 AI 工具进行重构。',
        visual: <VisualNextJsRefactor />,
        code: `// 复制这段提示词发送给 AI 编程工具：

把这个项目改造成一个NextJs的前后端应用，
注意GEMINI_API_KEY要安全的存放在后端，
在后端调用AI功能，确保我的API Key不会泄露`,
      },
      {
        title: '配置 .env.local',
        description: '改造完成后，在项目根目录创建 .env.local 文件，填入真实的 Key。',
        code: `GEMINI_API_KEY=AIzaSyB...`
      },
      {
        title: '方案 B：Vercel Rewrites 反向代理 (视频教程常用)',
        description: '如果你不想重构代码，可以使用 vercel.json 将请求转发到 Google。',
        warning: '安全警告：此方法虽然解决了跨域问题，但如果前端直接传 Key，Key 依然可能暴露。建议配合后端 API 使用。',
        code: `// vercel.json
{
  "rewrites": [
    {
      "source": "/google-api/:match*",
      "destination": "https://generativelanguage.googleapis.com/:match*"
    }
  ]
}`
      }
    ]
  },

  // =========================================================================
  // NETLIFY
  // =========================================================================
  {
    platform: Platform.NETLIFY,
    appType: AppType.STATIC,
    prerequisites: ['Netlify 账号', 'GitHub'],
    steps: [
      {
        title: '1. 导入项目',
        description: '登录 Netlify，选择 "Import from Git"。',
        visual: <VisualGitHub />
      },
      {
        title: '2. 构建设置 (Build Settings)',
        description: 'Build command 填入 "npm run build"，Publish directory 填入 "dist"。',
      },
      {
        title: '3. 解决路由刷新 404',
        description: '对于 React 单页应用，需要在 public 目录下创建一个 _redirects 文件。',
        code: `/*  /index.html  200`
      }
    ]
  },
  {
    platform: Platform.NETLIFY,
    appType: AppType.GEMINI,
    prerequisites: ['Netlify Functions'],
    steps: [
      {
        title: '方案 A：Netlify Functions (安全)',
        description: '在 netlify/functions 目录下创建 TypeScript 函数作为后端代理。',
        code: `import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export default async (req: Request) => {
  // 在服务端调用 Gemini，前端无法看到 Key
  const body = await req.json();
  // ...调用逻辑
};`
      },
      {
        title: '方案 B：netlify.toml 代理',
        description: '配置重定向规则，将请求转发到 Google API。',
        code: `// netlify.toml
[[redirects]]
  from = "/api/gemini/*"
  to = "https://generativelanguage.googleapis.com/:splat"
  status = 200
  force = true`
      }
    ]
  },

  // =========================================================================
  // EDGEONE (腾讯云)
  // =========================================================================
  {
    platform: Platform.EDGEONE,
    appType: AppType.STATIC,
    prerequisites: ['腾讯云账号', 'EdgeOne Pages'],
    steps: [
      {
        title: '1. 为什么选择 EdgeOne',
        description: '对于国内用户，Vercel 可能会有访问速度问题。EdgeOne 提供了更好的国内访问速度。',
      },
      {
        title: '2. 创建 Pages 项目',
        description: '在 EdgeOne 控制台选择 Pages 服务，关联 GitHub 仓库即可，操作体验与 Vercel 类似。',
      }
    ]
  },
  {
    platform: Platform.EDGEONE,
    appType: AppType.GEMINI,
    prerequisites: ['Edge Functions (边缘函数)'],
    steps: [
      {
        title: '1. 创建边缘函数',
        description: '利用边缘函数在节点上请求 Google API（EdgeOne 节点通常可以访问外网），从而实现“国内直连”。',
        code: `// functions/proxy.js
async function handleRequest(request) {
  // 从环境变量获取 Key，绝对不要写死在代码里
  const apiKey = '${process.env.PRIVATE_KEY}'; 
  
  // 转发请求到 Google
  // ...
}
`
      }
    ]
  },

  // =========================================================================
  // GOOGLE CLOUD
  // =========================================================================
  {
    platform: Platform.GCP,
    appType: AppType.STATIC,
    prerequisites: ['GCP 账号', 'Cloud Storage'],
    steps: [
      {
        title: '1. Cloud Storage 静态托管',
        description: '将 npm run build 生成的 dist 目录上传到 Storage Bucket。',
      },
      {
        title: '2. 配置网站',
        description: '在 Bucket 设置中，将“主页面”和“错误页面”都设置为 index.html。',
      }
    ]
  },
  {
    platform: Platform.GCP,
    appType: AppType.GEMINI,
    prerequisites: ['Cloud Run'],
    steps: [
      {
        title: '1. 部署到 Google Cloud (最简便)',
        description: '正如 PDF 所述，这是最简单的方式。Google 会通过其网关自动保护 API Key。点击 Project IDX 或 AI Studio 右上角的部署按钮即可。',
        visual: <VisualGCPDeploy />,
        code: `// 如果使用 Project IDX 或 AI Studio
直接点击右上角的 "Deploy to Google Cloud" 按钮。
系统会自动创建一个 Cloud Run 服务。`
      },
      {
        title: '2. Docker 部署 (进阶)',
        description: '如果是本地开发，创建一个 Dockerfile 并部署到 Cloud Run。',
        code: `gcloud run deploy gemini-app --source .`
      }
    ]
  }
];
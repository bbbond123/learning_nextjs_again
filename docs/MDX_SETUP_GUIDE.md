# MDX 集成设置指南 / MDX Integration Setup Guide

## 项目概述 / Project Overview

本项目是一个基于 Next.js 15 的全栈应用，集成了 MDX（Markdown + JSX）支持、国际化（i18n）和 Strapi CMS。

This is a full-stack application built with Next.js 15, integrated with MDX (Markdown + JSX) support, internationalization (i18n), and Strapi CMS.

## 技术栈 / Tech Stack

- **Next.js**: 15.5.5 (App Router)
- **React**: 19.x
- **TypeScript**: 5.x
- **Tailwind CSS**: 4.x
- **包管理器 / Package Manager**: pnpm (推荐 / recommended)
- **国际化 / i18n**: next-intl
- **内容管理 / CMS**: Strapi (可选 / optional)

## 系统要求 / System Requirements

### 必需环境 / Required Environment

```bash
Node.js >= 18.x
pnpm >= 8.x (推荐使用 pnpm 而不是 npm)
```

### 安装 pnpm / Install pnpm

```bash
npm install -g pnpm
```

## MDX 安装步骤 / MDX Installation Steps

### 1. 安装 MDX 依赖包 / Install MDX Dependencies

```bash
pnpm add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

**包说明 / Package Description:**
- `@next/mdx`: Next.js 的 MDX 插件
- `@mdx-js/loader`: MDX 文件加载器
- `@mdx-js/react`: React 中使用 MDX 的运行时
- `@types/mdx`: TypeScript 类型定义

### 2. 配置 Next.js / Configure Next.js

**文件 / File**: `next.config.ts`

```typescript
import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withNextIntl(withMDX(nextConfig));
```

**关键配置 / Key Configuration:**
- 添加 `.mdx` 和 `.md` 到 `pageExtensions`
- 使用 `createMDX` 创建 MDX 配置
- 插件顺序：先 `withNextIntl`，再 `withMDX`

### 3. 配置 TypeScript / Configure TypeScript

**文件 / File**: `tsconfig.json`

```json
{
  "compilerOptions": {
    // ... 其他配置
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    "**/*.mdx",  // 添加 MDX 支持
    ".next/types/**/*.ts"
  ]
}
```

### 4. 创建 MDX 组件配置 / Create MDX Components Configuration

**文件 / File**: `mdx-components.tsx` (必须在项目根目录 / must be in root directory)

```typescript
import type { MDXComponents } from 'mdx/types';
import { mdxComponents } from './components/mdx/MDXComponents';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
```

**文件 / File**: `components/mdx/MDXComponents.tsx` (实际实现 / actual implementation)

```typescript
import type { MDXComponents } from 'mdx/types';
import InteractiveCounter from './InteractiveCounter';
import Callout from './Callout';
import Chart from './Chart';
import LiveCodeEditor from './LiveCodeEditor';
import CodeTabs from './CodeTabs';

export const mdxComponents: MDXComponents = {
  // 自定义标题样式
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
      {children}
    </h2>
  ),
  // ... 其他标准元素

  // 自定义组件
  InteractiveCounter,
  Callout,
  Chart,
  LiveCodeEditor,
  CodeTabs,
};
```

### 5. 更新构建脚本 / Update Build Scripts

**文件 / File**: `package.json`

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",  // 移除 --turbopack (Turbopack 与某些功能不兼容)
    "start": "next start"
  }
}
```

**注意 / Note**: 生产构建不使用 `--turbopack`，因为它可能与某些字体或功能不兼容。

## 国际化配置 / Internationalization Configuration

### 1. 翻译文件 / Translation Files

**文件 / File**: `messages/zh.json`

```json
{
  "Navigation": {
    "home": "首页",
    "mdxBasic": "MDX 基础",
    "mdxAdvanced": "MDX 高级",
    "strapiExample": "Strapi 示例",
    "brandName": "Next.js + MDX"
  },
  "PageWrapper": {
    "back": "返回",
    "backToHome": "回到首页"
  }
}
```

**文件 / File**: `messages/en.json`

```json
{
  "Navigation": {
    "home": "Home",
    "mdxBasic": "MDX Basic",
    "mdxAdvanced": "MDX Advanced",
    "strapiExample": "Strapi Example",
    "brandName": "Next.js + MDX"
  },
  "PageWrapper": {
    "back": "Back",
    "backToHome": "Back to Home"
  }
}
```

### 2. 在组件中使用翻译 / Use Translations in Components

```typescript
'use client';

import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('Navigation');

  return <h1>{t('home')}</h1>;
}
```

## 项目结构 / Project Structure

```
learning_nextjs_again/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 根布局（包含 Navigation）
│   ├── page.tsx                  # 首页
│   ├── blog/
│   │   ├── layout.tsx            # 博客布局
│   │   ├── hello-mdx/
│   │   │   └── page.mdx          # MDX 基础示例
│   │   └── advanced-mdx/
│   │       └── page.mdx          # MDX 高级示例
│   ├── article/
│   │   └── [slug]/
│   │       └── page.tsx          # 动态路由示例
│   └── strapi-example/
│       └── page.tsx              # Strapi 集成示例
├── components/
│   ├── Navigation.tsx            # 全局导航栏（国际化）
│   ├── PageWrapper.tsx           # 页面包装器（国际化）
│   ├── LanguageSwitcher.tsx      # 语言切换器
│   └── mdx/
│       ├── MDXComponents.tsx     # MDX 组件定义
│       ├── InteractiveCounter.tsx
│       ├── Callout.tsx
│       ├── Chart.tsx
│       ├── LiveCodeEditor.tsx
│       └── CodeTabs.tsx
├── lib/
│   └── strapi.ts                 # Strapi API 辅助函数
├── messages/
│   ├── en.json                   # 英文翻译
│   └── zh.json                   # 中文翻译
├── types/
│   └── strapi.ts                 # TypeScript 类型定义
├── mdx-components.tsx            # MDX 配置（必须在根目录）
├── next.config.ts                # Next.js 配置
├── tsconfig.json                 # TypeScript 配置
├── tailwind.config.ts            # Tailwind CSS 配置
├── package.json                  # 依赖配置
└── .env.local                    # 环境变量（需创建）
```

## 创建 MDX 页面 / Creating MDX Pages

### 基础 MDX 页面 / Basic MDX Page

**文件 / File**: `app/blog/my-post/page.mdx`

```mdx
export const metadata = {
  title: 'My First MDX Post',
  description: 'This is my first MDX post'
}

# Hello MDX!

This is a paragraph with **bold** and *italic* text.

## Using React Components

<InteractiveCounter />

<Callout type="info">
This is an informational callout!
</Callout>

## Code Example

```javascript
function hello() {
  console.log('Hello from MDX!');
}
```
```

### 高级 MDX 功能 / Advanced MDX Features

1. **交互式组件 / Interactive Components**
   - 计数器、图表、实时代码编辑器

2. **自定义提示框 / Custom Callouts**
   - 信息、警告、成功、错误类型

3. **代码标签页 / Code Tabs**
   - 多语言代码示例切换

4. **数据可视化 / Data Visualization**
   - 图表组件

## 常见问题解决 / Common Issues & Solutions

### 1. npm 安装失败 / npm Installation Fails

**问题 / Issue**: `Cannot read properties of null (reading 'matches')`

**解决方案 / Solution**:
```bash
# 使用 pnpm 代替 npm
pnpm add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

### 2. Turbopack 构建错误 / Turbopack Build Error

**问题 / Issue**: `Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'`

**解决方案 / Solution**:
```json
// package.json
{
  "scripts": {
    "build": "next build"  // 移除 --turbopack
  }
}
```

### 3. Next.js 15 参数类型错误 / Next.js 15 Params Type Error

**问题 / Issue**: `Type '{ slug: string; }' is missing properties from type 'Promise<any>'`

**解决方案 / Solution**:
```typescript
// Next.js 15 中，params 现在是 Promise
export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  // ...
}
```

### 4. window is not defined 错误 / window is not defined Error

**问题 / Issue**: `ReferenceError: window is not defined`

**解决方案 / Solution**:
```typescript
// 错误 ❌
const path = window.location.pathname;

// 正确 ✅
import { usePathname } from 'next/navigation';
const pathname = usePathname();
```

### 5. React 引用错误 / React Reference Error

**问题 / Issue**: `'React' refers to a UMD global, but the current file is a module`

**解决方案 / Solution**:
```typescript
// 始终显式导入 React
import React, { useState } from 'react';
```

## 环境变量配置 / Environment Variables

**文件 / File**: `.env.local` (需要创建 / need to create)

```bash
# Strapi CMS 配置 (可选 / optional)
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token_here

# 其他配置...
```

## 开发命令 / Development Commands

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 构建生产版本
pnpm run build

# 启动生产服务器
pnpm run start

# 类型检查
pnpm run lint
```

## 部署注意事项 / Deployment Notes

1. **构建优化 / Build Optimization**
   - 生产构建不使用 Turbopack
   - 确保所有 TypeScript 类型正确

2. **环境变量 / Environment Variables**
   - 在部署平台配置所有必需的环境变量
   - `NEXT_PUBLIC_*` 前缀的变量会暴露给客户端

3. **静态生成 / Static Generation**
   - MDX 页面会在构建时静态生成
   - 动态路由需要 `generateStaticParams` 或使用服务器渲染

## 最佳实践 / Best Practices

### 1. MDX 文件组织 / MDX File Organization

- 将 MDX 文件放在 `app/` 目录下对应的路由位置
- 使用 `page.mdx` 作为文件名以匹配 Next.js App Router

### 2. 组件复用 / Component Reusability

- 将可复用的 MDX 组件放在 `components/mdx/` 目录
- 在 `MDXComponents.tsx` 中统一导出

### 3. 国际化 / Internationalization

- 所有用户可见文本使用 `useTranslations`
- 在 `messages/` 目录维护翻译文件
- 组件必须标记为 `'use client'` 才能使用 `useTranslations`

### 4. 性能优化 / Performance Optimization

- 使用 `'use client'` 标记仅在需要交互的组件上
- 尽可能使用服务器组件
- 图片使用 Next.js `<Image>` 组件

### 5. 类型安全 / Type Safety

- 为所有组件定义 TypeScript 接口
- 使用 `MDXComponents` 类型确保组件签名正确

## 参考资源 / References

- [Next.js MDX 文档](https://nextjs.org/docs/app/building-your-application/configuring/mdx)
- [next-intl 文档](https://next-intl-docs.vercel.app/)
- [MDX 官方文档](https://mdxjs.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

## 版本历史 / Version History

- **v1.0** (2025-10-19): 初始 MDX 集成设置
  - 添加基础 MDX 支持
  - 创建交互式组件库
  - 实现导航系统
  - 集成国际化支持

## 许可证 / License

本项目遵循 MIT 许可证。

---

**维护者 / Maintainer**: Your Team
**最后更新 / Last Updated**: 2025-10-19

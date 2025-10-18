# 快速开始指南

## 一、环境准备

### 必需软件
```bash
Node.js >= 18.x
pnpm >= 8.x
```

### 安装 pnpm
```bash
npm install -g pnpm
```

## 二、MDX 安装（一键复制）

```bash
# 1. 安装依赖
pnpm add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx

# 2. 启动开发服务器
pnpm run dev

# 3. 构建生产版本
pnpm run build
```

## 三、关键配置文件

### 1. next.config.ts
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

### 2. tsconfig.json
```json
{
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "**/*.mdx"  // 添加此行
  ]
}
```

### 3. mdx-components.tsx（根目录）
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

## 四、创建第一个 MDX 页面

### 文件位置
```
app/blog/my-first-post/page.mdx
```

### 内容示例
```mdx
export const metadata = {
  title: '我的第一篇文章',
  description: '这是我的第一篇 MDX 文章'
}

# 欢迎使用 MDX

这是一段普通的 Markdown 文本，支持**粗体**和*斜体*。

## 使用 React 组件

<InteractiveCounter />

<Callout type="info">
这是一个信息提示框！
</Callout>

## 代码示例

```javascript
function hello() {
  console.log('Hello MDX!');
}
```
```

## 五、常见问题速查

### 问题 1：npm 安装失败
```bash
# 解决方案：使用 pnpm
pnpm add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

### 问题 2：构建时 Turbopack 报错
```json
// package.json - 移除 build 脚本中的 --turbopack
{
  "scripts": {
    "build": "next build"
  }
}
```

### 问题 3：Next.js 15 params 类型错误
```typescript
// 正确写法（params 是 Promise）
export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
}
```

### 问题 4：window is not defined
```typescript
// ❌ 错误
const path = window.location.pathname;

// ✅ 正确
import { usePathname } from 'next/navigation';
const pathname = usePathname();
```

### 问题 5：React 未导入
```typescript
// 始终显式导入
import React, { useState } from 'react';
```

## 六、项目结构

```
learning_nextjs_again/
├── app/                      # 页面路由
│   ├── blog/
│   │   └── [slug]/
│   │       └── page.mdx      # MDX 页面
│   └── layout.tsx
├── components/
│   ├── Navigation.tsx        # 导航栏
│   ├── PageWrapper.tsx       # 页面包装器
│   └── mdx/                  # MDX 组件
│       ├── MDXComponents.tsx
│       ├── InteractiveCounter.tsx
│       ├── Callout.tsx
│       └── ...
├── messages/                 # 国际化翻译
│   ├── en.json
│   └── zh.json
├── mdx-components.tsx        # MDX 配置（根目录）
├── next.config.ts
└── package.json
```

## 七、开发命令

```bash
# 安装依赖
pnpm install

# 开发模式（热重载）
pnpm run dev

# 生产构建
pnpm run build

# 启动生产服务器
pnpm run start

# 类型检查
pnpm run lint
```

## 八、国际化使用

### 1. 添加翻译（messages/zh.json）
```json
{
  "MyComponent": {
    "title": "标题",
    "description": "描述"
  }
}
```

### 2. 在组件中使用
```typescript
'use client';

import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('MyComponent');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

## 九、可用的 MDX 组件

| 组件名 | 用途 | 示例 |
|--------|------|------|
| `InteractiveCounter` | 交互式计数器 | `<InteractiveCounter />` |
| `Callout` | 提示框 | `<Callout type="info">内容</Callout>` |
| `Chart` | 数据图表 | `<Chart data={[...]} />` |
| `LiveCodeEditor` | 实时代码编辑器 | `<LiveCodeEditor />` |
| `CodeTabs` | 代码标签页 | `<CodeTabs>...</CodeTabs>` |

### Callout 类型
- `info` - 信息（蓝色）
- `warning` - 警告（黄色）
- `success` - 成功（绿色）
- `error` - 错误（红色）

## 十、环境变量配置

创建 `.env.local` 文件：

```bash
# Strapi CMS（可选）
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_token_here
```

## 十一、部署检查清单

- [ ] 所有依赖已安装（`pnpm install`）
- [ ] 构建成功（`pnpm run build`）
- [ ] 环境变量已配置
- [ ] TypeScript 无错误
- [ ] 测试所有页面路由
- [ ] 测试语言切换功能
- [ ] 检查响应式布局

## 十二、获取帮助

- 查看详细文档：`docs/MDX_SETUP_GUIDE.md`
- Next.js 文档：https://nextjs.org/docs
- MDX 文档：https://mdxjs.com/
- next-intl 文档：https://next-intl-docs.vercel.app/

---

**提示**：本指南适用于快速查阅，详细说明请参考 `MDX_SETUP_GUIDE.md`

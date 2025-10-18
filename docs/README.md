# 项目文档 / Project Documentation

欢迎查看本项目的技术文档！本目录包含所有与项目设置、配置和使用相关的文档。

Welcome to the project documentation! This directory contains all documentation related to project setup, configuration, and usage.

## 📚 文档索引 / Documentation Index

### 1. [MDX 集成设置指南](./MDX_SETUP_GUIDE.md)
**完整的 MDX 设置和配置文档 / Complete MDX setup and configuration guide**

内容包括：
- ✅ 详细的安装步骤
- ✅ 完整的配置说明
- ✅ 项目结构详解
- ✅ 常见问题解决方案
- ✅ 最佳实践建议
- ✅ 双语说明（中英文）

适合：首次设置项目、理解架构、排查问题

---

### 2. [快速开始指南（中文）](./QUICK_START_CN.md)
**快速参考手册 / Quick reference guide**

内容包括：
- ⚡ 一键复制命令
- ⚡ 关键配置代码
- ⚡ 常见问题速查
- ⚡ 命令速查表
- ⚡ 检查清单

适合：日常开发、快速查阅、问题速查

---

## 🚀 快速开始 / Quick Start

### 如果你是第一次设置项目：
1. 阅读 [MDX_SETUP_GUIDE.md](./MDX_SETUP_GUIDE.md) 了解完整配置
2. 参考 [QUICK_START_CN.md](./QUICK_START_CN.md) 执行安装命令

### 如果你已经熟悉项目：
直接查看 [QUICK_START_CN.md](./QUICK_START_CN.md) 进行日常开发

---

## 📖 按需阅读 / Read by Topic

### 安装和配置 / Installation & Configuration
- MDX 依赖安装 → [MDX_SETUP_GUIDE.md#mdx-安装步骤](./MDX_SETUP_GUIDE.md#mdx-安装步骤--mdx-installation-steps)
- Next.js 配置 → [MDX_SETUP_GUIDE.md#配置-nextjs](./MDX_SETUP_GUIDE.md#2-配置-nextjs--configure-nextjs)
- TypeScript 配置 → [MDX_SETUP_GUIDE.md#配置-typescript](./MDX_SETUP_GUIDE.md#3-配置-typescript--configure-typescript)

### 国际化 / Internationalization
- i18n 配置 → [MDX_SETUP_GUIDE.md#国际化配置](./MDX_SETUP_GUIDE.md#国际化配置--internationalization-configuration)
- 翻译文件 → [QUICK_START_CN.md#国际化使用](./QUICK_START_CN.md#八国际化使用)

### MDX 使用 / Using MDX
- 创建 MDX 页面 → [MDX_SETUP_GUIDE.md#创建-mdx-页面](./MDX_SETUP_GUIDE.md#创建-mdx-页面--creating-mdx-pages)
- 可用组件列表 → [QUICK_START_CN.md#可用的-mdx-组件](./QUICK_START_CN.md#九可用的-mdx-组件)

### 问题排查 / Troubleshooting
- 常见错误解决 → [MDX_SETUP_GUIDE.md#常见问题解决](./MDX_SETUP_GUIDE.md#常见问题解决--common-issues--solutions)
- 快速问题速查 → [QUICK_START_CN.md#常见问题速查](./QUICK_START_CN.md#五常见问题速查)

---

## 🛠️ 技术栈概览 / Tech Stack Overview

```
Next.js 15.5.5 (App Router)
├── React 19.x
├── TypeScript 5.x
├── Tailwind CSS 4.x
├── MDX (@next/mdx)
├── next-intl (国际化)
└── pnpm (包管理)
```

---

## 📁 项目结构 / Project Structure

```
learning_nextjs_again/
├── app/                    # Next.js 应用路由
├── components/             # React 组件
│   └── mdx/               # MDX 自定义组件
├── docs/                  # 📚 项目文档（当前目录）
├── lib/                   # 工具函数
├── messages/              # i18n 翻译文件
├── types/                 # TypeScript 类型定义
├── mdx-components.tsx     # MDX 配置
└── next.config.ts         # Next.js 配置
```

---

## 🎯 开发工作流 / Development Workflow

```bash
# 1. 克隆仓库
git clone <repository-url>

# 2. 安装依赖
pnpm install

# 3. 配置环境变量
cp .env.example .env.local  # 编辑必要的配置

# 4. 启动开发服务器
pnpm run dev

# 5. 访问应用
open http://localhost:3000
```

---

## 📝 文档维护 / Documentation Maintenance

### 何时更新文档：
- ✏️ 添加新功能或组件时
- ✏️ 修改配置或依赖时
- ✏️ 发现并解决新问题时
- ✏️ 优化开发流程时

### 文档命名规范：
- 完整指南使用英文大写 + 下划线：`MDX_SETUP_GUIDE.md`
- 快速参考添加语言后缀：`QUICK_START_CN.md`
- 特定主题使用描述性名称：`STRAPI_INTEGRATION.md`

---

## 🔗 相关资源 / Related Resources

### 官方文档
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### 内部文档
- [Strapi API 文档](../README_STRAPI_API.md)
- [国际化标准](../README_STRAPI_LOCALE_STANDARD.md)

---

## 🆘 获取帮助 / Getting Help

### 问题排查顺序：
1. 查看 [常见问题速查](./QUICK_START_CN.md#五常见问题速查)
2. 阅读 [完整问题解决方案](./MDX_SETUP_GUIDE.md#常见问题解决--common-issues--solutions)
3. 检查 Next.js/MDX 官方文档
4. 提交 Issue 或联系团队

---

## 📊 文档版本 / Documentation Version

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| 1.0 | 2025-10-19 | 初始文档创建：MDX 设置、快速开始指南 |

---

**维护者 / Maintainer**: Development Team
**最后更新 / Last Updated**: 2025-10-19

---

## 💡 提示 / Tips

> **推荐阅读顺序**：
> 新手：README.md (当前) → MDX_SETUP_GUIDE.md → QUICK_START_CN.md
> 熟手：QUICK_START_CN.md → 按需查阅 MDX_SETUP_GUIDE.md

> **书签推荐**：
> 将 `QUICK_START_CN.md` 加入浏览器书签，便于日常快速查阅！

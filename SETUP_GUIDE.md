# 项目设置指南

## ✅ 已完成配置

本项目已完整配置以下功能：

### 1. 非路由入侵式国际化 (i18n)
- ✅ 支持中文和英文
- ✅ 基于 Cookie 的语言存储
- ✅ URL 中无语言前缀（例如：`/` 而不是 `/en` 或 `/zh`）
- ✅ 右上角语言切换器
- ✅ 跨会话保持用户语言偏好

### 2. Strapi CMS 集成
- ✅ 完整的 API 客户端
- ✅ TypeScript 类型定义
- ✅ 多语言内容支持
- ✅ 可配置的缓存策略
- ✅ 示例页面 (`/strapi-example`)

### 3. 技术栈
- ✅ Next.js 15.5.5 (App Router)
- ✅ React 19.1.0
- ✅ TypeScript
- ✅ Tailwind CSS v4
- ✅ Turbopack
- ✅ Biome (Linter & Formatter)
- ✅ next-intl (国际化)

## 🚀 快速开始

### 1. 安装依赖（已完成）

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm dev
```

访问: http://localhost:3000

### 3. 测试多语言功能

1. 打开 http://localhost:3000
2. 点击右上角的语言切换器
3. 选择"中文"或"English"
4. 页面内容会立即切换，URL 保持不变
5. 刷新页面，语言偏好会保持

### 4. （可选）配置 Strapi CMS

如果要使用 Strapi CMS 功能：

1. 创建 `.env.local` 文件：
```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token_here
```

2. 启动 Strapi 实例（如果还没有）：
```bash
# 在另一个目录
npx create-strapi-app@latest my-strapi --quickstart
```

3. 在 Strapi 中：
   - 启用 i18n 插件
   - 添加英文和中文支持
   - 创建内容类型（如 Article）
   - 配置权限和 API Token

4. 访问示例页面：http://localhost:3000/strapi-example

## 📁 项目结构

```
learning_nextjs_again/
├── app/
│   ├── layout.tsx          # 根布局（包含 i18n provider）
│   ├── page.tsx            # 首页
│   ├── strapi-example/     # Strapi 集成示例
│   │   └── page.tsx
│   └── globals.css
├── components/
│   └── LanguageSwitcher.tsx # 语言切换组件
├── i18n/
│   ├── config.ts           # 语言配置
│   ├── request.ts          # Request 配置
│   └── routing.ts          # 路由配置（非入侵模式）
├── lib/
│   ├── locale.ts           # Cookie-based 语言管理
│   └── strapi.ts           # Strapi API 客户端
├── messages/
│   ├── en.json             # 英文翻译
│   └── zh.json             # 中文翻译
├── types/
│   └── strapi.ts           # Strapi TypeScript 定义
├── docs/
│   ├── i18n.md             # i18n 详细文档
│   └── strapi-integration.md # Strapi 集成指南
├── middleware.ts           # i18n middleware
├── .env.local.example      # 环境变量示例
└── package.json
```

## 🎯 核心功能说明

### 非路由入侵式多语言

**优势：**
- URL 简洁，无语言前缀
- 对 SEO 友好
- 用户体验更好
- 适合与 CMS 集成

**工作原理：**
- 语言偏好存储在 Cookie (`NEXT_LOCALE`)
- Middleware 读取 Cookie 确定语言
- Server Action 更新语言设置

### Strapi CMS 集成

**特点：**
- 自动根据用户语言获取内容
- 类型安全的 API 客户端
- 支持复杂查询和关联
- 灵活的缓存配置

**使用示例：**
```typescript
import { getStrapiEntries } from '@/lib/strapi';
import { getLocale } from 'next-intl/server';

const locale = await getLocale();
const articles = await getStrapiEntries('articles', {
  locale, // 自动获取对应语言的内容
  populate: ['cover', 'author'],
});
```

## 📚 文档

- [i18n 详细配置](./docs/i18n.md)
- [Strapi 集成指南](./docs/strapi-integration.md)
- [README](./README.md)

## 🛠️ 开发命令

```bash
# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

## ✨ 添加新翻译

1. 在 `messages/en.json` 中添加：
```json
{
  "MyPage": {
    "title": "My Page Title"
  }
}
```

2. 在 `messages/zh.json` 中添加对应翻译：
```json
{
  "MyPage": {
    "title": "我的页面标题"
  }
}
```

3. 在组件中使用：
```tsx
import { useTranslations } from 'next-intl';

export default function MyPage() {
  const t = useTranslations('MyPage');
  return <h1>{t('title')}</h1>;
}
```

## 🔧 常见问题

### Q: 如何改变默认语言？

编辑 `i18n/config.ts`:
```typescript
export const defaultLocale: Locale = 'zh'; // 改为中文
```

### Q: 如何添加更多语言？

1. 在 `messages/` 中添加新语言文件（如 `ja.json`）
2. 更新 `i18n/config.ts` 的 `locales` 数组
3. 在 `LanguageSwitcher.tsx` 添加选项

### Q: Strapi 连接失败？

确保：
- Strapi 服务正在运行
- `.env.local` 配置正确
- API Token 有正确权限
- 内容类型已创建并发布

## 🎉 完成！

现在你可以：
1. ✅ 开发多语言应用
2. ✅ 从 Strapi 获取内容
3. ✅ 享受类型安全的开发体验
4. ✅ 使用现代化的构建工具

如有问题，请查看详细文档或提交 Issue。


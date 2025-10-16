# Strapi CMS 集成指南

本项目已配置与 Strapi CMS 的集成，支持从 Strapi 获取多语言内容。

## 📋 前提条件

1. **Strapi 服务器**: 需要有一个运行中的 Strapi 实例（本地或远程）
2. **国际化插件**: Strapi 需要启用 i18n 插件
3. **API Token**: 需要 Strapi API 访问令牌

## 🚀 快速开始

### 1. 配置 Strapi

#### 1.1 安装并启动 Strapi（如果还没有）

```bash
# 创建新的 Strapi 项目
npx create-strapi-app@latest my-strapi-project --quickstart

# 或使用现有项目
cd my-strapi-project
npm run develop
```

#### 1.2 启用国际化插件

1. 访问 Strapi 管理面板: http://localhost:1337/admin
2. 进入 **Settings** → **Internationalization**
3. 添加支持的语言:
   - English (en) - 默认
   - 中文 (zh)

#### 1.3 创建内容类型

创建一个示例内容类型（如 Article）：

1. 进入 **Content-Type Builder**
2. 点击 **Create new collection type**
3. 命名为 `article`
4. 添加字段：
   - `title` (Text) - 必填
   - `description` (Text)
   - `content` (Rich Text)
   - `slug` (UID) - 关联到 title
   - `cover` (Media - Single)
5. 在 **Advanced Settings** 中启用:
   - ✅ Enable localization for this Content-Type
   - ✅ Draft & Publish

#### 1.4 配置权限

1. 进入 **Settings** → **Users & Permissions plugin** → **Roles** → **Public**
2. 为 Article 启用以下权限：
   - ✅ find
   - ✅ findOne
3. 保存更改

#### 1.5 生成 API Token

1. 进入 **Settings** → **API Tokens**
2. 点击 **Create new API Token**
3. 配置：
   - **Name**: Next.js Frontend
   - **Token duration**: Unlimited (或根据需要设置)
   - **Token type**: Read-only (推荐) 或 Full access
4. 复制生成的 Token

### 2. 配置 Next.js 项目

#### 2.1 创建环境变量文件

在项目根目录创建 `.env.local` 文件：

```env
# Strapi CMS 配置
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token_here
```

> ⚠️ 注意：`.env.local` 已添加到 `.gitignore`，不会被提交到版本控制

#### 2.2 重启开发服务器

```bash
pnpm dev
```

## 📝 使用示例

### 基础用法

```typescript
import { getStrapiEntries } from '@/lib/strapi';
import { getLocale } from 'next-intl/server';

export default async function ArticlesPage() {
  const locale = await getLocale();
  
  // 获取当前语言的文章列表
  const articles = await getStrapiEntries<Article>('articles', {
    locale, // 'en' 或 'zh'
    populate: ['cover', 'author'],
    sort: ['publishedAt:desc'],
    pagination: {
      pageSize: 10,
    },
  });

  return (
    <div>
      {articles.map((article) => (
        <article key={article.id}>
          <h2>{article.attributes.title}</h2>
          <p>{article.attributes.description}</p>
        </article>
      ))}
    </div>
  );
}
```

### 获取单个条目

```typescript
import { getStrapiEntry } from '@/lib/strapi';

const article = await getStrapiEntry<Article>('articles', 1, {
  locale: 'zh',
  populate: ['cover', 'author', 'categories'],
});
```

### 按 Slug 获取

```typescript
import { getStrapiEntryBySlug } from '@/lib/strapi';

const article = await getStrapiEntryBySlug<Article>(
  'articles',
  'my-article-slug',
  {
    locale: 'en',
    populate: '*',
  }
);
```

### 自定义查询

```typescript
import { fetchStrapi } from '@/lib/strapi';

const response = await fetchStrapi<any>('/articles', {
  locale: 'zh',
  filters: {
    category: 'technology',
    publishedAt: { $gte: '2024-01-01' },
  },
  sort: ['publishedAt:desc'],
  pagination: {
    page: 1,
    pageSize: 20,
  },
  cache: 'no-store', // 禁用缓存
});
```

## 🎨 类型定义

在 `types/strapi.ts` 中定义你的内容类型：

```typescript
export interface Article {
  title: string;
  description: string;
  content: string;
  slug: string;
  cover?: {
    data?: {
      id: number;
      attributes: {
        url: string;
        alternativeText?: string;
        width: number;
        height: number;
      };
    };
  };
}
```

## 🔧 API 函数说明

### `fetchStrapi<T>(path, options)`

通用的 Strapi API 请求函数。

**参数**:
- `path`: API 端点路径（如 `/articles`）
- `options`:
  - `locale`: 语言代码（'en', 'zh'）
  - `populate`: 需要填充的关联字段
  - `filters`: 过滤条件
  - `sort`: 排序规则
  - `pagination`: 分页配置
  - `cache`: Next.js 缓存策略
  - `next`: Next.js revalidate 配置

### `getStrapiEntries<T>(contentType, options)`

获取多个条目。

### `getStrapiEntry<T>(contentType, id, options)`

根据 ID 获取单个条目。

### `getStrapiEntryBySlug<T>(contentType, slug, options)`

根据 slug 获取单个条目。

### `getStrapiMediaUrl(url)`

获取完整的媒体文件 URL。

```typescript
import { getStrapiMediaUrl } from '@/types/strapi';

const imageUrl = getStrapiMediaUrl(article.attributes.cover?.data?.attributes.url);
```

## 🌍 多语言工作流程

### Strapi 端

1. 创建默认语言（English）的内容
2. 在内容编辑页面点击 **Localize** 按钮
3. 选择目标语言（中文）
4. 翻译内容并保存

### Next.js 端

```typescript
import { getLocale } from 'next-intl/server';

// 自动获取当前用户选择的语言
const locale = await getLocale(); // 'en' 或 'zh'

// 获取对应语言的内容
const articles = await getStrapiEntries('articles', { locale });
```

## 🔄 缓存策略

### 静态生成（推荐用于博客等内容）

```typescript
const articles = await getStrapiEntries('articles', {
  locale,
  cache: 'force-cache',
  next: { revalidate: 3600 }, // 每小时重新验证
});
```

### 实时数据

```typescript
const articles = await getStrapiEntries('articles', {
  locale,
  cache: 'no-store', // 每次请求都获取最新数据
});
```

### ISR (增量静态再生成)

```typescript
const articles = await getStrapiEntries('articles', {
  locale,
  next: { revalidate: 60 }, // 每 60 秒重新验证
});
```

## 📊 示例页面

访问 `/strapi-example` 查看完整的集成示例，包括：
- 连接状态检查
- 文章列表展示
- 多语言内容切换
- 错误处理

## 🐛 故障排除

### 1. 无法连接到 Strapi

**问题**: `Strapi API error: 403 Forbidden`

**解决方案**:
- 检查 API Token 是否正确
- 确认 Strapi 权限配置允许访问

### 2. 找不到内容类型

**问题**: `Strapi API error: 404 Not Found`

**解决方案**:
- 确认内容类型名称正确（使用复数形式，如 `articles`）
- 检查 Strapi 中是否已创建该内容类型

### 3. 缺少本地化内容

**问题**: 某些语言返回空数据

**解决方案**:
- 确认 Strapi 内容类型启用了国际化
- 检查是否为所有语言创建了本地化版本
- 在 Strapi 中点击 "Localize" 创建翻译版本

### 4. 图片路径错误

**问题**: 图片无法显示

**解决方案**:
- 使用 `getStrapiMediaUrl()` 函数获取完整 URL
- 检查 `NEXT_PUBLIC_STRAPI_API_URL` 配置

## 🔗 相关资源

- [Strapi 文档](https://docs.strapi.io/)
- [Strapi i18n 插件](https://docs.strapi.io/dev-docs/plugins/i18n)
- [Next.js 数据获取](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Next-intl 文档](https://next-intl-docs.vercel.app/)

## 💡 最佳实践

1. **使用类型定义**: 为所有 Strapi 内容类型创建 TypeScript 接口
2. **合理使用缓存**: 根据内容更新频率选择合适的缓存策略
3. **错误处理**: 始终处理 API 请求可能的错误
4. **populate 优化**: 只请求需要的关联数据，避免过度查询
5. **API Token 安全**: 使用只读 Token，不要在客户端暴露 Token
6. **内容同步**: 确保所有支持的语言都有对应的本地化内容

## 🎯 生产环境配置

在生产环境中，更新环境变量：

```env
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-domain.com
STRAPI_API_TOKEN=your_production_token
```

在 Vercel 或其他托管平台的环境变量中配置这些值。


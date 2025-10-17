# Strapi Article 字段结构文档

根据 Strapi 后台配置截图，Article 内容类型的完整字段结构如下：

## 基础字段

| 字段名 | 类型 | 说明 | 必填 |
|--------|------|------|------|
| `title` | Text (Short text) | 文章标题 | ✅ |
| `slug` | UID | URL 友好的唯一标识符 | ✅ |
| `content` | Rich text | 文章正文内容 | ✅ |
| `excerpt` | Text (Long text) | 文章摘要/简介 | ❌ |

## 统计字段

| 字段名 | 类型 | 说明 | 必填 |
|--------|------|------|------|
| `view_count` | Number (integer) | 浏览量 | ❌ |
| `like_count` | Number (integer) | 点赞数 | ❌ |

## 状态和分类字段

| 字段名 | 类型 | 说明 | 可选值 |
|--------|------|------|--------|
| `article_status` | Enumeration | 文章状态 | `draft`, `published`, `archived` |
| `type` | Enumeration | 文章类型 | `article`, `shortVideo`, `longVideo` |

## 推荐和排序字段

| 字段名 | 类型 | 说明 | 必填 |
|--------|------|------|------|
| `pin_until` | Date | 置顶截止时间 | ❌ |
| `weight` | Number (integer) | 权重（用于排序） | ❌ |
| `is_recommended` | Boolean | 是否推荐 | ❌ |

## 系统字段

| 字段名 | 类型 | 说明 |
|--------|------|------|
| `id` | Number | 文章 ID（系统生成） |
| `documentId` | String | 文档唯一标识符 |
| `locale` | String | 语言代码（如 `en`, `zh-CN`） |
| `createdAt` | DateTime | 创建时间 |
| `updatedAt` | DateTime | 更新时间 |
| `publishedAt` | DateTime | 发布时间 |

## ⚠️ 重要提示：无关联字段

Article 内容类型**没有**以下关联字段：
- ❌ `cover` - 封面图片
- ❌ `author` - 作者
- ❌ `categories` - 分类
- ❌ `tags` - 标签

如果需要使用这些字段，需要在 Strapi 后台手动添加：
1. 进入 **Content-Type Builder**
2. 选择 **Article**
3. 点击 **Add another field**
4. 选择 **Relation** 类型
5. 配置关联关系

## TypeScript 类型定义

```typescript
export interface Article {
  // 基础信息
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;

  // 统计信息
  view_count?: string | null;  // 注意：返回的是字符串类型
  like_count?: string | null;

  // 状态和分类
  article_status: 'draft' | 'published' | 'archived' | 'active';
  type: 'article' | 'shortVideo' | 'longVideo' | null;

  // 推荐和排序
  pin_until?: string | null;
  weight?: number | null;
  is_recommended?: boolean | null;

  // 系统字段
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
}
```

## API 查询示例

### 基础查询
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?locale=zh-CN&pagination[page]=1&pagination[pageSize]=10'
```

### 按发布时间排序
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?locale=zh-CN&sort[0]=publishedAt:desc&pagination[page]=1&pagination[pageSize]=10'
```

### 按权重排序（推荐文章在前）
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?locale=zh-CN&sort[0]=weight:desc&sort[1]=publishedAt:desc&pagination[page]=1&pagination[pageSize]=10'
```

### 查询推荐文章
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?locale=zh-CN&filters[is_recommended][$eq]=true&pagination[page]=1&pagination[pageSize]=5'
```

### 查询特定类型的文章
```bash
# 只查询文章类型
curl --location --globoff 'https://cms.askyi.life/api/articles?locale=zh-CN&filters[type][$eq]=article&pagination[page]=1&pagination[pageSize]=10'

# 只查询短视频
curl --location --globoff 'https://cms.askyi.life/api/articles?locale=zh-CN&filters[type][$eq]=shortVideo&pagination[page]=1&pagination[pageSize]=10'
```

### 查询已发布的文章
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?locale=zh-CN&filters[article_status][$eq]=published&pagination[page]=1&pagination[pageSize]=10'
```

### 查询热门文章（按浏览量排序）
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?locale=zh-CN&sort[0]=view_count:desc&pagination[page]=1&pagination[pageSize]=10'
```

## 前端使用示例

```typescript
import { getStrapiEntries } from '@/lib/strapi';
import { Article } from '@/types/strapi';

// 获取推荐文章
const recommendedArticles = await getStrapiEntries<Article>('articles', {
  locale: 'zh',  // 自动映射为 zh-CN
  filters: {
    is_recommended: true,
    article_status: 'published'
  },
  sort: ['weight:desc', 'publishedAt:desc'],
  pagination: {
    page: 1,
    pageSize: 5
  }
});

// 获取最新文章
const latestArticles = await getStrapiEntries<Article>('articles', {
  locale: 'zh',
  sort: ['publishedAt:desc'],
  pagination: {
    page: 1,
    pageSize: 10
  }
});

// 获取热门文章
const popularArticles = await getStrapiEntries<Article>('articles', {
  locale: 'zh',
  sort: ['view_count:desc'],
  pagination: {
    page: 1,
    pageSize: 10
  }
});
```

## 数据展示建议

### 文章列表页
显示字段：
- `title` - 标题
- `excerpt` - 摘要（如果没有，显示 content 前 150 字）
- `publishedAt` - 发布时间
- `view_count` - 浏览量
- `like_count` - 点赞数
- `type` - 类型标签

### 文章详情页
显示字段：
- `title` - 标题
- `content` - 完整内容（富文本渲染）
- `publishedAt` - 发布时间
- `view_count` - 浏览量
- `like_count` - 点赞数
- `createdAt` / `updatedAt` - 时间戳

### 推荐文章区块
筛选条件：
- `is_recommended: true`
- `article_status: 'published'`
- 排序：`weight:desc, publishedAt:desc`

## 注意事项

1. **view_count 和 like_count 是字符串类型**
   - API 返回的是字符串，使用时需要转换：`Number(article.view_count)`

2. **article_status 可能的值**
   - 根据实际数据，还有 `active` 状态
   - 建议统一使用 `published` 状态判断是否显示

3. **type 字段可能为 null**
   - 需要做空值检查：`article.type ?? 'article'`

4. **locale 映射**
   - 前端使用 `zh`，API 自动转换为 `zh-CN`
   - 不要在查询中直接使用 `zh`

5. **排序优先级**
   - 推荐内容：`weight:desc` → `publishedAt:desc`
   - 最新内容：`publishedAt:desc`
   - 热门内容：`view_count:desc`

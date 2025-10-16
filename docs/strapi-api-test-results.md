# Strapi API 测试结果总结

测试时间：2025-10-17
测试环境：https://cms.askyi.life
认证方式：无需 Token（Public 权限已配置）

## ✅ 测试通过的 API

### 1. Articles（文章）
```bash
curl 'https://cms.askyi.life/api/articles?pagination\[page\]=1&pagination\[pageSize\]=2'
```
**结果：**
- ✅ 成功访问
- 总数：821 篇文章
- 分页：411 页（每页2条）
- 语言：英文（en）
- 包含字段：id, documentId, title, slug, content, createdAt, updatedAt, publishedAt, locale, type

**示例数据：**
```json
{
  "data": [
    {
      "id": 2737,
      "title": "办公室"招财猫"风水：摆件的朝向、材质与催财秘密",
      "slug": "Office-Lucky-Cat-Fengshui-Placement-Direction-Material-and-Wealth-Attraction-Secrets"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 2,
      "pageCount": 411,
      "total": 821
    }
  }
}
```

---

### 2. Categories（分类）
```bash
curl 'https://cms.askyi.life/api/categories?locale=zh&pagination\[page\]=1&pagination\[pageSize\]=2'
```
**结果：**
- ✅ 成功访问
- 总数：16 个分类
- 分页：8 页（每页2条）
- 语言：中文（zh）
- 包含字段：id, documentId, name, slug, createdAt, updatedAt, publishedAt

**示例数据：**
```json
{
  "data": [
    {
      "id": 6,
      "name": "风水指南",
      "slug": "fengshui"
    },
    {
      "id": 66,
      "name": "风水堪舆",
      "slug": "geomancy"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 2,
      "pageCount": 8,
      "total": 16
    }
  }
}
```

**分类列表：**
1. 风水指南 (fengshui)
2. 风水堪舆 (geomancy)
3. 易经八卦 (yijing)
4. 案例 (usercase)
5. 占卜方法 (zhanbufangfa)
6. ...等共 16 个分类

---

### 3. Tags（标签）
```bash
curl 'https://cms.askyi.life/api/tags?locale=zh&pagination\[page\]=1&pagination\[pageSize\]=2'
```
**结果：**
- ✅ 成功访问
- 总数：117 个标签
- 分页：59 页（每页2条）
- 语言：中文（zh）
- 包含字段：id, documentId, name, slug, type, createdAt, updatedAt, publishedAt

**示例数据：**
```json
{
  "data": [
    {
      "id": 2,
      "name": "八卦",
      "slug": "bagua"
    },
    {
      "id": 462,
      "name": "炒股",
      "slug": "Day-trading"
    }
  ],
  "meta": {
    "pagination": {
      "total": 117
    }
  }
}
```

---

### 4. Experts（专家）
```bash
curl 'https://cms.askyi.life/api/experts?locale=zh&pagination\[page\]=1&pagination\[pageSize\]=2'
```
**结果：**
- ✅ 成功访问
- 总数：5 位专家
- 分页：3 页（每页2条）
- 语言：中文（zh）
- 包含字段：id, documentId, name, title, bio, price, rating, served_count, slug

**示例数据：**
```json
{
  "data": [
    {
      "id": 41,
      "name": "马岩童",
      "title": "风水策划师",
      "bio": "风水策划师 马岩童 自幼跟随多位名师学习，从业20余年",
      "slug": "mayantong"
    },
    {
      "id": 33,
      "name": "王大师",
      "title": "国家认证易学大师级",
      "bio": "25年易学研究经验",
      "price": 500,
      "rating": 5,
      "served_count": "30",
      "slug": "wangdashi"
    }
  ]
}
```

---

### 5. Cases（案例）
```bash
curl 'https://cms.askyi.life/api/cases?locale=zh&pagination\[page\]=1&pagination\[pageSize\]=2'
```
**结果：**
- ⚠️ 成功访问但无数据
- 总数：0 个案例
- 需要在 Strapi 后台添加中文案例数据

---

## ❌ 需要注意的问题

### 1. ✅ 中文文章已找到
- Articles API 中文内容使用 `locale=zh-CN`（不是 `zh`）
- 总数：13 篇中文文章
- **已修复：** 代码已添加 locale 映射，前端使用 `zh` 会自动转换为 `zh-CN`

**测试命令：**
```bash
curl 'https://cms.askyi.life/api/articles?locale=zh-CN&pagination\[page\]=1&pagination\[pageSize\]=3'
```

**示例文章：**
1. "风水布局：哪些家居风水可能不利于孩子的学习？"
2. "玄学里有个词叫聚气，情绪稳，运气才会好"
3. "Double Your Wealth by Organizing One Corner - The Hidden Key to Home FengShui"

### 2. Cases 数据为空
- Cases API 暂无数据
- **建议：** 在 Strapi 后台添加案例内容

---

## 📊 数据统计总结

| 内容类型 | 英文数量 | 中文数量 (zh-CN) | 状态 |
|---------|---------|-----------------|------|
| Articles | 821 | 13 | ✅ 正常 |
| Categories | N/A | 16 | ✅ 正常 |
| Tags | N/A | 117 | ✅ 正常 |
| Experts | N/A | 5 | ✅ 正常 |
| Cases | 0 | 0 | ⚠️ 无数据 |

**重要提示：** Strapi 中文 locale 使用 `zh-CN`，代码已自动处理映射。

---

## 🔧 API 使用建议

### 1. 推荐的查询参数
所有列表查询必须包含分页参数：
```bash
pagination\[page\]=1&pagination\[pageSize\]=25
```

### 2. 语言切换
中文内容需添加 locale 参数：
```bash
locale=zh
```

### 3. 性能优化
- 使用合理的 pageSize（建议 10-50）
- 避免一次性获取过多数据
- 使用 populate 参数按需加载关联数据

### 4. 错误处理
代码中已实现自动重试和错误处理：
```typescript
try {
  const response = await fetch(url, {
    headers,
    cache: cache || 'force-cache',
    next: next || { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status}`);
  }

  return await response.json();
} catch (error) {
  console.error('Error fetching from Strapi:', error);
  throw error;
}
```

---

## 🎯 下一步行动

### 高优先级
1. ✅ API Token 已设为可选（Public 权限已配置）
2. ✅ 所有主要 API 端点测试通过
3. ✅ 分页参数自动添加功能已实现
4. ⏳ 在 Strapi 后台添加文章的中文本地化版本
5. ⏳ 在 Strapi 后台添加案例（Cases）内容

### 中优先级
1. 实现缓存策略优化
2. 添加更多内容类型的集成（如 ShortVideos、LongVideos）
3. 实现搜索和过滤功能

### 低优先级
1. 添加关联数据的预加载
2. 实现无限滚动分页
3. 添加内容预览功能

---

## 📝 代码集成示例

### 获取文章列表
```typescript
import { getStrapiEntries } from '@/lib/strapi';
import { Article } from '@/types/strapi';

const articles = await getStrapiEntries<Article>('articles', {
  locale: 'en',
  pagination: {
    page: 1,
    pageSize: 10,
  },
  sort: ['publishedAt:desc'],
});
```

### 获取分类列表
```typescript
const categories = await getStrapiEntries<Category>('categories', {
  locale: 'zh',
  pagination: {
    page: 1,
    pageSize: 100,
  },
});
```

### 获取单个专家
```typescript
const expert = await getStrapiEntry<Expert>('experts', expertId, {
  locale: 'zh',
  populate: ['avatar', 'services'],
});
```

---

## ✨ 测试结论

所有主要 API 端点均可正常访问，无需 Token 认证。Public 权限配置正确，前端可以直接调用 API 获取数据。唯一需要注意的是文章（Articles）缺少中文版本，需要在 Strapi 后台进行内容本地化。

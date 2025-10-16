# Strapi Locale 标准说明

## ⚠️ 重要：Strapi 使用的 Locale 标准

Strapi CMS 使用的 locale 代码遵循 **BCP 47 标准**，而不是简化的 ISO 639-1 代码。

### ✅ 正确的 Locale 代码

| 语言 | 正确代码 | 说明 |
|------|---------|------|
| 英文 | `en` | English |
| 中文 | `zh-CN` | Chinese (Simplified) |

### ❌ 错误的 Locale 代码

| 错误代码 | 说明 | 正确代码 |
|---------|------|---------|
| `zh` | Strapi 不支持，会返回空数据 | `zh-CN` |
| `zh-Hans` | Strapi 不支持 | `zh-CN` |
| `cn` | 错误的国家代码 | `zh-CN` |

## 代码实现

### 前端 Locale 映射

在 `i18n/config.ts` 中定义映射：

```typescript
// 前端使用简化的 locale
export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

// Strapi locale 映射（前端 locale -> Strapi locale）
export const strapiLocaleMap: Record<Locale, string> = {
  'en': 'en',      // 前端 'en' -> Strapi 'en'
  'zh': 'zh-CN'    // 前端 'zh' -> Strapi 'zh-CN'
};
```

### API 调用时自动转换

在 `lib/strapi.ts` 中自动转换：

```typescript
import { strapiLocaleMap } from '@/i18n/config';

export async function fetchStrapi<T>(path: string, options?: {
  locale?: string;
  // ... 其他参数
}): Promise<T> {
  const { locale } = options || {};
  const params = new URLSearchParams();

  if (locale) {
    // 将前端 locale 映射到 Strapi locale (zh -> zh-CN)
    const strapiLocale = strapiLocaleMap[locale as keyof typeof strapiLocaleMap] || locale;
    params.append('locale', strapiLocale);
  }

  // ... 其他代码
}
```

## API 测试示例

### ✅ 正确的调用方式

```bash
# 方式1：直接使用 Strapi 标准 locale
curl 'https://cms.askyi.life/api/articles?locale=zh-CN&pagination\[page\]=1&pagination\[pageSize\]=10'

# 方式2：前端代码自动映射（推荐）
// 在代码中使用 locale: 'zh'，会自动转换为 'zh-CN'
const articles = await getStrapiEntries('articles', {
  locale: 'zh',  // 自动映射为 zh-CN
  pagination: { page: 1, pageSize: 10 }
});
```

### ❌ 错误的调用方式

```bash
# 错误1：使用 zh 而不是 zh-CN
curl 'https://cms.askyi.life/api/articles?locale=zh&pagination\[page\]=1&pagination\[pageSize\]=10'
# 结果：返回空数据 {"data": [], "meta": {"pagination": {"total": 0}}}

# 错误2：使用其他中文变体
curl 'https://cms.askyi.life/api/articles?locale=zh-Hans&pagination\[page\]=1&pagination\[pageSize\]=10'
# 结果：返回空数据
```

## 测试结果

### 英文文章 (locale=en)
```bash
curl 'https://cms.askyi.life/api/articles?locale=en&pagination\[page\]=1&pagination\[pageSize\]=1'
```
**返回：** 821 篇文章 ✅

### 中文文章 (locale=zh-CN)
```bash
curl 'https://cms.askyi.life/api/articles?locale=zh-CN&pagination\[page\]=1&pagination\[pageSize\]=1'
```
**返回：** 13 篇文章 ✅

### 错误示例 (locale=zh)
```bash
curl 'https://cms.askyi.life/api/articles?locale=zh&pagination\[page\]=1&pagination\[pageSize\]=1'
```
**返回：** 0 篇文章 ❌

## 为什么必须使用 zh-CN？

1. **BCP 47 标准**
   - Strapi 遵循 BCP 47 语言标签标准
   - 格式：`语言代码-地区代码`（如 `zh-CN`、`en-US`）

2. **区分中文变体**
   - `zh-CN`: 简体中文（中国大陆）
   - `zh-TW`: 繁体中文（台湾）
   - `zh-HK`: 繁体中文（香港）

3. **Strapi 配置**
   - Strapi 国际化插件使用完整的 locale 代码
   - 如果配置了 `zh-CN`，必须使用 `zh-CN` 查询

## 配置 Strapi 支持的 Locale

如果需要在 Strapi 后台添加其他 locale：

1. 进入 **Settings** → **Internationalization**
2. 点击 **Add new locale**
3. 选择 locale（如 `zh-CN`、`en-US`）
4. 保存并为内容类型启用该 locale

## 最佳实践

### ✅ 推荐做法

1. **前端使用简化的 locale**（`en`、`zh`）
2. **在 API 层自动映射**为 Strapi 标准（`en`、`zh-CN`）
3. **统一管理映射关系**（避免散落在各处）

```typescript
// ✅ 好的做法
const articles = await getStrapiEntries('articles', {
  locale: 'zh',  // 前端使用简化代码
  // 内部自动转换为 zh-CN
});
```

### ❌ 不推荐做法

```typescript
// ❌ 不好的做法
const articles = await getStrapiEntries('articles', {
  locale: 'zh-CN',  // 前端硬编码 Strapi locale
});
```

## 总结

- ✅ Strapi 标准 locale：**`en`** 和 **`zh-CN`**
- ❌ 不支持：`zh`、`zh-Hans`、`cn` 等简化形式
- 🔧 解决方案：在代码中实现自动映射
- 📝 记住：**前端用 `zh`，API 调用自动转为 `zh-CN`**

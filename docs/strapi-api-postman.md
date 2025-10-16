# Strapi API - Postman 格式参考

所有示例使用 `--globoff` 参数，可以直接在 Postman 或其他 API 工具中使用。

## 基础配置

**API Base URL**: `https://cms.askyi.life/api`
**认证方式**: 无需认证（Public 权限已配置）

---

## Articles（文章）

### 获取文章列表 - 英文
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?pagination[page]=1&pagination[pageSize]=10'
```

### 获取文章列表 - 中文
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?locale=zh&pagination[page]=1&pagination[pageSize]=10'
```

### 获取文章（带排序）
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?pagination[page]=1&pagination[pageSize]=10&sort[0]=publishedAt:desc'
```

### 获取文章（带关联数据）
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?pagination[page]=1&pagination[pageSize]=10&populate[0]=cover&populate[1]=categories'
```

### 获取单篇文章
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles/2737'
```

### 通过 Slug 查询文章
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?filters[slug][$eq]=home-fengshui-ten-simple-principles&pagination[page]=1&pagination[pageSize]=1'
```

### 综合查询（推荐）
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?locale=en&populate[0]=cover&populate[1]=categories&sort[0]=publishedAt:desc&pagination[page]=1&pagination[pageSize]=10'
```

---

## Categories（分类）

### 获取所有分类
```bash
curl --location --globoff 'https://cms.askyi.life/api/categories?locale=zh&pagination[page]=1&pagination[pageSize]=100'
```

### 获取单个分类
```bash
curl --location --globoff 'https://cms.askyi.life/api/categories/6'
```

---

## Tags（标签）

### 获取所有标签
```bash
curl --location --globoff 'https://cms.askyi.life/api/tags?locale=zh&pagination[page]=1&pagination[pageSize]=100'
```

### 获取标签（带分页）
```bash
curl --location --globoff 'https://cms.askyi.life/api/tags?locale=zh&pagination[page]=1&pagination[pageSize]=20'
```

---

## Experts（专家）

### 获取专家列表
```bash
curl --location --globoff 'https://cms.askyi.life/api/experts?locale=zh&pagination[page]=1&pagination[pageSize]=10'
```

### 获取单个专家
```bash
curl --location --globoff 'https://cms.askyi.life/api/experts/41'
```

### 获取专家（带关联数据）
```bash
curl --location --globoff 'https://cms.askyi.life/api/experts?locale=zh&populate[0]=avatar&populate[1]=services&pagination[page]=1&pagination[pageSize]=10'
```

---

## Cases（案例）

### 获取案例列表
```bash
curl --location --globoff 'https://cms.askyi.life/api/cases?locale=zh&pagination[page]=1&pagination[pageSize]=10'
```

---

## Comments（评论）

### 获取评论列表
```bash
curl --location --globoff 'https://cms.askyi.life/api/comments?locale=zh&pagination[page]=1&pagination[pageSize]=10'
```

---

## Reviews（评价）

### 获取评价列表
```bash
curl --location --globoff 'https://cms.askyi.life/api/reviews?locale=zh&pagination[page]=1&pagination[pageSize]=10'
```

---

## Short Videos（短视频）

### 获取短视频列表
```bash
curl --location --globoff 'https://cms.askyi.life/api/short-videos?locale=zh&pagination[page]=1&pagination[pageSize]=10'
```

---

## Long Videos（长视频）

### 获取长视频列表
```bash
curl --location --globoff 'https://cms.askyi.life/api/long-videos?locale=zh&pagination[page]=1&pagination[pageSize]=10'
```

---

## Answers（问答）

### 获取问答列表
```bash
curl --location --globoff 'https://cms.askyi.life/api/answers?locale=zh&pagination[page]=1&pagination[pageSize]=10'
```

---

## 常用查询参数组合

### 1. 获取最新的 10 篇文章（带封面和分类）
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?locale=en&populate[0]=cover&populate[1]=categories&sort[0]=publishedAt:desc&pagination[page]=1&pagination[pageSize]=10'
```

### 2. 搜索特定标题的文章
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?filters[title][$contains]=风水&pagination[page]=1&pagination[pageSize]=10'
```

### 3. 获取特定分类下的文章
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?filters[categories][slug][$eq]=fengshui&pagination[page]=1&pagination[pageSize]=10'
```

### 4. 获取推荐文章
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?filters[is_recommended][$eq]=true&sort[0]=publishedAt:desc&pagination[page]=1&pagination[pageSize]=5'
```

### 5. 获取浏览量最高的文章
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?sort[0]=view_count:desc&pagination[page]=1&pagination[pageSize]=10'
```

---

## Postman Collection 导入

可以将以上所有请求保存为 Postman Collection：

1. 打开 Postman
2. 点击 "Import" 按钮
3. 选择 "Raw text"
4. 粘贴任意一个 curl 命令
5. 点击 "Import"
6. 重命名请求并保存到 Collection

### 环境变量配置（可选）

在 Postman 中可以设置以下环境变量：

```json
{
  "base_url": "https://cms.askyi.life/api",
  "locale": "zh",
  "page_size": "10"
}
```

然后在请求中使用：
```
{{base_url}}/articles?locale={{locale}}&pagination[page]=1&pagination[pageSize]={{page_size}}
```

---

## JavaScript Fetch 示例

如果要在代码中使用，无需任何转义：

```javascript
// 获取文章列表
fetch('https://cms.askyi.life/api/articles?pagination[page]=1&pagination[pageSize]=10')
  .then(res => res.json())
  .then(data => console.log(data));

// 带查询参数
const params = new URLSearchParams({
  locale: 'zh',
  'pagination[page]': '1',
  'pagination[pageSize]': '10',
  'sort[0]': 'publishedAt:desc'
});

fetch(`https://cms.askyi.life/api/articles?${params}`)
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 响应格式

所有 API 返回统一的 JSON 格式：

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "xxx",
      "attributes": { ... }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "pageCount": 100,
      "total": 1000
    }
  }
}
```

### 单个资源：
```json
{
  "data": {
    "id": 1,
    "documentId": "xxx",
    "attributes": { ... }
  },
  "meta": {}
}
```

---

## 快速测试

复制以下命令到终端快速测试：

```bash
# 测试连接
curl --location --globoff 'https://cms.askyi.life/api/articles?pagination[page]=1&pagination[pageSize]=1'

# 获取分类
curl --location --globoff 'https://cms.askyi.life/api/categories?locale=zh&pagination[page]=1&pagination[pageSize]=5'

# 获取专家
curl --location --globoff 'https://cms.askyi.life/api/experts?locale=zh&pagination[page]=1&pagination[pageSize]=5'
```

---

## 注意事项

1. ✅ 所有 API 都已开放 Public 权限，无需 Token
2. ✅ 必须包含分页参数 `pagination[page]` 和 `pagination[pageSize]`
3. ⚠️ 部分内容可能没有中文版本，需检查返回数据
4. 💡 使用 `--location` 参数自动跟随重定向
5. 💡 使用 `--globoff` 参数避免方括号被解析

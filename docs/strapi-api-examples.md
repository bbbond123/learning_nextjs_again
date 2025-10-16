# Strapi API 调用示例

本文档记录了所有 Strapi CMS API 的 curl 调用示例，方便调试和测试。

## 重要提示

### Curl 命令格式说明

**在终端直接使用**（需要转义方括号）：
```bash
curl 'https://cms.askyi.life/api/articles?pagination\[page\]=1&pagination\[pageSize\]=10'
```

**使用 --globoff 参数**（不需要转义，适用于 Postman）：
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?pagination[page]=1&pagination[pageSize]=10'
```

**在代码中使用**（JavaScript fetch/axios 等）：
```javascript
fetch('https://cms.askyi.life/api/articles?pagination[page]=1&pagination[pageSize]=10')
```

> 📝 本文档中的示例使用转义格式 `\[` 和 `\]`，适合在终端中直接复制使用。
> 如果使用 Postman 或其他 API 工具，请使用 `--globoff` 参数或直接使用未转义的格式。

## 环境配置

```bash
API_URL="https://cms.askyi.life"
API_TOKEN="77e8511e5616117d74a28a6a227dd93154812a06291e48011dbb50fb62ed6589dfc892d8330919f0c20a53cb68efaa14967a95a1a5176bcbc25f7de9fefd63ee4fa24fea7905ec1d59cc81e77dc3d6f2a37ff8bce05a40b418eb2b4bcc32a63355b8fa24f47565af788e420bce051ea41da72d43daf88d1324c7c6ef52fe83c3"
```

## 基础 API 测试

### 测试 API 连接

```bash
curl -I https://cms.askyi.life/api
```

## 可用的内容类型（Collection Types）

根据 Strapi 后台配置，以下内容类型可用：

- **Answer** - 问答
- **Article** - 文章
- **AuthIdentity** - 身份认证
- **Booking** - 预约
- **Case** - 案例
- **Category** - 分类
- **Comment** - 评论
- **Expert** - 专家
- **LongVideo** - 长视频
- **Message** - 消息
- **Review** - 评价
- **ShortVideo** - 短视频
- **Subscription** - 订阅
- **Tag** - 标签
- **User** - 用户

## Articles API

⚠️ **重要提示：Strapi API 要求必须传递分页参数**

### 获取所有文章（英文，带分页）

**终端格式**（转义）：
```bash
curl 'https://cms.askyi.life/api/articles?pagination\[page\]=1&pagination\[pageSize\]=25'
```

**Postman/工具格式**（--globoff）：
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?pagination[page]=1&pagination[pageSize]=25'
```

### 获取所有文章（中文，带分页）

**终端格式**（转义）：
```bash
curl 'https://cms.askyi.life/api/articles?locale=zh&pagination\[page\]=1&pagination\[pageSize\]=25'
```

**Postman/工具格式**（--globoff）：
```bash
curl --location --globoff 'https://cms.askyi.life/api/articles?locale=zh&pagination[page]=1&pagination[pageSize]=25'
```

### 获取文章（带分页）

```bash
curl -H "Authorization: Bearer 77e8511e5616117d74a28a6a227dd93154812a06291e48011dbb50fb62ed6589dfc892d8330919f0c20a53cb68efaa14967a95a1a5176bcbc25f7de9fefd63ee4fa24fea7905ec1d59cc81e77dc3d6f2a37ff8bce05a40b418eb2b4bcc32a63355b8fa24f47565af788e420bce051ea41da72d43daf88d1324c7c6ef52fe83c3" \
  'https://cms.askyi.life/api/articles?pagination\[page\]=1&pagination\[pageSize\]=10'
```

### 获取文章（带关联数据）

```bash
curl -H "Authorization: Bearer 77e8511e5616117d74a28a6a227dd93154812a06291e48011dbb50fb62ed6589dfc892d8330919f0c20a53cb68efaa14967a95a1a5176bcbc25f7de9fefd63ee4fa24fea7905ec1d59cc81e77dc3d6f2a37ff8bce05a40b418eb2b4bcc32a63355b8fa24f47565af788e420bce051ea41da72d43daf88d1324c7c6ef52fe83c3" \
  'https://cms.askyi.life/api/articles?populate\[0\]=cover&populate\[1\]=author&populate\[2\]=categories'
```

### 获取文章（带排序）

```bash
curl -H "Authorization: Bearer 77e8511e5616117d74a28a6a227dd93154812a06291e48011dbb50fb62ed6589dfc892d8330919f0c20a53cb68efaa14967a95a1a5176bcbc25f7de9fefd63ee4fa24fea7905ec1d59cc81e77dc3d6f2a37ff8bce05a40b418eb2b4bcc32a63355b8fa24f47565af788e420bce051ea41da72d43daf88d1324c7c6ef52fe83c3" \
  'https://cms.askyi.life/api/articles?sort\[0\]=publishedAt:desc'
```

### 获取单篇文章（通过 ID）

```bash
curl -H "Authorization: Bearer 77e8511e5616117d74a28a6a227dd93154812a06291e48011dbb50fb62ed6589dfc892d8330919f0c20a53cb68efaa14967a95a1a5176bcbc25f7de9fefd63ee4fa24fea7905ec1d59cc81e77dc3d6f2a37ff8bce05a40b418eb2b4bcc32a63355b8fa24f47565af788e420bce051ea41da72d43daf88d1324c7c6ef52fe83c3" \
  https://cms.askyi.life/api/articles/2737
```

### 获取文章（通过 slug 过滤）

```bash
curl -H "Authorization: Bearer 77e8511e5616117d74a28a6a227dd93154812a06291e48011dbb50fb62ed6589dfc892d8330919f0c20a53cb68efaa14967a95a1a5176bcbc25f7de9fefd63ee4fa24fea7905ec1d59cc81e77dc3d6f2a37ff8bce05a40b418eb2b4bcc32a63355b8fa24f47565af788e420bce051ea41da72d43daf88d1324c7c6ef52fe83c3" \
  'https://cms.askyi.life/api/articles?filters\[slug][$eq\]=home-fengshui-ten-simple-principles'
```

### 综合查询示例（英文、带关联、排序、分页）

```bash
curl -H "Authorization: Bearer 77e8511e5616117d74a28a6a227dd93154812a06291e48011dbb50fb62ed6589dfc892d8330919f0c20a53cb68efaa14967a95a1a5176bcbc25f7de9fefd63ee4fa24fea7905ec1d59cc81e77dc3d6f2a37ff8bce05a40b418eb2b4bcc32a63355b8fa24f47565af788e420bce051ea41da72d43daf88d1324c7c6ef52fe83c3" \
  'https://cms.askyi.life/api/articles?locale=en&populate\[0\]=cover&populate\[1\]=author&populate\[2\]=categories&sort\[0\]=publishedAt:desc&pagination\[page\]=1&pagination\[pageSize\]=10'
```

## 测试结果

### 英文文章
- ✅ 有数据（15+ 篇文章）
- 包含：风水、命理、办公室风水等主题

### 中文文章
- ⚠️ 暂无数据
- 需要在 Strapi 后台添加中文版本的文章

## 常用查询参数

| 参数 | 说明 | 示例 |
|------|------|------|
| `locale` | 语言 | `locale=zh` 或 `locale=en` |
| `pagination\[page]` | 页码 | `pagination\[page\]=1` |
| `pagination\[pageSize]` | 每页数量 | `pagination\[pageSize\]=10` |
| `sort\[0]` | 排序 | `sort\[0\]=publishedAt:desc` |
| `populate\[0]` | 关联字段 | `populate\[0\]=cover` |
| `filters\[field][$eq]` | 过滤条件 | `filters\[slug][$eq\]=xxx` |

## 其他内容类型 API 示例

### 获取问答列表（Answers）

```bash
curl -H "Authorization: Bearer 77e8511e5616117d74a28a6a227dd93154812a06291e48011dbb50fb62ed6589dfc892d8330919f0c20a53cb68efaa14967a95a1a5176bcbc25f7de9fefd63ee4fa24fea7905ec1d59cc81e77dc3d6f2a37ff8bce05a40b418eb2b4bcc32a63355b8fa24f47565af788e420bce051ea41da72d43daf88d1324c7c6ef52fe83c3" \
  'https://cms.askyi.life/api/answers?locale=zh&pagination\[page\]=1&pagination\[pageSize\]=25'
```

### 获取案例列表（Cases）

```bash
curl -H "Authorization: Bearer 77e8511e5616117d74a28a6a227dd93154812a06291e48011dbb50fb62ed6589dfc892d8330919f0c20a53cb68efaa14967a95a1a5176bcbc25f7de9fefd63ee4fa24fea7905ec1d59cc81e77dc3d6f2a37ff8bce05a40b418eb2b4bcc32a63355b8fa24f47565af788e420bce051ea41da72d43daf88d1324c7c6ef52fe83c3" \
  'https://cms.askyi.life/api/cases?locale=zh&pagination\[page\]=1&pagination\[pageSize\]=25'
```

### 获取分类列表（Categories）

```bash
curl -H "Authorization: Bearer 77e8511e5616117d74a28a6a227dd93154812a06291e48011dbb50fb62ed6589dfc892d8330919f0c20a53cb68efaa14967a95a1a5176bcbc25f7de9fefd63ee4fa24fea7905ec1d59cc81e77dc3d6f2a37ff8bce05a40b418eb2b4bcc32a63355b8fa24f47565af788e420bce051ea41da72d43daf88d1324c7c6ef52fe83c3" \
  'https://cms.askyi.life/api/categories?locale=zh&pagination\[page\]=1&pagination\[pageSize\]=25'
```

### 获取专家列表（Experts）

```bash
curl -H "Authorization: Bearer 77e8511e5616117d74a28a6a227dd93154812a06291e48011dbb50fb62ed6589dfc892d8330919f0c20a53cb68efaa14967a95a1a5176bcbc25f7de9fefd63ee4fa24fea7905ec1d59cc81e77dc3d6f2a37ff8bce05a40b418eb2b4bcc32a63355b8fa24f47565af788e420bce051ea41da72d43daf88d1324c7c6ef52fe83c3" \
  'https://cms.askyi.life/api/experts?locale=zh&pagination\[page\]=1&pagination\[pageSize\]=25'
```

### 获取短视频列表（ShortVideos）

```bash
curl -H "Authorization: Bearer 77e8511e5616117d74a28a6a227dd93154812a06291e48011dbb50fb62ed6589dfc892d8330919f0c20a53cb68efaa14967a95a1a5176bcbc25f7de9fefd63ee4fa24fea7905ec1d59cc81e77dc3d6f2a37ff8bce05a40b418eb2b4bcc32a63355b8fa24f47565af788e420bce051ea41da72d43daf88d1324c7c6ef52fe83c3" \
  'https://cms.askyi.life/api/short-videos?locale=zh&pagination\[page\]=1&pagination\[pageSize\]=25'
```

### 获取长视频列表（LongVideos）

```bash
curl -H "Authorization: Bearer 77e8511e5616117d74a28a6a227dd93154812a06291e48011dbb50fb62ed6589dfc892d8330919f0c20a53cb68efaa14967a95a1a5176bcbc25f7de9fefd63ee4fa24fea7905ec1d59cc81e77dc3d6f2a37ff8bce05a40b418eb2b4bcc32a63355b8fa24f47565af788e420bce051ea41da72d43daf88d1324c7c6ef52fe83c3" \
  'https://cms.askyi.life/api/long-videos?locale=zh&pagination\[page\]=1&pagination\[pageSize\]=25'
```

### 获取标签列表（Tags）

```bash
curl -H "Authorization: Bearer 77e8511e5616117d74a28a6a227dd93154812a06291e48011dbb50fb62ed6589dfc892d8330919f0c20a53cb68efaa14967a95a1a5176bcbc25f7de9fefd63ee4fa24fea7905ec1d59cc81e77dc3d6f2a37ff8bce05a40b418eb2b4bcc32a63355b8fa24f47565af788e420bce051ea41da72d43daf88d1324c7c6ef52fe83c3" \
  'https://cms.askyi.life/api/tags?locale=zh&pagination\[page\]=1&pagination\[pageSize\]=25'
```

### 获取评论列表（Comments）

```bash
curl -H "Authorization: Bearer 77e8511e5616117d74a28a6a227dd93154812a06291e48011dbb50fb62ed6589dfc892d8330919f0c20a53cb68efaa14967a95a1a5176bcbc25f7de9fefd63ee4fa24fea7905ec1d59cc81e77dc3d6f2a37ff8bce05a40b418eb2b4bcc32a63355b8fa24f47565af788e420bce051ea41da72d43daf88d1324c7c6ef52fe83c3" \
  'https://cms.askyi.life/api/comments?locale=zh&pagination\[page\]=1&pagination\[pageSize\]=25'
```

### 获取评价列表（Reviews）

```bash
curl -H "Authorization: Bearer 77e8511e5616117d74a28a6a227dd93154812a06291e48011dbb50fb62ed6589dfc892d8330919f0c20a53cb68efaa14967a95a1a5176bcbc25f7de9fefd63ee4fa24fea7905ec1d59cc81e77dc3d6f2a37ff8bce05a40b418eb2b4bcc32a63355b8fa24f47565af788e420bce051ea41da72d43daf88d1324c7c6ef52fe83c3" \
  'https://cms.askyi.life/api/reviews?locale=zh&pagination\[page\]=1&pagination\[pageSize\]=25'
```

## 错误处理

### 401 Unauthorized
检查 API Token 是否正确

### 404 Not Found
检查 API 路径和资源 ID 是否存在

### 空数据返回
```json
{
  "data": [],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 0,
      "total": 0
    }
  }
}
```
说明该语言版本暂无内容

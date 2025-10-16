# Strapi 权限配置指南

## 目标
允许前端应用无需登录即可访问所有文章和其他内容。

## 配置步骤

### 1. 登录 Strapi 管理后台

访问：`https://cms.askyi.life/admin`

### 2. 进入权限设置

路径：**Settings（设置）** → **Users & Permissions plugin（用户与权限插件）** → **Roles（角色）**

### 3. 配置 Public 角色

1. 点击 **Public** 角色（这是所有未登录用户的默认角色）
2. 向下滚动到 **Permissions** 区域

### 4. 为 Article 内容类型设置权限

在 **Article** 部分，勾选以下权限：

- ✅ **find** - 允许获取文章列表
- ✅ **findOne** - 允许获取单篇文章

**不要勾选**：
- ❌ **create** - 创建文章
- ❌ **update** - 更新文章
- ❌ **delete** - 删除文章

### 5. 为其他内容类型设置权限

对以下内容类型重复第4步的操作：

#### 需要公开访问的内容类型：
- **Answer（问答）**
  - ✅ find
  - ✅ findOne

- **Case（案例）**
  - ✅ find
  - ✅ findOne

- **Category（分类）**
  - ✅ find
  - ✅ findOne

- **Comment（评论）**
  - ✅ find
  - ✅ findOne

- **Expert（专家）**
  - ✅ find
  - ✅ findOne

- **LongVideo（长视频）**
  - ✅ find
  - ✅ findOne

- **ShortVideo（短视频）**
  - ✅ find
  - ✅ findOne

- **Tag（标签）**
  - ✅ find
  - ✅ findOne

- **Review（评价）**
  - ✅ find
  - ✅ findOne

#### 不建议公开的内容类型：
- **User（用户）** - 保持所有权限关闭
- **AuthIdentity（身份认证）** - 保持所有权限关闭
- **Booking（预约）** - 保持所有权限关闭
- **Message（消息）** - 保持所有权限关闭
- **Subscription（订阅）** - 保持所有权限关闭

### 6. 保存设置

点击右上角的 **Save** 按钮保存配置。

## 验证权限配置

配置完成后，使用以下命令测试（不带 Authorization header）：

```bash
# 测试不带 token 访问文章
curl https://cms.askyi.life/api/articles

# 如果配置正确，应该返回文章列表数据
# 如果返回 403 错误，说明权限配置有问题
```

## 关联数据的权限配置

如果文章包含关联数据（如 cover、author、categories），需要同时配置这些内容类型的权限：

### Upload（上传文件/图片）
- ✅ find
- ✅ findOne

这样才能在文章中显示封面图片等媒体文件。

## API Token 的用途

配置完 Public 权限后，前端应用有两种访问方式：

### 方式1：不使用 Token（公开访问）
```javascript
fetch('https://cms.askyi.life/api/articles')
```

### 方式2：使用只读 Token（推荐）
```javascript
fetch('https://cms.askyi.life/api/articles', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
})
```

**推荐使用方式2的原因：**
- 更好的访问控制
- 可以追踪 API 使用情况
- 可以设置访问频率限制
- 更容易在需要时撤销权限

## 前端代码调整

如果配置了 Public 权限，可以修改 `lib/strapi.ts` 让 token 成为可选：

```typescript
const headers: HeadersInit = {
  'Content-Type': 'application/json',
};

// Token 变为可选
if (STRAPI_API_TOKEN) {
  headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
}
```

## 安全建议

1. **只开放必要的权限** - 只给 Public 角色 `find` 和 `findOne` 权限
2. **不要公开用户数据** - User、AuthIdentity 等敏感数据应保持私密
3. **使用 API Token** - 即使开放了 Public 权限，仍建议使用只读 token
4. **启用速率限制** - 在 Strapi 中配置 API 访问频率限制，防止滥用
5. **定期审查权限** - 定期检查和更新权限配置

## 常见问题

### Q: 配置了权限但还是返回 403？
A:
1. 确认已保存配置
2. 重启 Strapi 服务
3. 清除浏览器缓存
4. 检查内容是否已发布（draft 状态的内容不会返回）

### Q: 关联数据不显示？
A: 检查关联内容类型（如 Upload、Category）的 Public 权限是否也已开启

### Q: 想要部分内容公开，部分私密？
A: 可以在内容类型中添加一个 `isPublic` 字段，然后在前端使用过滤器：
```bash
curl 'https://cms.askyi.life/api/articles?filters[isPublic][$eq]=true'
```

## 下一步

配置完成后，可以：
1. 测试所有 API 端点
2. 更新前端代码移除不必要的 token
3. 添加内容到 Strapi 后台
4. 在前端展示内容

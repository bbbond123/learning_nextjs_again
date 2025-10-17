/**
 * Strapi 内容类型定义示例
 * 根据你的 Strapi CMS 配置进行调整
 */

/**
 * Article 内容类型
 * 基于 Strapi 后台实际配置
 */
export interface Article {
  // 基础信息
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;

  // 统计信息（注意：API 返回的是字符串类型）
  view_count?: string | null;
  like_count?: string | null;

  // 状态和分类
  article_status: 'draft' | 'published' | 'archived' | 'active';
  type?: 'article' | 'shortVideo' | 'longVideo' | null;

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

// 示例：页面类型
export interface Page {
  title: string;
  description: string;
  slug: string;
  content: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
}

// 示例：全局配置
export interface GlobalConfig {
  siteName: string;
  siteDescription: string;
  logo?: {
    data?: {
      id: number;
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
  defaultSeo?: {
    metaTitle: string;
    metaDescription: string;
  };
}

// 工具函数：获取 Strapi 媒体 URL
export function getStrapiMediaUrl(url?: string): string {
  if (!url) return '';
  
  // 如果是完整 URL，直接返回
  if (url.startsWith('http')) {
    return url;
  }
  
  // 否则拼接 Strapi API URL
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
  return `${baseUrl}${url}`;
}


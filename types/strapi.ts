/**
 * Strapi 内容类型定义示例
 * 根据你的 Strapi CMS 配置进行调整
 */

// 示例：文章类型
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
  author?: {
    data?: {
      id: number;
      attributes: {
        name: string;
        email: string;
      };
    };
  };
  categories?: {
    data: Array<{
      id: number;
      attributes: {
        name: string;
        slug: string;
      };
    }>;
  };
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


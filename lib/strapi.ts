/**
 * Strapi API 客户端
 * 用于从 Strapi CMS 获取多语言内容
 */

import { strapiLocaleMap } from '@/i18n/config';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T & {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    locale?: string;
    localizations?: {
      data: Array<{
        id: number;
        attributes: {
          locale: string;
        };
      }>;
    };
  };
}

/**
 * 从 Strapi 获取数据的通用函数
 */
export async function fetchStrapi<T>(
  path: string,
  options?: {
    locale?: string;
    populate?: string | string[];
    filters?: Record<string, any>;
    sort?: string | string[];
    pagination?: {
      page?: number;
      pageSize?: number;
    };
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
  }
): Promise<T> {
  const { locale, populate, filters, sort, pagination, cache, next } = options || {};

  // 构建查询参数
  const params = new URLSearchParams();

  if (locale) {
    // 将前端 locale 映射到 Strapi locale (zh -> zh-CN)
    const strapiLocale = strapiLocaleMap[locale as keyof typeof strapiLocaleMap] || locale;
    params.append('locale', strapiLocale);
  }

  if (populate) {
    if (Array.isArray(populate)) {
      populate.forEach(p => params.append('populate', p));
    } else {
      params.append('populate', populate);
    }
  }

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      params.append(`filters[${key}]`, String(value));
    });
  }

  if (sort) {
    if (Array.isArray(sort)) {
      sort.forEach(s => params.append('sort', s));
    } else {
      params.append('sort', sort);
    }
  }

  // 分页参数（必需，Strapi 要求必须传递分页参数）
  if (pagination) {
    if (pagination.page) params.append('pagination[page]', String(pagination.page));
    if (pagination.pageSize) params.append('pagination[pageSize]', String(pagination.pageSize));
  } else {
    // 如果没有提供分页参数，使用默认值
    params.append('pagination[page]', '1');
    params.append('pagination[pageSize]', '25');
  }

  const url = `${STRAPI_API_URL}/api${path}${params.toString() ? `?${params.toString()}` : ''}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Token 是可选的，如果配置了 Strapi Public 权限则不需要
  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  try {
    const response = await fetch(url, {
      headers,
      cache: cache || 'force-cache',
      next: next || { revalidate: 60 }, // 默认 60 秒重新验证
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

/**
 * 获取单个条目
 */
export async function getStrapiEntry<T>(
  contentType: string,
  id: number,
  options?: Parameters<typeof fetchStrapi>[1]
): Promise<StrapiEntity<T>> {
  const response = await fetchStrapi<{ data: StrapiEntity<T> }>(
    `/${contentType}/${id}`,
    options
  );
  return response.data;
}

/**
 * 获取多个条目
 */
export async function getStrapiEntries<T>(
  contentType: string,
  options?: Parameters<typeof fetchStrapi>[1]
): Promise<StrapiEntity<T>[]> {
  const response = await fetchStrapi<{ data: StrapiEntity<T>[] }>(
    `/${contentType}`,
    options
  );
  return response.data;
}

/**
 * 获取单个条目（按 slug）
 */
export async function getStrapiEntryBySlug<T>(
  contentType: string,
  slug: string,
  options?: Parameters<typeof fetchStrapi>[1]
): Promise<StrapiEntity<T> | null> {
  const response = await fetchStrapi<{ data: StrapiEntity<T>[] }>(
    `/${contentType}`,
    {
      ...options,
      filters: { slug, ...(options?.filters || {}) },
    }
  );
  return response.data[0] || null;
}


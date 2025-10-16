// 支持的语言配置
export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

// 默认语言
export const defaultLocale: Locale = 'en';

// Strapi locale 映射（前端 locale -> Strapi locale）
export const strapiLocaleMap: Record<Locale, string> = {
  'en': 'en',
  'zh': 'zh-CN'
};


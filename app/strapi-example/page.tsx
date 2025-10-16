import { getLocale } from 'next-intl/server';
import { getStrapiEntries } from '@/lib/strapi';
import { Article } from '@/types/strapi';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';

/**
 * 示例页面：从 Strapi 获取文章列表
 *
 * 使用方法：
 * 1. 在 Strapi 中创建 Article 内容类型
 * 2. 配置多语言支持
 * 3. 创建一些文章内容
 * 4. 配置 .env.local 文件中的 Strapi API URL 和 Token
 */

export default async function StrapiExamplePage() {
  const locale = await getLocale();

  // 尝试从 Strapi 获取文章
  let articles: any[] = [];
  let error: string | null = null;

  try {
    const data = await getStrapiEntries<Article>('articles', {
      locale, // 根据当前语言获取内容
      populate: ['cover', 'author', 'categories'],
      sort: ['publishedAt:desc'],
      pagination: {
        pageSize: 10,
      },
      cache: 'no-store', // 演示用途，实际使用时可以启用缓存
    });
    articles = data;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch articles';
    console.error('Failed to fetch articles from Strapi:', err);
  }

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Strapi CMS 集成示例</h1>
        <LanguageSwitcher />
      </header>

      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">📘 配置说明</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>在 Strapi 中启用国际化（i18n）插件</li>
          <li>创建内容类型（如 Article）并启用多语言支持</li>
          <li>创建 <code className="bg-white dark:bg-gray-800 px-1 rounded">.env.local</code> 文件：
            <pre className="mt-2 p-2 bg-white dark:bg-gray-800 rounded text-xs overflow-x-auto">
              NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337{'\n'}
              STRAPI_API_TOKEN=your_api_token_here
            </pre>
          </li>
          <li>在 Strapi 中添加不同语言的内容</li>
          <li>使用语言切换器查看不同语言的内容</li>
        </ol>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          当前语言: <span className="font-semibold">{locale === 'zh' ? '中文' : 'English'}</span>
        </p>
      </div>

      {error ? (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">⚠️ 无法连接到 Strapi</h3>
          <p className="text-sm mb-2">{error}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            请确保：
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-2">
            <li>Strapi 服务正在运行</li>
            <li>.env.local 文件已正确配置</li>
            <li>API Token 有正确的权限</li>
            <li>在 Strapi 中创建了 "articles" 内容类型</li>
          </ul>
        </div>
      ) : articles.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">文章列表</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.id}
                className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {article.attributes.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {article.attributes.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(article.attributes.publishedAt).toLocaleDateString(
                      locale === 'zh' ? 'zh-CN' : 'en-US'
                    )}
                  </span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {article.attributes.locale}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">📝 暂无文章</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            请在 Strapi 中添加一些文章内容。
          </p>
        </div>
      )}

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← 返回首页
        </Link>
      </div>
    </div>
  );
}


'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  backLink?: string;
}

export default function PageWrapper({
  children,
  title,
  backLink = '/'
}: PageWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('PageWrapper');

  const showBackButton = pathname !== '/';


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb / Back Button */}
        {showBackButton && (
          <div className="mb-6 flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>{t('back')}</span>
            </button>

            <Link
              href={backLink}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{t('backToHome')}</span>
            </Link>
          </div>
        )}

        {/* Page Title */}
        {title && (
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h1>
          </div>
        )}

        {/* Content */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-2 sm:p-2">
          {children}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { setUserLocale } from '@/lib/locale';
import { Locale } from '@/i18n/config';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const onSelectChange = (newLocale: string) => {
    startTransition(() => {
      setUserLocale(newLocale as Locale);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <select
        className="bg-black/[.05] dark:bg-white/[.06] border border-black/[.08] dark:border-white/[.145] rounded px-3 py-1.5 text-sm font-medium transition-colors hover:bg-black/[.1] dark:hover:bg-white/[.1] disabled:opacity-50 cursor-pointer"
        value={locale}
        onChange={(e) => onSelectChange(e.target.value)}
        disabled={isPending}
      >
        <option value="en">English</option>
        <option value="zh">中文</option>
      </select>
    </div>
  );
}


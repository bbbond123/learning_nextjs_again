This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- ✨ **Next.js 15.5.5** - Latest version with App Router
- 🌍 **Internationalization (i18n)** - Support for English and Chinese
- 🎨 **Tailwind CSS v4** - Modern utility-first CSS framework
- ⚡ **Turbopack** - Fast bundler for development and production
- 📝 **TypeScript** - Type-safe development
- 🔧 **Biome** - Fast linter and formatter

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You will be automatically redirected to the default language (English).

### Language Support

The application supports multiple languages:
- English: [http://localhost:3000/en](http://localhost:3000/en)
- 中文: [http://localhost:3000/zh](http://localhost:3000/zh)

You can switch between languages using the language switcher in the top-right corner.

You can start editing the page by modifying `app/[locale]/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Internationalization (i18n)

This project uses [next-intl](https://next-intl-docs.vercel.app/) for internationalization. For detailed documentation on how to use and extend the i18n functionality, please refer to:

📖 [i18n Configuration Guide](./docs/i18n.md)

Key features:
- Dynamic locale routing with `[locale]` segment
- Automatic locale detection and redirection
- Easy-to-use translation system with JSON files
- Type-safe navigation hooks
- Server and Client Component support

## Project Structure

```
learning_nextjs_again/
├── app/
│   ├── [locale]/           # Locale-specific pages
│   │   ├── layout.tsx      # Root layout with i18n provider
│   │   └── page.tsx        # Home page
│   └── globals.css         # Global styles
├── components/
│   └── LanguageSwitcher.tsx # Language toggle component
├── i18n/
│   ├── config.ts           # i18n configuration
│   ├── request.ts          # Request configuration
│   └── routing.ts          # Routing and navigation utilities
├── messages/
│   ├── en.json             # English translations
│   └── zh.json             # Chinese translations
├── docs/
│   └── i18n.md             # Detailed i18n documentation
└── middleware.ts           # Route middleware for i18n
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

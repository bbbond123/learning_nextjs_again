This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- ✨ **Next.js 15.5.5** - Latest version with App Router
- 🌍 **Internationalization (i18n)** - Support for English and Chinese (non-intrusive URL mode)
- 🚀 **Strapi CMS Integration** - Pre-configured for headless CMS with multi-language support
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

The application supports multiple languages with **non-intrusive URL mode** (language stored in cookie):
- All pages are accessible at the same URL: [http://localhost:3000](http://localhost:3000)
- Switch languages using the language switcher in the top-right corner
- Language preference is automatically saved

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Internationalization (i18n)

This project uses [next-intl](https://next-intl-docs.vercel.app/) for internationalization with **non-intrusive URL mode**. For detailed documentation on how to use and extend the i18n functionality, please refer to:

📖 [i18n Configuration Guide](./docs/i18n.md)

Key features:
- **Non-intrusive URLs** - No language prefix in URLs (e.g., `/` instead of `/en` or `/zh`)
- **Cookie-based language storage** - User preference persists across sessions
- **Seamless language switching** - Change language without page reload
- **Easy-to-use translation system** with JSON files
- **Server and Client Component support**

## Strapi CMS Integration

This project includes pre-configured integration with [Strapi](https://strapi.io/), a powerful headless CMS that supports multi-language content out of the box.

📖 [Strapi Integration Guide](./docs/strapi-integration.md)

### Quick Setup

1. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
   STRAPI_API_TOKEN=your_api_token_here
   ```

2. Set up your Strapi instance with i18n enabled

3. Visit `/strapi-example` to see the integration in action

Key features:
- **Multi-language content** - Automatic content fetching based on user's selected language
- **Type-safe API client** - TypeScript definitions for Strapi responses
- **Caching strategies** - Configurable cache and revalidation
- **Rich content types** - Support for relations, media, and complex data structures

## Project Structure

```
learning_nextjs_again/
├── app/
│   ├── layout.tsx          # Root layout with i18n provider
│   ├── page.tsx            # Home page
│   ├── strapi-example/     # Strapi integration example
│   └── globals.css         # Global styles
├── components/
│   └── LanguageSwitcher.tsx # Language toggle component
├── i18n/
│   ├── config.ts           # i18n configuration
│   ├── request.ts          # Request configuration
│   └── routing.ts          # Routing configuration (non-intrusive mode)
├── lib/
│   ├── locale.ts           # Cookie-based locale management
│   └── strapi.ts           # Strapi API client
├── messages/
│   ├── en.json             # English translations
│   └── zh.json             # Chinese translations
├── types/
│   └── strapi.ts           # Strapi TypeScript definitions
├── docs/
│   ├── i18n.md             # Detailed i18n documentation
│   └── strapi-integration.md # Strapi setup guide
└── middleware.ts           # i18n middleware
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

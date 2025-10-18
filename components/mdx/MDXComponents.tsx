import type { MDXComponents } from 'mdx/types';

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold my-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-bold my-3">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-bold my-2">{children}</h3>
  ),
  p: ({ children }) => <p className="my-2">{children}</p>,
  ul: ({ children }) => <ul className="list-disc ml-6 my-2">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal ml-6 my-2">{children}</ol>,
  li: ({ children }) => <li className="my-1">{children}</li>,
  code: ({ children }) => (
    <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">{children}</code>
  ),
  pre: ({ children }) => (
    <pre className="bg-gray-100 p-4 rounded my-4 overflow-x-auto">
      {children}
    </pre>
  ),
};

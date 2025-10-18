import PageWrapper from '@/components/PageWrapper';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper showBackButton={true}>
      <article className="prose prose-lg dark:prose-invert max-w-none">
        {children}
      </article>
    </PageWrapper>
  );
}

import PageWrapper from "@/components/PageWrapper";
import styles from "./page.module.css";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <PageWrapper title={`Article: ${slug}`}>
      <div className={styles.articleContainer}>
        <div className="prose dark:prose-invert max-w-none">
          <p className="mt-4">This is a placeholder for the article page.</p>
          <p className="text-gray-600 dark:text-gray-400">
            Article slug: <code>{slug}</code>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}

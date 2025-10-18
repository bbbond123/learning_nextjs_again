export default async function ArticlePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Article: {slug}</h1>
      <p className="mt-4">This is a placeholder for the article page.</p>
    </div>
  );
}

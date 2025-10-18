interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  children: React.ReactNode;
}

export default function Callout({
  type = 'info',
  title,
  children
}: CalloutProps) {
  const styles = {
    info: 'bg-blue-50 border-blue-500 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-100',
    success: 'bg-green-50 border-green-500 text-green-900 dark:bg-green-900/20 dark:text-green-100',
    error: 'bg-red-50 border-red-500 text-red-900 dark:bg-red-900/20 dark:text-red-100',
  };

  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    success: '✅',
    error: '❌',
  };

  return (
    <div className={`my-6 p-4 border-l-4 rounded ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icons[type]}</span>
        <div className="flex-1">
          {title && <p className="font-bold mb-2">{title}</p>}
          <div className="prose dark:prose-invert">{children}</div>
        </div>
      </div>
    </div>
  );
}

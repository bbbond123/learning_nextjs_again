'use client';

import { useState } from 'react';

export default function InteractiveCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="my-6 p-6 border-2 border-purple-300 rounded-lg bg-purple-50 dark:bg-purple-900/20">
      <h3 className="text-xl font-bold mb-4">交互式计数器</h3>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          -
        </button>
        <span className="text-3xl font-bold min-w-[60px] text-center">
          {count}
        </span>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          +
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          重置
        </button>
      </div>
    </div>
  );
}

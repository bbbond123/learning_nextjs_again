'use client';

import { useState } from 'react';

export default function LiveCodeEditor() {
  const [code, setCode] = useState(`function greet(name) {
  return 'Hello, ' + name + '!';
}

greet('MDX')`);
  const [output, setOutput] = useState('');

  const runCode = () => {
    try {
      // 注意：在生产环境中使用 eval 有安全风险，这里仅用于演示
      const result = eval(code);
      setOutput(String(result));
    } catch (error) {
      setOutput(`错误: ${error}`);
    }
  };

  return (
    <div className="my-6 border-2 border-indigo-300 rounded-lg overflow-hidden">
      <div className="bg-indigo-600 text-white px-4 py-2 font-bold">
        ⚡ 实时代码编辑器
      </div>
      <div className="grid md:grid-cols-2 gap-4 p-4">
        <div>
          <label className="block text-sm font-medium mb-2">代码编辑</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-48 p-3 font-mono text-sm border rounded bg-gray-50 dark:bg-gray-900"
            spellCheck={false}
          />
          <button
            onClick={runCode}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            运行代码
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">输出结果</label>
          <div className="h-48 p-3 font-mono text-sm border rounded bg-gray-50 dark:bg-gray-900 overflow-auto">
            {output || '点击"运行代码"查看结果'}
          </div>
        </div>
      </div>
    </div>
  );
}

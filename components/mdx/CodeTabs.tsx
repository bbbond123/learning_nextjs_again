'use client';

import React, { useState } from 'react';

interface CodeTabsProps {
  children: React.ReactNode;
}

export default function CodeTabs({ children }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = React.Children.toArray(children);

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="flex border-b bg-gray-100 dark:bg-gray-800">
        {tabs.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 font-medium transition ${
              activeTab === index
                ? 'bg-white dark:bg-gray-900 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Tab {index + 1}
          </button>
        ))}
      </div>
      <div className="p-4 bg-white dark:bg-gray-900">
        {tabs[activeTab]}
      </div>
    </div>
  );
}

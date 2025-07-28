'use client';

import Navigation from '@/components/Navigation';
import { useState } from 'react';

export default function ShoppingAds() {
  const [selectedAdvertiser, setSelectedAdvertiser] = useState('A광고주');

  // 광고주 목록
  const advertisers = ['A광고주', 'B광고주', 'C광고주'];

  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 bg-gray-50 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">쇼핑광고</h1>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">광고주:</label>
              <select
                value={selectedAdvertiser}
                onChange={(e) => setSelectedAdvertiser(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              >
                {advertisers.map((advertiser) => (
                  <option key={advertiser} value={advertiser}>
                    {advertiser}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-600">쇼핑광고 성과 분석 페이지입니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 
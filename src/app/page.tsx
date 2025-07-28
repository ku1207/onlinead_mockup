'use client';

import Navigation from '@/components/Navigation';
import { useState } from 'react';

export default function Dashboard() {
  const [selectedAdvertiser, setSelectedAdvertiser] = useState('A광고주');

  // 광고주 목록
  const advertisers = ['A광고주', 'B광고주', 'C광고주'];

  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 bg-gray-50 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 성과 분석 카드들 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">총 클릭수</h3>
              <p className="text-3xl font-bold text-blue-600">12,345</p>
              <p className="text-sm text-gray-500 mt-2">전월 대비 +15%</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">총 노출수</h3>
              <p className="text-3xl font-bold text-green-600">98,765</p>
              <p className="text-sm text-gray-500 mt-2">전월 대비 +8%</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">클릭률</h3>
              <p className="text-3xl font-bold text-purple-600">2.4%</p>
              <p className="text-sm text-gray-500 mt-2">전월 대비 +0.3%</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">총 비용</h3>
              <p className="text-3xl font-bold text-orange-600">₩1,234,567</p>
              <p className="text-sm text-gray-500 mt-2">전월 대비 +12%</p>
            </div>
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">최근 광고 성과</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">검색광고 캠페인</h4>
                  <p className="text-sm text-gray-500">2024년 1월 캠페인</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">+25%</p>
                  <p className="text-sm text-gray-500">클릭률</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">배너광고 캠페인</h4>
                  <p className="text-sm text-gray-500">2024년 1월 캠페인</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">+18%</p>
                  <p className="text-sm text-gray-500">노출수</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">쇼핑광고 캠페인</h4>
                  <p className="text-sm text-gray-500">2024년 1월 캠페인</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-purple-600">+32%</p>
                  <p className="text-sm text-gray-500">전환율</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

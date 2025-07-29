'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const [isBannerDropdownOpen, setIsBannerDropdownOpen] = useState(false);

  const pages = [
    { name: '대시보드', path: '/' },
    { name: '검색광고', path: '/search' },
    { name: '쇼핑광고', path: '/shopping' },
    { 
      name: '배너광고', 
      path: '/banner',
      hasDropdown: true,
      subPages: [
        { name: '매체 결과 데이터', path: '/banner/media-results' },
        { name: 'AI 소재 제안', path: '/banner/ai-creative' }
      ]
    },
    { name: '영상광고', path: '/video' },
  ];

  return (
    <div className="w-full bg-gray-50 border-b border-blue-500">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          {/* 서비스 로고 */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">AI 배너</h1>
          </div>

          {/* 페이지 목록 */}
          <nav className="flex items-center space-x-1">
            {pages.map((page) => (
              <div key={page.path} className="relative">
                {page.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => setIsBannerDropdownOpen(!isBannerDropdownOpen)}
                      className={`px-8 py-2 rounded-md text-sm font-medium transition-colors min-w-[140px] ${
                        pathname.startsWith(page.path)
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                      }`}
                    >
                      {page.name}
                    </button>
                    
                    {/* 드롭다운 메뉴 */}
                    <div className={`absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 transition-all duration-300 ${
                      isBannerDropdownOpen 
                        ? 'opacity-100 transform translate-y-0' 
                        : 'opacity-0 transform -translate-y-2 pointer-events-none'
                    }`}>
                      {page.subPages?.map((subPage) => (
                        <Link
                          key={subPage.path}
                          href={subPage.path}
                          onClick={() => setIsBannerDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm text-center transition-colors whitespace-nowrap ${
                            pathname === subPage.path
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {subPage.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={page.path}
                    className={`px-8 py-2 rounded-md text-sm font-medium transition-colors min-w-[140px] text-center ${
                      pathname === page.path
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                  >
                    {page.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* 계정 정보 */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-gray-900 text-sm font-medium">user@example.com</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-transparent border border-gray-300 text-blue-600 hover:bg-blue-600 hover:text-white rounded text-sm transition-colors">
                계정 정보
              </button>
              <button className="px-3 py-1 bg-transparent border border-gray-300 text-red-600 hover:bg-red-600 hover:text-white rounded text-sm transition-colors">
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
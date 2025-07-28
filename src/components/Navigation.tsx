'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navigation() {
  const pathname = usePathname();

  const pages = [
    { name: '대시보드', path: '/' },
    { name: '검색광고', path: '/search' },
    { name: '쇼핑광고', path: '/shopping' },
    { name: '배너광고', path: '/banner' },
    { name: '영상광고', path: '/video' },
  ];

  return (
    <div className="w-full bg-gray-50 border-b border-blue-500">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 서비스 로고 */}
          <div className="flex items-center">
            <Image
              src="/dash-logo.svg"
              alt="Dash Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>

          {/* 페이지 목록 */}
          <nav className="flex items-center space-x-1">
            {pages.map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === page.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {page.name}
              </Link>
            ))}
          </nav>

          {/* 계정 정보 */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-gray-900 font-medium text-sm">user@example.com</p>
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
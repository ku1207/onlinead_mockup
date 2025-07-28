# 온라인 광고 실적 확인 시스템

온라인 배너 광고 성과 분석을 위한 웹 애플리케이션입니다.

## 주요 기능

- **대시보드**: 광고 성과 요약 및 통계
- **검색광고**: 검색 광고 성과 분석
- **쇼핑광고**: 쇼핑 광고 성과 분석
- **배너광고**: 배너 광고 성과 분석
- **영상광고**: 영상 광고 성과 분석

## 기술 스택

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **배포**: Vercel

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx          # 대시보드 (메인 페이지)
│   ├── search/page.tsx   # 검색광고 페이지
│   ├── shopping/page.tsx # 쇼핑광고 페이지
│   ├── banner/page.tsx   # 배너광고 페이지
│   ├── video/page.tsx    # 영상광고 페이지
│   └── layout.tsx        # 루트 레이아웃
└── components/
    └── Navigation.tsx    # 네비게이션 컴포넌트
```

## 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 빌드

```bash
npm run build
```

## 배포

이 프로젝트는 Vercel을 통해 배포됩니다. GitHub 저장소를 Vercel에 연결하여 자동 배포를 설정할 수 있습니다.

## 레이아웃

- **좌측 영역 (1:9 비율)**: 네비게이션 바
  - 서비스 제목
  - 사용자 정보 (로그인 아이디, 계정 정보, 로그아웃)
  - 광고주 선택 (A광고주, B광고주, C광고주)
  - 페이지 목록 (대시보드, 검색광고, 쇼핑광고, 배너광고, 영상광고)
- **우측 영역**: 성과 분석 콘텐츠

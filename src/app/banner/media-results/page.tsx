'use client';

import Navigation from '@/components/Navigation';
import { useState } from 'react';

export default function MediaResults() {
  const [searchText, setSearchText] = useState('');
  const [isDetailSearchOpen, setIsDetailSearchOpen] = useState(false);
  const [isColumnPopupOpen, setIsColumnPopupOpen] = useState(false);
  
  // 세부 검색 상태들
  const getDefaultStartDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}-01`;
  };

  const getDefaultEndDate = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [startDate, setStartDate] = useState(getDefaultStartDate());
  const [endDate, setEndDate] = useState(getDefaultEndDate());
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedGenders, setSelectedGenders] = useState(['남성', '여성']);
  const [selectedAges, setSelectedAges] = useState(['10대', '20대', '30대', '40대', '50대', '60대', '70대', '80대', '90대']);
  const [selectedMetric, setSelectedMetric] = useState('');
  const [metricValue, setMetricValue] = useState('');
  const [metricCondition, setMetricCondition] = useState('이상');
  const [metricOperator, setMetricOperator] = useState('그리고');
  const [selectedVisualElement, setSelectedVisualElement] = useState('');
  const [selectedColorTone, setSelectedColorTone] = useState('');
  const [selectedGazeFlow, setSelectedGazeFlow] = useState('');
  const [selectedLargeCategory, setSelectedLargeCategory] = useState('');
  const [selectedSmallCategory, setSelectedSmallCategory] = useState('');
  const [brandName, setBrandName] = useState('');

  // 카테고리 데이터
  const categoryData = {
    '금융': ['은행', '보험', '증권', '카드', '저축은행', '캐피탈', '핀테크'],
    '통신': ['이동통신사', '알뜰폰', '인터넷', 'IPTV', '통신유통'],
    '유통·쇼핑': ['백화점', '마트', '편의점', '홈쇼핑', '이커머스', '리테일 전문몰'],
    '식음료': ['F&B브랜드', '외식프랜차이즈', '배달', '가공식품', '음료', '주류'],
    '패션·뷰티': ['패션(의류/잡화)', '뷰티(화장품/스킨케어)', '온라인 쇼핑몰'],
    '자동차·모빌리티': ['완성차', '수입차', '중고차', '렌터카', '리스', '내비게이션', 'EV'],
    '건설·부동산': ['시행사', '시공사', '분양대행', '부동산중개', '도시개발', '오피스텔'],
    '교육': ['입시', '초중고 교육', '성인교육', '외국어', '온라인 클래스', '학습지'],
    '여행·레저': ['OTA', '호텔', '항공', '렌터카', '놀이공원', '레저시설'],
    '공공·기관': ['지자체', '정부부처', '공공기관', '협회', '공익캠페인'],
    'IT·전자': ['가전', '모바일기기', 'B2B솔루션', 'SaaS', '보안', '클라우드'],
    '헬스케어': ['병원', '의원', '제약', '건강식품', '바이오', '의료기기'],
    '생활용품': ['주방', '욕실', '청소', '위생', '인테리어', '반려동물용품'],
    '엔터테인먼트': ['OTT', '영화', '방송', '공연', '음반', '팬 플랫폼'],
    '게임·e스포츠': ['모바일게임', '콘솔', 'PC게임', '게임사', '플랫폼', '스트리밍'],
    '물류·운송': ['택배', '물류', '퀵서비스', '창고', '배송대행'],
    '제조·산업체': ['중공업', '기계', '부품', '화학', '철강', 'B2B생산재'],
    '스타트업·기타': ['테크 스타트업', '플랫폼', 'O2O', '커머스', '공유경제'],
    '프랜차이즈': ['카페', '음식점', '교육', '피트니스', '기타 생활 서비스'],
    '기타': ['분류되지 않는 기타 광고주']
  };

  // 테이블 컬럼 표시 상태
  const allColumns = [
    '대카테고리', '소카테고리', '브랜드명', '캠페인명', '캠페인 기간', '광고플랫폼', '광고타겟', '타겟연령', '소재ID', '소재명',
    '노출수', '클릭수', 'CTR(%)', '전환수', 'CVR(%)', '광고비', '매출액', 'ROAS(%)',
    '소재', '메인카피', '메인카피 유형', '메인카피 비중(%)', '서브카피 비중(%)',
    'CTA위치', 'CTA비중(%)', '모델비중(%)', '제품비중(%)', '비주얼요소', '소재칼라톤', '시선흐름', '디자인분석'
  ];

  // 컬럼 그룹 정의
  const columnGroups = {
    기업정보: ['대카테고리', '소카테고리', '브랜드명'],
    광고정보: ['캠페인명', '캠페인 기간', '광고플랫폼', '광고타겟', '타겟연령', '소재ID', '소재명'],
    집행정보: ['노출수', '클릭수', 'CTR(%)', '전환수', 'CVR(%)', '광고비', '매출액', 'ROAS(%)'],
    분석정보: ['소재', '메인카피', '메인카피 유형', '메인카피 비중(%)', '서브카피 비중(%)', 'CTA위치', 'CTA비중(%)', '모델비중(%)', '제품비중(%)', '비주얼요소', '소재칼라톤', '시선흐름', '디자인분석']
  };

  const [visibleColumns, setVisibleColumns] = useState(allColumns);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);

  // 지표별 단위 매핑
  const metricUnits: { [key: string]: string } = {
    '노출수': '회',
    '클릭수': '회',
    'CTR': '%',
    '전환수': '회',
    'CVR': '%',
    '광고비': '원',
    '매출액': '원',
    'ROAS': '%',
    '메인카피 비중': '%',
    '서브카피 비중': '%',
    'CTA비중': '%',
    '제품비중': '%'
  };

  // 샘플 데이터 (실제로는 API에서 가져올 데이터)
  const sampleData = [
    {
      대카테고리: '패션·뷰티',
      소카테고리: '패션(의류/잡화)',
      브랜드명: '유니클로',
      캠페인명: '2024 신상 컬렉션',
      캠페인기간: '2024-01-01 ~ 2024-01-31',
      광고플랫폼: '메타',
      광고타겟: '여성',
      타겟연령: '20대',
      소재ID: 'BN001',
      소재명: '봄 신상 드레스',
      노출수: 125000,
      클릭수: 1250,
      CTR: 1.0,
      전환수: 125,
      CVR: 10.0,
      광고비: 500000,
      매출액: 2500000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '새봄 신상 50% 할인',
      메인카피유형: '할인·혜택형',
      메인카피비중: 30.5,
      서브카피비중: 15.2,
      CTA위치: '하단 우측',
      CTA비중: 12.3,
      모델비중: 45.8,
      제품비중: 25.5,
      비주얼요소: '실사',
      소재칼라톤: '브라이트톤',
      시선흐름: 'Z',
      디자인분석: '모델 중심의 감성적 어필로 브랜드 이미지 강화'
    },
    {
      대카테고리: '헬스케어',
      소카테고리: '화장품',
      브랜드명: '에스티로더',
      캠페인명: '안티에이징 크림',
      캠페인기간: '2024-02-01 ~ 2024-02-28',
      광고플랫폼: '구글',
      광고타겟: '여성',
      타겟연령: '30대',
      소재ID: 'BN002',
      소재명: '프리미엄 안티에이징',
      노출수: 98000,
      클릭수: 980,
      CTR: 1.0,
      전환수: 98,
      CVR: 10.0,
      광고비: 400000,
      매출액: 1960000,
      ROAS: 490.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '7일만에 확실한 변화',
      메인카피유형: '사실·데이터형',
      메인카피비중: 25.3,
      서브카피비중: 18.7,
      CTA위치: '중단 중앙',
      CTA비중: 14.2,
      모델비중: 35.4,
      제품비중: 40.2,
      비주얼요소: '실사',
      소재칼라톤: '소프트톤',
      시선흐름: 'F',
      디자인분석: '제품 중심의 기능성 강조로 신뢰감 형성'
    },
    {
      대카테고리: '금융',
      소카테고리: '은행',
      브랜드명: 'KB국민은행',
      캠페인명: '적금 특별 금리',
      캠페인기간: '2024-03-01 ~ 2024-03-31',
      광고플랫폼: '카카오',
      광고타겟: '남성',
      타겟연령: '30대',
      소재ID: 'BN003',
      소재명: '적금 상품 홍보',
      노출수: 85000,
      클릭수: 850,
      CTR: 1.0,
      전환수: 85,
      CVR: 10.0,
      광고비: 350000,
      매출액: 1700000,
      ROAS: 485.7,
      소재: '/placeholder-banner.jpg',
      메인카피: '3.5% 고금리 적금',
      메인카피유형: '사실·데이터형',
      메인카피비중: 28.1,
      서브카피비중: 16.5,
      CTA위치: '하단 중앙',
      CTA비중: 13.8,
      모델비중: 20.2,
      제품비중: 50.3,
      비주얼요소: '일러스트',
      소재칼라톤: '네온톤',
      시선흐름: 'F',
      디자인분석: '숫자 중심의 신뢰성 강조'
    },
    {
      대카테고리: '통신',
      소카테고리: '이동통신사',
      브랜드명: 'SKT',
      캠페인명: '5G 요금제 출시',
      캠페인기간: '2024-04-01 ~ 2024-04-30',
      광고플랫폼: '구글',
      광고타겟: '남성',
      타겟연령: '20대',
      소재ID: 'BN004',
      소재명: '5G 속도 체험',
      노출수: 110000,
      클릭수: 1100,
      CTR: 1.0,
      전환수: 110,
      CVR: 10.0,
      광고비: 450000,
      매출액: 2200000,
      ROAS: 488.9,
      소재: '/placeholder-banner.jpg',
      메인카피: '초고속 5G 체험',
      메인카피유형: '기능·성능형',
      메인카피비중: 32.4,
      서브카피비중: 14.7,
      CTA위치: '하단 좌측',
      CTA비중: 15.1,
      모델비중: 38.9,
      제품비중: 28.7,
      비주얼요소: '3D',
      소재칼라톤: '비비드톤',
      시선흐름: 'Z',
      디자인분석: '기술력과 속도감을 강조한 미래지향적 디자인'
    },
    {
      대카테고리: '유통·쇼핑',
      소카테고리: '백화점',
      브랜드명: '롯데백화점',
      캠페인명: '봄 정기세일',
      캠페인기간: '2024-05-01 ~ 2024-05-31',
      광고플랫폼: '메타',
      광고타겟: '여성',
      타겟연령: '40대',
      소재ID: 'BN005',
      소재명: '명품 할인 행사',
      노출수: 95000,
      클릭수: 950,
      CTR: 1.0,
      전환수: 95,
      CVR: 10.0,
      광고비: 380000,
      매출액: 1900000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '명품 최대 70% 할인',
      메인카피유형: '할인·혜택형',
      메인카피비중: 35.2,
      서브카피비중: 12.8,
      CTA위치: '중단 우측',
      CTA비중: 11.9,
      모델비중: 42.1,
      제품비중: 30.5,
      비주얼요소: '실사',
      소재칼라톤: '라이트톤',
      시선흐름: 'O',
      디자인분석: '고급스러운 분위기와 할인 혜택을 동시에 강조'
    },
    {
      대카테고리: '식음료',
      소카테고리: 'F&B브랜드',
      브랜드명: '스타벅스',
      캠페인명: '여름 신메뉴 출시',
      캠페인기간: '2024-06-01 ~ 2024-06-30',
      광고플랫폼: '틱톡',
      광고타겟: '여성',
      타겟연령: '20대',
      소재ID: 'BN006',
      소재명: '아이스 음료 신제품',
      노출수: 130000,
      클릭수: 1300,
      CTR: 1.0,
      전환수: 130,
      CVR: 10.0,
      광고비: 520000,
      매출액: 2600000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '시원한 여름 음료',
      메인카피유형: '감성·경험형',
      메인카피비중: 29.8,
      서브카피비중: 17.3,
      CTA위치: '하단 중앙',
      CTA비중: 14.5,
      모델비중: 35.7,
      제품비중: 48.2,
      비주얼요소: '실사',
      소재칼라톤: '소프트톤',
      시선흐름: 'F',
      디자인분석: '여름 분위기와 시원함을 강조한 상쾌한 이미지'
    },
    {
      대카테고리: '자동차·모빌리티',
      소카테고리: '완성차',
      브랜드명: '현대자동차',
      캠페인명: '신형 아반떼 출시',
      캠페인기간: '2024-07-01 ~ 2024-07-31',
      광고플랫폼: '구글',
      광고타겟: '남성',
      타겟연령: '30대',
      소재ID: 'BN007',
      소재명: '아반떼 신차 소개',
      노출수: 140000,
      클릭수: 1400,
      CTR: 1.0,
      전환수: 140,
      CVR: 10.0,
      광고비: 700000,
      매출액: 3500000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '완전히 새로워진 아반떼',
      메인카피유형: '기능·성능형',
      메인카피비중: 31.7,
      서브카피비중: 15.9,
      CTA위치: '하단 우측',
      CTA비중: 12.6,
      모델비중: 25.3,
      제품비중: 55.8,
      비주얼요소: '실사',
      소재칼라톤: '다크톤',
      시선흐름: 'Z',
      디자인분석: '세련된 디자인과 성능을 강조한 프리미엄 이미지'
    },
    {
      대카테고리: '건설·부동산',
      소카테고리: '시행사',
      브랜드명: '대우건설',
      캠페인명: '프루지오 분양',
      캠페인기간: '2024-08-01 ~ 2024-08-31',
      광고플랫폼: '카카오',
      광고타겟: '남성',
      타겟연령: '40대',
      소재ID: 'BN008',
      소재명: '아파트 분양 광고',
      노출수: 75000,
      클릭수: 750,
      CTR: 1.0,
      전환수: 75,
      CVR: 10.0,
      광고비: 300000,
      매출액: 1500000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '프리미엄 주거공간',
      메인카피유형: '감성·경험형',
      메인카피비중: 33.1,
      서브카피비중: 13.4,
      CTA위치: '중단 중앙',
      CTA비중: 16.2,
      모델비중: 30.8,
      제품비중: 40.5,
      비주얼요소: '실사',
      소재칼라톤: '브라이트톤',
      시선흐름: 'F',
      디자인분석: '안정감과 고급스러움을 동시에 표현'
    },
    {
      대카테고리: '교육',
      소카테고리: '입시',
      브랜드명: '메가스터디',
      캠페인명: '수능 대비 특강',
      캠페인기간: '2024-09-01 ~ 2024-09-30',
      광고플랫폼: '메타',
      광고타겟: '남성',
      타겟연령: '10대',
      소재ID: 'BN009',
      소재명: '수능 학습 프로그램',
      노출수: 120000,
      클릭수: 1200,
      CTR: 1.0,
      전환수: 120,
      CVR: 10.0,
      광고비: 480000,
      매출액: 2400000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '수능 1등급 보장',
      메인카피유형: '사실·데이터형',
      메인카피비중: 36.4,
      서브카피비중: 11.7,
      CTA위치: '하단 좌측',
      CTA비중: 17.3,
      모델비중: 28.5,
      제품비중: 32.9,
      비주얼요소: '일러스트',
      소재칼라톤: '네온톤',
      시선흐름: 'Z',
      디자인분석: '성취감과 목표의식을 강조한 동기부여 디자인'
    },
    {
      대카테고리: '여행·레저',
      소카테고리: 'OTA',
      브랜드명: '여기어때',
      캠페인명: '휴가철 숙박 할인',
      캠페인기간: '2024-10-01 ~ 2024-10-31',
      광고플랫폼: '구글',
      광고타겟: '여성',
      타겟연령: '30대',
      소재ID: 'BN010',
      소재명: '펜션 예약 서비스',
      노출수: 105000,
      클릭수: 1050,
      CTR: 1.0,
      전환수: 105,
      CVR: 10.0,
      광고비: 420000,
      매출액: 2100000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '특가 숙박 예약',
      메인카피유형: '할인·혜택형',
      메인카피비중: 27.9,
      서브카피비중: 18.5,
      CTA위치: '하단 우측',
      CTA비중: 13.7,
      모델비중: 40.3,
      제품비중: 26.1,
      비주얼요소: '실사',
      소재칼라톤: '소프트톤',
      시선흐름: 'O',
      디자인분석: '편안함과 여유로움을 표현한 휴식 지향 디자인'
    },
    {
      대카테고리: '공공·기관',
      소카테고리: '지자체',
      브랜드명: '서울시청',
      캠페인명: '환경보호 캠페인',
      캠페인기간: '2024-11-01 ~ 2024-11-30',
      광고플랫폼: '메타',
      광고타겟: '남성',
      타겟연령: '50대',
      소재ID: 'BN011',
      소재명: '분리수거 홍보',
      노출수: 60000,
      클릭수: 600,
      CTR: 1.0,
      전환수: 60,
      CVR: 10.0,
      광고비: 240000,
      매출액: 1200000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '깨끗한 지구를 위해',
      메인카피유형: '감성·경험형',
      메인카피비중: 32.6,
      서브카피비중: 14.8,
      CTA위치: '중단 좌측',
      CTA비중: 15.9,
      모델비중: 35.2,
      제품비중: 22.4,
      비주얼요소: '일러스트',
      소재칼라톤: '그레이시톤',
      시선흐름: 'F',
      디자인분석: '친환경과 사회적 책임을 강조한 공익적 메시지'
    },
    {
      대카테고리: 'IT·전자',
      소카테고리: '가전',
      브랜드명: '삼성전자',
      캠페인명: '갤럭시 신제품 출시',
      캠페인기간: '2024-12-01 ~ 2024-12-31',
      광고플랫폼: '틱톡',
      광고타겟: '남성',
      타겟연령: '20대',
      소재ID: 'BN012',
      소재명: '스마트폰 신기능',
      노출수: 180000,
      클릭수: 1800,
      CTR: 1.0,
      전환수: 180,
      CVR: 10.0,
      광고비: 720000,
      매출액: 3600000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '혁신의 시작',
      메인카피유형: '기능·성능형',
      메인카피비중: 34.8,
      서브카피비중: 12.3,
      CTA위치: '하단 중앙',
      CTA비중: 16.7,
      모델비중: 32.1,
      제품비중: 52.6,
      비주얼요소: '3D',
      소재칼라톤: '다크톤',
      시선흐름: 'Z',
      디자인분석: '첨단 기술과 미래감을 강조한 하이테크 이미지'
    },
    {
      대카테고리: '헬스케어',
      소카테고리: '병원',
      브랜드명: '서울아산병원',
      캠페인명: '건강검진 홍보',
      캠페인기간: '2024-01-15 ~ 2024-02-15',
      광고플랫폼: '카카오',
      광고타겟: '여성',
      타겟연령: '40대',
      소재ID: 'BN013',
      소재명: '종합검진 패키지',
      노출수: 70000,
      클릭수: 700,
      CTR: 1.0,
      전환수: 70,
      CVR: 10.0,
      광고비: 280000,
      매출액: 1400000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '건강한 내일을 위해',
      메인카피유형: '감성·경험형',
      메인카피비중: 31.2,
      서브카피비중: 16.1,
      CTA위치: '중단 우측',
      CTA비중: 14.8,
      모델비중: 38.7,
      제품비중: 29.3,
      비주얼요소: '실사',
      소재칼라톤: '라이트톤',
      시선흐름: 'F',
      디자인분석: '신뢰감과 안정감을 주는 의료진의 전문성 강조'
    },
    {
      대카테고리: '생활용품',
      소카테고리: '주방',
      브랜드명: '쿠쿠',
      캠페인명: '압력밥솥 신제품',
      캠페인기간: '2024-02-15 ~ 2024-03-15',
      광고플랫폼: '구글',
      광고타겟: '여성',
      타겟연령: '30대',
      소재ID: 'BN014',
      소재명: '스마트 압력밥솥',
      노출수: 90000,
      클릭수: 900,
      CTR: 1.0,
      전환수: 90,
      CVR: 10.0,
      광고비: 360000,
      매출액: 1800000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '완벽한 밥맛의 비밀',
      메인카피유형: '기능·성능형',
      메인카피비중: 33.5,
      서브카피비중: 13.9,
      CTA위치: '하단 좌측',
      CTA비중: 15.4,
      모델비중: 25.8,
      제품비중: 47.3,
      비주얼요소: '실사',
      소재칼라톤: '비비드톤',
      시선흐름: 'O',
      디자인분석: '가정의 따뜻함과 제품의 실용성을 동시에 강조'
    },
    {
      대카테고리: '엔터테인먼트',
      소카테고리: 'OTT',
      브랜드명: '넷플릭스',
      캠페인명: '신작 드라마 홍보',
      캠페인기간: '2024-03-15 ~ 2024-04-15',
      광고플랫폼: '메타',
      광고타겟: '여성',
      타겟연령: '20대',
      소재ID: 'BN015',
      소재명: '오리지널 시리즈',
      노출수: 160000,
      클릭수: 1600,
      CTR: 1.0,
      전환수: 160,
      CVR: 10.0,
      광고비: 640000,
      매출액: 3200000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '지금 가장 핫한 드라마',
      메인카피유형: '감성·경험형',
      메인카피비중: 28.7,
      서브카피비중: 17.8,
      CTA위치: '하단 중앙',
      CTA비중: 12.9,
      모델비중: 44.6,
      제품비중: 21.3,
      비주얼요소: '실사',
      소재칼라톤: '다크톤',
      시선흐름: 'Z',
      디자인분석: '드라마틱한 분위기와 몰입감을 강조한 엔터테인먼트 디자인'
    },
    {
      대카테고리: '게임·e스포츠',
      소카테고리: '모바일게임',
      브랜드명: '넥슨',
      캠페인명: '신작 RPG 출시',
      캠페인기간: '2024-04-15 ~ 2024-05-15',
      광고플랫폼: '틱톡',
      광고타겟: '남성',
      타겟연령: '20대',
      소재ID: 'BN016',
      소재명: '모바일 RPG 게임',
      노출수: 200000,
      클릭수: 2000,
      CTR: 1.0,
      전환수: 200,
      CVR: 10.0,
      광고비: 800000,
      매출액: 4000000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '전설의 모험이 시작된다',
      메인카피유형: '감성·경험형',
      메인카피비중: 30.1,
      서브카피비중: 15.6,
      CTA위치: '하단 우측',
      CTA비중: 18.2,
      모델비중: 42.3,
      제품비중: 35.7,
      비주얼요소: '3D',
      소재칼라톤: '네온톤',
      시선흐름: 'Z',
      디자인분석: '판타지 세계관과 액션감을 강조한 게임 특화 디자인'
    },
    {
      대카테고리: '물류·운송',
      소카테고리: '택배',
      브랜드명: 'CJ대한통운',
      캠페인명: '당일배송 서비스',
      캠페인기간: '2024-05-15 ~ 2024-06-15',
      광고플랫폼: '카카오',
      광고타겟: '남성',
      타겟연령: '30대',
      소재ID: 'BN017',
      소재명: '빠른 배송 서비스',
      노출수: 100000,
      클릭수: 1000,
      CTR: 1.0,
      전환수: 100,
      CVR: 10.0,
      광고비: 400000,
      매출액: 2000000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '오늘 주문, 오늘 도착',
      메인카피유형: '기능·성능형',
      메인카피비중: 35.8,
      서브카피비중: 12.1,
      CTA위치: '중단 중앙',
      CTA비중: 16.5,
      모델비중: 28.9,
      제품비중: 31.4,
      비주얼요소: '일러스트',
      소재칼라톤: '브라이트톤',
      시선흐름: 'F',
      디자인분석: '신속함과 정확성을 강조한 서비스 중심 디자인'
    },
    {
      대카테고리: '제조·산업체',
      소카테고리: '화학',
      브랜드명: 'LG화학',
      캠페인명: '친환경 소재 개발',
      캠페인기간: '2024-06-15 ~ 2024-07-15',
      광고플랫폼: '구글',
      광고타겟: '남성',
      타겟연령: '40대',
      소재ID: 'BN018',
      소재명: 'ESG 경영 홍보',
      노출수: 65000,
      클릭수: 650,
      CTR: 1.0,
      전환수: 65,
      CVR: 10.0,
      광고비: 260000,
      매출액: 1300000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '지속가능한 미래를 위해',
      메인카피유형: '감성·경험형',
      메인카피비중: 32.9,
      서브카피비중: 14.2,
      CTA위치: '하단 좌측',
      CTA비중: 13.6,
      모델비중: 22.7,
      제품비중: 38.5,
      비주얼요소: '실사',
      소재칼라톤: '그레이시톤',
      시선흐름: 'F',
      디자인분석: '기업의 사회적 책임과 혁신 기술을 강조'
    },
    {
      대카테고리: '스타트업·기타',
      소카테고리: '테크 스타트업',
      브랜드명: '토스',
      캠페인명: '간편결제 서비스',
      캠페인기간: '2024-07-15 ~ 2024-08-15',
      광고플랫폼: '메타',
      광고타겟: '여성',
      타겟연령: '20대',
      소재ID: 'BN019',
      소재명: '핀테크 앱 홍보',
      노출수: 150000,
      클릭수: 1500,
      CTR: 1.0,
      전환수: 150,
      CVR: 10.0,
      광고비: 600000,
      매출액: 3000000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '송금이 이렇게 쉬울 줄이야',
      메인카피유형: '감성·경험형',
      메인카피비중: 29.4,
      서브카피비중: 16.7,
      CTA위치: '하단 중앙',
      CTA비중: 17.8,
      모델비중: 36.8,
      제품비중: 24.1,
      비주얼요소: '일러스트',
      소재칼라톤: '비비드톤',
      시선흐름: 'O',
      디자인분석: '젊고 친근한 이미지로 금융 서비스의 접근성 강조'
    },
    {
      대카테고리: '프랜차이즈',
      소카테고리: '카페',
      브랜드명: '이디야커피',
      캠페인명: '신메뉴 음료 출시',
      캠페인기간: '2024-08-15 ~ 2024-09-15',
      광고플랫폼: '구글',
      광고타겟: '여성',
      타겟연령: '30대',
      소재ID: 'BN020',
      소재명: '시즌 한정 음료',
      노출수: 115000,
      클릭수: 1150,
      CTR: 1.0,
      전환수: 115,
      CVR: 10.0,
      광고비: 460000,
      매출액: 2300000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '가을 한정 특별한 맛',
      메인카피유형: '감성·경험형',
      메인카피비중: 31.6,
      서브카피비중: 15.3,
      CTA위치: '하단 우측',
      CTA비중: 14.1,
      모델비중: 33.4,
      제품비중: 42.7,
      비주얼요소: '실사',
      소재칼라톤: '소프트톤',
      시선흐름: 'F',
      디자인분석: '계절감과 따뜻함을 표현한 카페 특화 디자인'
    },
    {
      대카테고리: '기타',
      소카테고리: '분류되지 않는 기타 광고주',
      브랜드명: '다이소',
      캠페인명: '생활용품 대전',
      캠페인기간: '2024-09-15 ~ 2024-10-15',
      광고플랫폼: '틱톡',
      광고타겟: '여성',
      타겟연령: '40대',
      소재ID: 'BN021',
      소재명: '생활용품 할인행사',
      노출수: 80000,
      클릭수: 800,
      CTR: 1.0,
      전환수: 80,
      CVR: 10.0,
      광고비: 320000,
      매출액: 1600000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '일상을 더 편리하게',
      메인카피유형: '기능·성능형',
      메인카피비중: 34.2,
      서브카피비중: 13.5,
      CTA위치: '중단 좌측',
      CTA비중: 15.7,
      모델비중: 27.1,
      제품비중: 45.9,
      비주얼요소: '일러스트',
      소재칼라톤: '라이트톤',
      시선흐름: 'O',
      디자인분석: '실용성과 경제성을 강조한 생활밀착형 디자인'
    },
    {
      대카테고리: '패션·뷰티',
      소카테고리: '뷰티(화장품/스킨케어)',
      브랜드명: '아모레퍼시픽',
      캠페인명: '안티에이징 라인',
      캠페인기간: '2024-10-15 ~ 2024-11-15',
      광고플랫폼: '카카오',
      광고타겟: '여성',
      타겟연령: '50대',
      소재ID: 'BN022',
      소재명: '프리미엄 스킨케어',
      노출수: 95000,
      클릭수: 950,
      CTR: 1.0,
      전환수: 95,
      CVR: 10.0,
      광고비: 380000,
      매출액: 1900000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '젊음을 되찾는 시간',
      메인카피유형: '감성·경험형',
      메인카피비중: 30.8,
      서브카피비중: 16.4,
      CTA위치: '하단 중앙',
      CTA비중: 13.2,
      모델비중: 48.3,
      제품비중: 33.6,
      비주얼요소: '실사',
      소재칼라톤: '라이트톤',
      시선흐름: 'F',
      디자인분석: '우아함과 품격을 강조한 프리미엄 뷰티 이미지'
    },
    {
      대카테고리: '금융',
      소카테고리: '보험',
      브랜드명: '삼성화재',
      캠페인명: '자동차보험 갱신',
      캠페인기간: '2024-11-15 ~ 2024-12-15',
      광고플랫폼: '메타',
      광고타겟: '남성',
      타겟연령: '40대',
      소재ID: 'BN023',
      소재명: '자동차보험 상품',
      노출수: 110000,
      클릭수: 1100,
      CTR: 1.0,
      전환수: 110,
      CVR: 10.0,
      광고비: 440000,
      매출액: 2200000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '든든한 보장, 합리적 보험료',
      메인카피유형: '사실·데이터형',
      메인카피비중: 32.1,
      서브카피비중: 14.9,
      CTA위치: '하단 우측',
      CTA비중: 16.3,
      모델비중: 31.5,
      제품비중: 29.8,
      비주얼요소: '실사',
      소재칼라톤: '다크톤',
      시선흐름: 'Z',
      디자인분석: '신뢰감과 안정성을 강조한 보험 전문 디자인'
    },
    {
      대카테고리: '통신',
      소카테고리: '인터넷',
      브랜드명: 'KT',
      캠페인명: '기가인터넷 설치',
      캠페인기간: '2024-12-15 ~ 2025-01-15',
      광고플랫폼: '구글',
      광고타겟: '남성',
      타겟연령: '30대',
      소재ID: 'BN024',
      소재명: '초고속 인터넷',
      노출수: 125000,
      클릭수: 1250,
      CTR: 1.0,
      전환수: 125,
      CVR: 10.0,
      광고비: 500000,
      매출액: 2500000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '기가급 속도 체험',
      메인카피유형: '기능·성능형',
      메인카피비중: 33.7,
      서브카피비중: 12.8,
      CTA위치: '중단 우측',
      CTA비중: 15.9,
      모델비중: 26.4,
      제품비중: 44.2,
      비주얼요소: '3D',
      소재칼라톤: '비비드톤',
      시선흐름: 'Z',
      디자인분석: '속도감과 연결성을 시각적으로 표현한 통신 특화 디자인'
    },
    {
      대카테고리: '유통·쇼핑',
      소카테고리: '이커머스',
      브랜드명: '쿠팡',
      캠페인명: '연말 특가 세일',
      캠페인기간: '2024-01-01 ~ 2024-01-15',
      광고플랫폼: '틱톡',
      광고타겟: '여성',
      타겟연령: '20대',
      소재ID: 'BN025',
      소재명: '온라인 쇼핑몰',
      노출수: 170000,
      클릭수: 1700,
      CTR: 1.0,
      전환수: 170,
      CVR: 10.0,
      광고비: 680000,
      매출액: 3400000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '로켓배송으로 바로바로',
      메인카피유형: '기능·성능형',
      메인카피비중: 28.5,
      서브카피비중: 17.1,
      CTA위치: '하단 좌측',
      CTA비중: 18.4,
      모델비중: 38.2,
      제품비중: 26.9,
      비주얼요소: '일러스트',
      소재칼라톤: '네온톤',
      시선흐름: 'O',
      디자인분석: '편리함과 신속함을 강조한 이커머스 특화 디자인'
    },
    {
      대카테고리: '식음료',
      소카테고리: '외식프랜차이즈',
      브랜드명: '맥도날드',
      캠페인명: '신메뉴 버거 출시',
      캠페인기간: '2024-01-15 ~ 2024-02-15',
      광고플랫폼: '메타',
      광고타겟: '남성',
      타겟연령: '20대',
      소재ID: 'BN026',
      소재명: '프리미엄 버거',
      노출수: 140000,
      클릭수: 1400,
      CTR: 1.0,
      전환수: 140,
      CVR: 10.0,
      광고비: 560000,
      매출액: 2800000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '새로운 맛의 발견',
      메인카피유형: '감성·경험형',
      메인카피비중: 31.3,
      서브카피비중: 15.8,
      CTA위치: '하단 중앙',
      CTA비중: 16.1,
      모델비중: 29.7,
      제품비중: 51.4,
      비주얼요소: '실사',
      소재칼라톤: '브라이트톤',
      시선흐름: 'F',
      디자인분석: '맛있어 보이는 비주얼과 즐거운 식사 경험 강조'
    },
    {
      대카테고리: '자동차·모빌리티',
      소카테고리: '수입차',
      브랜드명: 'BMW',
      캠페인명: '신형 X5 출시',
      캠페인기간: '2024-02-15 ~ 2024-03-15',
      광고플랫폼: '카카오',
      광고타겟: '남성',
      타겟연령: '50대',
      소재ID: 'BN027',
      소재명: '프리미엄 SUV',
      노출수: 85000,
      클릭수: 850,
      CTR: 1.0,
      전환수: 85,
      CVR: 10.0,
      광고비: 850000,
      매출액: 4250000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '최고의 드라이빙 플레저',
      메인카피유형: '감성·경험형',
      메인카피비중: 30.2,
      서브카피비중: 16.5,
      CTA위치: '중단 중앙',
      CTA비중: 12.7,
      모델비중: 22.8,
      제품비중: 58.3,
      비주얼요소: '실사',
      소재칼라톤: '다크톤',
      시선흐름: 'Z',
      디자인분석: '럭셔리와 퍼포먼스를 동시에 강조한 프리미엄 브랜드 이미지'
    },
    {
      대카테고리: '건설·부동산',
      소카테고리: '부동산중개',
      브랜드명: '직방',
      캠페인명: '부동산 앱 서비스',
      캠페인기간: '2024-03-15 ~ 2024-04-15',
      광고플랫폼: '구글',
      광고타겟: '여성',
      타겟연령: '30대',
      소재ID: 'BN028',
      소재명: '부동산 플랫폼',
      노출수: 105000,
      클릭수: 1050,
      CTR: 1.0,
      전환수: 105,
      CVR: 10.0,
      광고비: 420000,
      매출액: 2100000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '내 집 마련의 첫걸음',
      메인카피유형: '감성·경험형',
      메인카피비중: 32.4,
      서브카피비중: 14.6,
      CTA위치: '하단 우측',
      CTA비중: 17.2,
      모델비중: 34.9,
      제품비중: 28.5,
      비주얼요소: '일러스트',
      소재칼라톤: '소프트톤',
      시선흐름: 'F',
      디자인분석: '꿈과 희망을 담은 주거 공간의 가치 강조'
    },
    {
      대카테고리: '교육',
      소카테고리: '외국어',
      브랜드명: 'EF교육',
      캠페인명: '영어회화 과정',
      캠페인기간: '2024-04-15 ~ 2024-05-15',
      광고플랫폼: '메타',
      광고타겟: '여성',
      타겟연령: '20대',
      소재ID: 'BN029',
      소재명: '온라인 영어교육',
      노출수: 120000,
      클릭수: 1200,
      CTR: 1.0,
      전환수: 120,
      CVR: 10.0,
      광고비: 480000,
      매출액: 2400000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '네이티브처럼 영어하기',
      메인카피유형: '감성·경험형',
      메인카피비중: 29.6,
      서브카피비중: 17.4,
      CTA위치: '하단 좌측',
      CTA비중: 15.8,
      모델비중: 41.2,
      제품비중: 24.7,
      비주얼요소: '실사',
      소재칼라톤: '비비드톤',
      시선흐름: 'O',
      디자인분석: '글로벌 소통과 성장 가능성을 강조한 교육 특화 디자인'
    },
    {
      대카테고리: '여행·레저',
      소카테고리: '항공',
      브랜드명: '대한항공',
      캠페인명: '해외여행 특가',
      캠페인기간: '2024-05-15 ~ 2024-06-15',
      광고플랫폼: '틱톡',
      광고타겟: '여성',
      타겟연령: '40대',
      소재ID: 'BN030',
      소재명: '항공료 할인',
      노출수: 90000,
      클릭수: 900,
      CTR: 1.0,
      전환수: 90,
      CVR: 10.0,
      광고비: 360000,
      매출액: 1800000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '꿈꿔왔던 그 곳으로',
      메인카피유형: '감성·경험형',
      메인카피비중: 31.8,
      서브카피비중: 15.1,
      CTA위치: '중단 좌측',
      CTA비중: 14.3,
      모델비중: 37.6,
      제품비중: 32.1,
      비주얼요소: '실사',
      소재칼라톤: '라이트톤',
      시선흐름: 'F',
      디자인분석: '여행의 낭만과 설렘을 표현한 항공사 특화 디자인'
    },
    {
      대카테고리: '공공·기관',
      소카테고리: '공공기관',
      브랜드명: '한국관광공사',
      캠페인명: '국내관광 활성화',
      캠페인기간: '2024-06-15 ~ 2024-07-15',
      광고플랫폼: '카카오',
      광고타겟: '남성',
      타겟연령: '30대',
      소재ID: 'BN031',
      소재명: '국내여행 홍보',
      노출수: 75000,
      클릭수: 750,
      CTR: 1.0,
      전환수: 75,
      CVR: 10.0,
      광고비: 300000,
      매출액: 1500000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '아름다운 우리나라 여행',
      메인카피유형: '감성·경험형',
      메인카피비중: 33.9,
      서브카피비중: 13.2,
      CTA위치: '하단 중앙',
      CTA비중: 15.6,
      모델비중: 39.8,
      제품비중: 27.4,
      비주얼요소: '실사',
      소재칼라톤: '브라이트톤',
      시선흐름: 'O',
      디자인분석: '한국의 자연미와 문화적 가치를 강조한 관광 홍보 디자인'
    },
    {
      대카테고리: 'IT·전자',
      소카테고리: '모바일기기',
      브랜드명: '애플',
      캠페인명: '아이폰 신제품',
      캠페인기간: '2024-07-15 ~ 2024-08-15',
      광고플랫폼: '구글',
      광고타겟: '남성',
      타겟연령: '20대',
      소재ID: 'BN032',
      소재명: '아이폰 15 Pro',
      노출수: 220000,
      클릭수: 2200,
      CTR: 1.0,
      전환수: 220,
      CVR: 10.0,
      광고비: 1100000,
      매출액: 5500000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '프로를 위한 선택',
      메인카피유형: '기능·성능형',
      메인카피비중: 35.4,
      서브카피비중: 11.9,
      CTA위치: '하단 우측',
      CTA비중: 17.5,
      모델비중: 28.3,
      제품비중: 56.7,
      비주얼요소: '3D',
      소재칼라톤: '다크톤',
      시선흐름: 'Z',
      디자인분석: '미니멀하고 세련된 디자인으로 프리미엄 기술력 강조'
    },
    {
      대카테고리: '헬스케어',
      소카테고리: '제약',
      브랜드명: '유한양행',
      캠페인명: '감기약 신제품',
      캠페인기간: '2024-08-15 ~ 2024-09-15',
      광고플랫폼: '메타',
      광고타겟: '여성',
      타겟연령: '40대',
      소재ID: 'BN033',
      소재명: '종합감기약',
      노출수: 85000,
      클릭수: 850,
      CTR: 1.0,
      전환수: 85,
      CVR: 10.0,
      광고비: 340000,
      매출액: 1700000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '빠른 감기 회복',
      메인카피유형: '기능·성능형',
      메인카피비중: 34.6,
      서브카피비중: 13.1,
      CTA위치: '중단 우측',
      CTA비중: 16.8,
      모델비중: 32.4,
      제품비중: 41.9,
      비주얼요소: '실사',
      소재칼라톤: '소프트톤',
      시선흐름: 'F',
      디자인분석: '신뢰감과 효능을 강조한 의약품 특화 디자인'
    },
    {
      대카테고리: '생활용품',
      소카테고리: '욕실',
      브랜드명: 'P&G',
      캠페인명: '세정용품 신제품',
      캠페인기간: '2024-09-15 ~ 2024-10-15',
      광고플랫폼: '틱톡',
      광고타겟: '여성',
      타겟연령: '30대',
      소재ID: 'BN034',
      소재명: '욕실 청소용품',
      노출수: 100000,
      클릭수: 1000,
      CTR: 1.0,
      전환수: 100,
      CVR: 10.0,
      광고비: 400000,
      매출액: 2000000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '깨끗함의 새로운 기준',
      메인카피유형: '기능·성능형',
      메인카피비중: 32.7,
      서브카피비중: 14.5,
      CTA위치: '하단 좌측',
      CTA비중: 15.2,
      모델비중: 26.9,
      제품비중: 49.6,
      비주얼요소: '일러스트',
      소재칼라톤: '라이트톤',
      시선흐름: 'O',
      디자인분석: '청결함과 효과를 시각적으로 표현한 생활용품 디자인'
    },
    {
      대카테고리: '엔터테인먼트',
      소카테고리: '영화',
      브랜드명: 'CGV',
      캠페인명: '블록버스터 영화',
      캠페인기간: '2024-10-15 ~ 2024-11-15',
      광고플랫폼: '카카오',
      광고타겟: '남성',
      타겟연령: '20대',
      소재ID: 'BN035',
      소재명: '영화관 홍보',
      노출수: 135000,
      클릭수: 1350,
      CTR: 1.0,
      전환수: 135,
      CVR: 10.0,
      광고비: 540000,
      매출액: 2700000,
      ROAS: 500.0,
      소재: '/placeholder-banner.jpg',
      메인카피: '최고의 영화 경험',
      메인카피유형: '감성·경험형',
      메인카피비중: 28.3,
      서브카피비중: 18.1,
      CTA위치: '하단 중앙',
      CTA비중: 13.4,
      모델비중: 43.7,
      제품비중: 22.8,
      비주얼요소: '실사',
      소재칼라톤: '다크톤',
      시선흐름: 'Z',
      디자인분석: '영화의 스펙터클과 몰입감을 강조한 엔터테인먼트 디자인'
    }
  ];

  const [filteredData, setFilteredData] = useState(sampleData);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // 기본 검색 함수
  const handleBasicSearch = () => {
    let filtered = sampleData;
    
    if (searchText) {
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
    
    setFilteredData(filtered);
  };

  // 세부 검색 함수
  const handleDetailSearch = () => {
    let filtered = sampleData;
    
    // 기본 키워드 검색
    if (searchText) {
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
    
    // 날짜 필터
    if (startDate && endDate) {
      filtered = filtered.filter(item => {
        const campaignDates = item.캠페인기간.split(' ~ ');
        const campaignStart = new Date(campaignDates[0]);
        const campaignEnd = new Date(campaignDates[1]);
        const filterStart = new Date(startDate);
        const filterEnd = new Date(endDate);
        
        return campaignStart >= filterStart && campaignEnd <= filterEnd;
      });
    }
    
    // 대카테고리 필터
    if (selectedLargeCategory) {
      filtered = filtered.filter(item => item.대카테고리 === selectedLargeCategory);
    }
    
    // 소카테고리 필터
    if (selectedSmallCategory) {
      filtered = filtered.filter(item => item.소카테고리 === selectedSmallCategory);
    }
    
    // 브랜드명 필터
    if (brandName) {
      filtered = filtered.filter(item => 
        item.브랜드명.toLowerCase().includes(brandName.toLowerCase())
      );
    }
    
    // 플랫폼 필터
    if (selectedPlatform) {
      filtered = filtered.filter(item => item.광고플랫폼 === selectedPlatform);
    }
    
    // 성별 필터
    if (selectedGenders.length > 0 && selectedGenders.length < 2) {
      filtered = filtered.filter(item => selectedGenders.includes(item.광고타겟));
    }
    
    // 연령 필터
    if (selectedAges.length > 0 && selectedAges.length < 9) {
      filtered = filtered.filter(item => selectedAges.includes(item.타겟연령));
    }
    
    // 비주얼 요소 필터
    if (selectedVisualElement) {
      filtered = filtered.filter(item => item.비주얼요소 === selectedVisualElement);
    }
    
    // 칼라톤 필터
    if (selectedColorTone) {
      filtered = filtered.filter(item => item.소재칼라톤 === selectedColorTone);
    }
    
    // 시선흐름 필터
    if (selectedGazeFlow) {
      filtered = filtered.filter(item => item.시선흐름 === selectedGazeFlow);
    }
    
    setFilteredData(filtered);
  };

  // 대카테고리 변경 시 소카테고리 초기화
  const handleLargeCategoryChange = (category: string) => {
    setSelectedLargeCategory(category);
    setSelectedSmallCategory('');
  };

  // 성별 체크박스 핸들러
  const handleGenderChange = (gender: string) => {
    setSelectedGenders(prev => 
      prev.includes(gender) 
        ? prev.filter(g => g !== gender)
        : [...prev, gender]
    );
  };

  // 연령 체크박스 핸들러
  const handleAgeChange = (age: string) => {
    setSelectedAges(prev => 
      prev.includes(age) 
        ? prev.filter(a => a !== age)
        : [...prev, age]
    );
  };

  // 컬럼 표시/숨김 토글
  const handleColumnToggle = (column: string) => {
    setVisibleColumns(prev => 
      prev.includes(column) 
        ? prev.filter(col => col !== column)
        : [...prev, column]
    );
  };

  // 그룹별 전체 선택/해제 핸들러
  const handleGroupToggle = (groupName: string, isChecked: boolean) => {
    const groupColumns = columnGroups[groupName as keyof typeof columnGroups];
    if (isChecked) {
      setVisibleColumns(prev => [...prev, ...groupColumns.filter(col => !prev.includes(col))]);
    } else {
      setVisibleColumns(prev => prev.filter(col => !groupColumns.includes(col)));
    }
  };

  // 그룹별 선택 상태 확인
  const isGroupSelected = (groupName: string) => {
    const groupColumns = columnGroups[groupName as keyof typeof columnGroups];
    return groupColumns.every(col => visibleColumns.includes(col));
  };

  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 bg-gray-50 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">매체 결과 데이터</h1>
          </div>
          
          {/* 기본 검색 영역 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center gap-4">
              {/* 키워드 검색 */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="캠페인명, 메인카피 등 검색"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* 버튼 영역 */}
              <div className="flex gap-2">
                <button
                  onClick={handleBasicSearch}
                  className="px-6 py-2 bg-transparent border border-gray-300 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition duration-200"
                >
                  검색
                </button>
                <button
                  onClick={() => setIsDetailSearchOpen(!isDetailSearchOpen)}
                  className="px-6 py-2 bg-transparent border border-gray-300 text-gray-600 rounded-md hover:bg-gray-600 hover:text-white transition duration-200"
                >
                  세부검색
                </button>
              </div>
            </div>

            {/* 세부 검색 영역 (슬라이딩) */}
            <div className={`transition-all duration-300 ease-in-out ${
              isDetailSearchOpen ? 'max-h-[600px] opacity-100 mt-6 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
              <div className="border-t border-gray-200 pt-6 px-4">
                <div className="space-y-6">

                  {/* 카테고리 및 브랜드 그룹 */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">카테고리 및 브랜드</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">대카테고리</label>
                        <select
                          value={selectedLargeCategory}
                          onChange={(e) => handleLargeCategoryChange(e.target.value)}
                          className="w-full px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">전체</option>
                          {Object.keys(categoryData).map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">소카테고리</label>
                        <select
                          value={selectedSmallCategory}
                          onChange={(e) => setSelectedSmallCategory(e.target.value)}
                          className="w-full px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          disabled={!selectedLargeCategory}
                        >
                          <option value="">전체</option>
                          {selectedLargeCategory && categoryData[selectedLargeCategory as keyof typeof categoryData]?.map((subCategory) => (
                            <option key={subCategory} value={subCategory}>
                              {subCategory}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">브랜드명</label>
                        <input
                          type="text"
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          placeholder="브랜드명 입력"
                          className="w-full px-2 py-2 h-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 기간 그룹 */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">기간</h3>
                    <div className="flex items-center gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">시작일</label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-40 px-2 py-2 h-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">종료일</label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-40 px-2 py-2 h-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 플랫폼 및 창작 요소 그룹 */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">플랫폼 및 창작 요소</h3>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">광고플랫폼</label>
                        <select
                          value={selectedPlatform}
                          onChange={(e) => setSelectedPlatform(e.target.value)}
                          className="w-full px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">전체</option>
                          <option value="카카오">카카오</option>
                          <option value="구글">구글</option>
                          <option value="메타">메타</option>
                          <option value="틱톡">틱톡</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">비주얼요소</label>
                        <select
                          value={selectedVisualElement}
                          onChange={(e) => setSelectedVisualElement(e.target.value)}
                          className="w-full px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">전체</option>
                          <option value="실사">실사</option>
                          <option value="3D">3D</option>
                          <option value="일러스트">일러스트</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">소재칼라톤</label>
                        <select
                          value={selectedColorTone}
                          onChange={(e) => setSelectedColorTone(e.target.value)}
                          className="w-full px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">전체</option>
                          <option value="딥톤">딥톤</option>
                          <option value="다크톤">다크톤</option>
                          <option value="네온톤">네온톤</option>
                          <option value="브라이트톤">브라이트톤</option>
                          <option value="비비드톤">비비드톤</option>
                          <option value="소프트톤">소프트톤</option>
                          <option value="라이트톤">라이트톤</option>
                          <option value="그레이시톤">그레이시톤</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">시선흐름</label>
                        <select
                          value={selectedGazeFlow}
                          onChange={(e) => setSelectedGazeFlow(e.target.value)}
                          className="w-full px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">전체</option>
                          <option value="Z">Z</option>
                          <option value="F">F</option>
                          <option value="O">O</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 타겟 그룹 - 한 줄로 정렬 */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">타겟</h3>
                    <div className="flex items-center gap-8">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">광고타겟</label>
                        <div className="flex gap-4">
                          {['남성', '여성'].map(gender => (
                            <label key={gender} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedGenders.includes(gender)}
                                onChange={() => handleGenderChange(gender)}
                                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              {gender}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">타겟연령</label>
                        <div className="flex gap-4">
                          {['10대', '20대', '30대', '40대', '50대', '60대', '70대', '80대', '90대'].map(age => (
                            <label key={age} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedAges.includes(age)}
                                onChange={() => handleAgeChange(age)}
                                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              {age}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 지표 그룹 - 한 줄로 정렬 */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">지표</h3>
                    <div className="flex gap-2 items-center">
                      <select
                        value={selectedMetric}
                        onChange={(e) => {
                          setSelectedMetric(e.target.value);
                          setMetricValue(metricUnits[e.target.value] || '');
                        }}
                        className="px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
                      >
                        <option value="">선택</option>
                        <option value="노출수">노출수</option>
                        <option value="클릭수">클릭수</option>
                        <option value="CTR">CTR</option>
                        <option value="전환수">전환수</option>
                        <option value="CVR">CVR</option>
                        <option value="광고비">광고비</option>
                        <option value="매출액">매출액</option>
                        <option value="ROAS">ROAS</option>
                        <option value="메인카피 비중">메인카피 비중</option>
                        <option value="서브카피 비중">서브카피 비중</option>
                        <option value="CTA비중">CTA비중</option>
                        <option value="제품비중">제품비중</option>
                      </select>
                      <input
                        type="text"
                        value={metricValue}
                        onChange={(e) => setMetricValue(e.target.value)}
                        placeholder="값"
                        className="px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-24 text-right"
                      />
                      <select
                        value={metricCondition}
                        onChange={(e) => setMetricCondition(e.target.value)}
                        className="px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[72px]"
                      >
                        <option value="이상">이상</option>
                        <option value="이하">이하</option>
                      </select>
                      <select
                        value={metricOperator}
                        onChange={(e) => setMetricOperator(e.target.value)}
                        className="px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[80px]"
                      >
                        <option value="그리고">그리고</option>
                        <option value="또는">또는</option>
                      </select>
                      <select className="px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]">
                        <option value="">선택</option>
                        <option value="노출수">노출수</option>
                        <option value="클릭수">클릭수</option>
                        <option value="CTR">CTR</option>
                        <option value="전환수">전환수</option>
                        <option value="CVR">CVR</option>
                        <option value="광고비">광고비</option>
                        <option value="매출액">매출액</option>
                        <option value="ROAS">ROAS</option>
                        <option value="메인카피 비중">메인카피 비중</option>
                        <option value="서브카피 비중">서브카피 비중</option>
                        <option value="CTA비중">CTA비중</option>
                        <option value="제품비중">제품비중</option>
                      </select>
                      <input
                        type="text"
                        placeholder="값"
                        className="px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-24 text-right"
                      />
                      <select className="px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[72px]">
                        <option value="이상">이상</option>
                        <option value="이하">이하</option>
                      </select>
                    </div>
                  </div>

                </div>

                {/* 세부검색 실행 버튼 */}
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleDetailSearch}
                    className="px-6 py-2 bg-transparent border border-gray-300 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition duration-200"
                  >
                    세부검색 실행
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 테이블 영역 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                배너광고 데이터 ({filteredData.length}건)
              </h2>
              <button
                onClick={() => setIsColumnPopupOpen(true)}
                className="px-4 py-2 bg-transparent border border-gray-300 text-gray-600 rounded-md hover:bg-gray-600 hover:text-white transition duration-200"
              >
                표시 데이터
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-11/12 mx-auto divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {allColumns.map(column => 
                      visibleColumns.includes(column) && (
                        <th key={column} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                          {column}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      {visibleColumns.includes('대카테고리') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.대카테고리}</td>
                      )}
                      {visibleColumns.includes('소카테고리') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.소카테고리}</td>
                      )}
                      {visibleColumns.includes('브랜드명') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.브랜드명}</td>
                      )}
                      {visibleColumns.includes('캠페인명') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.캠페인명}</td>
                      )}
                      {visibleColumns.includes('캠페인 기간') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.캠페인기간}</td>
                      )}
                      {visibleColumns.includes('광고플랫폼') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.광고플랫폼}</td>
                      )}
                      {visibleColumns.includes('광고타겟') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.광고타겟}</td>
                      )}
                      {visibleColumns.includes('타겟연령') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.타겟연령}</td>
                      )}
                      {visibleColumns.includes('소재ID') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.소재ID}</td>
                      )}
                      {visibleColumns.includes('소재명') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.소재명}</td>
                      )}
                      {visibleColumns.includes('노출수') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.노출수.toLocaleString()}</td>
                      )}
                      {visibleColumns.includes('클릭수') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.클릭수.toLocaleString()}</td>
                      )}
                      {visibleColumns.includes('CTR(%)') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.CTR}%</td>
                      )}
                      {visibleColumns.includes('전환수') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.전환수.toLocaleString()}</td>
                      )}
                      {visibleColumns.includes('CVR(%)') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.CVR}%</td>
                      )}
                      {visibleColumns.includes('광고비') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.광고비.toLocaleString()}</td>
                      )}
                      {visibleColumns.includes('매출액') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.매출액.toLocaleString()}</td>
                      )}
                      {visibleColumns.includes('ROAS(%)') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.ROAS}%</td>
                      )}
                      {visibleColumns.includes('소재') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          <div className="w-12 h-12 bg-gray-200 rounded border border-gray-300 flex items-center justify-center text-xs text-gray-500 mx-auto">
                            이미지
                          </div>
                        </td>
                      )}
                      {visibleColumns.includes('메인카피') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center max-w-[200px] truncate">{item.메인카피}</td>
                      )}
                      {visibleColumns.includes('메인카피 유형') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.메인카피유형}</td>
                      )}
                      {visibleColumns.includes('메인카피 비중(%)') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.메인카피비중}%</td>
                      )}
                      {visibleColumns.includes('서브카피 비중(%)') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.서브카피비중}%</td>
                      )}
                      {visibleColumns.includes('CTA위치') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.CTA위치}</td>
                      )}
                      {visibleColumns.includes('CTA비중(%)') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.CTA비중}%</td>
                      )}
                      {visibleColumns.includes('모델비중(%)') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.모델비중}%</td>
                      )}
                      {visibleColumns.includes('제품비중(%)') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.제품비중}%</td>
                      )}
                      {visibleColumns.includes('비주얼요소') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.비주얼요소}</td>
                      )}
                      {visibleColumns.includes('소재칼라톤') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.소재칼라톤}</td>
                      )}
                      {visibleColumns.includes('시선흐름') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-bold">{item.시선흐름}</td>
                      )}
                      {visibleColumns.includes('디자인분석') && (
                        <td className="px-3 py-4 text-sm text-gray-900 text-center max-w-[300px]">
                          <div className="truncate" title={item.디자인분석}>
                            {item.디자인분석}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* 페이지네이션 및 행 개수 선택 영역 */}
            {filteredData.length > 0 && (
              <div className="flex justify-center items-center px-6 py-4 border-t border-gray-200 relative">
                {/* 왼쪽: 행 개수 선택 드롭다운 */}
                <div className="absolute left-6 flex items-center space-x-2">
                  <span className="text-sm text-gray-700">표시 개수:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                
                {/* 중앙: 페이지네이션 */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    &lt;
                  </button>
                  <span className="text-sm text-gray-700">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            )}
            
            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">검색 조건에 맞는 데이터가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 컬럼 표시 설정 팝업 */}
      {isColumnPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[1000px] max-h-[80vh] overflow-y-auto mx-4">
            {/* 제목 영역 */}
            <div className="p-6 border-b border-gray-300">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">표시 데이터 선택</h3>
                <button
                  onClick={() => setIsColumnPopupOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>


            {/* 컨텐츠 영역 - 가로 배치로 변경 */}
            <div className="p-6">
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(columnGroups).map(([groupName, columns]) => (
                  <div key={groupName} className="border border-gray-200 rounded-lg p-4">
                    {/* 그룹 제목과 전체 선택 */}
                    <div className="flex flex-col items-center mb-4">
                      <h4 className="text-md font-semibold text-gray-800 mb-2">{groupName}</h4>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isGroupSelected(groupName)}
                          onChange={(e) => handleGroupToggle(groupName, e.target.checked)}
                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-600">전체 선택</span>
                      </label>
                    </div>
                    
                    {/* 컬럼 목록 */}
                    <div className="space-y-2">
                      {columns.map(column => (
                        <label key={column} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={visibleColumns.includes(column)}
                            onChange={() => handleColumnToggle(column)}
                            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">{column}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 적용 버튼 - 하단 중앙 */}
            <div className="flex justify-center p-6 border-t border-gray-200">
              <button
                onClick={() => setIsColumnPopupOpen(false)}
                className="px-6 py-2 bg-transparent border border-gray-300 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition duration-200"
              >
                적용
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        select option {
          border-radius: 6px;
          padding: 8px 12px;
        }
      `}</style>
    </div>
  );
}
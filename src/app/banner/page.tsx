'use client';

import Navigation from '@/components/Navigation';
import { useState } from 'react';

export default function BannerAds() {
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
  const [selectedAdvertiser, setSelectedAdvertiser] = useState('A광고주');

  // 광고주 목록
  const advertisers = ['A광고주', 'B광고주', 'C광고주'];

  // 테이블 컬럼 표시 상태
  const allColumns = [
    '대분류', '소분류', '브랜드명', '캠페인명', '캠페인 기간', '광고플랫폼', '광고타겟', '타겟연령', '소재ID', '소재명',
    '노출수', '클릭수', 'CTR(%)', '전환수', 'CVR(%)', '광고비', '매출액', 'ROAS(%)',
    '소재', '메인카피', '메인카피 유형', '메인카피 비중(%)', '서브카피 비중(%)',
    'CTA위치', 'CTA비중(%)', '모델비중(%)', '제품비중(%)', '비주얼요소', '소재칼라톤', '시선흐름', '디자인분석'
  ];

  // 컬럼 그룹 정의
  const columnGroups = {
    기업정보: ['대분류', '소분류', '브랜드명'],
    광고정보: ['캠페인명', '캠페인 기간', '광고플랫폼', '광고타겟', '타겟연령', '소재ID', '소재명'],
    집행정보: ['노출수', '클릭수', 'CTR(%)', '전환수', 'CVR(%)', '광고비', '매출액', 'ROAS(%)'],
    분석정보: ['소재', '메인카피', '메인카피 유형', '메인카피 비중(%)', '서브카피 비중(%)', 'CTA위치', 'CTA비중(%)', '모델비중(%)', '제품비중(%)', '비주얼요소', '소재칼라톤', '시선흐름', '디자인분석']
  };

  const [visibleColumns, setVisibleColumns] = useState(allColumns);

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
      대분류: '금융',
      소분류: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '12월 중개형 ISA 이벤트',
      '캠페인 기간': '2021-12-08 ~ 2021-12-19',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_1',
      소재명: 'main',
      노출수: 2140322,
      클릭수: 943362,
      'CTR(%)': 44.08,
      전환수: 0,
      'CVR(%)': 0.00,
      광고비: 7443333,
      매출액: 0,
      'ROAS(%)': 0.00
    },
    {
      대분류: '금융',
      소분류: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '12월 중개형 ISA 이벤트',
      '캠페인 기간': '2021-12-08 ~ 2021-12-19',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_2',
      소재명: 'luxury',
      노출수: 1266295,
      클릭수: 522937,
      'CTR(%)': 41.30,
      전환수: 0,
      'CVR(%)': 0.00,
      광고비: 4510000,
      매출액: 0,
      'ROAS(%)': 0.00
    },
    {
      대분류: '금융',
      소분류: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '12월 중개형 ISA 이벤트',
      '캠페인 기간': '2021-12-08 ~ 2021-12-19',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_3',
      소재명: 'present',
      노출수: 5845288,
      클릭수: 961075,
      'CTR(%)': 16.44,
      전환수: 0,
      'CVR(%)': 0.00,
      광고비: 16472771,
      매출액: 0,
      'ROAS(%)': 0.00
    },
    {
      대분류: '금융',
      소분류: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '12월 중개형 ISA 이벤트',
      '캠페인 기간': '2021-12-08 ~ 2021-12-19',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_4',
      소재명: 'freegame',
      노출수: 7743746,
      클릭수: 962765,
      'CTR(%)': 12.43,
      전환수: 0,
      'CVR(%)': 0.00,
      광고비: 19070476,
      매출액: 0,
      'ROAS(%)': 0.00
    },
    {
      대분류: '금융',
      소분류: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '12월 중개형 ISA 이벤트',
      '캠페인 기간': '2021-12-08 ~ 2021-12-19',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_5',
      소재명: 'coffee',
      노출수: 5462740,
      클릭수: 124293,
      'CTR(%)': 2.28,
      전환수: 0,
      'CVR(%)': 0.00,
      광고비: 12705037,
      매출액: 0,
      'ROAS(%)': 0.00
    },
    {
      대분류: '금융',
      소분류: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '국내다이렉트 12월DA캠페인',
      '캠페인 기간': '2021-12-08 ~ 2021-12-19',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_6',
      소재명: 'ocusa',
      노출수: 2115429,
      클릭수: 1308688,
      'CTR(%)': 61.86,
      전환수: 790,
      'CVR(%)': 0.06,
      광고비: 7689661,
      매출액: 0,
      'ROAS(%)': 0.00
    },
    {
      대분류: '금융',
      소분류: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '국내다이렉트 12월DA캠페인',
      '캠페인 기간': '2021-12-08 ~ 2021-12-19',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_7',
      소재명: 'ocfee',
      노출수: 2127812,
      클릭수: 1307799,
      'CTR(%)': 61.46,
      전환수: 783,
      'CVR(%)': 0.06,
      광고비: 7689661,
      매출액: 0,
      'ROAS(%)': 0.00
    },
    {
      대분류: '금융',
      소분류: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '국내다이렉트 12월DA캠페인',
      '캠페인 기간': '2021-12-08 ~ 2021-12-19',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_8',
      소재명: 'ocgbstart',
      노출수: 2620661,
      클릭수: 1550393,
      'CTR(%)': 59.16,
      전환수: 891,
      'CVR(%)': 0.06,
      광고비: 9516173,
      매출액: 0,
      'ROAS(%)': 0.00
    },
    {
      대분류: '금융',
      소분류: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '국내다이렉트 12월DA캠페인',
      '캠페인 기간': '2021-12-08 ~ 2021-12-19',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_9',
      소재명: 'ocstart',
      노출수: 562638,
      클릭수: 282593,
      'CTR(%)': 50.23,
      전환수: 181,
      'CVR(%)': 0.06,
      광고비: 2054506,
      매출액: 0,
      'ROAS(%)': 0.00
    },
    {
      대분류: '금융',
      소분류: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '마이데이터 캠페인',
      '캠페인 기간': '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_10',
      소재명: 'mall',
      노출수: 3254859,
      클릭수: 806716,
      'CTR(%)': 24.78,
      전환수: 0,
      'CVR(%)': 0.00,
      광고비: 9888153,
      매출액: 0,
      'ROAS(%)': 0.00
    },
    {
      대분류: '금융',
      소분류: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '마이데이터 캠페인',
      '캠페인 기간': '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_11',
      소재명: 'mirae',
      노출수: 1428529,
      클릭수: 248377,
      'CTR(%)': 17.39,
      전환수: 0,
      'CVR(%)': 0.00,
      광고비: 4317517,
      매출액: 0,
      'ROAS(%)': 0.00
    },
    {
      대분류: '금융',
      소분류: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '마이데이터 캠페인',
      '캠페인 기간': '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_12',
      소재명: 'coffee',
      노출수: 14223046,
      클릭수: 1066021,
      'CTR(%)': 7.50,
      전환수: 0,
      'CVR(%)': 0.00,
      광고비: 36365864,
      매출액: 0,
      'ROAS(%)': 0.00
    },
    {
      대분류: '금융',
      소분류: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '마이데이터 캠페인',
      '캠페인 기간': '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_13',
      소재명: 'golf',
      노출수: 20038471,
      클릭수: 1075960,
      'CTR(%)': 5.37,
      전환수: 0,
      'CVR(%)': 0.00,
      광고비: 52696508,
      매출액: 0,
      'ROAS(%)': 0.00
    },
    {
      대분류: '금융',
      소분류: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '마이데이터 캠페인',
      '캠페인 기간': '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_14',
      소재명: 'apayo',
      노출수: 1763325,
      클릭수: 52135,
      'CTR(%)': 2.96,
      전환수: 0,
      'CVR(%)': 0.00,
      광고비: 4246458,
      매출액: 0,
      'ROAS(%)': 0.00
    },
    {
      대분류: '금융',
      소분류: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '마이데이터 캠페인',
      '캠페인 기간': '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_15',
      소재명: 'dth',
      노출수: 2110241,
      클릭수: 52926,
      'CTR(%)': 2.51,
      전환수: 0,
      'CVR(%)': 0.00,
      광고비: 4551114,
      매출액: 0,
      'ROAS(%)': 0.00
    },
    {
      대분류: '금융',
      소분류: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '마이데이터 캠페인',
      '캠페인 기간': '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_16',
      소재명: 'ai',
      노출수: 2210557,
      클릭수: 46680,
      'CTR(%)': 2.11,
      전환수: 0,
      'CVR(%)': 0.00,
      광고비: 3972209,
      매출액: 0,
      'ROAS(%)': 0.00
    },
    {
      대분류: '금융',
      소분류: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '연금 다이렉트 이벤트',
      '캠페인 기간': '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_17',
      소재명: 'Change',
      노출수: 8936340,
      클릭수: 426814,
      'CTR(%)': 4.78,
      전환수: 0,
      'CVR(%)': 0.00,
      광고비: 15967070,
      매출액: 0,
      'ROAS(%)': 0.00
    },
    {
      대분류: '금융',
      소분류: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '연금 다이렉트 이벤트',
      '캠페인 기간': '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_18',
      소재명: 'Matzip',
      노출수: 7379749,
      클릭수: 351100,
      'CTR(%)': 4.76,
      전환수: 0,
      'CVR(%)': 0.00,
      광고비: 12843523,
      매출액: 0,
      'ROAS(%)': 0.00
    },
    {
      대분류: '금융',
      소분류: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '연금 다이렉트 이벤트',
      '캠페인 기간': '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_19',
      소재명: 'Game',
      노출수: 7501950,
      클릭수: 350538,
      'CTR(%)': 4.67,
      전환수: 0,
      'CVR(%)': 0.00,
      광고비: 12812898,
      매출액: 0,
      'ROAS(%)': 0.00
    }
  ];

  const [filteredData, setFilteredData] = useState(sampleData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
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
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-gray-900">배너광고</h1>
              <select
                value={selectedAdvertiser}
                onChange={(e) => setSelectedAdvertiser(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              >
                {advertisers.map((advertiser) => (
                  <option key={advertiser} value={advertiser}>
                    {advertiser}
                  </option>
                ))}
              </select>
            </div>
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
                          className="w-32 px-2 py-2 h-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">종료일</label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-32 px-2 py-2 h-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        onChange={(e) => setSelectedMetric(e.target.value)}
                        className="px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[100px]"
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
                      <div className="relative">
                        <input
                          type="number"
                          value={metricValue}
                          onChange={(e) => setMetricValue(e.target.value)}
                          placeholder="값"
                          className="px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-20 pr-8"
                        />
                        {selectedMetric && metricUnits[selectedMetric] && (
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
                            {metricUnits[selectedMetric]}
                          </span>
                        )}
                      </div>
                      <select
                        value={metricCondition}
                        onChange={(e) => setMetricCondition(e.target.value)}
                        className="px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="이상">이상</option>
                        <option value="이하">이하</option>
                      </select>
                      <select
                        value={metricOperator}
                        onChange={(e) => setMetricOperator(e.target.value)}
                        className="px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="그리고">그리고</option>
                        <option value="또는">또는</option>
                      </select>
                      <select className="px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[100px]">
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
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="값"
                          className="px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-20 pr-8"
                        />
                      </div>
                      <select className="px-2 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
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

          {/* AI 분석 영역 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">AI 분석</h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {/* 왼쪽: 분석 지표 테이블 */}
              <div>
                <table className="w-full border-collapse border border-gray-300">
                  <tbody>
                    {/* 1행 */}
                    <tr>
                      <td className="border border-gray-300 p-3 text-center bg-blue-50">
                        <div className="text-sm font-medium text-gray-700">CTR(상위 20% 평균)</div>
                      </td>
                      <td className="border border-gray-300 p-3 text-center bg-blue-50">
                        <div className="text-sm font-medium text-gray-700">CVR(상위 20% 평균)</div>
                      </td>
                      <td className="border border-gray-300 p-3 text-center bg-blue-50">
                        <div className="text-sm font-medium text-gray-700">ROAS(상위 20% 평균)</div>
                      </td>
                    </tr>
                    {/* 2행 - 값 표시 */}
                    <tr>
                      <td className="border border-gray-300 p-3 text-center">
                        <div className="text-lg font-bold text-blue-600">-</div>
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        <div className="text-lg font-bold text-blue-600">-</div>
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        <div className="text-lg font-bold text-blue-600">450%</div>
                      </td>
                    </tr>
                    {/* 3행 */}
                    <tr>
                      <td className="border border-gray-300 p-3 text-center bg-blue-50">
                        <div className="text-sm font-medium text-gray-700">메시지 유형분석</div>
                      </td>
                      <td className="border border-gray-300 p-3 text-center bg-blue-50">
                        <div className="text-sm font-medium text-gray-700">CTA 분석</div>
                      </td>
                      <td className="border border-gray-300 p-3 text-center bg-blue-50">
                        <div className="text-sm font-medium text-gray-700">디자인 분석</div>
                      </td>
                    </tr>
                    {/* 4행 - 값 표시 */}
                    <tr>
                      <td className="border border-gray-300 p-3 text-center">
                        <div className="text-sm text-gray-600">할인·혜택형 60%</div>
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        <div className="text-sm text-gray-600">하단 우측 45%</div>
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        <div className="text-sm text-gray-600">실사형 80%</div>
                      </td>
                    </tr>
                    {/* 5행 - AI 종합 분석 */}
                    <tr>
                      <td colSpan={3} className="border border-gray-300 p-3 text-center bg-blue-50">
                        <div className="text-sm font-medium text-gray-700">AI 종합 분석</div>
                      </td>
                    </tr>
                    {/* 6행 - AI 종합 분석 값 */}
                    <tr>
                      <td colSpan={3} className="border border-gray-300 p-3 text-center">
                        <div className="text-sm text-gray-600">성과 지표 우수</div>
                      </td>
                    </tr>
                    {/* 7행 - 현재 캠페인 분석 결과 */}
                    <tr>
                      <td colSpan={3} className="border border-gray-300 p-3 text-center bg-blue-50">
                        <div className="text-sm font-medium text-gray-700">현재 캠페인 분석 결과</div>
                      </td>
                    </tr>
                    {/* 8행 - 현재 캠페인 분석 값 */}
                    <tr>
                      <td colSpan={3} className="border border-gray-300 p-3 text-center">
                        <div className="text-sm text-gray-600 leading-relaxed">
                          할인·혜택형 메시지와 실사형 디자인의 조합이 높은 전환율을 보이고 있으며, 
                          하단 우측 CTA 배치가 효과적인 것으로 분석됩니다.
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* 우측: 추가 분석 영역 (향후 확장 가능) */}
              <div className="flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500">
                  <div className="text-lg font-medium">차트 영역</div>
                  <div className="text-sm mt-1">추가 시각화 데이터</div>
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
              <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
                {/* 왼쪽: 행 개수 선택 드롭다운 */}
                <div className="flex items-center space-x-2">
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
                
                {/* 오른쪽: 페이지네이션 */}
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

            {/* 버튼 영역 - 상단으로 이동 */}
            <div className="flex justify-end gap-2 p-6 border-b border-gray-200">
              <button
                onClick={() => setVisibleColumns(allColumns)}
                className="px-4 py-2 bg-transparent border border-gray-300 text-gray-600 rounded-md hover:bg-gray-600 hover:text-white transition duration-200"
              >
                전체 선택
              </button>
              <button
                onClick={() => setVisibleColumns([])}
                className="px-4 py-2 bg-transparent border border-gray-300 text-gray-600 rounded-md hover:bg-gray-600 hover:text-white transition duration-200"
              >
                전체 해제
              </button>
              <button
                onClick={() => setIsColumnPopupOpen(false)}
                className="px-4 py-2 bg-transparent border border-gray-300 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition duration-200"
              >
                적용
              </button>
            </div>

            {/* 컨텐츠 영역 - 가로 배치로 변경 */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4">
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
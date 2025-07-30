'use client';

import Navigation from '@/components/Navigation';
import { useState, useEffect } from 'react';
import { GPTAnalysisResult } from '@/lib/gpt';

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
    '대분류', '소분류', '브랜드명', '캠페인명', '캠페인 기간', '광고플랫폼', '광고타겟', '타겟연령', '소재ID', '소재명',
    '노출수', '클릭수', 'CTR(%)', '전환수', 'CVR(%)', '광고비', '매출액', 'ROAS(%)',
    '소재', '메인카피', '메인카피 유형', '메인카피 비중(%)', '서브카피', '서브카피 비중(%)',
    'CTA문구', 'CTA위치', 'CTA비중(%)', '모델비중(%)', '제품비중(%)', '비주얼요소', '소재칼라톤', '시선흐름', '디자인분석'
  ];

  // 컬럼 그룹 정의
  const columnGroups = {
    기업정보: ['대분류', '소분류', '브랜드명'],
    광고정보: ['캠페인명', '캠페인 기간', '광고플랫폼', '광고타겟', '타겟연령', '소재ID', '소재명'],
    집행정보: ['노출수', '클릭수', 'CTR(%)', '전환수', 'CVR(%)', '광고비', '매출액', 'ROAS(%)'],
    분석정보: ['소재', '메인카피', '메인카피 유형', '메인카피 비중(%)', '서브카피', '서브카피 비중(%)', 'CTA문구', 'CTA위치', 'CTA비중(%)', '모델비중(%)', '제품비중(%)', '비주얼요소', '소재칼라톤', '시선흐름', '디자인분석']
  };

  const [visibleColumns, setVisibleColumns] = useState(allColumns);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingItems, setAnalyzingItems] = useState<Set<string>>(new Set());
  
  // CTA 위치 매핑
  const ctaPositionMap: { [key: string]: string } = {
    'topLeft': '상단 좌측',
    'topCenter': '상단 중앙',
    'topRight': '상단 우측',
    'centerLeft': '중단 좌측',
    'center': '중앙',
    'centerRight': '중단 우측',
    'bottomLeft': '하단 좌측',
    'bottomCenter': '하단 중앙',
    'bottomRight': '하단 우측'
  };

  // CTA 위치 표시 함수
  const getCTAPositionDisplay = (position: string) => {
    return ctaPositionMap[position] || position;
  };

  // 퍼센트 값 정리 함수
  const cleanPercentValue = (value: string | number) => {
    const strValue = String(value);
    if (strValue === '-%' || strValue === '-') return '-';
    return strValue;
  };

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
      대카테고리: '금융',
      소카테고리: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '12월 중개형 ISA 이벤트',
      캠페인기간: '2021-12-08 ~ 2021-12-19',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_1',
      소재명: 'main',
      노출수: 2140322,
      클릭수: 943362,
      CTR: 44.08,
      전환수: 0,
      CVR: 0.00,
      광고비: 7443333,
      매출액: 0,
      ROAS: 0.00,
      소재: '/미래에셋대우_1.png',
      메인카피: '중개형 ISA 이벤트',
      메인카피유형: '한정 · 긴급성 강조형',
      메인카피비중: '25%',
      서브카피: '이벤트 기간 : 12.1~12.31',
      서브카피비중: '10%',
      CTA문구: '다양한 경품에 지금 응모',
      CTA위치: 'centerRight',
      CTA비중: '8%',
      모델비중: '0%',
      제품비중: '20%',
      비주얼요소: '실사',
      소재칼라톤: '비비드톤',
      시선흐름: 'Z',
      디자인분석: '비비드톤과 실사 이미지가 조화를 이루며 시선을 끌고, Z형 레이아웃으로 자연스러운 정보 전달을 유도합니다.'
    },
    {
      대카테고리: '금융',
      소카테고리: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '12월 중개형 ISA 이벤트',
      캠페인기간: '2021-12-08 ~ 2021-12-19',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_2',
      소재명: 'luxury',
      노출수: 1266295,
      클릭수: 522937,
      CTR: 41.30,
      전환수: 0,
      CVR: 0.00,
      광고비: 4510000,
      매출액: 0,
      ROAS: 0.00,
      소재: '/미래에셋대우_2.png',
      메인카피: '고.급.지.다. 이것이 럭셔리 경품 혜택!',
      메인카피유형: '할인 · 혜택 강조형',
      메인카피비중: '20%',
      서브카피: '이벤트 기간 : 11/1~12/31',
      서브카피비중: '10%',
      CTA문구: '다이렉트 신규가입 대상 추첨',
      CTA위치: 'bottomRight',
      CTA비중: '5%',
      모델비중: '0%',
      제품비중: '30%',
      비주얼요소: '실사',
      소재칼라톤: '브라이트톤',
      시선흐름: 'F',
      디자인분석: '컬러 대비를 활용한 시각적 강조가 뛰어나며, 메인 카피와 CTA 버튼의 배치가 직관적입니다.'
    },
    {
      대카테고리: '금융',
      소카테고리: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '12월 중개형 ISA 이벤트',
      캠페인기간: '2021-12-08 ~ 2021-12-19',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_3',
      소재명: 'present',
      노출수: 5845288,
      클릭수: 961075,
      CTR: 16.44,
      전환수: 0,
      CVR: 0.00,
      광고비: 16472771,
      매출액: 0,
      ROAS: 0.00,
      소재: '/미래에셋대우_3.png',
      메인카피: '명품 ISA 개설하고 명품의 주인공 되자!',
      메인카피유형: '도전 · 참여 유도형',
      메인카피비중: '25%',
      서브카피: '이벤트 기간: 11/1~12/31',
      서브카피비중: '10%',
      CTA문구: '다이렉트 신규이전 대상 추첨',
      CTA위치: 'topRight',
      CTA비중: '5%',
      모델비중: '0%',
      제품비중: '20%',
      비주얼요소: '실사',
      소재칼라톤: '브라이트톤',
      시선흐름: 'Z',
      디자인분석: '명확한 시선 흐름과 밝은 색조로 참여 유도를 효과적으로 전달합니다.'
    },
    {
      대카테고리: '금융',
      소카테고리: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '12월 중개형 ISA 이벤트',
      캠페인기간: '2021-12-08 ~ 2021-12-19',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_4',
      소재명: 'freegame',
      노출수: 7743746,
      클릭수: 962765,
      CTR: 12.43,
      전환수: 0,
      CVR: 0.00,
      광고비: 19070476,
      매출액: 0,
      ROAS: 0.00,
      소재: '/미래에셋대우_4.png',
      메인카피: '중개형 ISA 신규 개설하고 커피 받자!',
      메인카피유형: '할인 · 혜택 강조형',
      메인카피비중: '20%',
      서브카피: '선착순 게임이 시작됐다! 이벤트 기간 : 11/1~12/31',
      서브카피비중: '15%',
      CTA문구: '다이렉트 신규 고객 대상 선착순 1만명',
      CTA위치: 'centerRight',
      CTA비중: '10%',
      모델비중: '0%',
      제품비중: '15%',
      비주얼요소: '실사',
      소재칼라톤: '브라이트톤',
      시선흐름: 'F',
      디자인분석: '밝고 선명한 색상으로 혜택을 강조하며, 텍스트와 이미지의 균형이 잘 잡혀 있어 명확한 메시지 전달을 돕습니다.'
    },
    {
      대카테고리: '금융',
      소카테고리: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '12월 중개형 ISA 이벤트',
      캠페인기간: '2021-12-08 ~ 2021-12-19',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_5',
      소재명: 'coffee',
      노출수: 5462740,
      클릭수: 124293,
      CTR: 2.28,
      전환수: 0,
      CVR: 0.00,
      광고비: 12705037,
      매출액: 0,
      ROAS: 0.00,
      소재: '/미래에셋대우_5.png',
      메인카피: '중개형 ISA 개설 하고 커피 받아가세요',
      메인카피유형: '할인 · 혜택 강조형',
      메인카피비중: '30%',
      서브카피: '이벤트 기간 : 11/1~12/31',
      서브카피비중: '10%',
      CTA문구: '받아. 우린 깐부잖아',
      CTA위치: 'topLeft',
      CTA비중: '10%',
      모델비중: '0%',
      제품비중: '20%',
      비주얼요소: '일러스트',
      소재칼라톤: '브라이트톤',
      시선흐름: 'F',
      디자인분석: '명확한 혜택 전달과 시선을 끄는 컬러 조합이 돋보이며, 레이아웃이 정보 전달에 효과적입니다.'
    },
    {
      대카테고리: '금융',
      소카테고리: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '국내다이렉트 12월DA캠페인',
      캠페인기간: '2021-12-08 ~ 2021-12-19',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_6',
      소재명: 'ocusa',
      노출수: 2115429,
      클릭수: 1308688,
      CTR: 61.86,
      전환수: 790,
      CVR: 0.06,
      광고비: 7689661,
      매출액: 0,
      ROAS: 0.00,
      소재: '/미래에셋대우_6.png',
      메인카피: '없어요, 없어요 해외주식 수수료 없어요',
      메인카피유형: '할인 · 혜택 강조형',
      메인카피비중: '25%',
      서브카피: '계좌개설고객누적90만명! 온라인거래수수료율0%&환전수수료0원',
      서브카피비중: '20%',
      CTA문구: '다이렉트 신규 고객 대상',
      CTA위치: 'topLeft',
      CTA비중: '5%',
      모델비중: '0%',
      제품비중: '15%',
      비주얼요소: '일러스트',
      소재칼라톤: '브라이트톤',
      시선흐름: 'Z',
      디자인분석: '주황색과 파란색의 대비가 시선을 끌며, 주요 메시지를 강조하는 데 효과적입니다. 텍스트와 그래픽의 균형이 잘 잡혀 있습니다.'
    },
    {
      대카테고리: '금융',
      소카테고리: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '국내다이렉트 12월DA캠페인',
      캠페인기간: '2021-12-08 ~ 2021-12-19',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_7',
      소재명: 'ocfee',
      노출수: 2127812,
      클릭수: 1307799,
      CTR: 61.46,
      전환수: 783,
      CVR: 0.06,
      광고비: 7689661,
      매출액: 0,
      ROAS: 0.00,
      소재: '/미래에셋대우_7.png',
      메인카피: '국내주식 온라인 거래 수수료 평.생.우.대',
      메인카피유형: '할인 · 혜택 강조형',
      메인카피비중: '25%',
      서브카피: '수수료 우대 0.004 ~ 0.003639%(추후변동 가능)',
      서브카피비중: '10%',
      CTA문구: '평생우대',
      CTA위치: 'centerRight',
      CTA비중: '8%',
      모델비중: '0%',
      제품비중: '0%',
      비주얼요소: '일러스트',
      소재칼라톤: '브라이트톤',
      시선흐름: 'Z',
      디자인분석: '오렌지와 블루의 대비가 명확하며, 주목성을 높이는 타이포그래피가 돋보입니다.'
    },
    {
      대카테고리: '금융',
      소카테고리: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '국내다이렉트 12월DA캠페인',
      캠페인기간: '2021-12-08 ~ 2021-12-19',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_8',
      소재명: 'ocgbstart',
      노출수: 2620661,
      클릭수: 1550393,
      CTR: 59.16,
      전환수: 891,
      CVR: 0.06,
      광고비: 9516173,
      매출액: 0,
      ROAS: 0.00,
      소재: '/미래에셋대우_8.png',
      메인카피: '해외주식 수수료, 0원으로 시작하세요!',
      메인카피유형: '할인 · 혜택 강조형',
      메인카피비중: '25%',
      서브카피: '다이렉트 신규 고객 대상 (90일 한정)',
      서브카피비중: '10%',
      CTA문구: 'ON',
      CTA위치: 'topRight',
      CTA비중: '5%',
      모델비중: '0%',
      제품비중: '0%',
      비주얼요소: '일러스트',
      소재칼라톤: '비비드톤',
      시선흐름: 'Z',
      디자인분석: '명확한 색상 대비와 간결한 레이아웃을 통해 메시지를 효과적으로 전달하며, 시선이 자연스럽게 흐르도록 디자인되었습니다.'
    },
    {
      대카테고리: '금융',
      소카테고리: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '국내다이렉트 12월DA캠페인',
      캠페인기간: '2021-12-08 ~ 2021-12-19',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_9',
      소재명: 'ocstart',
      노출수: 562638,
      클릭수: 282593,
      CTR: 50.23,
      전환수: 181,
      CVR: 0.06,
      광고비: 2054506,
      매출액: 0,
      ROAS: 0.00,
      소재: '/미래에셋대우_9.png',
      메인카피: '평생 우대 받고 국내주식 시작하기',
      메인카피유형: '할인 · 혜택 강조형',
      메인카피비중: '20%',
      서브카피: '다이렉트 신규 고객 대상 온라인 거래 수수료',
      서브카피비중: '10%',
      CTA문구: '-',
      CTA위치: 'bottomCenter',
      CTA비중: '5%',
      모델비중: '0%',
      제품비중: '15%',
      비주얼요소: '일러스트',
      소재칼라톤: '브라이트톤',
      시선흐름: 'Z',
      디자인분석: '명확한 색상 대비와 일러스트 사용으로 시선을 끌며, 주요 카피와 혜택이 강조된 균형 잡힌 레이아웃.'
    },
    {
      대카테고리: '금융',
      소카테고리: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '마이데이터 캠페인',
      캠페인기간: '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_10',
      소재명: 'mall',
      노출수: 3254859,
      클릭수: 806716,
      CTR: 24.78,
      전환수: 0,
      CVR: 0.00,
      광고비: 9888153,
      매출액: 0,
      ROAS: 0.00,
      소재: '/미래에셋대우_10.png',
      메인카피: '누구나 투자고수를 꿈꾸는 세상 마이데이터 유니버스',
      메인카피유형: '키워드 · 짧은 강조형',
      메인카피비중: '30%',
      서브카피: '이벤트 기간: 12.01 - 12.31',
      서브카피비중: '10%',
      CTA문구: '지금 경험하기 >',
      CTA위치: 'bottomLeft',
      CTA비중: '5%',
      모델비중: '-',
      제품비중: '-',
      비주얼요소: '일러스트',
      소재칼라톤: '브라이트톤',
      시선흐름: 'Z',
      디자인분석: '밝은 톤과 명확한 레이아웃이 시선을 끌며, 메인 카피와 CTA 버튼이 강조되어 명확한 메시지를 전달한다.'
    },
    {
      대카테고리: '금융',
      소카테고리: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '마이데이터 캠페인',
      캠페인기간: '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_11',
      소재명: 'mirae',
      노출수: 1428529,
      클릭수: 248377,
      CTR: 17.39,
      전환수: 0,
      CVR: 0.00,
      광고비: 4317517,
      매출액: 0,
      ROAS: 0.00,
      소재: '/미래에셋대우_11.png',
      메인카피: '마이데이터가 뭐래? 마이데이터는 미래',
      메인카피유형: '키워드 · 짧은 강조형',
      메인카피비중: '20%',
      서브카피: '* 고객님을 위한 투자 맞춤형 마이데이터가 곷 오픈됩니다. 미래에셋증권 마이데이터 서비스는 투자자 맞춤형 자산관리 서비스입니다.',
      서브카피비중: '15%',
      CTA문구: '이벤트 신청하기 >',
      CTA위치: 'centerRight',
      CTA비중: '5%',
      모델비중: '15%',
      제품비중: '10%',
      비주얼요소: '일러스트',
      소재칼라톤: '브라이트톤',
      시선흐름: 'F',
      디자인분석: '밝고 경쾌한 색조로 주목성을 높이며, 가독성 높은 타이포그래피로 정보 전달이 명확하다.'
    },
    {
      대카테고리: '금융',
      소카테고리: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '마이데이터 캠페인',
      캠페인기간: '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_12',
      소재명: 'coffee',
      노출수: 14223046,
      클릭수: 1066021,
      CTR: 7.50,
      전환수: 0,
      CVR: 0.00,
      광고비: 36365864,
      매출액: 0,
      ROAS: 0.00,
      소재: '/미래에셋대우_12.png',
      메인카피: '마이데이터 동의하고 커피 한 잔 할래요~?',
      메인카피유형: '할인 · 혜택 강조형',
      메인카피비중: '20%',
      서브카피: '(타사 1개사 연동 필수) 이벤트 기간: 12.01 ~ 12.31',
      서브카피비중: '10%',
      CTA문구: '100% 증정',
      CTA위치: 'centerRight',
      CTA비중: '5%',
      모델비중: '0%',
      제품비중: '15%',
      비주얼요소: '실사',
      소재칼라톤: '브라이트톤',
      시선흐름: 'F',
      디자인분석: '밝고 선명한 색상으로 주목도를 높였으며, 명확한 혜택 강조로 CTA 유도 효과가 뛰어납니다.'
    },
    {
      대카테고리: '금융',
      소카테고리: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '마이데이터 캠페인',
      캠페인기간: '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_13',
      소재명: 'golf',
      노출수: 20038471,
      클릭수: 1075960,
      CTR: 5.37,
      전환수: 0,
      CVR: 0.00,
      광고비: 52696508,
      매출액: 0,
      ROAS: 0.00,
      소재: '/미래에셋대우_13.png',
      메인카피: '마이데이터 동의하고 한정판 골프공 받자!',
      메인카피유형: '한정 · 긴급성 강조형',
      메인카피비중: '25%',
      서브카피: '이벤트 기간: 12.01 ~ 12.31',
      서브카피비중: '10%',
      CTA문구: '추첨 5천명',
      CTA위치: 'centerRight',
      CTA비중: '5%',
      모델비중: '10%',
      제품비중: '10%',
      비주얼요소: '일러스트',
      소재칼라톤: '브라이트톤',
      시선흐름: 'Z',
      디자인분석: '밝은 색조와 일러스트가 주목성을 높이며, Z형 레이아웃이 정보 전달에 효과적이다.'
    },
    {
      대카테고리: '금융',
      소카테고리: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '마이데이터 캠페인',
      캠페인기간: '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_14',
      소재명: 'apayo',
      노출수: 1763325,
      클릭수: 52135,
      CTR: 2.96,
      전환수: 0,
      CVR: 0.00,
      광고비: 4246458,
      매출액: 0,
      ROAS: 0.00,
      소재: '/미래에셋대우_14.png',
      메인카피: '미래에셋증권 마이데이터로 처방받자!',
      메인카피유형: '도전 · 참여 유도형',
      메인카피비중: '20%',
      서브카피: '제 자산이 아파요 ㅠㅠ',
      서브카피비중: '10%',
      CTA문구: '-',
      CTA위치: 'bottomRight',
      CTA비중: '10%',
      모델비중: '0%',
      제품비중: '20%',
      비주얼요소: '일러스트',
      소재칼라톤: '브라이트톤',
      시선흐름: 'F',
      디자인분석: '밝고 선명한 톤과 일러스트로 주목도를 높였으며, 명확한 CTA와 참여 유도형 문구로 사용자의 관심을 끌어냅니다.'
    },
    {
      대카테고리: '금융',
      소카테고리: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '마이데이터 캠페인',
      캠페인기간: '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_15',
      소재명: 'dth',
      노출수: 2110241,
      클릭수: 52926,
      CTR: 2.51,
      전환수: 0,
      CVR: 0.00,
      광고비: 4551114,
      매출액: 0,
      ROAS: 0.00,
      소재: '/미래에셋대우_15.png',
      메인카피: '주식 대통합의 시대! 지금 경험해보세요',
      메인카피유형: '도전 · 참여 유도형',
      메인카피비중: '15%',
      서브카피: '이벤트 기간 : 12.01 ~ 12.31',
      서브카피비중: '5%',
      CTA문구: '마이데이터 이벤트 바로가기 ▶',
      CTA위치: 'center',
      CTA비중: '10%',
      모델비중: '10%',
      제품비중: '5%',
      비주얼요소: '일러스트',
      소재칼라톤: '브라이트톤',
      시선흐름: 'Z',
      디자인분석: '명확한 컬러 대비와 일러스트 사용으로 메시지를 효과적으로 전달하며, Z형 레이아웃이 시선을 자연스럽게 유도합니다.'
    },
    {
      대카테고리: '금융',
      소카테고리: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '마이데이터 캠페인',
      캠페인기간: '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_16',
      소재명: 'ai',
      노출수: 2210557,
      클릭수: 46680,
      CTR: 2.11,
      전환수: 0,
      CVR: 0.00,
      광고비: 3972209,
      매출액: 0,
      ROAS: 0.00,
      소재: '/미래에셋대우_16.png',
      메인카피: 'AI가 분석해주는 마이데이터 투자진단 서비스',
      메인카피유형: '키워드 · 짧은 강조형',
      메인카피비중: '30%',
      서브카피: '내일의 맞춤형 투자 코치',
      서브카피비중: '10%',
      CTA문구: '이벤트 신청하기',
      CTA위치: 'bottomCenter',
      CTA비중: '5%',
      모델비중: '20%',
      제품비중: '10%',
      비주얼요소: '일러스트',
      소재칼라톤: '브라이트톤',
      시선흐름: 'F',
      디자인분석: '명확한 타이포그래피와 밝은 톤의 색상을 사용하여 주목성을 높였으며, 일러스트를 통해 친근한 이미지를 전달합니다.'
    },
    {
      대카테고리: '금융',
      소카테고리: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '연금 다이렉트 이벤트',
      캠페인기간: '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_17',
      소재명: 'Change',
      노출수: 8936340,
      클릭수: 426814,
      CTR: 4.78,
      전환수: 0,
      CVR: 0.00,
      광고비: 15967070,
      매출액: 0,
      ROAS: 0.00,
      소재: '/미래에셋대우_17.png',
      메인카피: '짜릇한 혜택! 연금 갈아타기',
      메인카피유형: '할인 · 혜택 강조형',
      메인카피비중: '20%',
      서브카피: '이벤트 기간: 11.1~12.31',
      서브카피비중: '10%',
      CTA문구: '-',
      CTA위치: 'bottomRight',
      CTA비중: '5%',
      모델비중: '0%',
      제품비중: '30%',
      비주얼요소: '일러스트',
      소재칼라톤: '브라이트톤',
      시선흐름: 'F',
      디자인분석: '밝은 오렌지 톤으로 시각적 주목도를 높였으며, 메인 카피와 이미지의 조화가 잘 이루어져 메시지 전달이 명확하다.'
    },
    {
      대카테고리: '금융',
      소카테고리: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '연금 다이렉트 이벤트',
      캠페인기간: '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_18',
      소재명: 'Matzip',
      노출수: 7379749,
      클릭수: 351100,
      CTR: 4.76,
      전환수: 0,
      CVR: 0.00,
      광고비: 12843523,
      매출액: 0,
      ROAS: 0.00,
      소재: '/미래에셋대우_18.png',
      메인카피: '연금 맛집, 미래에셋증권',
      메인카피유형: '키워드 · 짧은 강조형',
      메인카피비중: '20%',
      서브카피: '다이렉트 연금 이전 이벤트\n이벤트 기간: 11.1~12.31',
      서브카피비중: '15%',
      CTA문구: '-',
      CTA위치: 'topRight',
      CTA비중: '5%',
      모델비중: '10%',
      제품비중: '15%',
      비주얼요소: '실사',
      소재칼라톤: '브라이트톤',
      시선흐름: 'F',
      디자인분석: '밝고 선명한 컬러와 간결한 타이포그래피가 주목도를 높이며, 시선을 자연스럽게 오른쪽으로 유도한다.'
    },
    {
      대카테고리: '금융',
      소카테고리: '증권',
      브랜드명: '미래에셋대우',
      캠페인명: '연금 다이렉트 이벤트',
      캠페인기간: '2021-12-08 ~ 2021-12-26',
      광고플랫폼: '카카오',
      광고타겟: '모두',
      타겟연령: '20대',
      소재ID: '미래에셋대우_19',
      소재명: 'Game',
      노출수: 7501950,
      클릭수: 350538,
      CTR: 4.67,
      전환수: 0,
      CVR: 0.00,
      광고비: 12812898,
      매출액: 0,
      ROAS: 0.00,
      소재: '/미래에셋대우_19.png',
      메인카피: '연금 숨기기 게임 참여하시겠습니까?',
      메인카피유형: '도전 · 참여 유도형',
      메인카피비중: '25%',
      서브카피: '이벤트 기간: 11.1~12.31',
      서브카피비중: '10%',
      CTA문구: '11.1~12.31',
      CTA위치: 'centerRight',
      CTA비중: '5%',
      모델비중: '0%',
      제품비중: '15%',
      비주얼요소: '일러스트',
      소재칼라톤: '다크톤',
      시선흐름: 'Z',
      디자인분석: '다크톤 배경에 메인 카피를 강조하여 시선을 끌며, 일러스트와 텍스트가 조화를 이뤄 참여 유도를 효과적으로 전달합니다.'
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
    
    // 대분류 필터
    if (selectedLargeCategory) {
      filtered = filtered.filter(item => item.대카테고리 === selectedLargeCategory);
    }
    
    // 소분류 필터
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

  // 대분류 변경 시 소분류 초기화
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

  // GPT 이미지 분석 함수
  const analyzeImageWithGPT = async (소재ID: string) => {
    setAnalyzingItems(prev => new Set(prev).add(소재ID));
    
    try {
      const imageUrl = `${window.location.origin}/${소재ID}.png`;
      console.log('Analyzing image:', imageUrl);
      console.log('Current origin:', window.location.origin);
      
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl, 소재ID }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const responseText = await response.text();
        console.error('Error response body:', responseText);
        
        let errorMessage = 'Failed to analyze image';
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = `Server error: ${responseText.substring(0, 200)}...`;
        }
        
        throw new Error(errorMessage);
      }

      const responseText = await response.text();
      console.log('Response body:', responseText.substring(0, 500) + '...');
      
      let result: GPTAnalysisResult;
      try {
        result = JSON.parse(responseText) as GPTAnalysisResult;
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error('Invalid JSON response from server');
      }
      
      // sampleData 업데이트
      const updatedData = sampleData.map(item => {
        if (item.소재ID === 소재ID) {
          return {
            ...item,
            메인카피: result.mainCopy,
            메인카피유형: result.mainCopyType,
            메인카피비중: result.mainCopyRatio,
            서브카피: result.subCopy,
            서브카피비중: result.subCopyRatio,
            CTA문구: result.ctaCopy,
            CTA위치: result.ctaPosition,
            CTA비중: result.ctaRatio,
            모델비중: result.modelRatio,
            제품비중: result.productRatio,
            비주얼요소: result.visualElement,
            소재칼라톤: result.materialColorTone,
            시선흐름: result.eyeFlow,
            디자인분석: result.designAnalysis
          };
        }
        return item;
      });
      
      // filteredData도 업데이트
      setFilteredData(updatedData);
    } catch (error) {
      console.error('Error analyzing image:', error);
      alert(`이미지 분석 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setAnalyzingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(소재ID);
        return newSet;
      });
    }
  };

  // 모든 이미지 분석
  const analyzeAllImages = async () => {
    setIsAnalyzing(true);
    
    try {
      for (const item of sampleData) {
        await analyzeImageWithGPT(item.소재ID);
        // 각 요청 사이에 약간의 딜레이 추가 (API 제한 방지)
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Error analyzing all images:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 자동 GPT 분석 기능 제거됨

  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 bg-gray-50 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">매체 결과 데이터</h1>
            <div className="flex gap-3 items-center">
              <button
                onClick={analyzeAllImages}
                disabled={isAnalyzing}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                {isAnalyzing ? 'GPT 분석 중...' : 'GPT 전체 분석'}
              </button>
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

                  {/* 카테고리 및 브랜드 그룹 */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">카테고리 및 브랜드</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">대분류</label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">소분류</label>
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
                        <option value="서브카피">서브카피</option>
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
                        <option value="서브카피">서브카피</option>
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
                      {visibleColumns.includes('대분류') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.대카테고리}</td>
                      )}
                      {visibleColumns.includes('소분류') && (
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
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 bg-gray-200 rounded border border-gray-300 flex items-center justify-center text-xs text-gray-500 mx-auto overflow-hidden">
                              <img 
                                src={`/${item.소재ID}.png`} 
                                alt={item.소재명}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const parent = target.parentElement;
                                  if (parent) {
                                    parent.innerText = '이미지';
                                  }
                                }}
                              />
                            </div>
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
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{cleanPercentValue(item.메인카피비중) === '-' ? '-' : `${cleanPercentValue(item.메인카피비중)}`}</td>
                      )}
                      {visibleColumns.includes('서브카피') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.서브카피}</td>
                      )}
                      {visibleColumns.includes('서브카피 비중(%)') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{cleanPercentValue(item.서브카피비중) === '-' ? '-' : `${cleanPercentValue(item.서브카피비중)}`}</td>
                      )}
                      {visibleColumns.includes('CTA문구') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.CTA문구}</td>
                      )}
                      {visibleColumns.includes('CTA위치') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{getCTAPositionDisplay(item.CTA위치)}</td>
                      )}
                      {visibleColumns.includes('CTA비중(%)') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{cleanPercentValue(item.CTA비중) === '-' ? '-' : `${cleanPercentValue(item.CTA비중)}`}</td>
                      )}
                      {visibleColumns.includes('모델비중(%)') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{cleanPercentValue(item.모델비중) === '-' ? '-' : `${cleanPercentValue(item.모델비중)}`}</td>
                      )}
                      {visibleColumns.includes('제품비중(%)') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{cleanPercentValue(item.제품비중) === '-' ? '-' : `${cleanPercentValue(item.제품비중)}`}</td>
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
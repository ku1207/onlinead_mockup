'use client';

import Navigation from '@/components/Navigation';
import { useState } from 'react';

export default function AICreative() {
  const [selectedLargeCategory, setSelectedLargeCategory] = useState('');
  const [selectedSmallCategory, setSelectedSmallCategory] = useState('');
  const [brandName, setBrandName] = useState('');
  const [brandMessage, setBrandMessage] = useState('');
  const [eventContent, setEventContent] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnalysisData, setShowAnalysisData] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

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

  // 대카테고리 변경 시 소카테고리 초기화
  const handleLargeCategoryChange = (category: string) => {
    setSelectedLargeCategory(category);
    setSelectedSmallCategory('');
  };

  // 파일 드래그 앤 드롭 핸들러
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedImage(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedImage(files[0]);
    }
  };

  // AI 제안 생성 핸들러
  const handleGenerateAI = () => {
    setIsLoading(true);
    // 3초 후 로딩 완료 및 결과 표시
    setTimeout(() => {
      setIsLoading(false);
      setShowSuggestions(true);
    }, 3000);
  };

  // 확인 버튼 핸들러
  const handleConfirm = () => {
    setShowAnalysisData(true);
  };

  // 스크롤 기능
  const scrollToSection = (sectionId: string, stepNumber: number) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveStep(stepNumber);
    }
  };

  // AI 이미지 제안 생성 핸들러
  const handleGenerateImages = () => {
    setShowImages(true);
  };

  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      
      {/* AI Step 플로팅 박스 */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-10 w-48">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 text-center">AI Step</h3>
        <div className="space-y-2">
          <div onClick={() => scrollToSection('ai-analysis', 1)} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
            <div className={`w-2 h-2 rounded-full ${activeStep === 1 ? "bg-blue-600" : "bg-gray-300"}`}></div>
            <span className="text-xs text-gray-700">1. AI 소재 분석</span>
          </div>
          <div onClick={() => scrollToSection('ai-copy-suggestions', 2)} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
            <div className={`w-2 h-2 rounded-full ${activeStep === 2 ? "bg-blue-600" : "bg-gray-300"}`}></div>
            <span className="text-xs text-gray-700">2. AI 카피 제안</span>
          </div>
          <div onClick={() => scrollToSection('ai-image-suggestions', 3)} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
            <div className={`w-2 h-2 rounded-full ${activeStep === 3 ? "bg-blue-600" : "bg-gray-300"}`}></div>
            <span className="text-xs text-gray-700">3. AI 이미지 제안</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 bg-gray-50 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">AI 배너광고</h1>
          </div>
          
          {/* AI 소재 분석 영역 */}
          <div id="ai-analysis" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">AI 소재 분석</h2>
              
              {/* 카테고리 선택 드롭다운들 */}
              <div className="flex items-center space-x-1">
                <div>
                  <select
                    value={selectedLargeCategory}
                    onChange={(e) => handleLargeCategoryChange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                  >
                    <option value="">대카테고리 선택</option>
                    {Object.keys(categoryData).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={selectedSmallCategory}
                    onChange={(e) => setSelectedSmallCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    disabled={!selectedLargeCategory}
                  >
                    <option value="">소카테고리 선택</option>
                    {selectedLargeCategory && categoryData[selectedLargeCategory as keyof typeof categoryData]?.map((subCategory) => (
                      <option key={subCategory} value={subCategory}>
                        {subCategory}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="브랜드명 입력"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    disabled={!selectedSmallCategory}
                  />
                </div>
                <button 
                  onClick={handleConfirm}
                  className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  확인
                </button>
              </div>
            </div>
            
            {/* 좌우 분할 컨테이너 - 6:4 비율 */}
            <div className="grid grid-cols-10 gap-6 items-start">
              {/* 왼쪽 영역 - AI 분석 테이블 */}
              <div className="col-span-6 h-full flex flex-col">
                <table className="w-full border-collapse border border-gray-300">
                  <tbody>
                    {/* 1행 */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center bg-blue-50">
                        <div className="text-sm font-medium text-gray-700">CTR(상위 20% 평균)</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center bg-blue-50">
                        <div className="text-sm font-medium text-gray-700">CVR(상위 20% 평균)</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center bg-blue-50">
                        <div className="text-sm font-medium text-gray-700">ROAS(상위 20% 평균)</div>
                      </td>
                    </tr>
                    {/* 2행 - 값 표시 */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-lg font-bold text-blue-600">
                          {showAnalysisData ? '0.6%' : '-'}
                        </div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-lg font-bold text-blue-600">
                          {showAnalysisData ? '17%' : '-'}
                        </div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-lg font-bold text-blue-600">
                          {showAnalysisData ? '523%' : '-'}
                        </div>
                      </td>
                    </tr>
                    {/* 3행 */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center bg-blue-50">
                        <div className="text-sm font-medium text-gray-700">메시지<br/>유형분석</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center bg-blue-50">
                        <div className="text-sm font-medium text-gray-700">CTA<br/>분석</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center bg-blue-50">
                        <div className="text-sm font-medium text-gray-700">디자인<br/>분석</div>
                      </td>
                    </tr>
                    {/* 4행 - 분석 내용 */}
                    <tr>
                      <td className="border border-gray-300 p-3 text-left">
                        <div className="text-xs text-gray-600 whitespace-pre-line">
                          {showAnalysisData ? `*짧고 강한 메시지:
락토핏 맛집 최저가 도전!, 아임비타
사면 보조배터리 증정! → 키워드 중
심, 임팩트 있는 문장
*혜택 중심 or 긴급성 강조:
100원, 보조배터리 증정, 선착순,
최저가 등 → 즉시 행동을 유도하는
"가격" 및 "한정성" 표현 다수` : '-'}
                        </div>
                      </td>
                      <td className="border border-gray-300 p-3 text-left">
                        <div className="text-xs text-gray-600 whitespace-pre-line">
                          {showAnalysisData ? `*거의 모두 "카카오 1초 회원가입
하고 구매하기" CTA 사용
*CTA 유형은 Bar 버튼, 위치는
하단 중앙, 비중은 10% 이내
*CTA 문구와 메시지 흐름이 자연
스럽게 이어짐 (ex. "100원" →
"회원가입하고 구매")` : '-'}
                        </div>
                      </td>
                      <td className="border border-gray-300 p-3 text-left">
                        <div className="text-xs text-gray-600 whitespace-pre-line">
                          {showAnalysisData ? `*일러스트 기반의 비주얼이 주를
이룸 (모델/실사 거의 없음)
*시선 흐름 유도 'O':
텍스트→CTA로 자연스럽게 이어
지는 구성
*컬러톤: 딥톤/브라이트톤/소프트
톤 다양하지만, 메시지를 돋보이게
하는 대비 사용` : '-'}
                        </div>
                      </td>
                    </tr>
                    {/* 5행 - AI 종합 분석 (병합) */}
                    <tr>
                      <td className="border border-gray-300 p-3 text-center bg-blue-50" colSpan={3}>
                        <div className="text-sm font-medium text-gray-700">AI 종합 분석</div>
                      </td>
                    </tr>
                    {/* 6행 - 종합 분석 내용 (병합) */}
                    <tr>
                      <td className="border border-gray-300 p-3 text-center" colSpan={3}>
                        <div className="text-sm text-gray-600">
                          {showAnalysisData ? `메시지 짧고 명확한 혜택 중심 문구 (100원, 증정, 최저가 등)
CTA 하단 Bar 버튼 / "카카오 1초 회원가입"으로 전환 연결
디자인 텍스트 중심 / 감성+명확성 강조 / 시선 흐름 유도 설계` : '-'}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 오른쪽 영역 - 사용자 입력 */}
              <div className="col-span-4 space-y-4 h-full flex flex-col justify-between">
                {/* 브랜드 메시지 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">브랜드 메시지</label>
                  <textarea
                    value={brandMessage}
                    onChange={(e) => setBrandMessage(e.target.value)}
                    placeholder="브랜드 메시지를 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                </div>

                {/* 이벤트 내용 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이벤트 내용</label>
                  <textarea
                    value={eventContent}
                    onChange={(e) => setEventContent(e.target.value)}
                    placeholder="이벤트 내용을 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                </div>

                {/* 삽입할 이미지 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">삽입할 이미지</label>
                  <div
                    className={`w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                      isDragOver 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    {uploadedImage ? (
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-700">{uploadedImage.name}</div>
                        <div className="text-xs text-gray-500">클릭하여 다른 파일 선택</div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-sm text-gray-500">이미지를 드래그하거나 클릭하여 업로드</div>
                        <div className="text-xs text-gray-400 mt-1">PNG, JPG, GIF (최대 10MB)</div>
                      </div>
                    )}
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI 제안 생성 버튼 */}
          <div className="flex justify-center mt-6 mb-6">
            <button
              onClick={handleGenerateAI}
              disabled={isLoading}
              className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-400"
            >
              {isLoading ? '생성 중...' : 'AI 카피 제안 생성'}
            </button>
          </div>

          {/* AI 카피 제안 영역 */}
          <div id="ai-copy-suggestions" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800">AI 카피 제안</h2>
            </div>
            
            {/* 로딩 상태 */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                <div className="text-sm text-gray-600">AI가 최적의 소재를 분석하고 있습니다...</div>
              </div>
            )}

            {/* 초기 상태 (버튼 클릭 전) */}
            {!isLoading && !showSuggestions && (
              <div className="text-center py-12 text-gray-500">
                위의 'AI 카피 제안 생성' 버튼을 클릭하여 AI 카피 제안을 받아보세요.
              </div>
            )}

            {/* AI 카피 제안 테이블 (7열 10행) - 생성 완료 후 표시 */}
            {!isLoading && showSuggestions && (
              <div>
                <table className="w-full border-collapse border border-gray-300">
                  <tbody>
                    {/* 1행 - 헤더 */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center bg-green-50">
                        <div className="text-xs font-medium text-gray-700" style={{fontSize: '10px'}}>카피 유형</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center bg-green-50">
                        <div className="text-xs font-medium text-gray-700" style={{fontSize: '10px'}}>설명</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center bg-green-50">
                        <div className="text-xs font-medium text-gray-700" style={{fontSize: '10px'}}>배너 샘플 카피</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center bg-green-50">
                        <div className="text-xs font-medium text-gray-700" style={{fontSize: '10px'}}>성과 측정 예시</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center bg-green-50">
                        <div className="text-xs font-medium text-gray-700" style={{fontSize: '10px'}}>A/B 테스트 문구 예시</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center bg-green-50">
                        <div className="text-xs font-medium text-gray-700" style={{fontSize: '10px'}}>추천 색상 톤</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center bg-green-50">
                        <div className="text-xs font-medium text-gray-700" style={{fontSize: '10px'}}>추천 CTA 문구 예시</div>
                      </td>
                    </tr>
                    {/* 2행 - 할인 · 혜택 강조형 */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center bg-blue-50">
                        <div className="text-xs font-medium text-gray-700" style={{fontSize: '10px'}}>할인 · 혜택 강조형</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>가격보다 고객 대상/한정 혜택 강조 유도</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>오늘만 최대 70% 할인<br/>G마켓 단독 특가 OPEN</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>CTR, 전환율, ROAS</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>A : "한정! 오늘만"<br/>B : "단 하루! 역대급 혜택"</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>베네톤 레드<br/>다이아 핑크</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>"지금 할인 받기"<br/>"오늘 마지막 찬스"</div>
                      </td>
                    </tr>
                    {/* 3행 - 한정 · 긴급성 강조형 */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center bg-blue-50">
                        <div className="text-xs font-medium text-gray-700" style={{fontSize: '10px'}}>한정 · 긴급성 강조형</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>구매 시급성 자극, FOMO 유발</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>딱 오늘만 이 가격<br/>재고 소진 시 종료!</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>CTR, 시간대별 전환</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>A : "지금 안 사면 후회각"<br/>B : "3초 후 품절된 예정"</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>블랙 앤 옐로우</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>"놓치면 손해!"<br/>"지금 아님 품절"</div>
                      </td>
                    </tr>
                    {/* 4행 - 고객후기 · 신뢰 강조형 */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center bg-blue-50">
                        <div className="text-xs font-medium text-gray-700" style={{fontSize: '10px'}}>고객후기 · 신뢰 강조형</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>구매 망설임 줄이기 위한 신뢰 강화 요소</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>리뷰 12,000건+<br/>신규구매 만족도 98%</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>전환율, 장바구니 담기율</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>A : "리뷰 보고 온 사람 나야 나"<br/>B : "후기 읽다 보면 결제돼 있음"</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>코발트 블루<br/>네이비</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>"후기 맛집 ㄱㄱ"<br/>"인정템 확인"</div>
                      </td>
                    </tr>
                    {/* 5행 - 신뢰성 강조형 */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center bg-blue-50">
                        <div className="text-xs font-medium text-gray-700" style={{fontSize: '10px'}}>키워드 · 짧은 강조형</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>시선 끌기 위한 핵심 메시지 압축</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>무료배송<br/>1+1 한정 특가<br/>오늘 출발</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>CTR, 도달율</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>A : "1+1=사야지"<br/>B : "무료배송은 못 참지"</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>퓨어 화이트<br/>하이 콘트라스트 블랙</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>"GO!"<br/>"확인 완료"</div>
                      </td>
                    </tr>
                    {/* 6행 - 실적 · 성과 강조형 */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center bg-blue-50">
                        <div className="text-xs font-medium text-gray-700" style={{fontSize: '10px'}}>실적 · 성과 강조형</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>'잘 팔린다'는 증거로 신회감과 소유욕 자극'</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>누적 판매 50만개 돌파<br/>1등 상품 다시 돌아왔다!</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>CVR, 재구매율</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>A : "50만 개 팔린 이유 있음"<br/>B : "다들 샀다는데 나만 안 삼?"</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>미드나잇 퍼플<br/>다크 블루</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>"1등템 겟!"<br/>"다들 샀다GO"</div>
                      </td>
                    </tr>
                    {/* 7행 - 감성 · 공감형 */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center bg-blue-50">
                        <div className="text-xs font-medium text-gray-700" style={{fontSize: '10px'}}>감성 · 공감형</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>취향/공감 자극하여 브랜드 호감도와 몰입도 증가</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>당신의 첫 커피머신, 지금 만나보세요.<br/>퇴근 후 나를 위한 작은 선물</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>페이지 체류시간, 공감률</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>A : "오늘도 나를 위한 쇼핑"<br/>B : "당신, 이런 거 좋아하잖아?"</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>소프트 핑크<br/>라이트 베이지</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>"내 취향♥"<br/>"딱 내꼬양"</div>
                      </td>
                    </tr>
                    {/* 8행 - 도전 · 참여 유도형 */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center bg-blue-50">
                        <div className="text-xs font-medium text-gray-700" style={{fontSize: '10px'}}>도전·참여 유도형</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>이벤트/참여형 프로모션과 궁합이 좋음</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>1초만에 응모 완료!<br/>G마켓 챌린지 참여하고 경품 받자!</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>CTR, CVR</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>A : "누르면 선물 나오GO!"<br/>B : "응모 안 하면 나만 손해"</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>프레시 민트<br/>에너제틱 그림</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>"나도 도전!"<br/>"클릭 한방"</div>
                      </td>
                    </tr>
                    {/* 9행 - 후킹성 문구형 */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center bg-blue-50">
                        <div className="text-xs font-medium text-gray-700" style={{fontSize: '10px'}}>후킹성 문구형</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>첫 시선에서 멈추게 만드는 독특한 문장</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>당신의 지갑이 좋아할 가격<br/>이건... 사고 봐야 해</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>CTR, CVR</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>A : "이건 뭐지? 눌러봄"<br/>B : "누르면 놀람 주의!"</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>레몬 옐로우<br/>네온 바이올렛</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>"뭐지 이건?"<br/>"누르면 안 궁금할껄"</div>
                      </td>
                    </tr>
                    {/* 10행 - 비교·대조형 */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center bg-blue-50">
                        <div className="text-xs font-medium text-gray-700" style={{fontSize: '10px'}}>비교·대조형</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>경쟁력 강조나 타사와의 차별화에 효과적</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>백화점보다 50% 저렴<br/>이 가격, 쿠팡에도 없다</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>CTR, CVR</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>A : "쿠팡보다 싸다, 진짜"<br/>B : "네이버보다 싸면 인정!"</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>쿨 크레이<br/>차콜<br/>하이라이트 컬러</div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="text-xs text-gray-600" style={{fontSize: '10px'}}>"어디가 더 쌈?"<br/>"차이 알아보실?"</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          {/* AI 이미지 제안 생성 영역 */}
          <div id="ai-image-suggestions">
            {!isLoading && showSuggestions && (
              <div className="flex justify-center items-center space-x-4 mt-6">
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900">
                  <option value="">카피 유형 선택</option>
                  <option value="discount">할인·혜택 강조형</option>
                  <option value="urgency">한정·긴급성 강조형</option>
                  <option value="trust">고객후기·신뢰 강조형</option>
                </select>
                <button 
                  onClick={handleGenerateImages}
                  className="px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
                >
                  AI 이미지 제안 생성
                </button>
              </div>
            )}
            
            {/* AI 생성 이미지 표시 영역 */}
            {showImages && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">AI 생성 이미지</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  {/* 이미지 1 */}
                  <div className="text-center">
                    <div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <div className="text-4xl text-gray-400 mb-2">🖼️</div>
                        <div className="text-sm text-gray-500">AI 생성 배너 이미지 1</div>
                        <div className="text-xs text-gray-400 mt-1">320x480px</div>
                      </div>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        다운로드
                      </button>
                      <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        수정하기
                      </button>
                    </div>
                  </div>
                  
                  {/* 이미지 2 */}
                  <div className="text-center">
                    <div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <div className="text-4xl text-gray-400 mb-2">🖼️</div>
                        <div className="text-sm text-gray-500">AI 생성 배너 이미지 2</div>
                        <div className="text-xs text-gray-400 mt-1">320x480px</div>
                      </div>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        다운로드
                      </button>
                      <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        수정하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
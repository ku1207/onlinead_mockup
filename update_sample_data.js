// GPT 분석 결과로 sampleData 업데이트 스크립트
const fs = require('fs');
const path = require('path');

// GPT 분석 결과 가져오기
const gptResults = require('./gpt_analysis_results.js');

// 현재 페이지 파일 읽기
const pageFilePath = './src/app/banner/media-results/page.tsx';
let pageContent = fs.readFileSync(pageFilePath, 'utf8');

// 각 소재ID에 대해 데이터 업데이트
Object.keys(gptResults).forEach(소재ID => {
  const result = gptResults[소재ID];
  
  // 해당 소재ID의 데이터 블록 찾기
  const dataBlockRegex = new RegExp(
    `(소재ID: '${소재ID}',[\\s\\S]*?)메인카피: '[^']*'([\\s\\S]*?)디자인분석: '[^']*'`,
    'g'
  );
  
  const replacement = `$1메인카피: '${result.mainCopy}',
      메인카피유형: '${result.mainCopyType}',
      메인카피비중: '${result.mainCopyRatio}',
      서브카피: '${result.subCopy.replace(/'/g, "\\'")}',
      서브카피비중: '${result.subCopyRatio}',
      CTA문구: '${result.ctaCopy}',
      CTA위치: '${result.ctaPosition}',
      CTA비중: '${result.ctaRatio}',
      모델비중: '${result.modelRatio}',
      제품비중: '${result.productRatio}',
      비주얼요소: '${result.visualElement}',
      소재칼라톤: '${result.materialColorTone}',
      시선흐름: '${result.eyeFlow}',
      디자인분석: '${result.designAnalysis.replace(/'/g, "\\'")}'`;
  
  pageContent = pageContent.replace(dataBlockRegex, replacement);
});

// 업데이트된 내용을 파일에 저장
fs.writeFileSync(pageFilePath, pageContent);

console.log('✅ sampleData가 GPT 분석 결과로 업데이트되었습니다!');
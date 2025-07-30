import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface GPTAnalysisResult {
  mainCopy: string;
  mainCopyType: string;
  mainCopyRatio: string;
  subCopy: string;
  subCopyRatio: string;
  ctaType: string;
  ctaCopy: string;
  ctaPosition: string;
  ctaRatio: string;
  modelRatio: string;
  productRatio: string;
  visualElement: string;
  materialColorTone: string;
  eyeFlow: string;
  designAnalysis: string;
}

const SYSTEM_PROMPT = `###지시사항
첨부한 배너광고 이미지를 분석하여 사용자가 요구하는 정보를 찾아 기입하십시오.

###중요: 출력 규칙
- 응답은 반드시 순수한 JSON 형태로만 출력하십시오.
- JSON 코드 블록(\`\`\`json)을 사용하지 마십시오.
- 어떠한 설명, 주석, 추가 텍스트도 포함하지 마십시오.
- 첫 글자는 반드시 '{' 로 시작하고 마지막 글자는 '}' 로 끝나야 합니다.
 
###작성지침
1. 전체 구조
- 결과는 순수 JSON(UTF-8) 만 출력합니다.
- JSON 외의 문장·설명·주석은 절대 출력하지 마십시오.
- 최상위 키는 15개이며 **누락되는 항목 없이 출력하십시오.**
- 모든 값은 반드시 출력하며, 값이 없거나 파악 불가한 경우 단일 문자열 "-" 로 기재합니다.
 
2. 필드 및 값 규칙
(1) mainCopy  
   - 이미지에서 메인 카피로 인식되는 문구를 기입하십시오. 
(2) mainCopyType
   - 메인 카피의 전달 의도를 판단하여 아래 리스트 중 **정확히 하나**를 입력하십시오.  
     ['할인 · 혜택 강조형', '한정 · 긴급성 강조형', '고객후기 · 신뢰 강조형', '키워드 · 짧은 강조형', '실적 · 성과 강조형', '감성 · 공감형', '도전 · 참여 유도형', '후기성 문구형', '비교 · 대조형']
(3) mainCopyRatio
   - 배너 전체 면적(가로×세로)을 100%로 가정하고, 메인 카피가 차지하는 영역 비중을 **정수+"%"** 형식으로 입력하십시오.
(4) subCopy
   - 이미지에서 서브 카피로 인식되는 문구를 기입하십시오.
(5) subCopyRatio
   - 서브 카피(보조 설명·문장)의 면적 비중을 **정수+"%"** 형식으로 입력하십시오.
(6) ctaType
   - CTA 버튼의 디자인 형태를 아래 리스트 중 **하나**로 기입하십시오.
    [Bar버튼, 버튼, 뱃지, 텍스트] 
(7) ctaCopy
   - 이미지에서 CTA 버튼에 기입된 문구를 기입하십시오.
(8) ctaPosition
   - CTA(Button·링크) 가 위치한 화면 좌표를 아래 리스트 중 **하나로**로 기입하십시오.
     [topLeft, topCenter, topRight, centerLeft, center, centerRight, bottomLeft, bottomCenter, bottomRight]
(9) ctaRatio
   - CTA 요소(버튼·텍스트 포함)가 차지하는 면적 비중을 **정수+"%"** 형식으로 입력하십시오.  
(10) modelRatio
   - 인물(모델·손·얼굴 등)이 차지하는 면적 비중을 **정수+"%"** 형식으로 입력하십시오.  
(11) productRatio
   - 제품(실물·패키지 등)이 차지하는 면적 비중을 **정수+"%"** 형식으로 입력하십시오.  
(12) visualElement
   - 배너의 주된 비주얼 표현 방식을 아래 리스트 중 **하나**로 기입하십시오.  
     [일러스트, 실사, 3D]  
   - 복합 사용 시 **가장 지배적인** 요소를 선택합니다.
(13) materialColorTone
   - 색채·톤을 아래 리스트 중 **하나**로 기입하십시오.
   - 각 톤은 명도(밝기)·채도(선명도)·그레이 함유량·분위기로 구분하며, 대표 예시 컬러를 참고하십시오.
     ['비비드톤', '라이트톤', '소프트톤', '다크톤', '페일톤', '브라이트톤', '그레이시톤', '딥톤', '파스텔톤', '네온톤']
     • 비비드톤      : **고채도·중명도**. 원색에 가까운 강렬‧선명함.  
                        예) pure red, vivid cobalt blue, emerald green
     • 라이트톤      : **고명도·중채도**. 밝고 가벼우며 파스텔보다 선명함.  
                        예) light lime, sky blue, peach pink
     • 소프트톤      : **중명도·중채도**. 채도를 살짝 낮춰 부드럽고 차분함.  
                        예) muted coral, dusty aqua, soft lavender
     • 다크톤        : **저명도·중채도**. 어두운 배색으로 무게감·고급감.  
                        예) deep burgundy, midnight green, dark teal
     • 페일톤        : **고명도·저채도**. 빛이 바랜 듯 흐릿하고 섬세함.  
                        예) pale beige, ivory, light mist gray
     • 브라이트톤    : **고명도·고채도**. 밝고 화사하며 시각적 에너지 강조.  
                        예) bright yellow, luminous orange, fiesta pink
     • 그레이시톤    : **중명도·저채도**. 회색 기운이 섞여 모던‧세련됨.  
                        예) gray‑lavender, bluish gray, greige
     • 딥톤          : **저명도·고채도**. 다크톤보다 채도가 높아 깊고 풍부함.  
                        예) deep violet, forest green, oxblood red
(14) eyeFlow
   - 시선 흐름을 아래 리스트 중 **하나**로 기입하십시오.
     ['Z', 'F', 'O']
   - Z : 왼쪽 위에 가장 중요한 로고를 배치하여, 로고부터 Z 형태로 콘텐츠를 읽어나가도록 유도하는 레이아웃
   - F : 상단 메뉴부터 순차적으로 시선이 이동하며, 내용을 중요도 순으로 가장 안정적으로 전달하는 레이아웃
   - O : 시선의 방향이 위에서 아래, 단 방향으로 이동하기 때문에, 순차적으로 전달할 때 가장 유리한 레이아웃
(15) designAnalysis
   - 디자이너 관점에서 레이아웃·타이포·컬러·균형 등을 종합 평가한 **1~2문장**(120자 이내)으로 작성하십시오.  
   - 주관적 의견 허용하되 구체적 디자인 요소를 언급해야 하며, "좋다/나쁘다" 같은 단순 평가는 피하십시오.
 
3. 검증 규칙
- 모든 문자열 값 앞뒤에 불필요한 공백이나 줄바꿈이 없어야 합니다.  
- JSON 파싱 오류가 없도록 필드명·구조를 정확히 지켜 출력하십시오.
 
###출력형태
{
  "mainCopy": "-",
  "mainCopyType": "-",
  "mainCopyRatio": "-",
  "subCopy": "-",
  "subCopyRatio": "-",
  "ctaType": "-",
  "ctaCopy": "-",
  "ctaPosition": "-",
  "ctaRatio": "-",
  "modelRatio": "-",
  "productRatio": "-",
  "visualElement": "-",
  "materialColorTone": "-",
  "eyeFlow": "-",
  "designAnalysis": "-"
}`;


export async function analyzeImageWithGPT(imageBase64: string): Promise<GPTAnalysisResult> {
  try {
    console.log('Starting GPT analysis with base64 image');
    
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.6,
      messages: [
        {
          role: "system",
          content: "You are a professional banner ad analyst. You must respond ONLY with valid JSON format. Do not include any explanations, markdown formatting, or additional text. Start with '{' and end with '}'."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: SYSTEM_PROMPT
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${imageBase64}`
              }
            }
          ]
        }
      ],
      max_tokens: 1500,
      response_format: { type: "json_object" }
    });

    console.log('GPT response received');

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No response from GPT');
    }

    console.log('GPT response content:', content);

    // JSON 파싱 - 마크다운 코드 블록이나 추가 텍스트 제거
    let result: GPTAnalysisResult;
    try {
      // GPT 응답에서 JSON 부분만 추출
      let jsonContent = content.trim();
      
      // 마크다운 코드 블록 제거
      if (jsonContent.startsWith('```json')) {
        jsonContent = jsonContent.replace(/```json\s*/, '').replace(/\s*```$/, '');
      } else if (jsonContent.startsWith('```')) {
        jsonContent = jsonContent.replace(/```\s*/, '').replace(/\s*```$/, '');
      }
      
      // JSON 객체 시작과 끝 찾기
      const jsonStart = jsonContent.indexOf('{');
      const jsonEnd = jsonContent.lastIndexOf('}');
      
      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        jsonContent = jsonContent.substring(jsonStart, jsonEnd + 1);
      }
      
      console.log('Cleaned JSON content:', jsonContent);
      
      result = JSON.parse(jsonContent) as GPTAnalysisResult;
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Raw content:', content);
      
      // 기본값으로 대체
      result = {
        mainCopy: '-',
        mainCopyType: '-',
        mainCopyRatio: '-',
        subCopy: '-',
        subCopyRatio: '-',
        ctaType: '-',
        ctaCopy: '-',
        ctaPosition: '-',
        ctaRatio: '-',
        modelRatio: '-',
        productRatio: '-',
        visualElement: '-',
        materialColorTone: '-',
        eyeFlow: '-',
        designAnalysis: 'JSON 파싱 오류로 인해 분석 실패'
      };
      console.log('Using fallback result due to parsing error');
    }
    
    // 결과 검증
    const requiredFields = [
      'mainCopy', 'mainCopyType', 'mainCopyRatio', 'subCopy', 'subCopyRatio',
      'ctaType', 'ctaCopy', 'ctaPosition', 'ctaRatio', 'modelRatio',
      'productRatio', 'visualElement', 'materialColorTone', 'eyeFlow', 'designAnalysis'
    ];
    
    for (const field of requiredFields) {
      if (!(field in result)) {
        throw new Error(`Missing field: ${field}`);
      }
    }
    
    console.log('GPT analysis completed successfully');
    return result;
  } catch (error) {
    console.error('Error analyzing image with GPT:', error);
    if (error instanceof Error) {
      throw new Error(`GPT Analysis failed: ${error.message}`);
    }
    throw error;
  }
}
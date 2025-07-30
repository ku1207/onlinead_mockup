import { NextRequest, NextResponse } from 'next/server';
import { analyzeImageWithGPT } from '@/lib/gpt';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  console.log('=== Analyze Image API Called ===');
  
  try {
    console.log('API Key exists:', !!process.env.OPENAI_API_KEY);
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { imageUrl, 소재ID } = body;
    console.log('Image URL received:', imageUrl);
    console.log('소재ID received:', 소재ID);
    
    if (!소재ID) {
      return NextResponse.json({ error: '소재ID is required' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is not configured');
      return NextResponse.json({ error: 'OpenAI API key is not configured' }, { status: 500 });
    }

    // 이미지 파일을 Base64로 읽기
    try {
      const imagePath = path.join(process.cwd(), 'public', `${소재ID}.png`);
      console.log('Reading image from:', imagePath);
      console.log('Current working directory:', process.cwd());
      console.log('소재ID:', 소재ID);
      
      // 파일 존재 확인
      try {
        await fs.access(imagePath);
        console.log('File exists at:', imagePath);
      } catch (accessError) {
        console.error('File does not exist:', imagePath);
        console.error('Access error:', accessError);
        
        // public 디렉토리 내용 확인
        const publicDir = path.join(process.cwd(), 'public');
        const files = await fs.readdir(publicDir);
        console.log('Files in public directory:', files);
        
        return NextResponse.json({ error: `Image file not found: ${소재ID}.png` }, { status: 404 });
      }
      
      const imageBuffer = await fs.readFile(imagePath);
      const imageBase64 = imageBuffer.toString('base64');
      
      console.log('Image converted to base64, length:', imageBase64.length);
      
      const result = await analyzeImageWithGPT(imageBase64);
      return NextResponse.json(result);
    } catch (fileError) {
      console.error('Error reading image file:', fileError);
      return NextResponse.json({ 
        error: `Image file error: ${fileError instanceof Error ? fileError.message : String(fileError)}` 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('=== API Error ===');
    console.error('Error in analyze-image API:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        error: `Failed to analyze image: ${error instanceof Error ? error.message : String(error)}`,
        details: error instanceof Error ? error.stack : 'No additional details'
      }, 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token required' },
        { status: 400 }
      );
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not set');
      return NextResponse.json(
        { success: false, error: 'Server error' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      { 
        method: 'POST',
      }
    );

    const data = await response.json();

    return NextResponse.json({
      success: data.success,
      score: data.score,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Verification failed' },
      { status: 500 }
    );
  }
}
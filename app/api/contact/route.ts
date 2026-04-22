import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { token } = await req.json()

  const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  })

  const { success, score } = await verifyRes.json()

  if (!success || score < 0.5) {
    return NextResponse.json({ error: 'reCAPTCHA verificatie mislukt' }, { status: 400 })
  }

  return NextResponse.json({ success: true, score })
}

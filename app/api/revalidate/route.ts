import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  let body: { _type?: string; slug?: { current?: string } } = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ message: 'Invalid body' }, { status: 400 })
  }

  const type = body._type

  if (type === 'service') {
    revalidatePath('/coaching/[slug]', 'page')
    revalidatePath('/', 'page')
  } else if (type === 'page') {
    const slug = body.slug?.current
    if (slug === 'home') revalidatePath('/', 'page')
    else if (slug === 'over-mij') revalidatePath('/over-mij', 'page')
    else if (slug === 'aanpak') revalidatePath('/aanpak', 'page')
    else if (slug === 'getuigenissen') revalidatePath('/getuigenissen', 'page')
    else if (slug) revalidatePath(`/${slug}`, 'page')
    revalidatePath('/', 'layout') // navbar/logo
  } else if (type === 'settings') {
    revalidatePath('/', 'layout')
  } else if (type === 'testimonial') {
    revalidatePath('/', 'page')
    revalidatePath('/getuigenissen', 'page')
  } else {
    revalidatePath('/', 'layout')
  }

  return NextResponse.json({ revalidated: true, type })
}

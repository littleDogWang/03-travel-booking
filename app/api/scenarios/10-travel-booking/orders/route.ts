import { NextResponse } from 'next/server';
import {
  lookupTravelOrder,
  updateTravelOrder,
} from '@/scenarios/10-travel-booking/travel';

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const orderId = params.get('order_id');
  const travelerKey = params.get('traveler_key');
  if (!orderId || !travelerKey) {
    return NextResponse.json(
      { error: 'order_id and traveler_key are required' },
      { status: 400 },
    );
  }
  const order = lookupTravelOrder(orderId, travelerKey);
  return order
    ? NextResponse.json({ order })
    : NextResponse.json({ error: 'order_not_found_or_identity_mismatch' }, { status: 404 });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    if (
      typeof body.order_id !== 'string' ||
      typeof body.traveler_key !== 'string' ||
      typeof body.request_id !== 'string' ||
      body.confirmed !== true ||
      !['change', 'cancel'].includes(String(body.action))
    ) {
      return NextResponse.json({ error: 'order action fields and confirmed=true are required' }, { status: 400 });
    }
    const result = updateTravelOrder(
      body.order_id,
      body.traveler_key,
      body.action as 'change' | 'cancel',
      body.request_id,
      typeof body.new_departure === 'string' ? body.new_departure : undefined,
    );
    return 'error' in result
      ? NextResponse.json(result, { status: 409 })
      : NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'invalid request' },
      { status: 400 },
    );
  }
}

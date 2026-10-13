import travelData from './travel.json';

export type TravelStatus = 'confirmed' | 'change_requested' | 'cancel_requested';

export interface TravelOrder {
  orderId: string;
  travelerKey: string;
  route: string;
  departure: string;
  status: TravelStatus;
  availableChanges: string[];
}

const orders = new Map(
  (travelData.orders as TravelOrder[]).map((order) => [order.orderId, order]),
);
const requests = new Map<string, TravelOrder>();

export function lookupTravelOrder(orderId: string, travelerKey: string): TravelOrder | null {
  const order = orders.get(orderId.trim().toUpperCase());
  return order?.travelerKey === travelerKey ? order : null;
}

export function updateTravelOrder(
  orderId: string,
  travelerKey: string,
  action: 'change' | 'cancel',
  requestId: string,
  newDeparture?: string,
): { order: TravelOrder; duplicate: boolean } | { error: string } {
  const previous = requests.get(requestId);
  if (previous) return { order: previous, duplicate: true };
  const order = lookupTravelOrder(orderId, travelerKey);
  if (!order) return { error: 'order_not_found_or_identity_mismatch' };
  if (action === 'change') {
    if (!newDeparture || !order.availableChanges.includes(newDeparture)) {
      return { error: 'change_time_unavailable' };
    }
    order.departure = newDeparture;
    order.status = 'change_requested';
  } else {
    order.status = 'cancel_requested';
  }
  requests.set(requestId, order);
  return { order, duplicate: false };
}

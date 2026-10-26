import type { LlmTool } from 'agora-agents';
type Property = Record<string, unknown>;
function tool(baseUrl: string, name: string, description: string, method: 'GET' | 'POST', path: string, properties: Property, required: string[], body?: Record<string, unknown>): LlmTool {
  return { type: 'function', function: { name, description, parameters: { type: 'object', properties, required } }, server: { method, url: `${baseUrl.replace(/\/$/, '')}${path}`, ...(body ? { body } : {}) } };
}
export function getToolBaseUrl(value = process.env.TOP_TEN_SCENARIO_TOOL_BASE_URL): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/\.$/, '');
    const localHost = (!host.includes('.') && !host.startsWith('[')) || /(^|\.)(localhost|local|internal)$/.test(host) ||
      /^(0\.|10\.|127\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.)/.test(host) ||
      /^(\[::|\[f[cd]|\[fe[89ab])/.test(host);
    if (url.protocol !== 'https:' || localHost || url.username || url.password || url.search || url.hash) return null;
    return url.toString().replace(/\/$/, '');
  } catch {
    return null;
  }
}

export function getScenarioTools(_scenarioId: string, baseUrl = process.env.TOP_TEN_SCENARIO_TOOL_BASE_URL): LlmTool[] {
  const origin = getToolBaseUrl(baseUrl);
  if (!origin) return [];
  const stringProperty = { type: 'string' };
  const integerProperty = { type: 'integer' };
  return [
        tool(origin, 'lookup_travel_order', 'Read a travel order only after identity matches.', 'GET', '/api/scenarios/10-travel-booking/orders?order_id={{args.order_id}}&traveler_key={{args.traveler_key}}', { order_id: stringProperty, traveler_key: stringProperty }, ['order_id', 'traveler_key']),
        tool(origin, 'update_travel_order', 'Request a travel change or cancellation only after the user explicitly confirms.', 'POST', '/api/scenarios/10-travel-booking/orders', { order_id: stringProperty, traveler_key: stringProperty, action: { type: 'string', enum: ['change', 'cancel'] }, request_id: stringProperty, confirmed: { type: 'boolean', const: true }, new_departure: stringProperty }, ['order_id', 'traveler_key', 'action', 'request_id', 'confirmed'], { order_id: '{{args.order_id}}', traveler_key: '{{args.traveler_key}}', action: '{{args.action}}', request_id: '{{args.request_id}}', confirmed: '{{args.confirmed}}', new_departure: '{{args.new_departure}}' }),
      ];
}

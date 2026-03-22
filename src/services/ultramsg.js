const DEFAULT_BASE_URL = 'https://api.ultramsg.com';
const DEV_PROXY_BASE_URL = '/ultramsg';

async function parseJsonOrText(response) {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

export async function sendWhatsAppMessage({ instanceId, token, to, body, baseUrl }) {
  if (!instanceId) throw new Error('Missing UltraMsg Instance ID');
  if (!token) throw new Error('Missing UltraMsg token');
  if (!to) throw new Error('Missing destination number (to)');
  if (!body) throw new Error('Missing message body');

  const resolvedBaseUrl =
    baseUrl || (import.meta.env.DEV ? DEV_PROXY_BASE_URL : DEFAULT_BASE_URL);
  const apiBase = resolvedBaseUrl.replace(/\/$/, '');
  const url = `${apiBase}/${encodeURIComponent(instanceId)}/messages/chat`;

  const form = new URLSearchParams();
  form.set('token', token);
  form.set('to', to);
  form.set('body', body);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: form.toString(),
  });

  const payload = await parseJsonOrText(response);
  if (!response.ok) {
    const details = typeof payload === 'string' ? payload : JSON.stringify(payload);
    throw new Error(`UltraMsg request failed (${response.status}): ${details}`);
  }

  return payload;
}

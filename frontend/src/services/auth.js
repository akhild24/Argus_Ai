const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const JSON_HEADERS = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };

export function getToken() {
  return localStorage.getItem('udaan_token');
}
export function setToken(token) {
  localStorage.setItem('udaan_token', token);
}
export function clearAuth() {
  localStorage.removeItem('udaan_token');
  localStorage.removeItem('udaan_profile');
}
export function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), options.timeout || 18000);

  try {
    const res = await fetch(`${BASE}${path}`, {
      cache: 'no-store',
      ...options,
      headers: {
        ...(options.body ? JSON_HEADERS : { 'Cache-Control': 'no-store' }),
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });

    let data = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      throw new Error(data?.detail || `${res.status} ${res.statusText}`.trim() || 'Request failed');
    }

    return data;
  } finally {
    window.clearTimeout(timer);
  }
}

export async function registerUser(data) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
export async function loginUser(email, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}
export async function getMe() {
  return request('/auth/me', {
    headers: authHeaders(),
  });
}
export async function patchProgress(progress) {
  return request('/auth/progress', {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ progress }),
  });
}

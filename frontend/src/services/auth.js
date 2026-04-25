const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

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
export async function registerUser(data) {
  const res = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Registration failed');
  }
  return res.json();
}
export async function loginUser(email, password) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Login failed');
  }
  return res.json();
}
export async function getMe() {
  const res = await fetch(`${BASE}/auth/me`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Session expired');
  return res.json();
}
export async function patchProgress(progress) {
  const res = await fetch(`${BASE}/auth/progress`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ progress }),
  });
  if (!res.ok) throw new Error('Progress update failed');
  return res.json();
}
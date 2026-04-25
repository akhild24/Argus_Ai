const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
import { authHeaders } from './auth';

export async function explainConcept(question, profile) {
  try {
    const res = await fetch(`${BASE}/explain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ question, profile }),
    });
    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    return {
      explanation: 'Network issue — here is a cached explanation. A for loop goes through each item in a list and runs the same code for each one.',
      mode_used: 'fallback',
    };
  }
}

export async function generateQuiz(topic, level, language) {
  try {
    const res = await fetch(`${BASE}/quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ topic, level, language }),
    });
    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    return {
      question: `What is the main purpose of ${topic}?`,
      options: [
        { id: 'a', text: 'To store and reuse logic' },
        { id: 'b', text: 'To delete variables' },
        { id: 'c', text: 'To connect to internet' },
        { id: 'd', text: 'To print output' },
      ],
      correct_answer: 'a',
      explanation: `${topic} is used to organize and reuse code efficiently.`,
    };
  }
}

export async function reExplainConcept(topic, profile, previousMode) {
  try {
    const res = await fetch(`${BASE}/reexplain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ topic, profile, previous_mode: previousMode }),
    });
    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    return {
      explanation: 'Let me try a different angle on this concept.',
      new_mode: 'example',
    };
  }
}

export async function getOpportunities() {
  try {
    const res = await fetch(`${BASE}/opportunities`, {
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    return { events: [], bridge: '' };
  }
}
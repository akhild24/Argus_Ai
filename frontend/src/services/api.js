import { authHeaders } from './auth';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const JSON_HEADERS = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };

async function request(path, options = {}) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), options.timeout || 22000);
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
    return await readJson(res);
  } finally {
    window.clearTimeout(timer);
  }
}

async function readJson(res) {
  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const detail = data?.detail || `${res.status} ${res.statusText}`.trim();
    throw new Error(detail || 'API request failed');
  }

  return data;
}

function fallbackQuiz(topic) {
  const variants = [
    {
      question: `What is the best first step to understand ${topic}?`,
      options: [
        { id: 'a', text: 'Connect it to one small example' },
        { id: 'b', text: 'Skip practice completely' },
        { id: 'c', text: 'Only memorize the heading' },
        { id: 'd', text: 'Ignore the explanation' },
      ],
      correct_answer: 'a',
      explanation: `A small example makes ${topic} easier to remember and apply.`,
    },
    {
      question: `Why should a learner practise ${topic}?`,
      options: [
        { id: 'a', text: 'To reuse the idea in new problems' },
        { id: 'b', text: 'To avoid learning related basics' },
        { id: 'c', text: 'To remove all mistakes automatically' },
        { id: 'd', text: 'To make progress disappear' },
      ],
      correct_answer: 'a',
      explanation: `${topic} becomes useful when you can apply it in a fresh problem.`,
    },
  ];
  return { ...variants[Math.floor(Math.random() * variants.length)], source: 'fallback', model: 'browser-varied' };
}

function normalizeQuiz(data) {
  if (!data?.question || !Array.isArray(data.options) || data.options.length < 2) {
    throw new Error('Invalid quiz response format');
  }

  return {
    question: String(data.question),
    options: data.options.slice(0, 4).map((option, index) => ({
      id: String(option.id || String.fromCharCode(97 + index)).toLowerCase(),
      text: String(option.text || option),
    })),
    correct_answer: String(data.correct_answer || 'a').toLowerCase(),
    explanation: String(data.explanation || ''),
    source: data.source || 'ai',
    model: data.model || null,
  };
}

export async function explainConcept(question, profile) {
  try {
    return await request('/explain', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ question, profile }),
    });
  } catch (error) {
    console.error('explainConcept failed:', error);
    const variants = [
      'AI is busy, but here is a fresh angle: connect the concept to one real example, then explain it back in your own words.',
      'Quick fallback: break this into what it is, when to use it, and one tiny example. That is enough to keep learning moving.',
      'Try this: write the concept name, one use case, and one mistake to avoid. That gives you a strong mental hook.',
    ];
    return {
      explanation: variants[Math.floor(Math.random() * variants.length)],
      mode_used: 'fallback',
      source: 'fallback',
      model: 'browser-varied',
    };
  }
}

export async function generateQuiz(topic, level, language) {
  try {
    return normalizeQuiz(await request('/quiz', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ topic, level, language }),
    }));
  } catch (error) {
    console.error('generateQuiz failed:', error);
    return fallbackQuiz(topic);
  }
}

export async function reExplainConcept(topic, profile, previousMode) {
  try {
    return await request('/reexplain', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ topic, profile, previous_mode: previousMode }),
    });
  } catch (error) {
    console.error('reExplainConcept failed:', error);
    const variants = [
      `Different angle: ask what problem ${topic} solves, then make a two-line example.`,
      `New approach: explain ${topic} as a simple before-and-after story.`,
      `Try teaching ${topic} to a friend using one everyday comparison and no jargon.`,
    ];
    return {
      explanation: variants[Math.floor(Math.random() * variants.length)],
      new_mode: 'example',
      source: 'fallback',
      model: 'browser-varied',
    };
  }
}

export async function getOpportunities() {
  try {
    const data = await request('/opportunities', {
      headers: authHeaders(),
    });
    return {
      events: Array.isArray(data?.events) ? data.events : [],
      bridge: data?.bridge || '',
      source: data?.source || 'ai',
      model: data?.model || null,
    };
  } catch (error) {
    console.error('getOpportunities failed:', error);
    return { events: [], bridge: '', source: 'fallback', model: 'browser-varied' };
  }
}

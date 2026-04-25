import axios from 'axios';
import { saveToCache, getFromCache } from '../utils/cache';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const USE_MOCK = true; // 👈 Change to false when backend is ready

const MOCK_EXPLAIN = {
  explanation:
    "A for loop runs the same action multiple times. Like serving chai to 5 customers one by one — you don't serve all at once, you go one by one until everyone has chai.",
  mode_used: 'example',
};

const MOCK_QUIZ = {
  question: 'What does a for loop do in Python?',
  options: [
    { id: 'a', text: 'It runs a block of code once' },
    { id: 'b', text: 'It repeats a block of code for each item in a sequence' },
    { id: 'c', text: 'It stops the program' },
    { id: 'd', text: 'It defines a function' },
  ],
  correct_answer: 'b',
  explanation:
    'A for loop goes through each item in a list or range and runs the code block for each one.',
};

const MOCK_REEXPLAIN = {
  explanation:
    "Imagine a cricket scorecard. The scorer records runs after EVERY ball — that's exactly what a for loop does. It performs the same action for every item, one by one.",
  new_mode: 'analogy',
};

export const explainConcept = async (question, profile) => {
  if (USE_MOCK) return MOCK_EXPLAIN;
  const key = `${question}_${profile.level}_${profile.language}`;
  const cached = getFromCache(key);
  if (cached) return cached;
  const res = await axios.post(`${BASE_URL}/explain`, { question, profile });
  saveToCache(key, res.data);
  return res.data;
};

export const generateQuiz = async (topic, level, language) => {
  if (USE_MOCK) return MOCK_QUIZ;
  const res = await axios.post(`${BASE_URL}/quiz`, { topic, level, language });
  return res.data;
};

export const reExplainConcept = async (topic, profile, previous_mode) => {
  if (USE_MOCK) return MOCK_REEXPLAIN;
  const res = await axios.post(`${BASE_URL}/reexplain`, {
    topic,
    profile,
    previous_mode,
  });
  return res.data;
};
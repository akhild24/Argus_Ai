export function saveToCache(key, value) {
    const cache = JSON.parse(localStorage.getItem('udaan_cache') || '{}');
    const keys = Object.keys(cache);
    if (keys.length >= 5) delete cache[keys[0]];
    cache[key] = value;
    localStorage.setItem('udaan_cache', JSON.stringify(cache));
  }
  
  export function getFromCache(key) {
    const cache = JSON.parse(localStorage.getItem('udaan_cache') || '{}');
    return cache[key] || null;
  }
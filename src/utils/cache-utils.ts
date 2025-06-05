export const CACHE_DURATION = 15 * 60 * 1000;

export const LAST_FETCH_KEY = (key: string) => `github_${key}_last_fetch`;
export const CACHED_DATA_KEY = (key: string) => `github_${key}_data`;

export function getCachedData<T>(cacheKey: string): T | null {
  const lastFetch = localStorage.getItem(LAST_FETCH_KEY(cacheKey));
  const now = Date.now();

  if (lastFetch && now - parseInt(lastFetch, 10) < CACHE_DURATION) {
    const cachedData = localStorage.getItem(CACHED_DATA_KEY(cacheKey));
    if (cachedData) {
      try {
        return JSON.parse(cachedData) as T;
      } catch (error) {
        console.error(`Erro ao parsear cache para ${cacheKey}:`, error);
        return null;
      }
    }
  }
  return null;
}

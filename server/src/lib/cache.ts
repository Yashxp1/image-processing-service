import { redisClient } from "../middleware/rateLimittter";

export const getCache = async <T>(key: string): Promise<T | null> => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

export const setCache = async (key: string, value: unknown, ttlSeconds = 60) => {
    await redisClient.set(key, JSON.stringify(value), "EX", ttlSeconds)
};

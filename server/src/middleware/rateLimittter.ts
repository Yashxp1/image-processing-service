import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { Redis } from "ioredis";
import type { RedisReply } from "rate-limit-redis";

export const redisClient = new Redis(process.env.REDIS_URL!);

export const createRateLimiter = ({
  windowMs,
  max,
  prefix,
}: {
  windowMs: number;
  max: number;
  prefix: string;
}) =>
  rateLimit({
    store: new RedisStore({
      sendCommand: (...args: [string]) =>
        redisClient.call(...args) as Promise<RedisReply>,
      prefix,
    }),
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
  });

export const uploadRateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 10,
  prefix: "upload:",
});

export const imagesListLimiter = createRateLimiter({
  windowMs: 20 * 60 * 1000,
  max: 15,
  prefix: "images_list:",
});

export const imageViewLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 20,
  prefix: "image_view:",
});

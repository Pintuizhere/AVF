const { redisClient } = require('../config/redis');

// Middleware to check cache
const cacheMiddleware = (keyPrefix) => {
  return async (req, res, next) => {
    // We only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    try {
      // The key will be based on the prefix and the URL
      const cacheKey = `${keyPrefix}:${req.originalUrl}`;
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        // Cache hit
        return res.json(JSON.parse(cachedData));
      } else {
        // Cache miss - we override res.json to intercept the response data
        const originalJson = res.json;
        res.json = function (body) {
          // Save the response body to redis (cache for 1 hour default)
          redisClient.setEx(cacheKey, 3600, JSON.stringify(body))
            .catch(err => console.error('Redis setEx error:', err));
          
          // Call the original res.json
          originalJson.call(this, body);
        };
        next();
      }
    } catch (err) {
      console.error('Cache middleware error:', err);
      // Fallback to normal execution if redis fails
      next();
    }
  };
};

// Utility to invalidate cache by prefix
const invalidateCache = async (keyPrefix) => {
  try {
    const keys = await redisClient.keys(`${keyPrefix}:*`);
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`Cleared cache for prefix: ${keyPrefix}`);
    }
  } catch (err) {
    console.error(`Error invalidating cache for ${keyPrefix}:`, err);
  }
};

module.exports = {
  cacheMiddleware,
  invalidateCache
};

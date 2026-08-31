const { createClient } = require('redis');
const dotenv = require('dotenv');

dotenv.config();

// Create Redis Client
// Fallback to local redis if no URL provided
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

let isConnected = false;

const connectRedis = async () => {
  if (!isConnected) {
    try {
      await redisClient.connect();
      isConnected = true;
      console.log('Redis connected successfully');
    } catch (err) {
      console.error('Failed to connect to Redis:', err);
    }
  }
};

module.exports = {
  redisClient,
  connectRedis
};

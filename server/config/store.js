const Redis = require("ioredis");
// 编写的 Store 类，必须要有 get() set() destory() 这三个方法
class RedisStore {
  constructor() {
    this.redis = new Redis();
  }
  async get(key) {
    const data = await this.redis.get(`ssid:${key}`);
    if (!data) {
      return null;
    }
    try {
      const result = JSON.parse(data);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
  async set(key, sess, ttl) {
    if (typeof ttl === "number") {
      ttl = Math.ceil(ttl / 1000);
    }
    try {
      const sessStr = JSON.stringify(sess);
      if (ttl) {
        await this.redis.setex(`ssid:${key}`, ttl, sessStr);
      } else {
        await this.redis.set(`ssid:${key}`, sessStr);
      }
    } catch (err) {
      console.error(err);
    }
  }
  async destroy(key) {
    return await this.redis.del(`ssid:${key}`);
  }
}

module.exports = RedisStore;

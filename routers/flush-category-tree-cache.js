const config = require('../config');
const cache = require('../lib/cache');

module.exports = async (req, res) => {
  await cache.del(config.redis.categoryCacheKey);

  res.json({ success: true });
};

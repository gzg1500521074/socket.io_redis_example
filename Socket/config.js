var config = {};

config.redis = {};
config.server = {};

// Redis Configuration
config.redis.uri = process.env.REDIS_URI || 'istahirediscache.redis.cache.windows.net';  //need to use your own redis cache
config.redis.port = process.env.REDIS_PORT || 6379;
config.redis.key = process.env.REDIS_KEY || KEY; //need to use authentication key of you azure redis cache (or custom one) 
config.redis.channel = process.env.REDIS_CHANNEL || 'chat';

// Server Configuration
config.server.port = process.env.port || 5000;
config.server.id = process.env.WEBSITE_INSTANCE_ID || "n/a";

module.exports = config;

const redis = require('async-redis');
const bluebird = require('bluebird');


let client;
const redisConnection = () => {

  client = redis.createClient();
  client.on('connect', () => console.log('Connected to Redis on port 6379'));
  client.on('error', (err) => console.log(`Something went wrong ${err}`));
}

const getAsync = async (key) => {
  const result = await client.get(key);
  console.log(`Information with the key ${key} is fetched from redis`);
  return result;
};

const setAsync = async (key, value) => {
  const result = await client.set(key, value);
  console.log(`Information with the key ${key} set in redis`);
  return result
};

module.exports = {
  getAsync,
  setAsync,
  redisConnection
};

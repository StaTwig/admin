const redis = require("redis");
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
});

client.on("connect", () => {
  console.log("Connected to Redis Cache");
});

client.on("error", (err) => {
  console.log("Error " + err);
});

const member = async (key, value) => {
  return new Promise((resolve, reject) => {
    client.sismember(key, value, (err, reply) => {
      if (err) {
        reject(err);
      }
      resolve(reply);
    });
  });
};

const checkPermissions = async (request, next) => {
  try {
    const required_permission = request["permissionRequired"];
    const request_role = request["role"];
    for (var i = 0; i < required_permission.length; i++) {
      const result = await member(request_role, required_permission[i]);
      if (result === 1) {
        next({
          success: true,
          message: "Permission Granted",
        });
        break;
      } else {
        if (i === required_permission.length - 1) {
          next({
            success: false,
            message: "Permission Denied",
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
    next({
      success: false,
      message: "Error",
    });
  }
};

const checkPermissionAwait = async (request) => {
  try {
    const required_permission = request["permissionRequired"];
    const request_role = request["role"];
    for (var i = 0; i < required_permission.length; i++) {
      const result = await member(request_role, required_permission[i]);
      if (result === 1) {
        return true;
      } else {
        if (i === required_permission.length - 1) {
          return false;
        }
      }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  checkPermissions: checkPermissions,
  checkPermissionAwait: checkPermissionAwait,
};

/*
const { createClient } = require("redis");

(async () => {
  try {
    console.log(
      process.env.REDIS_HOST,
      process.env.REDIS_PORT,
      process.env.REDIS_PASSWORD
    );
    const client = createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT || 6379,
      },
      password: process.env.REDIS_PASSWORD,
    });

    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();

    await client.set("key", "value");
    const value = await client.get("key");
    console.log("value", value);
  } catch (err) {
    console.log(err);
  }
})();
*/

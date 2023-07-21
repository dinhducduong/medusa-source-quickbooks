const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) { }

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgresql://postgres_username:postgres_password@localhost:5432/medb";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true
      // ...
    },
  },
  // {
  //   // resolve: "medusa-source-quickbooks",
  //   // options: {
  //   //   clientId: "ABUuCFOummC9NMMH8FHgBAq2wq1Qd9bUgs1oDZO3Y0XkNyAisN",
  //   //   clientSecret: "pqouXirYuAO982CjO7QIiYngLqhx7SuwvuweFp9R",
  //   //   redirectUri: "https://developer.intuit.com/v2/OAuth2Playground/RedirectUrl",
  //   //   environment: "sandbox",
  //   //   refeshToken: 'AB116985616415FAe3v2l5iFaexj0SW3f8vqgohZkjQMNPDN1r',
  //   //   companyId: '4620816365318682770'
  //   // }
  // },
];

const modules = {
  /*eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },*/
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  // Uncomment the following lines to enable REDIS
  redis_url: REDIS_URL
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
};

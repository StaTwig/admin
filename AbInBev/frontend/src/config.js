export const TEST_SERVER_URL = "http://admin.vaccineledger.com";
export const PROD_SERVER_URL = "http://api.vaccineledger.com:9001";
export const LOCAL_SERVER_URL = "http://localhost:3001";

export function config() {
  const confs = {
    local: {},
    test: {},
    prod: {},
  };

  const environment = process.env.ENVIRONMENT || "test";
  const conf = confs[environment];
  return conf;
}

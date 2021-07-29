const REGISTRY_URL = process.env.REGISTRY_URL || 'http://0.0.0.0:8081';
const KEYCLOAK_URL = process.env.KEYCLOAK_URL || 'https://divoc.xiv.in/keycloak/auth';
const KEYCLOAK_REALM = 'divoc';
const JWT_PUBLIC_KEY = process.env.AUTH_PUBLIC_KEY ||
`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1mIX9SFluySnfIfT6Jz5
LdORWO+O0j3L7cF+BLaAdX7JuiN10MTISpyOA5z81YXMSgk0PPLUzHv5DTDPMR3r
sb6ut/PweLn9sLmwsj9OGSAuH7DFOHVV+Mct9TXBeZu1tzboDhtqKz1PMnBFdmgv
d2+WnKYtdWfgo8kB82WkGolAT7++efm/HnOkvRkoNbefbbpnELjtcM5uN32HdCpz
Tm87zshvOoEvkBUcBJdmKNjzLwBc0E2SpthOuxQUw7zSSqnvOOW+sOub6dIgDgR5
57KyVGKL9NUvlbbp9jglcZERtpE6pRhbjDwBlmzx8NufSap24VzWIUNjy+CiF0J6
OQIDAQAB
-----END PUBLIC KEY-----`;
const KAFKA_BOOTSTRAP_SERVER = process.env.KAFKA_BOOTSTRAP_SERVERS || 'localhost:9092';
module.exports = {
    REGISTRY_URL,
    JWT_PUBLIC_KEY,
    KAFKA_BOOTSTRAP_SERVER,
    KEYCLOAK_URL,
    KEYCLOAK_REALM
};
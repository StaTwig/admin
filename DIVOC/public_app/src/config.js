const urlPath = "/certificate";
const registerMemberLimit = 4;
const certificatePublicKey = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnXQalrgztecTpc+INjRQ8s73FSE1kU5QSlwBdICCVJBUKiuQUt7s+Z5epgCvLVAOCbP1mm5lV7bfgV/iYWDio7lzX4MlJwDedWLiufr3Ajq+79CQiqPaIbZTo0i13zijKtX7wgxQ78wT/HkJRLkFpmGeK3za21tEfttytkhmJYlwaDTEc+Kx3RJqVhVh/dfwJGeuV4Xc/e2NH++ht0ENGuTk44KpQ+pwQVqtW7lmbDZQJoOJ7HYmmoKGJ0qt2hrj15uwcD1WEYfY5N7N0ArTzPgctExtZFDmituLGzuAZfv2AZZ9/7Y+igshzfB0reIFdUKw3cdVTzfv5FNrIqN5pwIDAQAB\n-----END PUBLIC KEY-----\n"

const CERTIFICATE_CONTROLLER_ID = process.env.REACT_APP_CERTIFICATE_CONTROLLER_ID || 'https://cowin.gov.in/';
const CERTIFICATE_NAMESPACE = process.env.REACT_APP_CERTIFICATE_NAMESPACE || "https://cowin.gov.in/credentials/vaccination/v1";
const CERTIFICATE_PUBKEY_ID = process.env.REACT_APP_CERTIFICATE_PUBKEY_ID || 'https://example.com/i/india';
const CERTIFICATE_DID = process.env.REACT_APP_CERTIFICATE_DID || 'did:india';

module.exports = {
    urlPath,
    certificatePublicKey,
    registerMemberLimit,
    CERTIFICATE_CONTROLLER_ID,
    CERTIFICATE_DID,
    CERTIFICATE_NAMESPACE,
    CERTIFICATE_PUBKEY_ID
};

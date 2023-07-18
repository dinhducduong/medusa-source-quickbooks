const OAuthClient = require('intuit-oauth');

export const createClient = (options) => {
  const { clientId, clientSecret, redirectUri, environment } = options
  const oauthClient = new OAuthClient({
    clientId: clientId,
    clientSecret: clientSecret,
    environment: environment,
    redirectUri: redirectUri,
    logging: true
  });
  console.log(oauthClient)

  return oauthClient;
}

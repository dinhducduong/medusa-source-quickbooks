const IntuitOAuth = require('intuit-oauth');

export const createClient = (options) => {
  const { clientId,clientSecret, redirectUri,environment } = options
    const oauthClient = new IntuitOAuth({
        clientId,
        clientSecret,
        redirectUri,
        environment,
    });
    return oauthClient;
}

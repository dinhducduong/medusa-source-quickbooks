const IntuitOAuth = require('intuit-oauth');

export const createClient = async (options) => {
  const { refeshToken, clientId, clientSecret, redirectUri, environment } = options
  const oauthClient = new IntuitOAuth({
    clientId,
    clientSecret,
    redirectUri,
    environment,
  });
  const token = await oauthClient.refreshUsingToken(refeshToken)
  const access_token = token.getJson().access_token
  return access_token
}
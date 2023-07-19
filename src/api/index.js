import { Router } from "express"
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
const OAuthClient = require('intuit-oauth');
const bodyParser = require('body-parser');
export default (rootDirectory, pluginOptions) => {
    const router = Router()
    let oauthClient = null;
    router.get("/auth/authUri", (req, res) => {
        oauthClient = new OAuthClient({
            clientId: req.query.clientId,
            clientSecret: req.query.clientSecret,
            environment: req.query.environment,
            redirectUri: req.query.redirectUri,
        });

        const authUri = oauthClient.authorizeUri({
            scope: [
                OAuthClient.scopes.Accounting,
                OAuthClient.scopes.OpenId,
                OAuthClient.scopes.Profile,
                OAuthClient.scopes.Email,
                OAuthClient.scopes.Phone,
                OAuthClient.scopes.Address
            ],
            state: 'intuit-test',
        });
        res.redirect(authUri);
    });

    router.get('/store/callback', async function (req, res) {
        const authResponse = await oauthClient.createToken(req.url)
        const token = JSON.stringify(authResponse.getJson())
        res.send(token)
    });

    return router
}
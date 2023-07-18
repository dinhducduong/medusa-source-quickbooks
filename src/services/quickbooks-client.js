import { BaseService } from "medusa-interfaces"
import { createClient } from "../utils/auth"

class QuickbooksClientService extends BaseService {
  constructor({ }, options) {
    super()
    this.options = {
      clientId: "ABUuCFOummC9NMMH8FHgBAq2wq1Qd9bUgs1oDZO3Y0XkNyAisN",
      clientSecret: "pqouXirYuAO982CjO7QIiYngLqhx7SuwvuweFp9R",
      redirectUri: "https://developer.intuit.com/v2/OAuth2Playground/RedirectUrl",
      environment: "sandbox",
      
    }
    this.client_ = createClient(this.options)
  }

  getListProduct() {
    return this.client_.makeApiCall({
      url: 'https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365318682770/query',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'select * from item startposition 1 maxresults 5',
    })
      .then(function (response) {
        console.log('The API response is  : ' + response);
      })
      .catch(function (e) {
        console.log('The error is ' + JSON.stringify(e));
      });
  }

  authToken() {
    return this.client_.token.getToken();
  }
}

export default QuickbooksClientService

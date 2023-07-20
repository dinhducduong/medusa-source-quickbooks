import { BaseService } from "medusa-interfaces"
import { createClient } from "../utils/auth"
import axios from 'axios';
class QuickbooksClientService extends BaseService {
  constructor({ }, options) {
    super()
    this.options = {
      clientId: "ABUuCFOummC9NMMH8FHgBAq2wq1Qd9bUgs1oDZO3Y0XkNyAisN",
      clientSecret: "pqouXirYuAO982CjO7QIiYngLqhx7SuwvuweFp9R",
      redirectUri: "https://developer.intuit.com/v2/OAuth2Playground/RedirectUrl",
      environment: "sandbox",
      refeshToken: 'AB116985616415FAe3v2l5iFaexj0SW3f8vqgohZkjQMNPDN1r',
      companyId: '4620816365318682770'
    }
    this.client_ = createClient(this.options)
  }

  async getListProduct() {
    const token = await createClient(this.options)
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${this.options.companyId}/query?minorversion=65`
    const query = 'select * from Item';
    const config = {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": `application/text`,
        "Accept": 'application/json'
      }
    };
    return axios.post(url, query, config)
  }

}

export default QuickbooksClientService

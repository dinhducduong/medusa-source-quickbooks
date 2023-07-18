import { BaseService } from "medusa-interfaces"
import { createClient } from "../utils/auth"

class QuickbooksClientService extends BaseService {
  constructor({}, options) {
    super()
    this.options = { 
          clientId: "",
          clientSecret: "",
          redirectUri: "",
          environment: "",
        }
    this.client_ = createClient(this.options)
  }
  
  get(params) {
    return "okokok"
  }
}

export default QuickbooksClientService

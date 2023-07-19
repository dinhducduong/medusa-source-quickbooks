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

    }
    this.client_ = createClient(this.options)
  }

  getListProduct() {
    const url = 'https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365318682770/query?minorversion=65'
    const query = 'select * from Item startposition 1 maxresults 5';
    const config = {
      headers: {
        "Authorization": `Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..IFNBNFKbiL5xWMUexAGr-g.KA7E1uoy9qsrs2PEyPCm4OH4vDwpyl-UVm-KBe9GD2v4d7t6k87Hhz1lLT9qJvNwci5GnGAM3ecdrUXKKA-FueJCCYXrml9iWxf8rDgTmoV-t3y5wMd4UUDnBYhSiyvxhXB_4mX4eNurliZNS9FGZtRmZXIrm3AgDVDk_v_DyK4JmccRTe9n5CBmsEX2F1918aUkbt--fy8nkyUJtouNBMtTBTS0RUJyqDswggj3MbQfvnVkXzA7rxba5Cd27c1AfkWOFvMqi1ms3gES5tJX1TRAvOjK7MW_MrzB6AsNn7IJ6RG3tTmgFtZF6R3O-ulKarn1VcJszLb4Nt5UxrxfpgTOoB-ms4KVze65OOjxHP5Ax_t4g0LxwKKCAviPOQhOYLIIG0OCtfO5gzB4pny7Dz_iq2uJr1xIPjbTZ7eoHSoGbQx0YlXUT9Ckdt0gboWO1iGrD7e2-M2fjF0i-mXwksAOHxmmsoZsMw8gq0Smy1_0cJ24iUsNF0iMColRPjihFfxcU_T55agfSwCRP-ELzS7xC9y7eJ2CE9dFeFzSX_X-b0Ta90_oVcmzmgMYKOWRUzJZ-tztpW-YagF1YaHlStSKiqgzaxPzY3gpNvmck-o4UE-50klaPAzd_kxrHDELiLCLnjDXdC1p_hmZwfuNkKDGuYagwaWqXV-p7vu0-ZHsky_ty7diQXqF8XBsMBDi59b-V3J6aT3HWBRhkcdhdV0-xSLRilMH2zNJKYpuF1Xkzem8YrgqT5HsqaB44zJkC1BBJGX1JymTVDnmwUPkIJ4Gmb5mkFBi8NTW4A3Gbsd4mS6EO0MssdpPqJAJpWXh98DKctosbUlbPb4jcrhcxejkj-audjTfko5HUg0yDxiYFYco0FhpZim6DOttb6sZ.AxHQKDqm6ULJf7029O-xuQ`,
        "Content-Type": `application/text`,
        "Accept": 'application/json'
      }
    };
    return axios.post(url, query, config)
  }

}

export default QuickbooksClientService

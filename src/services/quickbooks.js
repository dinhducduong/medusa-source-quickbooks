import { BaseService } from "medusa-interfaces"
class QuickbooksService extends BaseService {
  constructor(
    {
    manager,
    quickbooksProductService
    },
    options
  ) {
    super()
    this.options = options
    /** @private @const {EntityManager} */
    this.manager_ = manager
    this.productService_ = quickbooksProductService
  }
  withTransaction(transactionManager) {
    if (!transactionManager) {
      return this
    }
    const cloned = new QuickbooksService({
      manager: transactionManager,
      options: this.options,
      
    })
    cloned.transactionManager_ = transactionManager
    return cloned
  }
  async getProductMedusa() {
    const products = this.productService_.getProducts()
    return products
  }
  async createProfileUmoni() {
    return this.atomicPhase_(async (manager) => {
      const products = await this.getProductMedusa()
      console.log(products)
      // await Promise.all(
      //   products.map(async (product) => {
      //     const data = {
      //       "itemId": product.id,
      //       "itemType": "profile",
      //       "properties": product,
      //       "systemProperties": {
      //         "mergeIdentifier": "bill",
      //         "lists": [
      //           "productListId"
      //         ],
      //       }
      //     }
      //     console.log(data);
      //     return await this.client_.createProfile(data)
      //   })
      // )
    })
  }
}

export default QuickbooksService
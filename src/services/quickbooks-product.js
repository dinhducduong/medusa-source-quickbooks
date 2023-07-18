import { BaseService } from "medusa-interfaces"

class QuickbooksProductService extends BaseService {
  constructor(
    {
      manager,
    quickbooksClientService,
    
      productService,
    },
    options
  ) {
    super()

    this.options = options
this.client_ = quickbooksClientService
    /** @private @const {EntityManager} */
    this.manager_ = manager
    /** @private @const {ProductService} */
    this.productService_ = productService
  }

  withTransaction(transactionManager) {
    if (!transactionManager) {
      return this
    }

    const cloned = new QuickbooksProductService({
      manager: transactionManager,
      options: this.options,
      productService: this.productService_,
      quickbooksClientService: this.client_,
    })

    cloned.transactionManager_ = transactionManager

    return cloned
  }

  async getProducts() {
    return this.atomicPhase_(async (manager) => {
      const data = await this.client_.list({},{ 
        take: this.options.take, 
        skip: this.options.skip,
        relations:[
          "variants",
          "variants.prices",
          "variants.options",
          "images",
          "options",
          "options.values",
          "tags",
          "type",
          "collection",
        ] })
      return data
    })
  }
}

export default QuickbooksProductService
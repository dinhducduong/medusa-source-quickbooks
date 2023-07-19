import { BaseService } from "medusa-interfaces"
class QuickbooksService extends BaseService {
  constructor(
    {
      manager,
      quickbooksProductService,
    },
    options
  ) {
    super()
    this.options = options
    /** @private @const {EntityManager} */
    this.manager_ = manager
    this.productServiceQuickbooks_ = quickbooksProductService
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
  async getProductQuickBooks() {
    const products = this.productServiceQuickbooks_.getProducts()
    return products
  }
  async createProduct() {
    const products = this.productServiceQuickbooks_.createProductMedusa()
    return products
  }
  async createProductQuickbooks() {
    return this.atomicPhase_(async (manager) => {
      const products = await this.getProductQuickBooks()
      const data = await this.createProduct(products)
      console.log(products.QueryResponse.Item)
      console.log(data)

    })
  }
}

export default QuickbooksService
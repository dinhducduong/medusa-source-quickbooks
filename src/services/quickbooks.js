import { BaseService } from "medusa-interfaces"
class QuickbooksService extends BaseService {
  constructor(
    {
      manager,
      quickbooksProductService,
      shippingProfileService
    },
    options
  ) {
    super()
    this.options = options
    /** @private @const {EntityManager} */
    this.manager_ = manager
    this.productServiceQuickbooks_ = quickbooksProductService
    this.shippingProfileService_ = shippingProfileService
  }
  withTransaction(transactionManager) {
    if (!transactionManager) {
      return this
    }
    const cloned = new QuickbooksService({
      manager: transactionManager,
      options: this.options,
      shippingProfileService: this.shippingProfileService_,

    })
    cloned.transactionManager_ = transactionManager
    return cloned
  }

  async getProductQuickBooks() {
    const products = this.productServiceQuickbooks_.getProducts()
    return products
  }
  async createProduct(dataProducts) {
    const products = await this.productServiceQuickbooks_.createProductMedusa(dataProducts)
    return products
  }
  async createProductQuickbooks() {
    return this.atomicPhase_(async (manager) => {
      let profileId;
      await this.shippingProfileService_.createDefault().then((res) => {
        profileId = res.id
      })
      await this.shippingProfileService_.createGiftCardDefault()

      const products = await this.getProductQuickBooks()
      const mapping = []
      products.QueryResponse.Item.forEach(value => {

        const mapData = {
          "id": value['Id'],
          "title": value['Name'],
          "subtitle": null,
          "status": "published",
          "description": value['Description'],
          "handle": 'handle_' + value['Id'],
          "is_giftcard": false,
          "profile_id": profileId,
          "images": [
            "https://loremflickr.com/320/240?random=" + value['Id']
          ],
          "options": [

          ],
          "variants": [

          ]

        }
        mapping.push(mapData)
      });
      for (const element of mapping) {
        await this.createProduct(element)
      }

    })
  }
}

export default QuickbooksService
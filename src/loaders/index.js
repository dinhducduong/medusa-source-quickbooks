export default async (container, options) => {
    try {
      console.log("---------Starting import product quickbooks")
      const quickbooksService = container.resolve("quickbooksService")
      await quickbooksService.createProfileUmoni()
    } catch (err) {
      // ignore
      console.log(err)
    }
  }
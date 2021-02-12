const fetch = require('../models/fetch')

module.exports = class Treatment {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/treatment.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/treatment.')
    this.params = params
  }

  /**
   * Gets list of email treatments
   * @return {Promise} the fetch promise, which resolves to email treatments JSON
   * array when successful
   */
  async list (entryPointId) {
    try {
      const url = `https://treatment.produs1.ciscoccservice.com/treatment/v1/organization/${this.params.orgId}/entrypoint/${entryPointId}/treatment`
      const options = {
        headers: {
          Authorization: 'Bearer ' + this.params.accessToken
        }
      }
      const response = await fetch(url, options)
      return response.treatments
    } catch (e) {
      throw e
    }
  }
}

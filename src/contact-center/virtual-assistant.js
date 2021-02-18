const fetch = require('../utils/fetch')

module.exports = class VirtualAssistant {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/treatment.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/treatment.')
    this.params = params
  }

  /**
   * Gets list of virtual assistants
   * @return {Promise} the fetch promise, which resolves to virtual assistants JSON
   * array when successful
   */
  async list () {
    try {
      const url = `https://virtual-assistant.produs1.ciscoccservice.com/virtual-assistant/v1/config/organization/${this.params.orgId}/botconfig`
      const options = {
        headers: {
          Authorization: 'Bearer ' + this.params.accessToken
        }
      }
      const response = await fetch(url, options)
      return response.items
    } catch (e) {
      throw e
    }
  }
}

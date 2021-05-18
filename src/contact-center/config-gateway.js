const fetch = require('../utils/fetch')

module.exports = class ConfigGateway {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/config-gateway.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/config-gateway.')
    this.params = params
    this.baseUrl = `https://config-gateway.produs1.ciscoccservice.com/cms/api/auxiliary-data/user-data/user`
  }

  /**
   * get user subscription sync info
   * @param {String} email the user email address
   * @return {Promise} the fetch promise, which resolves to the JSON
   * response when successful
   */
  async listUsers () {
    const url = this.baseUrl
    const options = {
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken,
        'X-ORGANIZATION-ID': this.params.orgId
      }
    }
    const response = await fetch(url, options)
    return response.auxiliaryDataList
  }
}

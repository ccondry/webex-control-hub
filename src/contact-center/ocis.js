const fetch = require('../utils/fetch')

module.exports = class Ocis {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/ocis.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/ocis.')
    this.params = params
    this.baseUrl = `https://ocisj.produs1.ciscoccservice.com/ocis/user/notify/${this.params.orgId}`
  }

  /**
   * fix user subscription
   * @param {String} userId the bcUserId__s from CJP data
   * @return {Promise} the fetch promise, which resolves to the JSON
   * response when successful
   */
  async fix (userId) {
    const url = `${this.baseUrl}/${userId}`
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken
      }
    }
    return fetch(url, options)
  }
}

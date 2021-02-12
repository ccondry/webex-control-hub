const fetch = require('../models/fetch')

module.exports = class ChatTemplate {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/chat-template.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/chat-template.')
    this.params = params
  }
  
  /**
  * Gets list of chat templates
  * @return {Promise} the fetch promise, which resolves to chat templates JSON
  * array when successful
  */
  async list () {
    const url = 'https://cmm.produs1.ciscoccservice.com/cmm/v1/organization/' + this.params.orgId + '/template'
    const options = {
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken
      },
      query: {
        mediaType: 'chat'
      }
    }
    return fetch(url, options)
  }
}
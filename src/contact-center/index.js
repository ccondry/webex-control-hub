const ChatTemplate = require('./chat-template')

module.exports = class ContactCenter {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor paramter for webex-control-hub/contact-center.')
    if (!params.accessToken) throw Error('accessToken is a required constructor paramter for webex-control-hub/contact-center.')
    this.params = params
    this.chatTemplate = new ChatTemplate(this.params)
  }
}

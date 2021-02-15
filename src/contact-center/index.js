const ChatTemplate = require('./chat-template')
const Treatment = require('./treatment')
const VirtualAssistant = require('./virtual-assistant')
const Role = require('./role')

module.exports = class ContactCenter {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center.')
    this.params = params
    
    this.chatTemplate = new ChatTemplate(this.params)
    this.treatment = new Treatment(this.params)
    this.virtualAssistant = new VirtualAssistant(this.params)
    this.role = new Role(this.params)
  }
}

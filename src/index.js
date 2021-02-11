const ContactCenter = require('./contact-center')

module.exports = class {
  constructor ({
    orgId,
    accessToken
  }) {
    if (!orgId) throw Error('orgId is a required constructor paramter for webex-control-hub.')
    if (!accessToken) throw Error('accessToken is a required constructor paramter for webex-control-hub.')
    this.params = {
      orgId,
      accessToken
    }
    this.contactCenter = new ContactCenter(this.params)
  }
}

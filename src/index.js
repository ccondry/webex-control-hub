const ContactCenter = require('./contact-center')
const User = require('./user')
const Org = require('./org')

module.exports = class {
  constructor ({
    orgId,
    accessToken,
    siteName,
    siteId
  }) {
    if (!orgId) throw Error('orgId is a required constructor parameter for webex-control-hub.')
    if (!accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub.')
    this.params = {
      orgId,
      accessToken,
      siteName,
      siteId
    }
    this.contactCenter = new ContactCenter(this.params)
    this.user = new User(this.params)
    this.org = new Org(this.params)
  }
}

const Audit = require('./audit')
const Calling = require('./calling')
const ContactCenter = require('./contact-center')
const Org = require('./org')
const User = require('./user')

module.exports = class {
  constructor ({
    orgId,
    accessToken
  }) {
    if (!orgId) throw Error('orgId is a required constructor parameter for webex-control-hub.')
    if (!accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub.')
    this.params = {
      orgId,
      accessToken
    }
    this.audit = new Audit(this.params)
    this.calling = new Calling(this.params)
    this.contactCenter = new ContactCenter(this.params)
    this.org = new Org(this.params)
    this.user = new User(this.params)
  }
}

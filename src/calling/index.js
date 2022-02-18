const Number = require('./number')

module.exports = class Calling {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/calling.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/calling.')
    this.params = params
    
    this.number = new Number(this.params)
  }
}

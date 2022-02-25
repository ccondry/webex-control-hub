require('dotenv').config()
const lib = require('../src')

const client = new lib({
  orgId: process.env.ORG_ID,
  accessToken: process.env.ACCESS_TOKEN
})

/***********
Role
***********/
// set roles
describe('client.contactCenter.role.modify()', function () {
  it('set contact center roles on a control hub user', function (done) {
    const email = 'rbarrows1606@cc.dc-01.com'
    const roles = [{
      'roleName': 'CJP_STANDARD_AGENT',
      'roleState': 'INACTIVE'
    }, {
      'roleName': 'CJP_PREMIUM_AGENT',
      'roleState': 'ACTIVE'
    }, {
      'roleName': 'CJP_SUPERVISOR',
      'roleState': 'ACTIVE'
    }]
    client.contactCenter.role.modify({email, roles})
    .then(response => {
      console.log(response)
      done()
    })
    .catch(done)
  })
})


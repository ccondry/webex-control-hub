require('dotenv').config()
const lib = require('../src')

const client = new lib({
  orgId: process.env.ORG_ID,
  accessToken: process.env.ACCESS_TOKEN
})

/***********
User profile
***********/
describe('client.contactCenter.userProfile.list()', function () {
  it('list up to the first 100 Contact Center user profiles', function (done) {
    client.contactCenter.userProfile.list()
    .then(response => {
      console.log('found', response.length)
      console.log(response)
      done()
    })
    .catch(done)
  })
})


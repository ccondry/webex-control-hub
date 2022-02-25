require('dotenv').config()
const lib = require('../src')

const client = new lib({
  orgId: process.env.ORG_ID,
  accessToken: process.env.ACCESS_TOKEN
})

/***********
desktop layout
***********/
describe('client.contactCenter.desktopLayout.find()', function () {
  it('find desktop layout', function (done) {
    client.contactCenter.desktopLayout.find({global: true})
    .then(response => {
      if (response) {
        done()
      } else {
        done(Error('Not Found'))
      }
    })
    .catch(done)
  })
})

describe('client.contactCenter.desktopLayout.find()', function () {
  it('find desktop layout', function (done) {
    client.contactCenter.desktopLayout.find({name: 'Global Layout'})
    .then(response => {
      if (response) {
        done()
      } else {
        done(Error('Not Found'))
      }
    })
    .catch(done)
  })
})


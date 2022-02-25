require('dotenv').config()
const lib = require('../src')

const client = new lib({
  orgId: process.env.ORG_ID,
  accessToken: process.env.ACCESS_TOKEN
})

/***********
Site
***********/
// list
describe('client.contactCenter.site.list()', function () {
  it('list up to the first 100 Contact Center sites', function (done) {
    client.contactCenter.site.list()
    .then(response => {
      console.log('found', response.length)
      console.log(response)
      done()
    })
    .catch(done)
  })
})

// // find
// describe(`client.contactCenter.user.find({email})`, function () {
//   it('find 1 Contact Center user by email', done => {
//     client.contactCenter.user.find({email: 'sjeffers1606@cc.dc-01.com'})
//     .then(user => {
//       if (user) {
//         console.log('found 1 user with email', user.email)
//         console.log(user)
//       } else {
//         console.log('did not find user')
//       }
//       done()
//     })
//     .catch(done)
//   })
// })

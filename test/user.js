require('dotenv').config()
const lib = require('../src')

const client = new lib({
  orgId: process.env.ORG_ID,
  accessToken: process.env.ACCESS_TOKEN
})

/***********
User
***********/
// list
// describe('client.contactCenter.user.list()', function () {
//   it('list up to the first 100 Contact Center users', function (done) {
//     client.contactCenter.user.list()
//     .then(response => {
//       console.log('found', response.length)
//       console.log(response)
//       done()
//     })
//     .catch(done)
//   })
// })

let body

// find
describe(`client.contactCenter.user.find({email})`, function () {
  it('find 1 Contact Center user by email', done => {
    client.contactCenter.user.find({email: 'rbarrows1121@cc.dc-01.com'})
    .then(user => {
      if (user) {
        console.log('found 1 user with email', user.email)
        console.log(user)
        body = user
      } else {
        console.log('did not find user')
      }
      done()
    })
    .catch(done)
  })
})

// get
// describe(`client.contactCenter.user.get(id)`, function () {
//   it('get 1 Contact Center user by id', done => {
//     client.contactCenter.user.get(body.id)
//     .then(user => {
//       if (user) {
//         console.log('get 1 user with id', body.id)
//         console.log(user)
//         body = user
//       } else {
//         console.log('did not find user')
//       }
//       done()
//     })
//     .catch(done)
//   })
// })

// update
describe(`client.contactCenter.user.update()`, function () {
  it('update 1 Contact Center user', done => {
    body.contactCenterEnabled = true
    // body.userProfileId = '1d8fef04-b5d8-4f3a-8a8b-43c9d4374504'
    // supervisor profile
    // body.userProfileId = 'e274af6d-3666-4715-b4a6-2dc991bdf051'
    // premium agent profile
    // userProfileId": "44bc41ac-b01b-4701-99c5-54141c670740
    // body.skillProfileId = 'a979ffc4-497b-463d-9416-875716c4a8aa'
    body.skillProfileId = '7762ed18-5e0c-40aa-888a-366abbb50391'
    body.agentProfileId = '4d9ced32-299b-4617-8e3f-8918fc598999'
    body.multimediaProfileId = '9fc6ac55-6720-4116-8aaa-a026dafed010'
    body.siteId = '25c70d81-9cfc-43c4-8dce-7abd8396d6dc'

    client.contactCenter.user.update(body.id, body)
    .then(user => {
      console.log('updated user', body.email)
      done()
    })
    .catch(done)
  })
})

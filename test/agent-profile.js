require('dotenv').config()
const lib = require('../src')

const client = new lib({
  orgId: process.env.ORG_ID,
  accessToken: process.env.ACCESS_TOKEN
})

const name = 'Agent_Profile_Provision_Template'
let id = ''
let body = null

/***********
Agent Profile
***********/
// create
// describe('client.contactCenter.agentProfile.create(body)', function () {
//   it('create Contact Center Agent Profile', function (done) {
//     client.contactCenter.agentProfile.create({
//       name: 'mocha test 2',
//       description: 'mocha test 2',
//       activeAgents: [{
//         id: '20e8457f-3928-4b26-af4d-b8f0507f2d00',
//         textValue: 'mocha',
//         agentId: 'f52eb944-7ec4-4cdc-b208-22f242b1868e'
//       }]
//     })
//     .then(response => {
//       console.log(response)
//       done()
//     })
//     .catch(done)
//   })
// })

// list
describe('client.contactCenter.agentProfile.list()', function () {
  it('list up to the first 100 Contact Center Agent Profiles', function (done) {
    client.contactCenter.agentProfile.list()
    .then(response => {
      console.log('found', response.length)
      // console.log(response)
      done()
    })
    .catch(done)
  })
})

// listAll
describe('client.contactCenter.agentProfile.listAll()', function () {
  it('list all Contact Center Agent Profiles', function (done) {
    client.contactCenter.agentProfile.listAll()
    .then(response => {
      console.log('found', response.length)
      // console.log(response)
      done()
    })
    .catch(done)
  })
})

// find
// describe(`client.contactCenter.agentProfile.find({name})`, function () {
//   it('find 1 Contact Center Agent Profile by name', done => {
//     client.contactCenter.agentProfile.find({name})
//     .then(agentProfile => {
//       if (agentProfile) {
//         console.log('found 1 agentProfile with ID', agentProfile.id)
//         // save ID for next test
//         id = agentProfile.id
//         console.log(agentProfile)
//       } else {
//         console.log('did not find agentProfile')
//       }
//       // console.log(agentProfile.callDistributionGroups[0].agentGroups)
//       done()
//     })
//     .catch(done)
//   })
// })

// get
// describe('client.contactCenter.agentProfile.get(id)', function () {
//   it('get 1 Contact Center Agent Profile by ID', done => {
//     client.contactCenter.agentProfile.get(id)
//     .then(agentProfile => {
//       console.log('agentProfile found:', agentProfile.name)
//       // save body for next test
//       body = agentProfile
//       done()
//     })
//     .catch(done)
//   })
// })

// // update
// describe('client.contactCenter.agentProfile.update(id, body)', function () {
//   it('update 1 Contact Center Agent Profile details', done => {
//     console.log('replacing with body:', body)
//     client.contactCenter.agentProfile.update(body)
//     .then(() => done())
//     .catch(done)
//   })
// })

// delete
// describe('client.contactCenter.agentProfile.delete()', function () {
//   it('delete 1 Contact Center Agent Profile', done => {
//     client.contactCenter.agentProfile.delete(id)
//     .then(response => {
//       console.log('deleted agent profile', id)
//       done()
//     })
//     .catch(done)
//   })
// })

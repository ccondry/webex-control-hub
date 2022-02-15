require('dotenv').config()
const lib = require('../src')

const client = new lib({
  orgId: process.env.ORG_ID,
  accessToken: process.env.ACCESS_TOKEN
})

const name = 'Skill_Profile_Provision_Template'
let id = ''
let body = null

/***********
Skill Profile
***********/
// create
// describe('client.contactCenter.skillProfile.create(body)', function () {
//   it('create Contact Center Skill Profile', function (done) {
//     client.contactCenter.skillProfile.create({
//       name: 'mocha test 2',
//       description: 'mocha test 2',
//       activeSkills: [{
//         id: '20e8457f-3928-4b26-af4d-b8f0507f2d00',
//         textValue: 'mocha',
//         skillId: 'f52eb944-7ec4-4cdc-b208-22f242b1868e'
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
describe('client.contactCenter.skillProfile.list()', function () {
  it('list up to the first 100 Contact Center Skill Profiles', function (done) {
    client.contactCenter.skillProfile.list()
    .then(response => {
      console.log('found', response.length)
      // console.log(response)
      done()
    })
    .catch(done)
  })
})

// listAll
describe('client.contactCenter.skillProfile.listAll()', function () {
  it('list all Contact Center Skill Profiles', function (done) {
    client.contactCenter.skillProfile.listAll()
    .then(response => {
      console.log('found', response.length)
      // console.log(response)
      done()
    })
    .catch(done)
  })
})

// find
describe(`client.contactCenter.skillProfile.find({name})`, function () {
  it('find 1 Contact Center Skill Profile by name', done => {
    client.contactCenter.skillProfile.find({name})
    .then(skillProfile => {
      if (skillProfile) {
        console.log('found 1 skillProfile with ID', skillProfile.id)
        // save ID for next test
        id = skillProfile.id
        console.log(skillProfile)
      } else {
        console.log('did not find skillProfile')
      }
      // console.log(skillProfile.callDistributionGroups[0].agentGroups)
      done()
    })
    .catch(done)
  })
})

// get
describe('client.contactCenter.skillProfile.get(id)', function () {
  it('get 1 Contact Center Skill Profile by ID', done => {
    client.contactCenter.skillProfile.get(id)
    .then(skillProfile => {
      console.log('skillProfile found:', skillProfile.name)
      // save body for next test
      body = skillProfile
      done()
    })
    .catch(done)
  })
})

// update
describe('client.contactCenter.skillProfile.update(id, body)', function () {
  it('update 1 Contact Center Skill Profile details', done => {
    console.log('replacing with body:', body)
    client.contactCenter.skillProfile.update(body)
    .then(() => done())
    .catch(done)
  })
})

// delete
// describe('client.contactCenter.skillProfile.delete()', function () {
//   it('delete 1 Contact Center Skill Profile', done => {
//     client.contactCenter.skillProfile.delete(id)
//     .then(response => {
//       console.log('deleted skill profile', id)
//       done()
//     })
//     .catch(done)
//   })
// })

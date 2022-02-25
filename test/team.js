require('dotenv').config()
const lib = require('../src')

const client = new lib({
  orgId: process.env.ORG_ID,
  accessToken: process.env.ACCESS_TOKEN
})

let id = ''
let body = null

/***********
Team
***********/
// create
describe('client.contactCenter.team.create(body)', function () {
  it('create Contact Center Team', function (done) {
    client.contactCenter.team.create({
      name: 'mocha test 3',
      description: 'mocha test 3',
      active: true,
      organizationId: 'a9feb4cb-fdf0-4bbd-9946-c211769d823b',
      teamType: 'AGENT',
      teamStatus: 'IN_SERVICE',
      siteId: '25c70d81-9cfc-43c4-8dce-7abd8396d6dc',
      siteName: 'dCloud_Site',
      skillProfileId: '6d1907a4-65db-4934-a8e4-296affea4047',
      multiMediaProfileId: '9fc6ac55-6720-4116-8aaa-a026dafed010',
      userIds: [
        '6636a525-2085-49f4-af91-9a61904990fc',
        'a8b76f9f-c426-4b4c-bf07-a98d1688eaba'
      ]
    })
    .then(response => {
      console.log(response)
      done()
    })
    .catch(done)
  })
})

// list
describe('client.contactCenter.team.list()', function () {
  it('list up to the first 100 Contact Center Teams', function (done) {
    client.contactCenter.team.list()
    .then(response => {
      console.log('found', response.length)
      // console.log(response)
      done()
    })
    .catch(done)
  })
})

// listAll
describe('client.contactCenter.team.listAll()', function () {
  it('list all Contact Center Teams', function (done) {
    client.contactCenter.team.listAll()
    .then(response => {
      console.log('found', response.length)
      // console.log(response)
      done()
    })
    .catch(done)
  })
})

// find
describe(`client.contactCenter.team.find({name})`, function () {
  it('find 1 Contact Center Team by name', done => {
    client.contactCenter.team.find({name})
    .then(team => {
      if (team) {
        console.log('found 1 team with ID', team.id)
        // save ID for next test
        id = team.id
        console.log(team)
      } else {
        console.log('did not find team')
      }
      // console.log(team.callDistributionGroups[0].agentGroups)
      done()
    })
    .catch(done)
  })
})

// get
describe('client.contactCenter.team.get(id)', function () {
  it('get 1 Contact Center Team by ID', done => {
    client.contactCenter.team.get(id)
    .then(team => {
      console.log('team found:', team.name)
      // save body for next test
      body = team
      done()
    })
    .catch(done)
  })
})

// update
describe('client.contactCenter.team.update(id, body)', function () {
  it('update 1 Contact Center Team details', done => {
    console.log('replacing with body:', body)
    client.contactCenter.team.update(body)
    .then(() => done())
    .catch(done)
  })
})

// delete
// describe('client.contactCenter.team.delete()', function () {
//   it('delete 1 Contact Center Team', done => {
//     client.contactCenter.team.delete(id)
//     .then(response => {
//       console.log('deleted Team', id)
//       done()
//     })
//     .catch(done)
//   })
// })

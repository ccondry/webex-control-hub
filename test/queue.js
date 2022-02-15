require('dotenv').config()
const lib = require('../src')

const client = new lib({
  orgId: process.env.ORG_ID,
  accessToken: process.env.ACCESS_TOKEN
})

const name = 'dCloud_Voice_Queue'
let id = ''
let body = null

/***********
Queue (Contact Service Queue)
***********/
// create
// describe('client.contactCenter.queue.create()', function () {
//   it('should create a Contact Center Queue', function (done) {
//     const response = client.contactCenter.queue.create({
//       "active": true,
//       "callDistributionGroups": [
//         {
//           "agentGroups": [
//             {
//               "teamId": "93912f11-6017-404b-bf14-5331890b1797"
//             }
//           ],
//           "duration": 2,
//           "order": 1
//         }
//       ],
//       "channelType": "TELEPHONY",
//       "checkAgentAvailability": true,
//       "controlFlowScriptUrl": "https://flow-control.produs1.ciscoccservice.com/31f1c57f-4fa1-417b-b5c5-6feb6abea062/royal-enfield",
//       "createdTime": 1617536244000,
//       "defaultMusicInQueueMediaFileId": "defaultmusic_on_hold.wav",
//       "description": "Queue created by system",
//       "id": "93912f11-6017-404b-bf14-5331890b1797",
//       "ivrRequeueUrl": "https://www.youtube.com",
//       "lastUpdatedTime": 1617536244000,
//       "maxActiveContacts": 5,
//       "maxTimeInQueue": 2,
//       "monitoringPermitted": true,
//       "name": "Queue-1",
//       "organizationId": "f53c8b54-46ca-43f6-ba05-08426a46e23d",
//       "outdialCampaignEnabled": true,
//       "overflowNumber": "+1245677",
//       "parkingPermitted": true,
//       "pauseRecordingPermitted": true,
//       "queueType": "INBOUND",
//       "recordingAllCallsPermitted": true,
//       "recordingPauseDuration": 2,
//       "recordingPermitted": true,
//       "routingType": "SKILLS_BASED",
//       "serviceLevelThreshold": 0,
//       "skillBasedRoutingType": "BEST_AVAILABLE_AGENT",
//       "socialChannelType": "MESSENGER",
//       "subscriptionId": "string",
//       "timezone": "America/New_York",
//       "vendorId": "AB123CSDR",
//       "version": 1,
//       "xspVersion": "string"
//     })
//     .then(response => {
//       console.log('calendar created:', response)
//       calendarId = response.split('/').pop()
//       done()
//     })
//     .catch(done(e))
//   })
// })

// list
describe('client.contactCenter.queue.list()', function () {
  it('list up to the first 100 Contact Center Queues', function (done) {
    client.contactCenter.queue.list()
    .then(response => {
      console.log('found', response.length, 'queues')
      // console.log(response)
      done()
    })
    .catch(done)
  })
})
// listAll
describe('client.contactCenter.queue.listAll()', function () {
  it('list all Contact Center Queues', function (done) {
    client.contactCenter.queue.listAll()
    .then(response => {
      console.log('found', response.length, 'queues')
      // console.log(response)
      done()
    })
    .catch(done)
  })
})

// find
describe(`client.contactCenter.queue.find({name})`, function () {
  it('find 1 Contact Center Queue by name', function (done) {
    client.contactCenter.queue.find({name})
    .then(queue => {
      if (queue) {
        console.log('found 1 queue with ID', queue.id)
        // save ID for next test
        id = queue.id
      } else {
        console.log('did not find queue')
      }
      // console.log(queue.callDistributionGroups[0].agentGroups)
      done()
    })
    .catch(done)
  })
})

// get
describe('client.contactCenter.queue.get(id)', function () {
  it('get 1 Contact Center Queue by ID', function (done) {
    client.contactCenter.queue.get(id)
    .then(queue => {
      console.log('queue found:', queue.name)
      body = queue
      done()
    })
    .catch(done)
  })
})

// update
describe('client.contactCenter.queue.update(id, body)', function () {
  it('update 1 Contact Center Queue details', function (done) {
    // console.log('replacing with body:', body)
    client.contactCenter.queue.update(body)
    .then(() => done())
    .catch(done)
  })
})

// delete
// describe('uccx.calendar.delete()', function () {
//   it('should delete 1 Calendar', function (done) {
//     uccx.calendar.delete(calendarId)
//     .then(response => {
//       console.log('deleted calendar', calendarId)
//       done()
//     })
//     .catch(done(e))
//   })
// })

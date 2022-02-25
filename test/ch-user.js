require('dotenv').config()
const lib = require('../src')

const client = new lib({
  orgId: process.env.ORG_ID,
  accessToken: process.env.ACCESS_TOKEN
})

/***********
User
***********/
let body

// find
describe(`client.user.get(id)`, function () {
  it('find 1 user by id', done => {
    client.user.get('e5afa05b-a52d-4ef3-ad42-145993721d6e')
    .then(user => {
      if (user) {
        // console.log(user)
        body = user
      } else {
        console.log('did not find user')
      }
      done()
    })
    .catch(done)
  })
})

// create
describe(`client.user.create(body)`, function () {
  it('create user', done => {
    client.user.create({
      schemas: [
        'urn:scim:schemas:core:1.0',
        'urn:scim:schemas:extension:cisco:commonidentity:1.0'
      ],
      entitlements: [
        'cloud-contact-center-digital',
        'squared-room-moderation',
        'basic-meeting',
        'basic-message',
        'screen-share',
        'spark',
        'squared-call-initiation',
        'bc-sp-standard',
        'webex-squared',
        'squared-fusion-mgmt',
        'cjp',
        'cloud-contact-center',
        'spark-admin'
      ],
      userName: 'sjeffers9999@cc.dc-01.com',
      emails: [
        { primary: true, type: 'work', value: 'sjeffers9999@cc.dc-01.com' }
      ],
      name: { givenName: 'Sandra Jefferson', familyName: '9999' },
      phoneNumbers: [ { type: 'work', value: '809999' } ],
      cisSyncSource: 'DirSync',
      displayName: 'Sandra 9999',
      roles: [ 'cjp.premium_agent' ],
      active: false,
      licenseID: [
        'CJPPRM_f52052c1-d896-4b22-b28b-bc8494505142',
        'BCSTD_9b5c5a64-7c0e-4a2e-acad-207f2eee5a91'
      ],
      userSettings: [ '{"user-origin":"admin-invited"}' ],
      sipAddresses: [
        {
          type: 'cloud-calling',
          value: 'sjeffers9999@dcloudprod3.calls.webex.com',
          primary: true
        }
      ],
      isTeamsOnJabberEnabled: false,
      isUCCallOnJabberEnabled: false,
      userType: 'user',
      avatarSyncEnabled: false,
      teamsClusterId: 'urn:TEAM:us-east-2_a'
    })
    .then(user => {
      console.log(user)
      done()
    })
    .catch(done)
  })
})

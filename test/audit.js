// load .env file
require('dotenv').config()
// load this library
const lib = require('../src')

// create client object
const client = new lib({
  orgId: process.env.ORG_ID,
  accessToken: process.env.ACCESS_TOKEN
})

/***********
User
***********/
// const email = 'paige.jones@cumulusorg.com'

async function main () {
  const eventCategories = await client.audit.listEventCategories()
  console.log(eventCategories)
  const events = await client.audit.listAllEvents({
    // startTime: '2023-01-20T00:00:00Z',
    // endTime: '2023-01-21T00:00:00Z',
    startTime: '2023-01-20T00:00:00Z',
    endTime: new Date(),
    // eventCategory: ['WEBEX_CALLING']
  })
  console.log(events.length)
  // console.log(JSON.stringify(events, null, 2))
}

main()
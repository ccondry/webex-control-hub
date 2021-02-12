require('dotenv').config()
const lib = require('../src')

const client = new lib({
  orgId: process.env.ORG_ID,
  accessToken: process.env.ACCESS_TOKEN
})

// client.contactCenter.chatTemplate.list()
// client.user.list({count: 100, startIndex: 0})
client.user.listAll()
.then(r => console.log(r.length))
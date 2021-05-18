require('dotenv').config()
const lib = require('../src')

const client = new lib({
  orgId: process.env.ORG_ID,
  accessToken: process.env.ACCESS_TOKEN
})

// client.contactCenter.chatTemplate.list()
// client.user.list({count: 100, startIndex: 0})
// client.user.listAll()
// client.contactCenter.treatment.list(process.env.EMAIL_ENTRY_POINT_ID)
// client.contactCenter.virtualAssistant.list()
// client.user.get('e85201ed-85d7-4673-840e-b2dc21c44399')
// client.user.get('sjeffers0325@cc1.dc-01.com')
// client.user.onboard({
//   email: 'sjeffers3280@cc1.dc-01.com',
//   licenses: [
//     {
//       id: 'MS_fe3cfc81-8469-4929-8944-23e79e5d0d53',
//       idOperation: 'ADD',
//       properties: {}
//     },
//     {
//       id: 'CJPPRM_1cf76371-2fde-4f72-8122-b6a9d2f89c73',
//       idOperation: 'REMOVE',
//       properties: {}
//     }
//   ]
// })
// client.user.modify({
//   userId: 'e85201ed-85d7-4673-840e-b2dc21c44399',
//   roles: [
//     // 'cjp.standard_agent'
//     'cjp.premium_agent',
//     'cjp.supervisor',
//     'id_readonly_admin'
//   ]
// })
// client.contactCenter.role.modify({
//   email: 'rbarrows0703@cc1.dc-01.com',
//   roles: [{
//     roleName: 'CJP_PREMIUM_AGENT',
//     roleState: 'ACTIVE'
//   }, {
//     roleName: 'CJP_SUPERVISOR',
//     roleState: 'ACTIVE'
//   }, {
//     roleName: 'CJP_STANDARD_AGENT',
//     roleState: 'INACTIVE'
//   }]
// })
// client.org.getMe()
// client.org.getOrg()
// client.org.getAvailableServices()
// client.org.getAvailableDevices()
// client.org.getLicenseUsage()
// client.org.getDomainInfo()
// client.org.getUserStatuses('46a269c1-d676-4277-820c-b46e16ece599')
// client.user.modify({userId: 'e8a93317-d79f-4b85-91af-0c908cd88980'})
// client.contactCenter.ocis.fix('e8a93317-d79f-4b85-91af-0c908cd88980')
client.contactCenter.configGateway.listUsers()
.then(r => console.log(JSON.stringify(r, null, 2)))
.catch(e => console.log(e.message))
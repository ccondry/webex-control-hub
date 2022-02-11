require('dotenv').config()
const lib = require('../src')
const merge = require('merge')

const client = new lib({
  orgId: process.env.ORG_ID,
  accessToken: process.env.ACCESS_TOKEN,
  siteName: 'dCloud_Site',
  siteId: '25c70d81-9cfc-43c4-8dce-7abd8396d6dc'
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
// client.contactCenter.configGateway.listUsers()
// client.contactCenter.skill.list()
const globalSkillId = 'f52eb944-7ec4-4cdc-b208-22f242b1868e'
const globalMultiMediaProfileId = 'f52eb944-7ec4-4cdc-b208-22f242b1868e'

async function provision (type, body) {
  // find skill profile
  console.log('searching for', type, '...')
  let skillProfile = await client.contactCenter[type].find(body)
  // if skill profile exists
  if (skillProfile) {
    console.log(type, 'exists. updating it...')
    // update it
    skillProfile = await client.contactCenter[type].update(body, skillProfile)
    // skillProfile = await client.contactCenter[type].patch(skillProfile)
  } else {
    console.log(type, 'does not exist. creating it...')
    // create it 
    skillProfile = await client.contactCenter[type].create(body)
  }
  // return it
  return skillProfile
}

async function main (id) {
  // const users = await client.contactCenter.user.list()
  // console.log(users)
  const rick = await client.contactCenter.user.find({
    email: `rbarrows${id}@cc.dc-01.com`
  })
  const sandra = await client.contactCenter.user.find({
    email: `sjeffers${id}@cc.dc-01.com`
  })
  const userIds = [rick.id, sandra.id]
  console.log('userIds', userIds)

  // skill profile
  const skillProfile = await provision('skillProfile', {
    name: id,
    skillId: globalSkillId,
    textValue: id,
    description: 'dCloud user ' + id
  })

  const teams = await client.contactCenter.team.list()
  console.log(teams)

  // team
  // const team = await provision('team', {
  //   name: id,
  //   skillProfileId: skillProfile.id,
  //   multiMediaProfileId: globalMultiMediaProfileId,
  //   userIds
  // })
}

// go
main('0325')
.then(r => console.log('done'))
.catch(e => console.log(e.message))



// client.contactCenter.skillProfile.get('a979ffc4-497b-463d-9416-875716c4a8aa')

// .then(sp => {
//   console.log('created', JSON.stringify(sp, null, 2))
//   client.contactCenter.skillProfile.replace(sp.id, {
//     ...sp,
//     name: 'Skill_9900',
//     activeSkills: [{
//       ...sp.activeSkills[0],
//       skillId: 'f52eb944-7ec4-4cdc-b208-22f242b1868e',
//       textValue: '9900'
//     }],
//     description: 'coty test'
//   })
  
// })
// .catch(e => console.log(e.message))
// client.contactCenter.team.list()

// client.contactCenter.team.get('25c4b2a7-7952-4a52-b2fb-843c29e93575')
// .then(r => {
//   delete r.createdTime
//   delete r.lastUpdatedTime
//   delete r._links
//   r.version = 2
//   r.dbId = r.id
//   console.log(r)
//   client.contactCenter.team.replace(r.id, r)
//   .then(r => console.log(JSON.stringify(r, null, 2)))
//   .catch(e => console.log(e.message))
// })
// .then(r => console.log(JSON.stringify(r, null, 2)))
// .catch(e => console.log(e.message))
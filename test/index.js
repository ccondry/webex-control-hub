require('dotenv').config()
const lib = require('../src')
// const merge = require('merge')

const client = new lib({
  orgId: process.env.ORG_ID,
  accessToken: process.env.ACCESS_TOKEN
})

class Cache {
  constructor (ttl = 60 * 60 * 1000) {
    // ttl default 1 hour 
    this.ttl = ttl
    // the data store
    this.store = {}
  }

  get (key) {
    const item = this.store[key]
    if (item) {
      const isStale = item.exp <= new Date().getTime()
      if (isStale) {
        // delete stale data
        delete this.store[key]
      } else {
        return item.data
      }
    }
    // not found or is stale
    return null
  }

  set (key, data, ttl) {
    const now = new Date().getTime()
    this.store[key] = {
      exp: now + (ttl || this.ttl),
      data
    }
  }
}

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

// client.contactCenter.site.list()
// .then(r => console.log(JSON.stringify(r, null, 2)))
// .catch(e => console.log(e.message))

// client.org.getAvailableServices()
// client.org.getAvailableDevices()
// client.org.getLicenseUsage()
// client.org.getDomainInfo()
// client.org.getUserStatuses('46a269c1-d676-4277-820c-b46e16ece599')
// client.user.modify({userId: 'e8a93317-d79f-4b85-91af-0c908cd88980'})
// client.contactCenter.ocis.fix('e8a93317-d79f-4b85-91af-0c908cd88980')
// client.contactCenter.configGateway.listUsers()
// client.contactCenter.skill.list()



// client.contactCenter.skillProfile.get('a979ffc4-497b-463d-9416-875716c4a8aa')
// client.contactCenter.skillProfile.list()
// .then(r => console.log(r))
// .catch(e => console.log(e.message))

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
// .then(r => console.log(r))
// .catch(e => console.log(e.message))

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

async function provision (type, body) {
  // find skill profile
  console.log('searching for', type, '...')
  let item = await client.contactCenter[type].find(body)
  // if skill profile exists
  if (item) {
    console.log(type, 'exists. updating it...')
    console.log(item)
    // update it
    try {
      // console.log(body)
      item = await client.contactCenter[type].update(body)
    } catch (e) {
      console.log('failed to update', type, e.message)
    }
    // item = await client.contactCenter[type].patch(item)
  } else {
    console.log(type, 'does not exist. creating it...')
    // create it 
    item = await client.contactCenter[type].create(body)
  }
  // return it
  return item
}

async function main (id) {
  const cache = new Cache()

  async function getCacheList (type, ttl) {
    // get from cache
    let items = cache.get(type)
    // if no cache
    if (!items) {
      // get from API
      items = await client.contactCenter[type].listAll()
      // store in cache
      cache.set(type, items, ttl)
    }
    // return data
    return items
  }

  async function getCache (type, name, ttl) {
    const key = type + '.' + name
    // get from cache
    let item = cache.get(key)
    // if no cache
    if (!item) {
      // get from API
      item = await client.contactCenter[type].find({name})
      // store in cache
      cache.set(key, item, ttl)
    }
    // return data
    return item
  }

  // static strings
  const skillName = 'dCloud_Default_Skill'
  const multimediaProfileName = 'dCloud_Profile'
  const voiceQueueName = 'dCloud_Voice_Queue'
  const chatQueueName = 'Q_Chat_dCloud'
  const emailQueueName = 'IMI_Queue_Email'
  const siteName = 'dCloud_Site'
  const skillProfileTemplateName = 'Skill_Profile_Provision_Template'
  const teamTemplateName = 'Team_Provision_Template'

  // get contact center site
  const site = await getCache('site', siteName)
  if (!site) {
    throw Error(`Global site ${siteName} was not found. Cannot continue provisioning user ${id}`)
  }
  
  // get skill
  const skill = await getCache('skill', skillName)
  if (!skill) {
    throw Error(`Global skill ${skillName} was not found. Cannot continue provisioning user ${id}`)
  }
  
  // get multimedia profile
  const multimediaProfile = await getCache('multimediaProfile', multimediaProfileName)
  if (!multimediaProfile) {
    throw Error(`Global multimedia profile ${multimediaProfileName} was not found. Cannot continue provisioning user ${id}`)
  }
  
  // get voice queue
  const voiceQueue = await getCache('queue', voiceQueueName)
  // console.log('voiceQueue', voiceQueue)
  if (!voiceQueue) {
    throw Error(`Global voice queue ${voiceQueueName} was not found. Cannot continue provisioning user ${id}`)
  }
  
  // get chat queue
  const chatQueue = await getCache('queue', chatQueueName)
  // console.log('chatQueue', chatQueue)
  if (!chatQueue) {
    throw Error(`Global chat queue ${chatQueueName} was not found. Cannot continue provisioning user ${id}`)
  }

  // get email queue
  const emailQueue = await getCache('queue', emailQueueName)
  if (!emailQueue) {
    throw Error(`Global email queue ${emailQueueName} was not found. Cannot continue provisioning user ${id}`)
  }

  // get users list
  const users = await getCacheList('user')

  // get teams list
  const teams = await getCacheList('team')

  // find rick
  const rickEmail = `rbarrows${id}@cc.dc-01.com`
  const rick = users.find(user => user.email === rickEmail)
  if (!rick) {
    throw Error(`User ${rickEmail} was not found. Cannot continue provisioning user ${id}`)
  }
  // find sandra
  const sandraEmail = `sjeffers${id}@cc.dc-01.com`
  const sandra = users.find(user => user.email === sandraEmail)
  if (!sandra) {
    throw Error(`User ${sandraEmail} was not found. Cannot continue provisioning user ${id}`)
  }

  // find skill profile
  console.log('searching for skill profile...')
  let skillProfile = await client.contactCenter.skillProfile.find({name: id})

  // if skill profile exists
  if (skillProfile) {
    console.log('skill profile exists. updating it...')
    // console.log(skillProfile)
    // update it
    try {
      const body = {
        ...skillProfile,
        name: id,
        description: `dCloud user ${id}`
      }
      body.activeSkills[0] = {
        ...body.activeSkills[0],
        textValue: id,
        booleanValue: false,
        proficiencyValue: 0
      }

      skillProfile = await client.contactCenter.skillProfile.update(body)
    } catch (e) {
      console.log('failed to update skill profile:', e.message)
    }
    // item = await client.contactCenter[type].patch(skillProfile)
  } else {
    // create it 
    console.log('skill profile does not exist. creating it...')
    // get template
    const template = await client.contactCenter.skillProfile.find({
      name: skillProfileTemplateName
    })
    // clean template data
    delete template.version
    delete template.id
    delete template.links
    delete template.activeSkills[0].id
    delete template.activeSkills[0].links
    
    const body = {
      ...template,
      name: id,
      description: `dCloud user ${id}`
    }
    body.activeSkills[0] = {
      ...template.activeSkills[0],
      textValue: id,
      booleanValue: false,
      proficiencyValue: 0
    }
    skillProfile = await client.contactCenterskillProfile.create(body)
  }

  // team
  // find team
  console.log('searching for team...')
  let team = await client.contactCenter.team.find({name: id})

  // if team exists
  if (team) {
    console.log('team exists. updating it...')
    // console.log(team)
    // update it
    try {
      // const team = await provision('team', {
      //   name: id,
      //   skillProfileId: skillProfile.id,
      //   multiMediaProfileId: multimediaProfile.id,
      //   userIds: [rick.id, sandra.id],
      //   siteName: site.name,
      //   siteId: site.id
      // })
    
      const body = {
        ...team,
        name: id,
        description: `dCloud user ${id}`,
        active: true,
        skillProfileId: skillProfile.id,
        multiMediaProfileId: multimediaProfile.id,
        userIds: [rick.id, sandra.id],
        siteName: site.name,
        siteId: site.id
      }

      team = await client.contactCenter.team.update(body)
    } catch (e) {
      console.log('failed to update team:', e.message)
    }
    // item = await client.contactCenter[type].patch(team)
  } else {
    // create it 
    console.log('team does not exist. creating it...')
    // get template
    const template = await client.contactCenter.team.find({
      name: teamTemplateName
    })
    // clean template data
    delete template.version
    delete template.id
    delete template.links
    delete template.activeSkills[0].id
    delete template.activeSkills[0].links
    
    const body = {
      ...template,
      name: id,
      description: `dCloud user ${id}`,
      active: true,
      skillProfileId: skillProfile.id,
      multiMediaProfileId: multimediaProfile.id,
      userIds: [rick.id, sandra.id],
      siteName: site.name,
      siteId: site.id
    }
    team = await client.contactCenterteam.create(body)
  }

  // add user team to queues
  updateQueue(voiceQueue, teams)
  console.log('updating queue', voiceQueue.name, 'with all teams...')
  await client.contactCenter.queue.update(voiceQueue)

  updateQueue(chatQueue, teams)
  console.log('updating queue', chatQueue.name, 'with all teams...')
  await client.contactCenter.queue.update(chatQueue)

  updateQueue(emailQueue, teams)
  console.log('updating queue', emailQueue.name, 'with all teams...')
  await client.contactCenter.queue.update(emailQueue)

  // done?
}

// set all teams to a queue's call distribution groups
function updateQueue (queue, teams) {
  queue.callDistributionGroups = [{
    agentGroups: teams.map(team => ({teamId: team.id})),
    order: 1,
    duration: 0
  }]
}

// go
main('0325')
.then(r => console.log('done'))
.catch(e => console.log(e.message))

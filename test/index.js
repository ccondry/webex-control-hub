require('dotenv').config()
const lib = require('../src')
// const merge = require('merge')

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

async function provision (type, body) {
  // find skill profile
  console.log('searching for', type, '...')
  let item = await client.contactCenter[type].find(body)
  // if skill profile exists
  if (item) {
    console.log(type, 'exists. updating it...')
    // update it
    try {
      item = await client.contactCenter[type].update(body, item)
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

  // const globalSkillId = 'f52eb944-7ec4-4cdc-b208-22f242b1868e'
  // const globalMultiMediaProfileId = '9fc6ac55-6720-4116-8aaa-a026dafed010'
  
  // const t = await client.contactCenter.team.get('05fa34d0-a5f4-429a-acab-f4f2bfefb8a8')
  // console.log(t)
  class Cache {
    constructor (ttl = 60 * 60 * 1000) {
      // ttl default 1 hour 
      this.ttl = ttl
      // the data store
      this.store = {}
    }

    get (key) {
      const item = this.store[key]
      const isStale = item.exp <= new Date().getTime()
      if (item && !isStale) {
        return item.data
      } else {
        return null
      }
    }

    set (key, data, ttl) {
      const now = new Date().getTime()
      this.store[key] = {
        exp: now + (ttl || this.ttl),
        data
      }
    }
  }

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
  if (!voiceQueue) {
    throw Error(`Global voice queue ${voiceQueueName} was not found. Cannot continue provisioning user ${id}`)
  }

  // get chat queue
  const chatQueue = await getCache('queue', chatQueueName)
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

  // skill profile
  const skillProfile = await provision('skillProfile', {
    name: id,
    skillId: skill.id,
    textValue: id,
    description: `dCloud user ${id}`
  })

  // team
  const team = await provision('team', {
    name: id,
    skillProfileId: skillProfile.id,
    multiMediaProfileId: multimediaProfile.id,
    userIds: [rick.id, sandra.id],
    siteName: site.name,
    siteId: site.id
  })

  // add user team to queues
  const voiceAdded = addToQueue(voiceQueue, team)
  // if (voiceAdded) {
  //   const body = voiceQueue
  //   voiceQueue.ivrRequeueUrl = ''
  //   await client.contactCenter.queue.replace(body)
  // }
  const chatAdded = addToQueue(chatQueue, team)
  const emailAdded = addToQueue(emailQueue, team)

  // done?
}

// add a team to a queue's call distribution groups
function addToQueue (queue, team) {
  // is this team already in this queue?
  let existing
  try {
    existing = queue.callDistributionGroups.agentGroups.find(t => t.teamId === team.id)
  } catch (e) {
    // continue
  }
  if (!existing) {
    // make sure call dist groups has at least the default group
    queue.callDistributionGroups = queue.callDistributionGroups || []
    queue.callDistributionGroups[0] = queue.callDistributionGroups[0] || {
      agentGroups: [], order: 1, duration: 0
    }
    // add team to the queue
    queue.callDistributionGroups[0].agentGroups.push({teamId: team.id})
    return true
  }
  // did not update
  return false
}

// go
main('0325')
.then(r => console.log('done'))
.catch(e => console.log(e.message))

const ChatTemplate = require('./chat-template')
const Treatment = require('./treatment')
const VirtualAssistant = require('./virtual-assistant')
const Role = require('./role')
const Ocis = require('./ocis')
const ConfigGateway = require('./config-gateway')
// const Queue = require('./queue')
const Skill = require('./skill')
const SkillProfile = require('./skill-profile')
const Team = require('./team')
const User = require('./user')
// const UserProfile = require('./user-profile')
const MultimediaProfile = require('./multimedia-profile')
const Queue = require('./queue')
const Site = require('./site')

module.exports = class ContactCenter {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center.')
    this.params = params
    
    this.chatTemplate = new ChatTemplate(this.params)
    this.treatment = new Treatment(this.params)
    this.virtualAssistant = new VirtualAssistant(this.params)
    this.role = new Role(this.params)
    this.ocis = new Ocis(this.params)
    this.configGateway = new ConfigGateway(this.params)
    // this.queue = new Queue(this.params)
    this.skill = new Skill(this.params)
    this.skillProfile = new SkillProfile(this.params)
    this.team = new Team(this.params)
    this.user = new User(this.params)
    // this.userProfile = new UserProfile(this.params)
    this.multimediaProfile = new MultimediaProfile(this.params)
    this.queue = new Queue(this.params)
    this.site = new Site(this.params)
  }
}

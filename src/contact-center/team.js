const fetch = require('../utils/fetch')

module.exports = class Team {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/team.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/team.')
    this.params = params
    this.baseUrl = 'https://api.wxcc-us1.cisco.com'
  }

  /**
   * Gets list of teams
   * @return {Promise} the fetch promise, which resolves to teams JSON
   * array when successful
   */
  async list () {
    try {
      const url = `${this.baseUrl}/organization/${this.params.orgId}/team`
      const options = {
        headers: {
          Authorization: 'Bearer ' + this.params.accessToken
        }
      }
      const response = await fetch(url, options)
      return response
    } catch (e) {
      throw e
    }
  }

  /**
   * Find team by name
   * @return {Promise} the fetch promise, which resolves to team JSON
   * object when successful or null if not found
   */
  async find ({name}) {
    try {
      let found = null
      let page = 0
      let pageSize = 100
      let atEnd = false
      // while item is not found and last page of results has not been reached
      while (!found && !atEnd) {
        // keep looking
        let list = await this.list(page, pageSize)
        // console.log('found', list.length, 'teams')
        // look for item in the current list
        found = list.find(item => item.name === name)
        // did we reach the end of the total results?
        atEnd = list.length < pageSize
        // increment page for next iteration
        page++
      }
      // if (found) {
      //   // return full object details
      //   return this.get(found.id)
      // }
      return found
    } catch (e) {
      throw e
    }
  }

  /**
   * Gets full data for one team
   * @return {Promise} the fetch promise, which resolves to team JSON
   * object when successful
   */
  get (id) {
    const url = `${this.baseUrl}/organization/${this.params.orgId}/team/${id}`
    const options = {
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken
      }
    }
    return fetch(url, options)
  }

  /**
   * Create a team
   * @return {Promise} the fetch promise, which resolves to team JSON
   * array when successful
   */
  create ({
    name,
    skillProfileId,
    multiMediaProfileId,
    userIds,
    siteId,
    siteName
  }) {
    try {
      const url = `${this.baseUrl}/organization/${this.params.orgId}/team`
      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.params.accessToken
        },
        body: {
          name,
          teamType: 'AGENT',
          teamStatus: 'IN_SERVICE',
          active: true,
          siteId,
          siteName,
          skillProfileId,
          multiMediaProfileId,
          userIds
        }
      }
      // console.log(options.body)
      return fetch(url, options)
    } catch (e) {
      throw e
    }
  }

  /**
   * update a team using same parameters as create
   * @return {Promise} the fetch promise, which resolves to fetch response body
   */
  async update ({
    name,
    skillProfileId,
    multiMediaProfileId,
    userIds
  }, existing) {
    try {
      // find existing record if not provided
      if (!existing) {
        existing = await this.find({name})
        // existing = await this.get(existing.id)
      }
      // console.log('existing team', existing)
      if (!existing) {
        throw Error('cannot update team - ', name, 'does not exist')
      }
      const url = `${this.baseUrl}/organization/${this.params.orgId}/team/${existing.id}`
      if (name) existing.name = name
      if (skillProfileId) existing.skillProfileId = skillProfileId
      if (multiMediaProfileId) existing.multiMediaProfileId = multiMediaProfileId
      if (userIds) existing.userIds = userIds
      const options = {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + this.params.accessToken
        },
        body: existing
      }
      // console.log(url, options)
      return fetch(url, options)
    } catch (e) {
      throw e
    }
  }

  /**
   * replace a team
   * @return {Promise} the fetch promise, which resolves to fetch response body
   */
  replace (id, body) {
    const url = `${this.baseUrl}/organization/${this.params.orgId}/team/${id}`
    const options = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken
      },
      body
    }
    return fetch(url, options)
  }
}

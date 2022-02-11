const fetch = require('../utils/fetch')

module.exports = class Team {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/team.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/team.')
    if (!params.siteId) throw Error('siteId is a required constructor parameter for webex-control-hub/contact-center/team.')
    if (!params.siteName) throw Error('siteName is a required constructor parameter for webex-control-hub/contact-center/team.')
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
    userIds
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
          siteId: this.params.siteId,
          siteName: this.params.siteName,
          skillProfileId,
          multiMediaProfileId,
          userIds
        }
      }
      console.log(options.body)
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

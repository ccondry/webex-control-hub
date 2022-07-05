const fetch = require('../utils/fetch')

module.exports = class Team {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/team.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/team.')
    this.params = params
    // this.baseUrl = 'https://api.wxcc-us1.cisco.com'
    this.baseUrl = `https://config-service.produs1.ciscoccservice.com/cms/api/organization/${this.params.orgId}/team`
  }

  /**
   * Gets list of teams
   * @return {Promise} the fetch promise, which resolves to teams JSON
   * array when successful
   */
   async list (page = 0, pageSize = 100) {
    try {
      const url = this.baseUrl
      const options = {
        headers: {
          Authorization: 'Bearer ' + this.params.accessToken
        },
        query: {
          page,
          pageSize
        }
      }
      const response = await fetch(url, options)
      return response
    } catch (e) {
      throw e
    }
  }

  /**
  * Gets full list of skill profiles
  * @return {Promise} the fetch promise, which resolves to skill profiles JSON array when
  * successful
  */
  async listAll () {
    try {
      let page = 0
      let pageSize = 100
      let atEnd = false
      const data = []
      // while item is not found and last page of results has not been reached
      while (!atEnd) {
        // keep looking
        const list = await this.list(page, pageSize)
        // add results to return data array
        data.push.apply(data, list)
        // did we reach the end of the total results?
        atEnd = list.length < pageSize
        // increment page for next iteration
        page++
      }
      // return results
      return data
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
    const url = `${this.baseUrl}/${id}`
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
  create (body) {
    try {
      const url = this.baseUrl
      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.params.accessToken
        },
        body
      }
      // console.log(options.body)
      return fetch(url, options)
    } catch (e) {
      throw e
    }
  }

  /**
   * update (replace) a team
   * @return {Promise} the fetch promise, which resolves to fetch response body
   */
  async update (body) {
    const url = `${this.baseUrl}/${body.id}`
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

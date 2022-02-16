const fetch = require('../utils/fetch')

module.exports = class SkillProfile {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/skill-profile.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/skill-profile.')
    this.params = params
    // this.baseUrl = `https://api.wxcc-us1.cisco.com/organization/${this.params.orgId}/skill-profile`
    this.baseUrl = `https://config-service.produs1.ciscoccservice.com/cms/api/organization/${this.params.orgId}/skill-profile`
  }

  /**
   * Gets list of skill profiles
   * @return {Promise} the fetch promise, which resolves to skill profiles JSON
   * array when successful
   */
  async list (page = 0, pageSize = 100) {
    try {
      const url = this.baseUrl
      const options = {
        query: {
          page,
          pageSize
        },
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
   * Find skill profile by name
   * @return {Promise} the fetch promise, which resolves to skill profile JSON
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
        // console.log('found', list.length, 'skill profiles')
        // look for item in the current list
        found = list.find(item => item.name === name)
        // did we reach the end of the total results?
        atEnd = list.length < pageSize
        // increment page for next iteration
        page++
      }
      // return result
      return found
    } catch (e) {
      throw e
    }
  }

  /**
   * Gets full data for one skill profile
   * @return {Promise} the fetch promise, which resolves to skill profile JSON
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
   * Create a skill profile
   * @return {Promise} the fetch promise, which resolves to skill profile JSON
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
      // console.log(url, options)
      return fetch(url, options)
    } catch (e) {
      throw e
    }
  }

  /**
   * replace a skill profile
   * @return {Promise} the fetch promise, which resolves to fetch response body
   */
  update (body) {
    // console.log('update skill profile', body)
    body.id = body.id || body.skillId
    const url = `${this.baseUrl}/${body.id}`
    // fix missing body parameters
    // if (typeof body.version === 'undefined') {
    //   body.version = 1
    // }
    // body.organizationId = this.params.orgId
    const options = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken
      },
      body
    }
    return fetch(url, options)
  }

  /**
   * delete a skill profile
   * @return {Promise} the fetch promise, which resolves to fetch response body
   */
  // this does not work, it is disabled on API side with inaccessible foreign-
  // key constraint
  // remove (id) {
  //   const url = `${this.baseUrl}/organization/${this.params.orgId}/skill-profile/${id}`
  //   const options = {
  //     method: 'DELETE',
  //     headers: {
  //       Authorization: 'Bearer ' + this.params.accessToken
  //     }
  //   }
  //   return fetch(url, options)
  // }
}

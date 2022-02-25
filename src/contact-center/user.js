const fetch = require('../utils/fetch')

module.exports = class User {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/user.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/user.')
    this.params = params
    // this.baseUrl = 'https://api.wxcc-us1.cisco.com'
    this.baseUrl = `https://config-service.produs1.ciscoccservice.com/cms/api/organization/${this.params.orgId}/user`
  }

  /**
   * Gets list of users
   * @return {Promise} the fetch promise, which resolves to users JSON
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
   * Find user by name
   * @return {Promise} the fetch promise, which resolves to user JSON
   * object when successful or null if not found
   */
   async find ({id, email}) {
    try {
      let found = null
      let page = 0
      let pageSize = 100
      let atEnd = false
      // while item is not found and last page of results has not been reached
      while (!found && !atEnd) {
        // keep looking
        let list = await this.list(page, pageSize)
        // console.log('found', list.length, 'users')
        // look for item in the current list
        found = list.find(item => {
          return (email && item.email === email) || (id && item.id === id)
        })
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
   * Gets full data for one user
   * @return {Promise} the fetch promise, which resolves to user JSON
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
   * Create a user
   * @return {Promise} the fetch promise, which resolves to user JSON
   * array when successful
   */
  create ({
    name,
    description = ''
  }) {
    try {
      const url = this.baseUrl
      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.params.accessToken
        },
        body: {
          name,
          description,
          organizationId: this.params.orgId,
        }
      }
      // console.log(url, options)
      return fetch(url, options)
    } catch (e) {
      throw e
    }
  }

  /**
   * update (replace) a user
   * @return {Promise} the fetch promise, which resolves to fetch response body
   */
  update (id, body) {
    const url = `${this.baseUrl}/${id}`
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

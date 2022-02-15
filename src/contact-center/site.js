const fetch = require('../utils/fetch')

module.exports = class Site {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/site.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/site.')
    this.params = params
    this.baseUrl = `https://api.wxcc-us1.cisco.com/organization/${this.params.orgId}/site`
  }

  /**
   * Gets list of sites
   * @return {Promise} the fetch promise, which resolves to sites JSON
   * array when successful
   */
  async list () {
    try {
      const url = this.baseUrl
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
 * Gets full data for one site
 * @return {Promise} the fetch promise, which resolves to site JSON
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
   * Find site by name
   * @return {Promise} the fetch promise, which resolves to site JSON
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
   * list all
   * @return {Promise} the fetch promise, which resolves to site JSON
   * array when successful
   */
  async listAll () {
    try {
      let page = 0
      let pageSize = 100
      let atEnd = false
      let data = []
      // while item is not found and last page of results has not been reached
      while (!atEnd) {
        // keep looking
        const list = await this.list(page, pageSize)
        data = data.concat(list)
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
}

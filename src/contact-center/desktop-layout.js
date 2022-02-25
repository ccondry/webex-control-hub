const fetch = require('../utils/fetch')

module.exports = class DesktopLayout {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/desktop-layout.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/desktop-layout.')
    this.params = params
    this.baseUrl = `https://config-service.produs1.ciscoccservice.com/cms/api/organization/${this.params.orgId}/desktop-layout`
  }

  /**
   * Gets list of desktop layouts
   * @return {Promise} the fetch promise, which resolves to desktop layouts JSON
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
  * Gets full list of desktop layouts
  * @return {Promise} the fetch promise, which resolves to desktop layouts JSON array when
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
   * Find desktop layout
   * @return {Promise} the fetch promise, which resolves to desktop layout JSON
   * object when successful or null if not found
   */
   async find (query) {
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
        found = list.find(item => {
          // filter out if item does not match all query parameters
          for (const key of Object.keys(query)) {
            const value = query[key]
            if (item[key] !== value) {
              return false
            }
          }
          // keep if all query parameters matched
          return true
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
   * Gets full data for one desktop layout
   * @return {Promise} the fetch promise, which resolves to desktop layout JSON
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
   * Create a desktop layout
   * @return {Promise} the fetch promise, which resolves to desktop layout JSON
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
   * replace a desktop layout
   * @return {Promise} the fetch promise, which resolves to fetch response body
   */
  update (body) {
    // console.log('update desktop layout', body)
    body.id = body.id
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
}

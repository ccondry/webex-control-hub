const fetch = require('../utils/fetch')

module.exports = class Queue {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/queue.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/queue.')
    this.params = params
    // this.baseUrl = `https://api.wxcc-us1.cisco.com/organization/${this.params.orgId}/contact-service-queue`
    this.baseUrl = `https://config-service.produs1.ciscoccservice.com/cms/api/organization/${this.params.orgId}/contact-service-queue`
  }

  /**
   * Gets list of queues
   * @return {Promise} the fetch promise, which resolves to queues JSON
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
   * Find queue by name
   * @return {Promise} the fetch promise, which resolves to queue JSON
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
        // console.log('found', list.length, 'queues')
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
  * Gets full list of queues
  * @return {Promise} the fetch promise, which resolves to queues JSON array when
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
   * Gets full data for one queue
   * @return {Promise} the fetch promise, which resolves to queue JSON
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
   * update a queue
   * @return {Promise} the fetch promise, which resolves to fetch response body
   */
   update (body) {
    const url = `${this.baseUrl}/${body.id}`
    // fix missing body parameters. I think these are deprecated but required
    // for API validation?
    if (typeof body.checkAgentAvailability === 'undefined') {
      body.checkAgentAvailability = false
    }
    // if (typeof body.ivrRequeueUrl === 'undefined') {
    //   body.ivrRequeueUrl = 'https://www.webex.com'
    // }
    // if (typeof body.controlFlowScriptUrl === 'undefined') {
    //   body.controlFlowScriptUrl = 'https://flow-control.produs1.ciscoccservice.com/31f1c57f-4fa1-417b-b5c5-6feb6abea062/royal-enfield'
    // }
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
   * patch a queue
   * @return {Promise} the fetch promise, which resolves to fetch response body
   */
  patch (body) {
    const url = `${this.baseUrl}/${body.id}`
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken,
        'Content-Type': 'application/merge-patch+json'
      },
      body
    }
    return fetch(url, options)
  }

  /**
   * delete a queue
   * @return {Promise} the fetch promise, which resolves to fetch response body
   */
  // this does not work, it is disabled on API side with inaccessible foreign-
  // key constraint
  // remove (id) {
  //   const url = `${this.baseUrl}/${id}`
  //   const options = {
  //     method: 'DELETE',
  //     headers: {
  //       Authorization: 'Bearer ' + this.params.accessToken
  //     }
  //   }
  //   return fetch(url, options)
  // }
}

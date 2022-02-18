const fetch = require('../utils/fetch')

module.exports = class Number {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/calling/number.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/calling/number.')
    this.params = params
    this.urlBase = `https://cpapi-a.wbx2.com/api/v1/customers/${this.params.orgId}/numbers`
  }
  
  /**
  * Gets list of numbers
  * @return {Promise} the fetch promise, which resolves to numbers JSON
  * array when successful
  */
  async list (query = {}) {
    try {
      // set default query params

      if (typeof query.offset === 'undefined') {
        query.offset = 0
      }
      if (typeof query.limit === 'undefined') {
        query.limit = 100
      }
      if (typeof query.wide === 'undefined') {
        query.wide = true
      }
      // if (typeof query.name === 'undefined') {
      //   query.name = ''
      // }
      // if (typeof query.extension === 'undefined') {
      //   query.extension = ''
      // }
      // if (typeof query.number === 'undefined') {
      //   query.number = ''
      // }

      const url = this.urlBase
      const options = {
        headers: {
          Authorization: 'Bearer ' + this.params.accessToken
        },
        query
      }
      // console.log(url, options)
      const response = await fetch(url, options)
      console.log(response)
      return response.numbers
    } catch (e) {
      throw e
    }
  }

  /**
  * Gets full list of numbers
  * @return {Promise} the fetch promise, which resolves to numbers JSON array when
  * successful
  */
  async listAll () {
    try {
      let offset = 0
      let limit = 100
      let atEnd = false
      const data = []
      // while item is not found and last page of results has not been reached
      while (!atEnd) {
        // keep looking
        const list = await this.list({offset, limit})
        // add results to return data array
        data.push.apply(data, list)
        // did we reach the end of the total results?
        atEnd = list.length < limit
        // increment page for next iteration
        offset += limit
      }
      // return results
      return data
    } catch (e) {
      throw e
    }
  }

  /**
   * Find number by name
   * @return {Promise} the fetch promise, which resolves to number JSON
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
        // console.log('found', list.length, 'numbers')
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
  * Gets single number
  * @return {Promise} the fetch promise, which resolves to numbers JSON
  * object when successful
  */
  async get (id) {
    const url = `${this.urlBase}/${id}`
    const options = {
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken
      }
    }
    return fetch(url, options)
  }
  
  /**
  * Create a number
  * @return {Promise} the fetch promise, which resolves to the response JSON
  * object when successful
  */
  create (body) {
    const url = this.urlBase
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken
      },
      body
    }
    return fetch(url, options)
  }

  /**
  * Modify a number
  * @return {Promise} the fetch promise, which resolves to the response JSON
  * object when successful
  */
  modify (id, body) {
    const url = `${this.urlBase}/${id}`
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
const fetch = require('./utils/fetch')

module.exports = class Audit {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/audit.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/audit.')
    this.params = params
    this.baseUrl = 'https://audit-a.wbx2.com/audit/api/v2'
    this.baseOptions = {
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken
      }
    }
  }

  // list external admin accounts

  // returns: {
  //   "adminActivityCount": 271,
  //   "recordsReturned": 100,
  //   "pagination": {
  //     "limit": 100,
  //     "offset": 0
  //   },
  //   "adminActivity": [...items]
  // }

  async listEvents ({
    startTime,
    endTime,
    limit = 100,
    offset = 0,
    eventCategory = []
  }) {
    const url = `${this.baseUrl}/organizations/${this.params.orgId}/events/merged`
    try {
        const results = await fetch(url, {
        ...this.baseOptions,
        method: 'POST',
        body: {
          endTime: new Date(endTime).toISOString(),
          language: "en_US",
          startTime: new Date(startTime).toISOString(),
          pagination: {
            limit,
            offset
          },
          fetchTotalRecordsCount: true,
          eventCategory
        }
      })
      return results.adminActivity
    } catch (e) {
      throw e
    }
  }

  async listAllEvents ({
    startTime,
    endTime,
    eventCategory
  }) {
    try {
      let offset = 0
      let limit = 100
      let atEnd = false
      const data = []
      // while item is not found and last page of results has not been reached
      while (!atEnd) {
        // keep looking
        const list = await this.listEvents({
          startTime,
          endTime,
          eventCategory,
          offset, 
          limit
        })
        // add results to return data array
        data.push(...list)
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

  async listEventCategories () {
    const url = `${this.baseUrl}/eventsCategories`
    return fetch(url, this.baseOptions)
  }
}
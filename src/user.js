const fetch = require('./utils/fetch')

module.exports = class User {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/chat-template.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/chat-template.')
    this.params = params
  }
  
  /**
  * Gets list of users
  * @param {Object} query optional parameters object to filter search results
  * @return {Promise} the fetch promise, which resolves to users JSON array when
  * successful
  */
  async list (query) {
    const url = `https://identity.webex.com/identity/scim/${this.params.orgId}/v1/Users`
    // build default user attributes to retrieve
    const attributes = [
      'name',
      'userName',
      'userStatus',
      'entitlements',
      'displayName',
      'photos',
      'roles',
      'active',
      'adminTrainSiteNames',
      'trainSiteNames',
      'linkedTrainSiteNames',
      'licenseID',
      'userSettings',
      'userPreferences'
    ]
    // const filter = '(userType eq "user") and (roles eq "id_full_admin" or roles eq "id_device_admin" or roles eq "id_readonly_admin" or roles eq "id_user_admin" or roles eq "cjp.admin")'
    const filter = '(userType eq "user")'
    const options = {
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken
      }
    }
    const defaultQuery = {
      attributes: attributes.join(','), 
      count: 100,
      filter,
      sortBy: 'name',
      sortOrder: 'ascending',
      startIndex: 0
    }
    // overwrite default query options with those from input
    query = query || {}
    options.query = {...defaultQuery, ...query}
    return fetch(url, options)
  }

  /**
  * Gets full list of users
  * @return {Promise} the fetch promise, which resolves to users JSON array when
  * successful
  */
  async listAll () {
    let count = 100
    let startIndex = 1
    // just a number to get the while loop started
    let totalResults = 100
    const ret = []
    while (startIndex <= totalResults) {
      const results = await this.list({startIndex, count})
      // add result data to return array
      ret.push.apply(ret, results.Resources)
      totalResults = parseInt(results.totalResults)
      // increase startIndex for next iteration to get next part of data
      startIndex += count
    }
    return ret
  }
}


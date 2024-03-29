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
  async list (query = {}) {
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
    options.query = {...defaultQuery, ...query}
    return fetch(url, options)
  }

  /**
  * Gets full list of users
  * @return {Promise} the fetch promise, which resolves to users JSON array when
  * successful
  */
  async listAll (query = {}) {
    let count = 100
    let startIndex = 1
    // just a number to get the while loop started
    let totalResults = 100
    const ret = []
    while (startIndex <= totalResults) {
      const results = await this.list({...query, startIndex, count})
      // add result data to return array
      ret.push.apply(ret, results.Resources)
      totalResults = parseInt(results.totalResults)
      // increase startIndex for next iteration to get next part of data
      startIndex += count
    }
    return ret
  }

  /**
  * Get user details
  * @param {String} userId the Control Hub user ID of the user to work on
  * @return {Promise} the fetch promise, which resolves to users JSON array when
  * successful
  */
  async get (userId) {
    const url = `https://identity.webex.com/identity/scim/${this.params.orgId}/v1/Users/${userId}`
    const options = {
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken
      }
    }
    return fetch(url, options)
  }

  /**
  * Onboard a user with specified licenses
  * @param {String} userId the Control Hub user ID of the user to work on
  * @param {String} licenses the Control Hub user ID of the user to work on
  * @return {Promise} the fetch promise, which resolves to users JSON array when
  * successful
  */
  async onboard ({email, licenses = []}) {
    const url = `https://license-a.wbx2.com/license/api/v1/organization/${this.params.orgId}/users/onboard`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.params.accessToken}`
      },
      body: [{
        email,
        licenses,
        userEntitlements: [],
        extendedSiteAccounts: [],
        onboardMethod: null
      }]
    }
    return fetch(url, options)
  }

  /**
  * Modify a user 
  * @param {String} userId the Control Hub user ID of the user to work on
  * @param {String} roles the Control Hub roles to add to the user. roles can only be added using this route.
  * @return {Promise} the fetch promise, which resolves to users JSON array when
  * successful
  */
  async modify ({userId, roles = ['id_readonly_admin']}) {
    const url = `https://identity.webex.com/identity/scim/${this.params.orgId}/v1/Users/${userId}`
    const body = {
      schemas: [
        'urn:scim:schemas:core:1.0',
        'urn:scim:schemas:extension:cisco:commonidentity:1.0'
      ],
      roles
    }
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${this.params.accessToken}`
      },
      body
    }
    return fetch(url, options)
  }

  /**
  * Modify a user's roles using Atlas
  * @param {String} email the email address (userName) of the user to modify
  * @param {Object[]} roles the Control Hub roles to modify. expect like [{"roleName": "Readonly_Admin", "roleState": "ACTIVE"}]
  * @return {Promise} the fetch promise, which resolves to modified user data
  * successful
  */
  async modifyRoles ({email, roles}) {
    // get atlas base URL
    // const atlas = get_control_hub_url('atlas', this.params.orgId, this.params.accessToken)
    const atlas = 'https://atlas-a.wbx2.com/admin/api/v1'
  
    // build full URL
    const url = `${atlas}/organization/${this.params.orgId}/users/roles`

    // build headers
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.params.accessToken
    }

    // build body for REST call to Control Hub
    const body = {
      users: [{
        email,
        userRoles: roles
      }]
    }
    
    const options = {
      method: 'PATCH',
      headers,
      body
    }
    // send REST request and return its promise
    return fetch(url, options)
  }
}

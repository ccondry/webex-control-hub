const fetch = require('./utils/fetch')

module.exports = class Org {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/org.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/org.')
    this.params = params
    this.baseUrl = 'https://atlas-a.wbx2.com/admin/api/v1/organization'
    this.baseOptions = {
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken
      }
    }
  }

  // list external admin accounts
  async getExternalAdmins () {
    const url = `${this.baseUrl}/${this.params.orgId}/externalAdmins`
    return fetch(url, this.baseOptions)
  }

  // get org and license info
  async getOrg () {
    // not working - 404
    const url = `${this.baseUrl}/${this.params.orgId}`
    const query = {
      basicInfo: true,
      disableCache: true,
      licenseCount: false,
      onboardInfo: true
    }
    const options = {...this.baseOptions, ...query}
    return fetch(url, options)
  }

  async getLicenseUsage () {
    const url = `https://atlas-a.wbx2.com/admin/api/v1/customers/${this.params.orgId}/usage`
    return fetch(url, this.baseOptions)
  }

  async getUnlicensedUsers () {
    const url = `https://atlas-a.wbx2.com/admin/api/v1/organizations/${this.params.orgId}/unlicensedUsers`
    return fetch(url, this.baseOptions)
  }

  async getMe () {
    const url = `https://identity.webex.com/identity/scim/v1/Users/me`
    return fetch(url, this.baseOptions)
  }

  async faceRecognition (userId) {
    const url = `https://face-recognition-a.wbx2.com/face-recognition/api/v2/users//${userId}`
    return fetch(url, this.baseOptions)
  }

  async getAvailableServices () {
    const url = `https://hercules-a.wbx2.com/hercules/api/v2/organizations/${this.params.orgId}/services`
    const response = await fetch(url, this.baseOptions)
    return response.items
  }

  async getUserStatuses (userId) {
    const url = `https://uss-a.wbx2.com/uss/api/v1/orgs/${this.params.orgId}/userStatuses`
    const query = {
      includeMessages: true,
      entitled: true,
      userId
    }
    return fetch(url, {...this.baseOptions, ...query})
  }
}
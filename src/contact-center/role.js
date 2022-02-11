const fetch = require('../utils/fetch')

module.exports = class Role {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/role.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/role.')
    this.params = params
  }

  /**
   * Modify user's contact center roles
   * @param {String} email the Control Hub user email (userName)
   * @param {Array} roles the array of user roles to modify on the user
   * @return {Promise} the fetch promise, which resolves to email treatments JSON
   * array when successful
   */
  async modify ({email, roles}) {
    try {
      const body = {
        users: [{
          email,
          userRoles: roles
        }]
      }

      const url = `https://atlas-a.wbx2.com/admin/api/v1/organization/${this.params.orgId}/users/contactCenterRoles`
      const options = {
        headers: {
          Authorization: 'Bearer ' + this.params.accessToken
        },
        method: 'PATCH',
        body
      }
      const response = await fetch(url, options)
      return response.userResponse[0]
    } catch (e) {
      throw e
    }
  }
}

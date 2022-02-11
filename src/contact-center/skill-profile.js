const fetch = require('../utils/fetch')

module.exports = class SkillProfile {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/skill-profile.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/skill-profile.')
    this.params = params
    this.baseUrl = 'https://api.wxcc-us1.cisco.com'
  }

  /**
   * Gets list of skill profiles
   * @return {Promise} the fetch promise, which resolves to skill profiles JSON
   * array when successful
   */
  async list () {
    try {
      const url = `${this.baseUrl}/organization/${this.params.orgId}/skill-profile`
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
   * Gets full data for one skill profile
   * @return {Promise} the fetch promise, which resolves to skill profile JSON
   * object when successful
   */
  get (id) {
    const url = `${this.baseUrl}/organization/${this.params.orgId}/skill-profile/${id}`
    const options = {
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken
      }
    }
    return fetch(url, options)
  }

  // /**
  //  * Validate a Google credentials JSON file has correct permissions
  //  * @return {Promise} the fetch promise, which resolves to skill profiles JSON
  //  * array when successful
  //  */
  // validate (credentials) {
  //   try {
  //     const url = `${this.baseUrl}/validation/dialogflow/servicekey`
  //     const options = {
  //       method: 'POST',
  //       headers: {
  //         Authorization: 'Bearer ' + this.params.accessToken
  //       },
  //       query: {
  //         orgId: this.params.orgId
  //       },
  //       body: {
  //         serviceAccountKey: credentials,
  //         dialogFlowProjectId: credentials.project_id
  //       }
  //     }
  //     return fetch(url, options)
  //   } catch (e) {
  //     throw e
  //   }
  // }

  /**
   * Create a skill profile
   * @return {Promise} the fetch promise, which resolves to skill profile JSON
   * array when successful
   */
  create ({
    name,
    skillId,
    textValue = '',
    description = '',
    booleanValue = false,
    proficiencyValue = 0
  }) {
    try {
      const url = `${this.baseUrl}/organization/${this.params.orgId}/skill-profile`
      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.params.accessToken
        },
        body: {
          name,
          description,
          organizationId: this.params.orgId,
          activeSkills: [{
            textValue,
            booleanValue,
            skillId,
            proficiencyValue,
            organizationId: this.params.orgId
          }]
        }
      }
      // console.log(url, options)
      return fetch(url, options)
    } catch (e) {
      throw e
    }
  }

  /**
   * replace a skill profile
   * @return {Promise} the fetch promise, which resolves to fetch response body
   */
  replace (id, body) {
    const url = `${this.baseUrl}/organization/${this.params.orgId}/skill-profile/${id}`
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
   * delete a skill profile
   * @return {Promise} the fetch promise, which resolves to fetch response body
   */
  // this does not work, it is disabled on API side with inaccessible foreign-
  // key constraint
  // remove (id) {
  //   const url = `${this.baseUrl}/organization/${this.params.orgId}/skill-profile/${id}`
  //   const options = {
  //     method: 'DELETE',
  //     headers: {
  //       Authorization: 'Bearer ' + this.params.accessToken
  //     }
  //   }
  //   return fetch(url, options)
  // }
}

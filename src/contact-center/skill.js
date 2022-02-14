const fetch = require('../utils/fetch')

module.exports = class Skill {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/skill.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/skill.')
    this.params = params
    this.baseUrl = 'https://api.wxcc-us1.cisco.com'
  }

  /**
   * Gets list of skills
   * @return {Promise} the fetch promise, which resolves to skills JSON
   * array when successful
   */
  async list () {
    try {
      const url = `${this.baseUrl}/organization/${this.params.orgId}/skill`
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
   * Find skill by name
   * @return {Promise} the fetch promise, which resolves to skill JSON
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

  // /**
  //  * Gets full data for one virtual assistant
  //  * @return {Promise} the fetch promise, which resolves to virtual assistant JSON
  //  * object when successful
  //  */
  // get (id) {
  //   const url = `${this.baseUrl}/config/organization/${this.params.orgId}/botconfig/${id}`
  //   const options = {
  //     headers: {
  //       Authorization: 'Bearer ' + this.params.accessToken
  //     }
  //   }
  //   return fetch(url, options)
  // }

  // /**
  //  * Validate a Google credentials JSON file has correct permissions
  //  * @return {Promise} the fetch promise, which resolves to virtual assistants JSON
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

  // /**
  //  * Create a virtual assistant
  //  * @return {Promise} the fetch promise, which resolves to virtual assistants JSON
  //  * array when successful
  //  */
  // async create ({
  //   serviceAccountKey,
  //   name,
  //   icon = '',
  //   channels = 'chat,voice'
  // }) {
  //   try {
  //     const url = `${this.baseUrl}/config/organization/${this.params.orgId}/botconfig`
  //     const body = {
  //       type: 'dialogflowv2',
  //       name,
  //       config: {
  //         serviceAccountKey,
  //         keyName: 'cred.json',
  //         regionId: 'global',
  //         dialogFlowProjectId: serviceAccountKey.project_id
  //       },
  //       // icon: "data:image/png;base64,VBORw0KGgoAAAA...."
  //       icon,
  //       channels,
  //       contextServiceFields: {}
  //     }
  //     const options = {
  //       method: 'POST',
  //       headers: {
  //         Authorization: 'Bearer ' + this.params.accessToken
  //       },
  //       body
  //     }
  //     const response = await fetch(url, options)
  //     return response
  //   } catch (e) {
  //     throw e
  //   }
  // }

  // /**
  //  * validate icon for a virtual assistant
  //  * @return {Promise} the fetch promise, which resolves to virtual assistants JSON
  //  * array when successful
  //  */
  // async validateIcon (icon) {
  //   try {
  //     const url = `${this.baseUrl}/validateIcon`
  //     const options = {
  //       method: 'POST',
  //       headers: {
  //         Authorization: 'Bearer ' + this.params.accessToken
  //       },
  //       query: {
  //         orgId: this.params.orgId
  //       },
  //       // {icon: "data:image/png;base64,VBORw0KGgoAAAA...."}
  //       body: {icon}
  //     }
  //     const response = await fetch(url, options)
  //     return response
  //   } catch (e) {
  //     throw e
  //   }
  // }

  // /**
  //  * modify a virtual assistant
  //  * @return {Promise} the fetch promise, which resolves to fetch response body
  //  */
  // modify (id, body) {
  //   // fix body ID
  //   delete body.id
  //   body.botServicesConfigId = id
  //   // make sure region ID is set
  //   body.regionId = body.regionId || 'global'
  //   // make sure dialogflow project ID is set in the config section
  //   try {
  //     body.config.dialogFlowProjectId = body.config.serviceAccountKey.project_id || body.config.dialogFlowProjectId
  //   } catch (e) {
  //     // continue?
  //   }
  //   const url = `${this.baseUrl}/config/organization/${this.params.orgId}/botconfig/${id}`
  //   const options = {
  //     method: 'PUT',
  //     headers: {
  //       Authorization: 'Bearer ' + this.params.accessToken
  //     },
  //     body
  //   }
  //   return fetch(url, options)
  // }
}

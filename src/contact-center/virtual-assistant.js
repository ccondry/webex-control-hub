const fetch = require('../utils/fetch')

module.exports = class VirtualAssistant {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/treatment.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/treatment.')
    this.params = params
    this.baseUrl = 'https://virtual-assistant.produs1.ciscoccservice.com/virtual-assistant/v1'
  }
  /**
   * Gets list of virtual assistants
   * @return {Promise} the fetch promise, which resolves to virtual assistants JSON
   * array when successful
   */
  async list () {
    try {
      const url = `${this.baseUrl}/config/organization/${this.params.orgId}/botconfig`
      const options = {
        headers: {
          Authorization: 'Bearer ' + this.params.accessToken
        }
      }
      const response = await fetch(url, options)
      return response.items
    } catch (e) {
      throw e
    }
  }

  /**
   * Gets full data for one virtual assistant
   * @return {Promise} the fetch promise, which resolves to virtual assistant JSON
   * object when successful
   */
  get (id) {
    const url = `${this.baseUrl}/config/organization/${this.params.orgId}/botconfig/${id}`
    const options = {
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken
      }
    }
    return fetch(url, options)
  }

  /**
   * Validate a Google credentials JSON file has correct permissions
   * @return {Promise} the fetch promise, which resolves to virtual assistants JSON
   * array when successful
   */
  validate (credentials) {
    try {
      const url = `${this.baseUrl}/validation/dialogflow/servicekey`
      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.params.accessToken
        },
        query: {
          orgId: this.params.orgId
        },
        body: {
          serviceAccountKey: credentials,
          dialogFlowProjectId: credentials.project_id
        }
      }
      return fetch(url, options)
    } catch (e) {
      throw e
    }
  }

  /**
   * Create a virtual assistant
   * @return {Promise} the fetch promise, which resolves to virtual assistants JSON
   * array when successful
   */
  async create ({
    serviceAccountKey,
    name,
    icon = '',
    channels ='chat,voice'
  }) {
    try {
      const url = `${this.baseUrl}/config/organization/${this.params.orgId}/botconfig`
      const body = {
        type: 'dialogflowv2',
        name,
        config: {
          serviceAccountKey,
          keyName: 'cred.json'
        },
        // icon: "data:image/png;base64,VBORw0KGgoAAAA...."
        icon,
        channels,
        contextServiceFields: {}
      }
      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.params.accessToken
        },
        body
      }
      const response = await fetch(url, options)
      return response
    } catch (e) {
      throw e
    }
  }

  /**
   * validate icon for a virtual assistant
   * @return {Promise} the fetch promise, which resolves to virtual assistants JSON
   * array when successful
   */
  async validateIcon (icon) {
    try {
      const url = `${this.baseUrl}/validateIcon`
      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.params.accessToken
        },
        query: {
          orgId: this.params.orgId
        },
        // {icon: "data:image/png;base64,VBORw0KGgoAAAA...."}
        body: {icon}
      }
      const response = await fetch(url, options)
      return response
    } catch (e) {
      throw e
    }
  }

  /**
   * modify a virtual assistant
   * @return {Promise} the fetch promise, which resolves to fetch response body
   */
  modify (id, body) {
    // fix body ID
    delete body.id
    body.botServicesConfigId = id
    const url = `${this.baseUrl}/config/organization/${this.params.orgId}/botconfig/${id}`
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

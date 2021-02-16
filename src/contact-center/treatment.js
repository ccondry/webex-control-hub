const fetch = require('../models/fetch')

module.exports = class Treatment {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/treatment.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/treatment.')
    this.params = params
    this.baseUrl = `https://treatment.produs1.ciscoccservice.com/treatment/v1/organization/${this.params.orgId}/entrypoint`
  }

  /**
   * Gets list of email treatments
   * @return {Promise} the fetch promise, which resolves to email treatments JSON
   * array when successful
   */
  async list (entryPointId) {
    try {
      const url = `${this.baseUrl}/${entryPointId}/treatment`
      const options = {
        headers: {
          Authorization: 'Bearer ' + this.params.accessToken
        }
      }
      const response = await fetch(url, options)
      return response.treatments
    } catch (e) {
      throw e
    }
  }

  /**
   * Delete an email treatment
   * @param {String} entryPointId the email entry point ID
   * @param {String} id the treatment rule ID
   * @return {Promise} the fetch promise, which resolves to the JSON
   * response when successful
   */
  async delete ({entryPointId, id}) {
    try {
      const url = `${this.baseUrl}/${entryPointId}/treatment/${id}`
      const options = {
        method: 'DELETE',
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
   * list email treatment order 
   * @param {String} entryPointId the email entry point ID
   * @return {Promise} the fetch promise, which resolves to the JSON
   * response when successful
   */
  async listOrder (entryPointId) {
    try {
      const url = `${this.baseUrl}/${entryPointId}/treatmentOrder`
      const options = {
        headers: {
          Authorization: 'Bearer ' + this.params.accessToken
        }
      }
  
      const response = await fetch(url, options)
      return response.treatmentsOrder
    } catch (e) {
      throw e
    }
  }
  
  /**
   * modify email treatment order
   * @param {String} entryPointId the email entry point ID
   * @param {String} defaultQueue the default queue for the treatment
   * @param {Array} treatmentsOrder the treatment rule ID
   * @return {Promise} the fetch promise, which resolves to the JSON
   * response when successful
   */
  async modifyOrder ({
    entryPointId,
    defaultQueue,
    treatmentsOrder
  }) {
    const url = `${this.baseUrl}/${entryPointId}/treatmentOrder`
    const body = {
      treatmentsOrder,
      defaultQueue,
    }
    
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken
      },
      body
    }
    return fetch(url, options)
  }
}

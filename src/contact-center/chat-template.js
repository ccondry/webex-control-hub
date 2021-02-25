const fetch = require('../utils/fetch')

module.exports = class ChatTemplate {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/chat-template.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/chat-template.')
    this.params = params
    this.urlBase = `https://cmm.produs1.ciscoccservice.com/cmm/v1/organization/${this.params.orgId}/template`
  }
  
  /**
  * Gets list of chat templates
  * @return {Promise} the fetch promise, which resolves to chat templates JSON
  * array when successful
  */
  async list () {
    const url = this.urlBase
    const options = {
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken
      },
      query: {
        mediaType: 'chat'
      }
    }
    return fetch(url, options)
  }
  
  /**
  * Gets single chat template by template ID
  * @return {Promise} the fetch promise, which resolves to chat templates JSON
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
  * Deletes a chat template
  * @return {Promise} the fetch promise, which resolves to the response JSON
  * object when successful
  */
  async delete (id) {
    const url = `${this.urlBase}/${id}`
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken
      }
    }
    return fetch(url, options)
  }
  
  /**
  * Create a chat template
  * @return {Promise} the fetch promise, which resolves to the response JSON
  * object when successful
  */
  async create (body) {
    try {
      const url = this.urlBase
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
  * modify a chat template
  * @return {Promise} the fetch promise, which resolves to the response JSON
  * object when successful
  */
  async modify (id, body) {
    try {
      const url = `${this.urlBase}/${id}`
      const options = {
        method: 'PUT',
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
}
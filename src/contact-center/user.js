const fetch = require('../utils/fetch')

module.exports = class User {
  constructor (params) {
    if (!params.orgId) throw Error('orgId is a required constructor parameter for webex-control-hub/contact-center/user.')
    if (!params.accessToken) throw Error('accessToken is a required constructor parameter for webex-control-hub/contact-center/user.')
    this.params = params
    this.baseUrl = 'https://api.wxcc-us1.cisco.com'
  }

  /**
   * Gets list of users
   * @return {Promise} the fetch promise, which resolves to users JSON
   * array when successful
   */
  async list (page = 0, pageSize = 100) {
    try {
      const url = `${this.baseUrl}/organization/${this.params.orgId}/user`
      const options = {
        query: {
          page,
          pageSize
        },
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
   * Find user by name
   * @return {Promise} the fetch promise, which resolves to user JSON
   * object when successful or null if not found
   */
   async find ({id, email}) {
    try {
      let found = null
      let page = 0
      let pageSize = 100
      let atEnd = false
      // while item is not found and last page of results has not been reached
      while (!found && !atEnd) {
        // keep looking
        let list = await this.list(page, pageSize)
        console.log('found', list.length, 'users')
        // look for item in the current list
        found = list.find(item => {
          return (email && item.email === email) || (id && item.id === id)
        })
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

  /**
   * Gets full data for one user
   * @return {Promise} the fetch promise, which resolves to user JSON
   * object when successful
   */
  get (id) {
    const url = `${this.baseUrl}/organization/${this.params.orgId}/user/${id}`
    const options = {
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken
      }
    }
    return fetch(url, options)
  }

  /**
   * Create a user
   * @return {Promise} the fetch promise, which resolves to user JSON
   * array when successful
   */
  create ({
    name,
    description = ''
  }) {
    try {
      const url = `${this.baseUrl}/organization/${this.params.orgId}/user`
      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.params.accessToken
        },
        body: {
          name,
          description,
          organizationId: this.params.orgId,
        }
      }
      // console.log(url, options)
      return fetch(url, options)
    } catch (e) {
      throw e
    }
  }

  /**
   * update a user using same parameters as create
   * @return {Promise} the fetch promise, which resolves to fetch response body
   */
  async update ({
    name,
    skillId,
    textValue,
    description,
    booleanValue,
    proficiencyValue
  }, existing) {
    try {
      // find existing record if not provided
      if (!existing) {
        existing = await this.find({name})
      }
      if (!existing) {
        throw Error('cannot update user - ', name, 'does not exist')
      }
      const url = `${this.baseUrl}/organization/${this.params.orgId}/user/${existing.id}`
      if (name) existing.name = name
      if (description) existing.description = description
      const skill = existing.activeSkills[0]
      if (skillId) skill.skillId = skillId
      if (textValue) skill.textValue = textValue
      if (booleanValue) skill.booleanValue = booleanValue
      if (proficiencyValue) skill.proficiencyValue = proficiencyValue
      const options = {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + this.params.accessToken
        },
        body: existing
      }
      return fetch(url, options)
    } catch (e) {
      throw e
    }
  }

  /**
   * replace a user
   * @return {Promise} the fetch promise, which resolves to fetch response body
   */
  replace (body) {
    const url = `${this.baseUrl}/organization/${this.params.orgId}/user/${body.id}`
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
   * patch a user
   * @return {Promise} the fetch promise, which resolves to fetch response body
   */
  patch (body) {
    const url = `${this.baseUrl}/organization/${this.params.orgId}/user/${body.id}`
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + this.params.accessToken,
        'Content-Type': 'application/merge-patch+json'
      },
      body
    }
    return fetch(url, options)
  }

  /**
   * delete a user
   * @return {Promise} the fetch promise, which resolves to fetch response body
   */
  // this does not work, it is disabled on API side with inaccessible foreign-
  // key constraint
  // remove (id) {
  //   const url = `${this.baseUrl}/organization/${this.params.orgId}/user/${id}`
  //   const options = {
  //     method: 'DELETE',
  //     headers: {
  //       Authorization: 'Bearer ' + this.params.accessToken
  //     }
  //   }
  //   return fetch(url, options)
  // }
}

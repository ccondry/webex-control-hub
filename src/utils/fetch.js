const fetch = require('node-fetch')

// helper function to append query parameters to a URL for fetch
function addUrlQueryParams (endpoint, params) {
  let url = endpoint
  if (typeof params === 'object') {
    // append URL query paramenters
    const keys = Object.keys(params)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const value = params[key]
      if (i === 0) {
        url += '?'
      } else {
        url += '&'
      }
      url += encodeURIComponent(key) + '=' + encodeURIComponent(value)
    }
  }
  return url
}

module.exports = async function (url, options = {}) {
  if (!url) {
    throw Error('url is a required parameter for fetch')
  }
  
  if (options.body) {
    // set content type to JSON by default
    options.headers = options.headers || {}
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json'
    // stringify JSON body if it's not a string already
    if (typeof options.body === 'object' && options.headers['Content-Type'] === 'application/json') {
      options.body = JSON.stringify(options.body)
    }
  }
  
  try {
    // add query parameters to URL
    let completeUrl = url
    if (options.query) {
      completeUrl = addUrlQueryParams(url, options.query)
    }
    const response = await fetch(completeUrl, options)
    const text = await response.text()
    if (response.ok) {
      // HTTP status 200 - 299
      try {
        // try to return JSON
        const json = JSON.parse(text)
        return json
      } catch (e) {
        // return raw text when JSON parsing fails
        return text
      }
    } else {
      // HTTP status not 200 - 299
      let message = text || ''
      try {
        const json = JSON.parse(text)
        // message = json.message
        message = json.error_description || json.error || ''
        if (typeof message === 'object') {
          message = message.message[0].description
        }
      } catch (e) {
        // continue
        // console.log(e)
      }
      const error = Error(`${response.status} ${response.statusText} - ${message}`)
      error.status = response.status
      error.statusText = response.statusText
      error.text = message
      error.response = response
      throw error
    }
  } catch (e) {
    // just rethrow any other errors, like connection timeouts
    throw e
  }
}

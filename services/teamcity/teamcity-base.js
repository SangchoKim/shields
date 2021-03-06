'use strict'

const { BaseJsonService } = require('..')

module.exports = class TeamCityBase extends BaseJsonService {
  static get auth() {
    return { userKey: 'teamcity_user', passKey: 'teamcity_pass' }
  }

  async fetch({ url, schema, qs = {}, errorMessages = {} }) {
    // JetBrains API Auth Docs: https://confluence.jetbrains.com/display/TCD18/REST+API#RESTAPI-RESTAuthentication
    const options = { qs }
    const auth = this.authHelper.basicAuth
    if (auth) {
      options.auth = auth
    } else {
      qs.guest = 1
    }

    return this._requestJson({
      url,
      schema,
      options,
      errorMessages: { 404: 'build not found', ...errorMessages },
    })
  }
}

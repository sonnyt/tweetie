'use strict';

/**
 * Tweetie API
 */

const Twitter = require('twitter');
const crypto = require('crypto');
const config = require('./config');

module.exports = class Tweetie {
  constructor() {
    this.connection = new Twitter(config);
  }

  urlPath(type = 'timeline') {
    switch (type) {
      case 'timeline':
        return '/statuses/user_timeline';

      case 'list':
        return '/lists/statuses';

      case 'search':
      case 'hashtag':
        return '/search/tweets';

      default:
        return type;
    }
  }

  fetch(type, params = {}) {
    const url = this.urlPath(type);

    return new Promise((resolve, reject) => {
      this.connection.get(url, params, (err, response) => {
        if (err) {
          return reject(err);
        }

        resolve(response.statuses ? response.statuses : response);
      });
    })
  }
}

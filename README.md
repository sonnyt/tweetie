Tweetie [![Build Status](https://travis-ci.org/sonnyt/tweetie.svg?branch=master)](https://travis-ci.org/sonnyt/tweetie)
=======

jQuery Tweetie - Simple Twitter Feed Plugin that works with new Twitter API.

# Install

Download the lastest version of [jQuery Tweetie](https://github.com/sonnyt/tweetie/releases/latest).

In order to successfully use jQuery Tweetie, you have to have server-side/backend API. We provide very simple PHP code that you can easily setup and get going.

# Use
Initlize just like any other plugin.

```js
$('.tweets').tweetie();
```

## Fetching Tweets

With Tweetie you can easily fetch tweets via hashtags, search terms, username and lists.

- `timeline` fetch user tweets.
- `list` fetch tweets from specific list.
- `search` search for tweets by keyword.
- `hashtag` fetch tweets by hashtag.

## Options

Tweetie uses the exact same options as the Twitter API.

- [Timeline](https://dev.twitter.com/rest/reference/get/statuses/user_timeline)
- [List](https://dev.twitter.com/rest/reference/get/lists/statuses)
- [Search/Hashtag](https://dev.twitter.com/rest/reference/get/search/tweets)

## Templating

Tweetie uses curly brace templating syntax. You can access any tweet propery using the `{{}}` double curly brase. Every link, @username and #hashtag is automatically hyper-linked.

**Example**

```handlebars
{{text}} tweeted by {{user.screen_name}}
```

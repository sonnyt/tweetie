Tweetie [![Build Status](https://travis-ci.org/sonnyt/tweetie.svg?branch=master)](https://travis-ci.org/sonnyt/tweetie)
=======

jQuery Tweetie - Simple Twitter Feed Plugin that works with new Twitter API.

# Install

Download the lastest version of [jQuery Tweetie](https://github.com/sonnyt/tweetie/releases/latest).

In order to successfully use jQuery Tweetie, you have to have server-side/backend API. The plugin comes with very simple PHP backend that you can easily setup and get going.

# Use
Initialize just like any other plugin.

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

Tweetie uses curly brace templating syntax. You can access any tweet properties using the `{{}}` double curly brase. For your convinece every `link`, `@username` and `#hashtag` in the tweet body is automatically hyper-linked.

**Example**

```handlebars
{{tweet.text}} tweeted by {{tweet.user.screen_name}} at {{tweet.created_at}}
```

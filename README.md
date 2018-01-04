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

# Settings

Property | Type | Description
--- | --- | ---
url | String | ***Required.*** API URL.
type | String | ***Required.*** Fetch tweets via hashtags, search terms, username and lists. Available options [timeline](https://dev.twitter.com/rest/reference/get/statuses/user_timeline), [list](https://dev.twitter.com/rest/reference/get/lists/statuses), [search](https://dev.twitter.com/rest/reference/get/search/tweets) and [hashtag](https://dev.twitter.com/rest/reference/get/search/tweets).
template | String | ***Required.*** Template for each individual tweet. Learn more [here](#templating).
params | Object | ***Required.*** Parameters required to fetch collection of relevant tweets matching a specified query.  Only [timeline](https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline), [list](https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-statuses) and [search/hashtag](https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-home_timeline.html) params are accepted.
dateFormat | String | Formating for `created_at` attribute. Learn more [here](#date-format).

## Templating

Tweetie uses curly brace templating syntax. You can access any tweet properties using the `{{}}` double curly brase. For your convinece every `link`, `@username` and `#hashtag` in the tweet body is automatically hyper-linked.

**Example**

```handlebars
{{tweet.text}} tweeted by {{tweet.user.screen_name}} at {{tweet.created_at}}
```

## Date Format
Format | Example | Description
--- | --- | ---
`%d` | `1..31` | Day of month
`%m` | `1..12` |	Month number
`%B` | `January..December` | Month name
`%b` | `Jan..Dec`| Month name abbreviated
`%Y` | `2018` | 4 digit year
`%y` | `18` | 2 digit year

Date format automatically applies to `created_at` template attribute.

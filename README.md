Tweetie
=======

jQuery Tweetie - Simple Twitter Feed Plugin that works with new Twitter 1.1 API.

#Features

- Easly template tweets using mustache-like `{{date}}` syntax
- Format tweet timestamp using Linux/Unix `%d/%m/%Y` time formatting syntax
- Set tweet count
- Hide replies and only show your own tweets
- Fetch tweets from a list.

[Demo](http://sonnyt.com/Tweetie)

#Usage
New Twitter API requires oAuth Token Key, so it's three step process.

## Step 1

First, you need a consumer key and secret keys. Get one from [dev.twitter.com/apps](https://dev.twitter.com/apps).

## Step 2

Edit `api/config.php` file and replace variables with your Consumer and oAuth Keys.

```PHP
    // Consumer Key
    define('CONSUMER_KEY', 'CONSUMER_KEY_HERE');
    define('CONSUMER_SECRET', 'CONSUMER_SECRET_HERE');

    // User Access Token
    define('ACCESS_TOKEN', 'ACCESS_TOKEN_HERE');
    define('ACCESS_SECRET', 'ACCESS_SECRET_HERE');
```

## Step 3

Initlize just like any other plugin.

```JS
$('.tweet').twittie();
```

#Options

Option | Default | Description
--- | --- | ---
username | null | Option to load tweets from another account or list owner's username.
list | null | List name to load tweets from. If you define list name you also must define the username of the list owner in the `username` option.
hashtag | null | Option to load tweets with a specific hashtag.
count | `10` | Number of tweets you want to display.
hideReplies | `false` | Set `true` if you want to hide "@" replies as well. Or leave it `false` to just to show your tweets and no replies.
dateFormat | `%b/%d/%Y` | Your date forma, refernce [this](#date-format) table for available formats.
template | `{{date}} - {{tweet}}` | Format how you want to show your tweets. Feel free to add HTML, see [this](#templating) table for more refrence.
apiPath | `/api/tweet.php` | Path to your `tweet.php` file.

If you want to fetch tweets from specific Twitter list, you must define the list name in the `list` option and `username` of the list owner.

## Callback

It's very easy to add `callback` function, for example:

```JS
$('.tweet').twittie(function() {
	alert('loaded!');
});
```

If you have options defined, than callback function is placed as a second parameter, for example:

```JS
$('.tweet').twittie({
	'count': 1,
	'hideReplies': true
}, function() {
	alert('loaded!');
});
```


## Templating

For now only two templating variables are available, more coming soon. You add as much as HTML elementes as you would like.

Template | Description
--- | ---
`{{tweet}}` | Tweet content
`{{date}}` | Formatted tweet date
`{{avatar}}` | User's Avatar Image
`{{url}}` | Direct URL to the tweet
`{{retweeted}}` | Returns `true` or `false` if tweet is retweeted
`{{screen_name}}` | Username of person who posted the tweet

## Date Format
Format | Description
--- | ---
`%d` | Date, 1,2,3...
`%m` | Month number 1,2,3...
`%b` | Abbreviated month Jan, Feb, Mar...
`%B` | Full month January, February, March...
`%y` | Last two digits of year, 11,12,13...
`%Y` | Full year 2011, 2012, 2013...

So, the default `%b/%d/%Y` would output as `Feb/22/2013`

Tweetie
=======

jQuery Tweetie - Simple Twitter Feed Plugin.

#Features

- Easly template tweets using mustache-like `{{date}}` syntax
- Format tweet timestamp using Linux/Unix `%d/%m/%Y` time formatting syntax
- Set tweet count
- Hide replies and only show your own tweets

#Usage
Initlize just like any other plugin.

```JS
$('.tweet').twittie({ username: 'sonnyt' });
```

#Options

Option | Default | Description
--- | --- | ---
username | null | Your Twitter username
count | `10` | Number of tweets you want to display.
hideReplies | `false` | Set `true` if you want to show "@" replies as well. Or leave it `false` to just to show your tweets and no replies.
dateFormat | `%b/%d/%Y` | Your date forma, refernce [this](#date-format) table for available formats.
template | `{{date}} - {{tweet}}` | Format how you want to show your tweets. Feel free to add HTML, see [this](#templating) table for more refrence.

## Templating

For now only two templating variables are available, more coming soon. You add as much as HTML elementes as you would like.

Template | Description
--- | ---
`{{tweet}}` | Tweet content
`{{date}}` | Formatted tweet date

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

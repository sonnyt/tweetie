/**
 * Tweetie: A simple Twitter feed plugin
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 */

(function ($) {

    $.fn.twittie = function (options) {
        // Default settings
        var settings = $.extend({
            'username': null,
            'count': 10,
            'hideReplies': false,
            'dateFormat': '%b/%d/%Y',
            'template': '{{date}} - {{tweet}}'
        }, options);

        // Check if username is set
        if (!settings.username) {
            $.error('Username is not defined.');
        }

        /**
         * Applies @reply, #hash and http links
         * @param  {String} tweet A single tweet
         * @return {String}       Fixed tweet
         */
        var linking = function (tweet) {
            var parts = tweet.split(' ');
            var twit = '';

            for (var i = 0, len = parts.length; i < len; i++) {
                var text = parts[i];
                var link = "https://twitter.com/#!/";

                // Fix hashtag links
                if (text.indexOf('#') !== -1) {
                    text = '<a href="' + link + 'search/' + text.replace("#", "%23") + '" target="_blank">' + text + '</a>';
                }

                // Fix reply links
                if (text.indexOf('@') !== -1) {
                    text = '<a href="' + link + text.replace("@", "").replace(")", "") + '" target="_blank">' + text + '</a>';
                }

                // Fix regular http links
                if (text.indexOf('http://') !== -1) {
                    text = '<a href="' + text + '" target="_blank">' + text + '</a>';
                }

                twit += text + ' ';
            }

            return twit;
        };

        /**
         * Formating a date
         * @param  {String} twt_date Twitter date
         * @return {String}          Formatted date
         */
        var dating = function (twt_date) {
            twt_date = new Date(twt_date);

            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            var _date = {
                '%d': twt_date.getDate(),
                '%m': twt_date.getMonth(),
                '%b': months[twt_date.getMonth()].substr(0, 3),
                '%B': months[twt_date.getMonth()],
                '%y': String(twt_date.getFullYear()).slice(-2),
                '%Y': twt_date.getFullYear()
            };

            var date = settings.dateFormat;
            var format = settings.dateFormat.match(/%[dmbByY]/g);

            for (var i = 0, len = format.length; i < len; i++) {
                date = date.replace(format[i], _date[format[i]]);
            }

            return date;
        };

        /**
         * Templating a tweet using '{{ }}' braces
         * @param  {Object} data Tweet details are passed
         * @return {String}      Templated string
         */
        var templating = function (data) {
            var temp = settings.template;
            var temp_variables = ['date', 'tweet'];

            for (var i = 0, len = temp_variables.length; i < len; i++) {
                temp = temp.replace(new RegExp('{{' + temp_variables[i] + '}}', 'gi'), data[temp_variables[i]]);
            }

            return temp;
        };

        // Set loading
        this.html('<span>Loading...</span>');

        var url = 'https://api.twitter.com/1/statuses/user_timeline.json?callback=?';
        var that = this;

        // Fetch tweets
        $.getJSON(url, { screen_name: settings.username }, function (twt) {
            that.find('span').fadeOut('fast', function () {
                that.html('<ul></ul>');

                // If 'hideReplies' is set than filter the result
                if (settings.hideReplies) {
                    twt = twt.filter(function (tweet) { return tweet.in_reply_to_screen_name === null; });
                }

                for (var i = 0; i < settings.count; i++) {
                    if (twt[i]) {
                        var temp_data = {
                            date: dating(twt[i].created_at),
                            tweet: linking(twt[i].text)
                        };

                        that.find('ul').append('<li>' + templating(temp_data) + '</li>');
                    } else {
                        break;
                    }
                }
            });
        });
    };

})(jQuery);
/**
 * Tweetie: A simple Twitter feed plugin
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 */

(function ($) {

    $.fn.twittie = function (options) {
        // Default settings
        var settings = $.extend({
            'count': 10,
            'hideReplies': false,
            'dateFormat': '%b/%d/%Y',
            'template': '{{date}} - {{tweet}}'
        }, options);

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
                    text = '<a href="' + link + 'search/' + text.replace('#', '%23').replace(/[^A-Za-z0-9]/, '') + '" target="_blank">' + text + '</a>';
                }

                // Fix reply links
                if (text.indexOf('@') !== -1) {
                    text = '<a href="' + link + text.replace('@', '').replace(/[^A-Za-z0-9]/, '') + '" target="_blank">' + text + '</a>';
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
            // fix for IE
            var time = twt_date.split(' ');
            twt_date = new Date(Date.parse(time[1] + ' ' + time[2] + ', ' + time[5] + ' ' + time[3] + ' UTC'));

            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            var _date = {
                '%d': twt_date.getDate(),
                '%m': twt_date.getMonth()+1,
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
            var temp_variables = ['date', 'tweet', 'avatar'];

            for (var i = 0, len = temp_variables.length; i < len; i++) {
                temp = temp.replace(new RegExp('{{' + temp_variables[i] + '}}', 'gi'), data[temp_variables[i]]);
            }

            return temp;
        };

        // Set loading
        this.html('<span>Loading...</span>');

        var that = this;

        // Fetch tweets
        $.getJSON('api/tweet.php', { count: settings.count, exclude_replies: settings.hideReplies }, function (twt) {
            that.find('span').fadeOut('fast', function () {
                that.html('<ul></ul>');

                for (var i = 0; i < settings.count; i++) {
                    if (twt[i]) {
                        var temp_data = {
                            date: dating(twt[i].created_at),
                            tweet: linking(twt[i].text),
                            avatar: '<img src="'+ twt[i].user.profile_image_url +'" />'
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
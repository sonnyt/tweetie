import render from './utils/template';

(function($) {
  'use strict';

  $.fn.tweetie = function(options, callback) {
    const settings = Object.assign({
      url: 'api/tweet.php',

      type: 'timeline',
      params: {},

      template: '{{tweet.created_at}} - {{tweet.text}}',
      dateFormat: '%m/%d/%Y'
    }, options);

    $.get(settings.url, {
      type: settings.type,
      params: settings.params
    }).done((response) => {
      const { template, dateFormat } = settings;

      this.empty();

      response.forEach((data) => {
        const tweet = render(data, template, dateFormat);
        this.append(tweet);
      });

      if (typeof callback === 'function') callback(null, response);
    }).fail((err) => {
      $.error(err);
      if (typeof callback === 'function') callback(err);
    });
  };
}(jQuery));

import render from './utils/template';

(function($) {
  'use strict';

  $.fn.tweetie = function(options, callback) {
    const settings = Object.assign({
      apiPath: 'api/tweet.php',

      type: 'timeline',
      params: {},

      template: '{{tweet.created_at}} - {{tweet.text}}',
      dateFormat: '%b/%d/%Y'
    }, options);

    $.get(settings.apiPath, {
      type: settings.type,
      params: settings.params
    }).done((response) => {
      const { template, dateFormat } = settings;

      this.empty();

      response.forEach((data) => {
        const tweet = render(data, template, dateFormat);
        this.append(tweet);
      });

      if (typeof callback === 'function') callback();
    }).fail((e) => {
      const { errors } = e.responseJSON;
      
      if (errors) {
        errors.forEach((err) => $.error(err.message));
      }
    });
  };
}(jQuery));

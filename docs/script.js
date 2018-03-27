(function() {
  function cleanObject(obj) {
    var dirty = {};

    Object.keys(obj).forEach((k) => {
      if (obj[k] !== null && obj[k]) {
        if (obj[k] !== null && typeof obj[k] === 'object') {
          dirty[k] = cleanObject(obj[k]);
        } else if (obj[k]) {
          dirty[k] = obj[k];
        }
      }
    });

    return dirty;
  }

  new Vue({
    el: '#container',
    data: {
      options: {
        url: 'http://files.sonnyt.com/tweetie/v3/',
        type: 'timeline',
        template: '<li>{{tweet.created_at}} - {{tweet.text}}</li>',
        dateFormat: '%b %d, %Y',
        params: {
          count: 15,
          screen_name: null,
          list_id: null,
          slug: null,
          q: null,
          exclude_replies: false,
          include_rts: false
        }
      }
    },

    /**
     * Computed Properties
     */
    computed: {
      filteredOptions: function() {
        return cleanObject(this.options);
      },
      optionsString: function() {
        return JSON.stringify(this.filteredOptions, undefined, 2);
      }
    },

    /**
     * Components
     */
    components: {
      controls: {
        template: '#controls-template',
        props: {
          options: Object
        }
      },

      preview: {
        template: '#preview-template',
        props: {
          options: Object
        },
        mounted: function() {
          $('#tweetie').tweetie(this.options);
        },
        watch: {
          options: function() {
            $('#tweetie').tweetie(this.options);
          }
        }
      },

      export: {
        template: '#export-template',
        props: {
          options: String
        }
      }
    }
  });
}());

<?php
/**
 * Tweetie API
 */

require_once('config.php');
require_once('twitteroauth/twitteroauth.php');

class Tweetie {
  private $connection;

  function __construct()
  {
    $this->connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET);
    $this->cache_path = dirname(__FILE__).'/cache/';
  }

  private function url_path($type = 'timeline')
  {
    switch ($type) {
      case 'timeline':
        return '/statuses/user_timeline';

      case 'list':
        return '/lists/statuses';

      case 'search':
      case 'hashtag':
        return '/search/tweets';

      default:
        return $type;
    }
  }

  public function fetch($type = 'timeline', $params = [])
  {
    $this->cache_key = md5(var_export($params, true) . md5(dirname(__FILE__)));
    $tweets = array();

    if (CACHE_ENABLED) {
      $tweets = $this->get_cache();
    }

    if (!$tweets) {
      $tweets = $this->request($type, $params);

      if (CACHE_ENABLED) {
        $this->set_cache($tweets);
      }
    }

    return $tweets;
  }

  public function request($type, $params = [])
  {
    $url = $this->url_path($type);
    $response = $this->connection->get($url, $params);

    http_response_code($this->connection->http_code);

    return json_encode( isset($response->statuses) ? $response->statuses : $response );
  }

  private function get_cache()
  {
    foreach (glob($this->cache_path . '*') as $file) {
      if (filemtime($file) < time() - CACHE_LIFETIME) {
        unlink($file);
      }
    }

    if (file_exists($this->cache_path . $this->cache_key)) {
      return file_get_contents($this->cache_path . $this->cache_key);
    }
  }

  private function set_cache($tweets)
  {
    file_put_contents($this->cache_path . $this->cache_key, $tweets);
  }
}

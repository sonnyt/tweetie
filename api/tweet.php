<?php
    require_once("twitteroauth/twitteroauth.php"); // Path to twitteroauth library
    require_once('config.php'); // Path to config file

    // Check if keys are in place
    if (CONSUMER_KEY === '' || CONSUMER_SECRET === '' || CONSUMER_KEY === 'CONSUMER_KEY_HERE' || CONSUMER_SECRET === 'CONSUMER_SECRET_HERE') {
        echo 'You need a consumer key and secret keys. Get one from <a href="https://dev.twitter.com/apps">dev.twitter.com/apps</a>';
      
        exit;
    }

    // If count of tweets is not fall back to default setting
    $number = $_GET['count'];
    $exclude_replies = $_GET['exclude_replies'];
    
    /**
     * Gets connection with user Twitter account
     * @param  String $cons_key     Consumer Key
     * @param  String $cons_secret  Consumer Secret Key
     * @param  String $oauth_token  Access Token
     * @param  String $oauth_secret Access Secrete Token
     * @return Object               Twitter Session
     */
    function getConnectionWithToken($cons_key, $cons_secret, $oauth_token, $oauth_secret) {
      $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_secret);
      
      return $connection;
    }
    
    // Connect
    $connection = getConnectionWithToken(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET);
    
    // Get Tweets
    $tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?count=".$number."&exclude_replies=".$exclude_replies);

    // Return JSON Object
    header('Content-Type: application/json');

    echo json_encode($tweets);
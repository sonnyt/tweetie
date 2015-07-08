<?php

/**
 * Your Twitter App Info
 */

require("../config.php");

// CONSUMER KEY
define('CONSUMER_KEY', $themeConfig['TWITTER']['CONSUMER_KEY']);
define('CONSUMER_SECRET', $themeConfig['TWITTER']['CONSUMER_SECRET']);

// USER ACCESS TOKEN 
define('ACCESS_TOKEN', $themeConfig['TWITTER']['ACCESS_TOKEN']);
define('ACCESS_SECRET', $themeConfig['TWITTER']['ACCESS_SECRET']);

// CACHE SETTINGS
define('CACHE_ENABLED', false);
define('CACHE_LIFETIME', 3600); // in seconds
define('HASH_SALT', md5(dirname(__FILE__)));
<?php

require_once('tweetie.php');

$api = new Tweetie();
$tweets = $api->fetch($_GET['type'], $_GET['params']);

header('Content-Type: application/json');

exit($tweets);

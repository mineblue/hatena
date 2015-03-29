<?php

require_once($_SERVER["DOCUMENT_ROOT"] . '/lib/scraping.php');

$url = $_GET['url']; // url

echo scraping::getComment($url);
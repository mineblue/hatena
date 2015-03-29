<?php

require_once($_SERVER["DOCUMENT_ROOT"] . '/lib/scraping.php');

$p = $_GET['p']; // ページ 0 ~ 
$t = $_GET['t']; // 人気/新着 hotentry/newentry
$c = $_GET['c']; // カテゴリ 

echo scraping::getEntry($p, $t, $c);
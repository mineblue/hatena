<?php

require_once($_SERVER["DOCUMENT_ROOT"] . '/lib/scraping.php');

$p = $_GET['p']; // ページ 0 ~ 
$t = $_GET['tar']; // タグ/キーワード
$q = $_GET['q']; // クエリ

echo scraping::getSearchResult($q, $p, $t);
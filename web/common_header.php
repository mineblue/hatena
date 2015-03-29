<?php
ini_set('display_errors', 'On');

require_once($_SERVER["DOCUMENT_ROOT"] . '/lib/scraping.php');

if (isset($_GET['init'])) {
	header('Location: /hotentry/' . $_GET['init']);
	exit(0);
}

$isapp = false;
foreach (getallheaders() as $key => $value) {
    if ($key === "httpclientname") {
    	$isapp = true;
    }
}

//if ($_SERVER["HTTP_HOST"] !== 'dev.hatena.mineblue.com' && !$isapp) exit(0);

$c = $_GET['c']; // カテゴリ 
$q = empty($_GET['q']) ? '' : $_GET['q']; // クエリ
$p = $_GET['p']; // ページ 
$t = $_GET['t']; // タイプ タグ/キーワード
$tar = !isset($_GET['tar']) ? 'tag' : $_GET['tar'];


if (isset($c)) {
	setcookie('last_category', $c, time()+(3600*24*30));
} 
$hed = scraping::getCurrentCategory($c);




?>
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>Hatena</title>
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
	
	<link rel="stylesheet" href="/aseets/css/mui.min.css?ver=<?php echo date("ymdHis"); ?>" type="text/css" media="all" />
	<link rel="stylesheet" href="/aseets/css/gico.css?ver=<?php echo date("ymdHis"); ?>" type="text/css" media="all" />
	<link rel="stylesheet" href="/aseets/css/jquery.mobile-1.4.5.min.css" type="text/css" media="all" />
	<meta name="apple-mobile-web-app-capable" content="yes">
	<link rel="stylesheet" href="/aseets/css/animate.min.css">
	<style>
	</style>
</head>
<body>
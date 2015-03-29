<?php
require_once($_SERVER["DOCUMENT_ROOT"] . '/lib/phpQuery-onefile.php');

class scraping {
	const BASEURL = 'http://b.hatena.ne.jp';

	public static function getEntry($p, $t, $c) {
		if (empty($c)) {
			$c = '';
		} else {
			$c = '/' . $c;
		}
		if (empty($t)) {
			$t = 'hotentry';
		} 

		$html = '';

		if ($t === 'hotentry') {
			if ($p === '' || $p == 0) {
				$pg = '';
			} else if (is_numeric($p)) {
				$pg = '/' . date("Ymd",strtotime("-$p day"));
			} else {
				return;
			}
			$url = self::BASEURL . '/hotentry' . $c . $pg;
			echo $url . "\n";
			$html = file_get_contents($url);
		} else if ($t === 'newentry') {
			if ($p === '' || $p === 0) {
				$pg = '';
			} else if (is_numeric($p)) {
				$pg = '&of=' . ($p * 20);
			} else {
				return;
			}
			$url = self::BASEURL . '/entrylist' . $c . '?sort=hot' . $pg;
			echo $url . "\n";
			$html = file_get_contents($url);
		}
		//echo $html;
		$doc = phpQuery::newDocument($html);
		$html = $doc['.box-wrap.mix.box2.top']->html();
		return str_replace('あとで読む機能', '', $html);
	}

	public static function getSearchResult($q, $p, $t) {
		$html = '';
		if (empty($q)) {
			return $html;
		}
		if ($p === '' || $p === 0) {
			$pg = '';
		} else if (is_numeric($p)) {
			$pg = '&of=' . ($p * 40);
		} else {
			return $html;
		}
		if (empty($t)) {
			return $html;
		} else if ($t === "body") {
			$t = "text";
		}
		$url = self::BASEURL . '/search/' . $t . '?q=' . urlencode($q) . $pg;

		$html = file_get_contents($url);
		$doc = phpQuery::newDocument($html);
		return $doc['#search-result-lists']->html();
	}

	public static function getCategory() {
		$html = file_get_contents($_SERVER["DOCUMENT_ROOT"] . '/api/category.html');
		$doc = phpQuery::newDocument($html);
		return $html = $doc['#navi-category']->html();
	}

	public static function getCurrentCategory($c) {
		$ary = array(
			"none" => "総合",
			"general" => "一般",
			"social" => "世の中",
			"economics" => "政治と経済",
			"life" => "暮らし",
			"knowledge" => "学び",
			"it" => "テクノロジー",
			"fun" => "おもしろ",
			"entertainment" => "エンタメ",
			"game" => "アニメとゲーム",
			"video" => "動画",
			"picture" => "画像"
		);
		if (empty($c)) {
			return $ary['none'];
		} else {
			return $ary[$c];
		}
	}

	public static function getComment($url) {
		$url = self::BASEURL . $url;
		$html = file_get_contents($url);
		//echo $url;
		$doc = phpQuery::newDocument($html);
		return $doc['#new-bookmarks']->html();
	}
}
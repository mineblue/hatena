<?php require_once($_SERVER["DOCUMENT_ROOT"] . '/common_header.php'); ?>

<style>
body {
	margin-top: 64px;
}
</style>

<!-- original html contents -->
<div class="original_contents">
<div id="org_content">
	<?php echo scraping::getSearchResult($q, 0, $tar); ?>
</div>
<div id="org_category">
	<?php echo scraping::getCategory(); ?>
</div>
</div>


<!-- wrapper -->
<div class="wrapper">
	<!-- header -->
	<div id="header" class="mui-appbar" style="height: 54px;">
		<!--
		<div id="search_view"><img src="/aseets/img/search_white.png" style="width:48px;padding:8px;"></div>
		<span id="open-sb">　</span>
		<div class="hbody">　
		
		</div>
	-->

		<div style="width: 100%;margin-top:10px;">
			<form id="search" action="/search/<?php echo $tar; ?>" method="GET" class="sfrom">
				<select id="starget" class="myselect">
					<option value="tag" <?php echo $tar === 'tag' ? 'selected' : ''; ?>>タグ</option>
					<option value="title" <?php echo $tar === 'title' ? 'selected' : ''; ?>>タイトル</option>
					<option value="body" <?php echo $tar === 'body' ? 'selected' : ''; ?>>本文</option>
				</select>
	            <input name="q" type="text" placeholder="Search..." value="<?php echo $q; ?>">
	            <img src="/aseets/img/search.png" alt="">
                <button type="submit">検索</button>
            </form>
		</div>
	</div>


	<!-- content -->
	<div id="content" class="flipsnap" style="">
		<div class="adbox">
			<p>AD</p>
			<div class="top_bnr">
				
				<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
				<!-- top_bnr -->
				<ins class="adsbygoogle"
				     style="display:inline-block;width:320px;height:100px"
				     data-ad-client="ca-pub-9984222340301796"
				     data-ad-slot="4833187667"></ins>
				<script>
				(adsbygoogle = window.adsbygoogle || []).push({});
				</script>
			</div>
		</div>
	</div>

</div>

<?php require_once($_SERVER["DOCUMENT_ROOT"] . '/common.php'); ?>

<script>
$(function() {
    view.initialObject();
	view.render();
	if ( $("article").length > 0 ) {
		$(window).scroll(function(){
			scrollHeight = $(document).height();
			scrollPosition = $(window).height() + $(window).scrollTop();
			if ( (scrollHeight - scrollPosition) / scrollHeight <= 0.25 && !loading) {
				loading = !loading;
				load++;
				var today = new Date();//今日
				var xday = new Date();//x日前
				xday.setDate(today.getDate() - load );//たった１行
				$.get('/api/search/tag?q=<?php echo $q; ?>&p=' + load + '', function(data){
					$("#org_content").html(data);
		    		view.initialObject();
					view.render();
				});
			}
		});
	} else {
		$("#content").html("<p style='font-weight: bold; margin: 10px; font-size: 14pt;'>表示するコンテンツがありません</p>").show();
	}

	searchshow = true;
});

</script>
</body>
</html>
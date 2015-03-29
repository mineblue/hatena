<section class="sidebar" style="background-color: #333;">
    <!--content-->
</section>

<div id="commentModal">
    <div class="modal-content">
		<h3 id="comment-title"></h3>
		<div id="comment-body"></div>
    </div>
    <div id="close-animatedModal"> 
        <img src="/aseets/img/closebt.svg" alt="">
    </div>
</div>

<!-- template -->
<script id="art_tmp_1" type="text/template">
<article id="e{{id}}" data-id="{{id}}">
	<a class="artlnk" href="{{href}}" target="_blank">　
		<span class="userlabel"><strong>{{users}}</strong> users</span>
		<?php echo $isapp ? '<span class="share" data-href="{{share}}"><img src="/aseets/img/share.png"></span>' : ''; ?>
		<div class="article_body" data-href="" data-label="false">
			<img class="article_img" src="{{img}}" alt="">
			<div class="main">
				 <strong>{{title}}</strong>
			</div>
			<div class="source">
				<img src="{{favicon}}" alt=""> {{domain}}
			</div>
		</div>
	</a>
	{{tags}}
	<button id="open_{{id}}" class="mui-btn mui-btn-default mui-btn-flat cmtload" href="#commentModal" data-id="{{id}}" data-href="{{comment_url}}" data-title="{{title}}">
		コメント
	</button>
    {{script}}
$("#open_{{id}}").animatedModal({
    modalTarget:'commentModal'
});
    {{/script}}
</article>
</script>
<script id="art_tmp_2" type="text/template">
<article id="e{{id}}" data-id="{{id}}">
	<a class="artlnk" href="{{href}}" target="_blank">　
		<span class="userlabel"><strong>{{users}}</strong> users</span>
		<?php echo $isapp ? '<span class="share" data-href="{{share}}"><img src="/aseets/img/share.png"></span>' : ''; ?>
		<div class="article_body" data-href="" data-label="false">
			<div class="main">
				 <p><strong>{{title}}</strong></p>
				 <p>{{desc}}</p>
			</div>
			<div class="source">
				<img src="{{favicon}}" alt=""> {{domain}}
			</div>
		</div>
	</a>
	{{tags}}
	<button id="open_{{id}}" class="mui-btn mui-btn-default mui-btn-flat cmtload" href="#commentModal" data-id="{{id}}" data-href="{{comment_url}}" data-title="{{title}}">
		コメント
	</button>
    {{script}}
$("#open_{{id}}").animatedModal({
    modalTarget:'commentModal'
});
    {{/script}}
</article>
</script>


<!-- loading -->
<div id="load">
	<img src="/aseets/img/loader.gif" alt="">
</div>



<script src="/aseets/js/jquery-1.11.2.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="/aseets/js/jquery.simplesidebar.js"></script>
<script src="/aseets/js/app.js?ver=<?php echo date("ymdHis"); ?>"></script>
<script src="/aseets/js/animatedModal.min.js?ver=<?php echo date("ymdHis"); ?>"></script>
<script src="/aseets/js/mui.min.js?ver=<?php echo date("ymdHis"); ?>"></script>


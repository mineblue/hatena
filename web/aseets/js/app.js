var articles = [];
var loading = true;
var load = 0;
var canmoreload = true;
var view = {};
var ad = {};
var userAgent = window.navigator.userAgent.toLowerCase();
var searchshow = false;
$c = $("#org_content");
ad.top_lrec = '<div class="adbox">' +
				'<p class="isad">AD</p>'+
				'<div class="lrec">'+
				'<script async src="http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><!-- top_lrec -->'+
				'<ins class="adsbygoogle" style="display:inline-block;width:300px;height:250px" data-ad-client="ca-pub-9984222340301796" data-ad-slot="9402988065"></ins>'+
				'</div></div>';

ad.bot_lrec = '<div class="adbox">' +
				'<p class="isad">AD</p>'+
				'<div class="lrec">'+
				'<script async src="http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><!-- bot_lrec -->'+
				'<ins class="adsbygoogle" style="display:inline-block;width:300px;height:250px" data-ad-client="ca-pub-9984222340301796" data-ad-slot="8872460867"></ins>'+
				'</div></div>';


if (location.href.indexOf('hotentry') > 0 || location.href.indexOf('newentry') > 0) {

	view.initialObject = function() {
		var art = {},
		    $artdom = $('ul.entry-horizontal-l');

		articles = [];

		$("#load").show();
		loading = true;

		art.title = $artdom.find("h3").text();

		if (art.title != "") {
			art.href = $artdom.find("a").attr("href");
			art.date = $artdom.find("li.date").text();
			art.desc = $artdom.find("blockquote").text();
			art.bc = $artdom.find("ul.users").find("span").text();
			art.id = $artdom.children().attr('data-eid');
			if ($artdom.find("blockquote").length == 0 && $artdom.find(".thumbnail").length > 0) { 
				art.img = $artdom.find(".thumbnail").css("background-image").replace(/url\((.+)\)/, '$1');
			}
			art.tags = '';
			art.domain = $artdom.find("a.domain").children('span').text();
			art.favicon = $artdom.find("a.domain").children('img').attr('src');
			art.comment_url= $artdom.find(".users").find("a").attr('href');
			articles.push(art);
		}

		$(".box1_1").find(".entry-vertical-4").eq(0).children(".entry-unit").each(function(){
			art = {};
			art.id = $(this).attr('data-eid');
			art.title = $(this).find("h3.hb-entry-link-container").find("a").attr("title");
			art.href = $(this).find("a").attr("href");
			art.date = $(this).find("li.date").text();
			art.img = $(this).find("img").attr("src");
			art.desc = $(this).find("blockquote").text();
			art.bc = $(this).find("ul.users").find("span").text();
			art.tags = [];
			$(this).find("li.tag a").each(function(){
				art.tags.push({url: $(this).attr("href"), name: $(this).text()});
			});
			art.domain = $(this).find("a.domain").children('span').text();
			art.favicon = $(this).find("a.domain").children('img').attr('src');
			art.comment_url= $(this).find(".users").find("a").attr('href');
			articles.push(art);
		});

		if (articles.length < 1) {
			canmoreload = false;
		} 
	};

	view.render = function() {
		var $tmplate1 = $("#art_tmp_1").clone();
		var $tmplate2 = $("#art_tmp_2").clone();

		if (!canmoreload) {
			$("#load").hide();
			loading = false;
			return;
		} 

		var html = '';
		for (var i = 0; i < articles.length; i++) {
			var a = articles[i];
			var tfind = a.tags.length > 0;
			var tags = '';
			if (tfind) {
				tags = '<div class="tags">';
			}
			for(var j = 0; j < a.tags.length; j++) {
				tags += '<span class="tag"><a href="' + a.tags[j].url + '">' + a.tags[j].name + '</a></span>';
			}
			if (tfind) {
				tags += '</div>';
			}
			a.href = a.href.replace(/^\/entry\/(s\/)?/, 'http:\/\/');
			if (typeof a.img === "undefined" ) {
				var tmplate = $tmplate2.html();
				tmplate = tmplate.replace('{{desc}}', a.desc);
			} else {
				var tmplate = $tmplate1.html();
				tmplate = tmplate.replace('{{img}}', a.img.replace('_l.jpg','.jpg'));
			}
			if (a.domain.length > 25) {
				a.domain = a.domain.substr(0, 25) + '...';
			}
			tmplate = tmplate.replace(/\{\{title\}\}/g, a.title)
						.replace(/\{\{id\}\}/g, a.id)
						.replace('{{tags}}', tags)
						.replace('{{users}}', a.bc)
						.replace('{{href}}', a.href)
						.replace('{{domain}}', a.domain)
						.replace('{{favicon}}', a.favicon)
						.replace('{{comment_url}}', a.comment_url)
						.replace('{{script}}', '<script>')
						.replace('{{/script}}', '</script>')
						.replace('{{share}}', '/share?url=' + encodeURIComponent(a.href) + '&title=' + encodeURIComponent(a.title));
			html += tmplate;
		} 
		if (load == 0) {
			html += ad.top_lrec;
			$("#content").append(html);
			setTimeout(function(){
				(adsbygoogle = window.adsbygoogle || []).push({});
			},1000);
		} else if (load == 1) {
			html += ad.bot_lrec;
			$("#content").append(html);
			(adsbygoogle = window.adsbygoogle || []).push({});
		} else {
			$("#content").append(html);
		}

		setTimeout(function(){
			$(".article_body").each(function(){
				if ( $(this).height() < $(this).children("img").height() ) {
					$(this).css("height", $(this).children("img").height() );
				}
			});
			$("#load").hide();
			loading = false;
			if (load == 0) {
				$("#content").show();
			}
		},1000);

		//$("#org_content").empty();
	}

} else {
	view.initialObject = function() {
		var art = {},
		    $artdom = $('ul.entry-horizontal-l');

		articles = [];

		$("#load").show();
		loading = true;
		// TOP Content

		$(".search-result").each(function(){
			art = {};
			art.id = $(this).attr('data-eid');

			art.title = $(this).find("h3").eq(0).find("a").attr("title");
			art.href = $(this).find("a").attr("href");
			art.date = $(this).find("span.created").text();
			art.img = $(this).find("a.capture > img.thumbnail").attr("src");
			art.desc = $(this).find("blockquote").text();
			art.bc = $(this).find("span.users").find("span").text();
			art.tags = [];
			$(this).find("[rel='tag']").each(function(){
				art.tags.push({url: $(this).attr("href"), name: $(this).text()});
			});
			art.domain = $(this).find("a.domain").text();
			art.favicon = $(this).find("h3 > a").css('background-image').replace(/url\((.+)\)/, '$1');
			art.comment_url= $(this).find(".users").find("a").attr('href');
			articles.push(art);
		});

		if (articles.length < 1) {
			canmoreload = false;
		} 
	}

	view.render = function() {
		var $tmplate1 = $("#art_tmp_1").clone();
		var $tmplate2 = $("#art_tmp_2").clone();

		if (!canmoreload) {
			$("#load").hide();
			loading = false;
			return;
		} 

		var html = '';
		for (var i = 0; i < articles.length; i++) {
			var a = articles[i];
			var tfind = a.tags.length > 0;
			var tags = '';
			if (tfind) {
				tags = '<div class="tags">';
			}
			for(var j = 0; j < a.tags.length; j++) {
				tags += '<span class="tag"><a href="' + a.tags[j].url + '">' + a.tags[j].name + '</a></span>';
			}
			if (tfind) {
				tags += '</div>';
			}
			a.href = a.href.replace(/^\/entry\/(s\/)?/, 'http:\/\/');
			if (typeof a.img === "undefined") {
				var tmplate = $tmplate2.html();
			} else {
				var tmplate = $tmplate1.html();
				tmplate = tmplate.replace('{{img}}', a.img.replace('_l.jpg','.jpg'));
			}
			if (a.domain.length > 35) {
				a.domain = a.domain.substr(0, 35) + '...';
			}
			tmplate = tmplate.replace(/\{\{title\}\}/g, a.title)
							.replace(/\{\{id\}\}/g, a.id)
			                .replace('{{desc}}', a.desc)
			                .replace('{{tags}}', tags)
			                .replace('{{users}}', a.bc)
			                .replace('{{href}}', a.href)	                
							.replace('{{domain}}', a.domain)
							.replace('{{favicon}}', a.favicon)
							.replace('{{comment_url}}', a.comment_url)
							.replace('{{script}}', '<script>')
							.replace('{{/script}}', '</script>')
			                .replace('{{share}}', '/share?url=' + encodeURIComponent(a.href) + '&title=' + encodeURIComponent(a.title));
			html += tmplate;
		} 

		if (load == 0) {
			html += ad.top_lrec;
			$("#content").append(html);
			(adsbygoogle = window.adsbygoogle || []).push({});
		} else if (load == 1) {
			html += ad.bot_lrec;
			$("#content").append(html);
			(adsbygoogle = window.adsbygoogle || []).push({});
		} else {
			$("#content").append(html);
		}

		setTimeout(function(){
			$(".article_body").each(function(){
				if ( $(this).height() < $(this).children("img").height() ) {
					$(this).css("height", $(this).children("img").height() );
				}
			});
			$("#load").hide();
			loading = false;
			if (load == 0) {
				$("#content").show();
			}
		},1000);
	}
}

/*
$("body").on('click', '.article_body', function(){
	location.href = $(this).attr('data-href');
});
*/

$(function(){
	var cmtfv = false;

	$("form").submit(function(){
		$("#load").show();
		loading = true;
	});

	$(".fotterlnk").click(function(){
		$("#load").show();
		loading = true;
	});

	$("body").on('click', '.tag a', function(){
		//$("#load").show();
		//loading = true;
	});
	$("body").on('click', '.smenu', function(){
		$("#load").show();
		loading = true;
	});

	$("body").on('click', '.share', function(e){
		e.preventDefault();
		location.href = $(this).attr('data-href');
	});

	$("body").on('click', '.cmtload', function(e){
		if (!cmtfv) {
			cmtfv = !cmtfv;
			window.addEventListener('popstate',function(ev){
				$("#close-animatedModal").click();
			},false);
		}
		e.preventDefault();
		var id = $(this).attr('data-id');
		var url = encodeURIComponent($(this).attr('data-href'));
		$("#comment-title").text( $(this).attr('data-title') );
		history.pushState(null, $(this).attr('data-title'), '/dummy/' + id);
		$("#load").show();
		$.get('/api/comment?url=' + url, function(data){
			$('#comment-body').html(data);
			$('#comment-body').find('.user-comment-meta').remove();
			$('#comment-body').find('li').removeAttr('onmouseover');
			$('#comment-body').find('.comment-container').wrap('<p class="comment-wrap">');
			$('.tags.empty').remove();
			$('#comment-body').find('.username').each(function(){
				var url = ("javascript:location.replace('" + 'http://b.hatena.ne.jp' + $(this).attr('href') + "')");
				$(this).attr('href',  url);
			});
			$('#comment-body').find('.user-tag').each(function(){
				var url = ("javascript:location.replace('" + $(this).attr('href') + "')");
				$(this).attr('href',  url);
			});
			$("#load").hide();
		});
	});

	$("#starget").change(function(){
		$("#search").attr("action" , "/search/" + $(this).val() );
	});


	$( ".sidebar" ).simpleSidebar({
	  settings: {
	    opener: "#open-sb",
	    //wrapper: "#load",
	    animation: {
	      easing: "easeOutQuint"
	    }
	  },
	  sidebar: {
	    align: "left",
	    width: 200,
	    //closingLinks: 'a',
	    styles: {
	    	zIndex: 3000
	    }
	  }
	});

	$("#org_category li").each(function(){
		var href = $(this).children().attr('href').replace('http://b.hatena.ne.jp', '');
		$(this).children().attr('href', href);
		$(".sidebar").children().append( '<li class="smenu">' + $(this).html() + '</li>' );
	});

	$("#search_view").click(function(){
		if ( searchshow ) {
			$("#search").hide();
			$("#header").css("height","44px");
		} else {
			$("#search").show();
			$("#header").css("height","85px");
		}
		searchshow = !searchshow;
	});

});


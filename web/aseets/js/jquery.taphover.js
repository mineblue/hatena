(function () {
  var tapClass = "";
  var hoverClass = "";
  var timer = 1;
  var ltimer = null;
	
	var Hover = window.Hover = function (ele) {
		return new Hover.fn.init(ele);
	};
	Hover.fn = {
		//Hover Instance
		 init : function (ele) {
			this.prop = ele;
		}
 
		, bind : function (_hoverClass, _tapClass) {
			hoverClass = _hoverClass;
			tapClass = _tapClass;
 
			$(window).bind("touchstart", function(event) {
				var target = event.target || window.target;
				
				var bindElement = null;
				if (target.tagName == "A" || $(target).hasClass(tapClass)) {
					bindElement = $(target);
				} else if ($(target).parents("a").length > 0) {
					bindElement = $(target).parents("a");
				} else if ($(target).parents("." + tapClass).length > 0) {
					bindElement = $(target).parents("." + tapClass);
				}
				
				if (bindElement != null) {
					Hover().touchstartHoverElement(bindElement);
				}
			});
		}
		, touchstartHoverElement : function (bindElement) {
			console.log(timer);
			timer = setTimeout(function(){
				bindElement.addClass(hoverClass);
				bindElement.unbind("touchmove", Hover().touchmoveHoverElement);
				bindElement.bind("touchmove", Hover().touchmoveHoverElement);
				
				bindElement.unbind("touchend", Hover().touchendHoverElement);
				bindElement.bind("touchend", Hover().touchendHoverElement);
			},100);
			ltimer = timer;
		}
		, touchmoveHoverElement : function (event) {
			console.log(timer);
			clearTimeout(timer);
//			$(this).removeClass(hoverClass);
			
		}
		, touchendHoverElement : function (event) {
			clearTimeout(timer);
			console.log(timer);
//			$(this).removeClass(hoverClass);
		}
	}
	Hover.fn.init.prototype = Hover.fn;
 
	Hover().bind("hover", "tap");
}
)();
/*!
* WhenYouSeeMe - jQuery Plugin
* ===================================
* This plugin was created with the purpose of adding a class to elements when within the viewport.
*
* (c) 2014 Shannon Reca, http://whenyouseeme.shannonreca.com
* GNU GENERAL PUBLIC LICENSE - http://www.gnu.org/licenses/gpl.html
*/

(function ($) {
	$.fn.whenyouseeme = function (addMyClass,options) {
		// User options.
		var params = $.extend({
			allDone: undefined,
			container: window,
			delay: 500
		}, options);

		// Init global count for multiple uses of wysm.
		var globalCount = 0;

		// If data("wysm") is already established, then continue using.
		if($("body").data("wysm")){
			globalCount = $("body").data("wysm");
		// Else establish data("wysm") for later use.
		}else{
			$("body").data("wysm", globalCount);
		}

		// Define viewport.
		var viewportHeight = 0;

		// Check if container is not window (or unique element), but if window, then add element to measure viewport height.
		if(!$(".wysm-height-check").length && typeof params.container === "object"){
			var wysmHeightCheck = $("<div/>").addClass('wysm-height-check').css({
				position: 'absolute',
				height: '100%',
				top: '0',
				bottom: '0'
			})
			$("body").append(wysmHeightCheck);
			viewportHeight = $(".wysm-height-check").innerHeight();
		// Check if ".wysm-height-check" has already been added, if so then use.
		}else if ($(".wysm-height-check").length) {
			viewportHeight = $(".wysm-height-check").innerHeight();
		// Assume we're using a specific element for viewport.
		}else{
			viewportHeight = $(params.container).innerHeight();
		}

		// WYSM vars that will be used throughout the process.
		var wysmVars = {
			animationDelay: params.delay,
			count: 0,
			delay: 0,
			done: false,
			gc: globalCount,
			objs: [],
			objsStart: [],
			SP: 0,
			yCor: []
		}

		// allDone is called when every element with current selector has reached the viewport.
		var setDone = false;
		var allDone = function(){
			if(!setDone){
				setDone = true;
				setTimeout(function(){
					if (typeof params.allDone == 'function'){ 
						params.allDone();
					}
				},(params.delay));
			}
		}

		// Checks if all objects have reached the viewport.
		var checkIfAllDone = function(){
			_found = false;
			for (var key in wysmVars.objsStart) {
				if(wysmVars.objsStart[key]){
					_found = true;
				}
			}
			if(!_found){
				allDone();
			}
		}
		
		// This function simply checks when element is within viewport.
		var checkIfVisible = function(){
			for(i=0;i<wysmVars.count;i++){
				if(wysmVars.SP >= wysmVars.yCor[i] && wysmVars.objsStart[i]){
					wysmVars.objsStart[i] = false;
					addClass(i,wysmVars.delay);
					wysmVars.delay += wysmVars.animationDelay;
				}
			}
			setTimeout(function(){wysmVars.delay = 0},100);
			checkIfAllDone();
		}

		// Add class once in viewport and delay has been reach.
		var addClass = function (eleKey,delay) {
			setTimeout(function(){$('.'+wysmVars.objs[eleKey]).addClass(addMyClass)},delay);	
		}

		// Scrub and store each element info chosen by selector.
		$(this).each(function(){
			var WH_name = 'wysm-'+wysmVars.gc;
			var position = $(this).offset();
			
			wysmVars.objs.push(WH_name);
			wysmVars.objsStart.push(true);
			wysmVars.yCor.push(position.top);
			
			$(this).addClass(WH_name);
			
			wysmVars.gc++;
		});

		// Update global count for next call.
		$("body").data("wysm", wysmVars.gc);

		// Gather total objects count and current scroll position.
		wysmVars.count = wysmVars.objs.length;
		wysmVars.SP = $(params.container).scrollTop()+viewportHeight;
		
		// Bind scroll event to container which will call the checkIfVisible function.
		$(params.container).scroll(function(){
			wysmVars.SP = $(params.container).scrollTop()+viewportHeight;
			checkIfVisible();
			console.log("checking...");
		});
		// Once all set and done, run the first check.
		checkIfVisible();
	}
})(jQuery);
// Copyright (c) 2010 Mickael Riga - See MIT_LICENCE for details
// Version 1

;(function($) {
	$.fn.underwood = function(options) {
		// Settings
		var defaults = {
			toolbar: "title bold italic link mailto unlink source"
		};
		var settings = $.extend({}, defaults, options);
		// Init
		if(document.designMode || document.contentEditable)
    {
	    return this.each( function(){
				$(this).parents('form').unbind('submit.underwood').bind('submit.underwood', function(){
					$(this).find('iframe.underwood_iframe').each(function() {
						disable_design_mode(this, true);
					});
				});
	    	enable_design_mode($(this));
	    });
    }

		function enable_design_mode(textarea) {
	    var iframe = document.createElement("iframe");
	    iframe.frameBorder=0;
	    iframe.frameMargin=0;
	    iframe.framePadding=0;
	    iframe.height=200;

	    iframe.className = "underwood_iframe";
	    if(textarea.attr('name'))
	    	iframe.rel = textarea.attr('name');
	    textarea.after(iframe);
	    var css = "\
			<style type='text/css'>\
			.underwood_frame_body {font-family:sans-serif;font-size:12px;margin:0;width:100%;height:100%;}\
			.underwood_frame_body p {border:1px #DDD solid;padding:2px;}\
			.underwood_textarea_copy {width:350px;margin:0;padding:0;height:160px;border:1px #999 solid;clear:both;}\
			.underwood_toolbar {overflow:hidden;}\
			.underwood_toolbar a, .underwood_toolbar a img {border:0;}\
			.underwood_toolbar p {float:left;margin:0;padding-right:5px;}\
			</style>";
	    var content = textarea.val();
	    // Mozilla need this to display caret
	    if($.trim(content)=='')
	    	content = '<br>';
	    var html = "<html><head>"+css+"</head><body class='underwood_frame_body'>"+content+"</body></html>";
	    try_enable_design_mode(iframe, html, function() {
	      $(iframe).prevAll('.underwood_toolbar').remove().end().before(toolbar(iframe));
	      textarea.remove();
	    });
    }

		function try_enable_design_mode(iframe, html, callback) {
	    try {
	      iframe.contentWindow.document.open();
	      iframe.contentWindow.document.write(html);
	      iframe.contentWindow.document.close();
	    } catch(error) {
	    	console.log(error)
	    }
	    if (document.contentEditable) {
	    	iframe.contentWindow.document.designMode = "On";
	    	callback();
	      return true;
	    }
	    else if (document.designMode != null) {
	      try {
	        iframe.contentWindow.document.designMode = "on";
	        callback();
	        return true;
	      } catch (error) {
	      	console.log(error)
	      }
	    }
	    setTimeout(function(){try_enable_design_mode(iframe, html, callback)}, 250);
	    return false;
    }

		function toolbar(iframe) {     
	    var tb = $("<div class='underwood_toolbar'></div>");
			var buttons = settings.toolbar.split(' ');
			for (var i in buttons) {
				var btn_name = buttons[i];
				var btn_name_capital = btn_name.charAt(0).toUpperCase() + btn_name.substr(1).toLowerCase();
				var btn = "<a href='#' class='underwood_btn underwood_btn_"+btn_name+"' title='"+btn_name_capital+"'>"+ btn_name_capital +"</a>";
				tb.append($(btn));
			}
			
			$('.underwood_btn_title', tb).click(function(){ exec_command(iframe, "formatblock", '<h3>'); return false; });
	    $('.underwood_btn_bold', tb).click(function(){ exec_command(iframe, 'bold'); return false; });
	    $('.underwood_btn_italic', tb).click(function(){ exec_command(iframe, 'italic'); return false; });
	    //$('.underwood_btn_unorderedlist', tb).click(function(){ exec_command(iframe, 'insertunorderedlist');return false; });
	    $('.underwood_btn_link', tb).click(function(){ 
	      var href = prompt("URL:", "http://");
				var target = confirm('Open in a new window? (press cancel to open in the same window)') ? '_blank' : '_self';
	      if (href) {
					exec_command(iframe, 'CreateLink', href); // Now works on FF
					var idoc = iframe.contentWindow;
					var selected = idoc.getSelection();
					selected.focusNode.parentNode.target = target;
				}
	      return false;
			});
			$('.underwood_btn_mailto', tb).click(function(){ 
	      var href = 'mailto:' + prompt("Email address:");
	      if(href)
	      	exec_command(iframe, 'CreateLink', href);
	      return false;
			});
			$('.underwood_btn_unlink', tb).click(function(){ exec_command(iframe, 'unlink'); return false; });
	    $('.underwood_btn_image', tb).click(function(){ 
	      var src = prompt("Image URL:");
	      if(src)
	      	exec_command(iframe, 'InsertImage', src);
	      return false;
			});
	    $('.underwood_btn_source', tb).click(function() {
	      var textarea = disable_design_mode(iframe);
	      var back_btn = $("<a href='#' class='underwood_btn underwood_btn_back'>Back to Rich Text Editor</a>");
	      tb.empty().append(back_btn);
	      back_btn.click(function(){
	        enable_design_mode(textarea);
	        return false;
	      })
				.hover(function() {
					$(this).css('opacity', 0.6);
				}, function() {
					$(this).css('opacity', 1);
				});
	      return false; 
	    });
	
			$('.underwood_btn', tb).hover(function() {
				$(this).css('opacity', 0.6);
			}, function() {
				$(this).css('opacity', 1);
			});
    
	    return tb;
    }

		function exec_command(iframe, command, option) {
	    iframe.contentWindow.focus();
	    try{
	    	iframe.contentWindow.document.execCommand(command, false, option);
	    }catch(e){console.log(e)}
	    iframe.contentWindow.focus();
    }

		function disable_design_mode(iframe, on_submit) {
	    var content = iframe.contentWindow.document.getElementsByTagName("body")[0].innerHTML;
	    if(on_submit==true)
	    	var textarea = $('<input type="hidden" />');
	    else
	    	var textarea = $('<textarea cols="40" rows="10"></textarea>');
	    textarea.val(content);
	    t = textarea.get(0);

	    t.className = "underwood_textarea_copy";
	    if(iframe.rel)
	    	t.name = iframe.rel;
	    $(iframe).before(textarea);
	    if(on_submit!=true)
	    	$(iframe).remove();
	    return textarea;
    }

		function create_targeted_link(iframe, href, target) {
			selected = iframe.contentWindow.document.getSelection().getRangeAt(0);
			var a_tag = iframe.contentWindow.document.createElement('a');
			a_tag.href = href;
			a_tag.target = target;
			if (selected.toString()=='') {
				a_tag.innerHTML = href;
				selected.insertNode(a_tag);
			} else {
				selected.surroundContents(a_tag);
			}
		}
		
	}
})(jQuery);
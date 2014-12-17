TweetQuote = {
		
	generateHtml: function(){
		var text = $("#text").val();
		var qs = {
			"text" : text,
			"url" : $("#url").val(),
			"via" : $("#via").val(),
			"related" : $("#related").val()
		} 
		var url = "https://twitter.com/intent/tweet?" + Utils.qs(qs);

		$('.result').hide();
		
		var html = "<a href='javascript:window.open(\""+url+"\", \"_target\", \"width=600, height=350\");'><img src='images/bird.png' height='20' width='20'>&nbsp;"+text+"</a>";
		var code = Utils.htmlEncode(html);
		$('#result_intent_code').html(code);
		// $('#result_intent_code').attr("data-clipboard-text", html);
		$('#result_intent_example').html(html);
		
		Utils.clipboardSetData();
		
		$('.result').fadeIn();
	}

}

Utils = {

    init: function(){
        this.counter = 1;
    },
    
    clipboardSetData: function(){
    	$(".copy-button").each(function (){
    		var el = $(this);
    		var pre = el.parent().siblings("pre");
    		// var clipboardText = pre.attr("data-clipboard-text");
    		// if (!clipboardText){
			var clipboardText = Utils.htmlDecode(pre.html());
    		// }
    		if (clipboardText){
    			el.attr("data-clipboard-text", clipboardText);
    			// alert(el.attr("data-clipboard-text"))
    		}
    	});
    },
    
	qs: function(obj) {
      var str = [];
      for(var p in obj){
         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
      return str.join("&");
    },
    
    htmlEncode: function(textContent){
    	return $("<textarea/>").text(textContent).html();
    },

    htmlDecode: function(textContent){
    	return $("<textarea/>").html(textContent).text();
    }

}

$( document ).ready(function(){

	var client = new ZeroClipboard($(".copy-button"));

	client.on( "ready", function( readyEvent ) {
		  // alert( "ZeroClipboard SWF is ready!" );

		  client.on( "aftercopy", function( event ) {
		    // `this` === `client`
		    // `event.target` === the element that was clicked
		    // event.target.style.display = "none";
			  
			$(event.target).tooltip('show');
			  
			// alert("Copied text to clipboard: " + event.data["text/plain"] );
		  } );
		} );
	
	Utils.clipboardSetData();
});
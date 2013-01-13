(function() {
	$(document).ready(function() {

		//use JSONP to get the main passage
		var main_passage = $("#bible").attr('data-passage');

		//We have a main passage!
		if(main_passage && main_passage !== "") {
			$("#bible .box_head h2").text(main_passage);

			var JSONP_URL = "//labs.bible.org/api/?passage="+encodeURIComponent(main_passage)+"&type=json&callback=_jsonp_main_passage_text&formatting=para";

			var mp_script = $("<script>").attr('src', JSONP_URL);

			$(document.head).append(mp_script);
		}

		//Bind to resize changes, so that we can keep scrollers in check
		$("body").css('height', $(window).height() - 95);
		$(window).resize(function() {
			$("body").css('height', $(window).height() - 95);
		});
	
		//Update all of the embeds
		$("code").each(function() {
			var inner = $(this).html();

			//All bible embeds must start with passage=
			if(inner.indexOf("passage=") === 0) {
				var ref = inner.replace("passage=", "");
				var cls = ref.replace(/\s/g, "|");
				var fun = ref.replace(/[^a-zA-Z0-9]/g, "_");

				$(this).addClass(cls);

				//Create the JSONP callback function on the window object.
				var callbackName = "_jsonp_verse_callback_"+fun;
				window[callbackName] = function(verses) {
					_jsonp_embeded_passage_text(verses, cls);
				};

				var JSONP_URL = "//labs.bible.org/api/?passage="+encodeURIComponent(ref)+"&type=json&callback="+encodeURIComponent(callbackName)+"&formatting=para";

				var em_script = $("<script>").attr('src', JSONP_URL);

				$(document.head).append(em_script);
			}
		});

	});
})();




/****** Fun Functions ********/

function fixVerseNumPositions(ele) {
	$(ele).children(".versenum").each(function() {
		$(this).next().prepend($(this));
	})
}

function bindPostAnchors() {
	//Hook anchors that are meant to link to the main passage
	$("#post a").each(function() {
		var href = decodeURIComponent($(this).attr('href')).replace(":", "\\:");

		//I'm guessing if there are no slashes or dots then it is a bible reference.
		//This will break on relative links in the same directory that have no extension...
		//Oh Well.
		if(href.indexOf("/") === -1 && href.indexOf(".") === -1) {

			var bibleHref = href.replace(" ", "");

			var bibleLink = $("#bible #" + bibleHref);

			if(bibleLink.length) { //The verse exists in our main passage
				//In this case, hook the anchors click event, and instead of following the
				//HREF, just scroll to it (and change the hash, if you can)


				$(this).click(function(event) {
					event.preventDefault();


					var scroll = $(bibleLink).position().top;

					$("#bible").animate({
						scrollTop: scroll - 175
					}, 1000, function() {
						window.location.hash = bibleHref;
					});
				});

			} else { //The verse doesn't exist in our main passage
				//In this case, change the href and target attribute
				//So that a new tab opens, linking to the NET bible version of the verse

			}
		}
	});
}


/***** JSONP Functions ******/


function _jsonp_embeded_passage_text(verses, ref) {
	var passageHTML = ""
	var chapter = 0;

	for(var i=0,max=verses.length ; i<max; i++) {
		var verse = verses[i];

		if(chapter !== verse.chapter) {
			if(chapter === 0) {
				chapter = verse.chapter;
			} else {
				chapter = verse.chapter;

				passageHTML += "<h3 class='chapterhead'>Chapter "+chapter+"</h3>";
			}
		}

		passageHTML += "<span class='versenum'>"+verse.verse+"</span>";
		passageHTML += verse.text;
	}

	var embed = $("<div>").addClass("embedded-verse");
	var passage = $("<p />");
	$(passage).append($(passageHTML));
	$(embed).append(passage);
	$(embed).append("<span class='passage_description'>"+ ref.replace(/\|/g, " ")+"</span>");

	var real_ref = ref.replace(/:/g, "\\:").replace(/\|/g, "\\|");

	$(embed).find("a").remove();
	fixVerseNumPositions($(embed).children("p"));

	$("code."+real_ref).replaceWith(embed);
}

function _jsonp_main_passage_text(verses) {
	var book = ""
	var chapter = 0;

	var bibleHTML = ""

	for(var i=0,max=verses.length; i<max; i++) {
		var verse = verses[i];

		if(book !== verse.bookname) {
			var bookHead = "<h2 id='"+verse.bookname.replace(" ", "")+"'>"+verse.bookname+"</h2>";
			bibleHTML += bookHead;

			//Set new bookname, and reset chapter so it will display
			book = verse.bookname;
			chapter = 0;
		}

		if(chapter !== verse.chapter) {
			var chapterHead = "<h3 id='"+book+verse.chapter+"'>Chapter "+verse.chapter+"</h3>";
			bibleHTML += chapterHead;

			chapter = verse.chapter;
		}

		if(verse.title) {
			var header = "<h4 id='"+verse.title.replace(" ", "")+"'>"+verse.title+"</h4>";
			bibleHTML += header;
		}

		bibleHTML += "<span class='versenum' id='"+book+chapter+":"+verse.verse+"'>"+verse.verse+"</span>";

		bibleHTML += verse.text;
	}

	$("#bible .box_content").html(bibleHTML);
	$("#bible a").remove();

	fixVerseNumPositions($("#bible .box_content"));
	bindPostAnchors();
}

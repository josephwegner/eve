(function() {
	$(document).ready(function() {
		var main_passage = $("#bible").attr('data-passage');

		//We have a main passage!
		if(main_passage && main_passage !== "") {
			var JSONP_URL = "//labs.bible.org/api/?passage="+encodeURIComponent(main_passage)+"&type=json&callback=_jsonp_main_passage_text&formatting=para";

			var mp_script = $("<script>").attr('src', JSONP_URL);

			$(document.head).append(mp_script);
		}

		$("body").css('height', $(window).height() - 175);
		$(window).resize(function() {
			$("body").css('height', $(window).height() - 175);
		});
	});
})();






/***** JSONP Functions ******/


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

		var verseNum = $("<span>").addClass("versenum").text(verse.verse);
		bibleHTML += "<span class='versenum'>"+verse.verse+"</span>";

		bibleHTML += verse.text;
	}

	$("#bible").html(bibleHTML);
	$("#bible a").remove();
}

var apikey = '7545508ddd3b3508ac21c6a3489a7d59d29d5ad3'; // Put your API key here


// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
	console.log(results);

var content;
var deckString;

for (var i=0; i<9; i++){ 

    	var deckString = "";
        if (results[i].deck == null) {
            deckString = "No Description Available";
        } else {
            deckString = results[i].deck;
            console.log(deckString);
        }

        if(!results[i].image){
            imgURL = "<img src='sad_face.jpg'>";
        } else {
            imgURL = "<img src='" + results[i].image.medium_url + "'>";
        }

  //  		if (i%3 == 0){
  // 			content =  "<div class='row'>"; 
		// }

		// 	content += "<div class='col-md-4 col-lg-6 attach'>";
		// 	content += "<div class='hidden-sm hidden-xs storage'>";
		// 	content += imgURL;
		// 	content += "<p class='lead well'> Title: " + results[i].name + " Deck:" + deckString + "<button class='btn btn-sm btn-success'> Remove </button></p>";
		// 	content += "</div>";
	
		// if ((i+1) %3 == 0){
		// 	content += "</div>";
		// }

		// $(".header").append(content);

		// console.log ("This is i:" + i + " " + results[i].name);

		}
	}


$(document).ready(function() {

	search("batman");

	$('.well').hide().fadeIn(1500);

	$('.well').on ("click", ".btn", function(){
		$(this).parent().fadeOut(350);
		// console.log("hi!");
	});

});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}

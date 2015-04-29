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
            imgURL = "<img class='hidden-sm hidden-xs' src='" + results[i].image.medium_url + "'>";
        }

			content += "<div class='col-md-4 col-lg-4 class'"+i+">";
//			content += "<div class='hidden-sm hidden-xs storage'>";  //remove this, so that ONLY the image hides, rather than then entire container for <img></img> and <p></p>.
			content += imgURL;
			content += "<p class='lead well'> Title: " + results[i].name + " Deck:" + deckString + "<br><button class='btn btn-sm btn-success'> Remove Details </button></p>";
			content += "</div>";
	

		$('.container').closest('div').append(content);
			content="";

		}
	}


$(document).ready(function() {

	$('.searchBtn').on('click', function(){
    	$('.results').empty();
    	search($('.searchField').val());
    });

    $('#searchField').keyup(function(key){
        if(key.keyCode ==13){
            $('.results').empty();
            search($('#searchField').val());
        }
    });


	$('.well').hide().fadeIn(1500);

	$('.container').on("click", ".btn-success", function(){
		$(this).closest('.col-md-4').fadeOut(350, function(){
			$(this).remove();
		});
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

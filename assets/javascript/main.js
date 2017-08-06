$(document).ready(function() {

    $("#searchButton").on("click", function(){
    console.log("button clicked");
    var searchString = $("#cityZipInput").val().trim();
    console.log("searchString is " + searchString);

    //Get the radius value and convert to meters
    var e = document.getElementById("radiusSelection");
    var radMiles = e.options[e.selectedIndex].value;
    var radMeters = radMiles * 1609.34;
    radMeters = parseFloat(radMeters.toFixed(2));
    //var strUser = e.options[e.selectedIndex].text;
    console.log("selected radius is " + radMeters + " meters");
    //Test to see if input is a city name or a zip code.
    var firstChar = searchString.charAt(0); //gets first character of search string
    result = testForChar(firstChar);
    if (result === "city") {
        console.log("Input is a city name.");
        $("#statusMsg").text("You entered a city Name");
    } else if (result === "zip") {
        console.log("Input is a zip code.");
        $("#statusMsg").text("You entered a zip code.");

      } else { //invalid character 
          console.log ("invalid character.");
          $("#statusMsg").text("Enter a city name or zip code.");
        }

    var apiKey = "AIzaSyDYrSAKgq2_eSpoA_BRomMErBFF2nZL4JA"; <!-- google places api key -->
    var queryURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + searchString + "&radius=" + radMeters + "&strictbounds&key=" + apiKey;


    // Create an AJAX call for the specific button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
           for (var i=0; i<3; i++) {
           console.log("response.predictions = " + response.predictions[0].description);
       } // end for
        }) // end ajax call
    }); // end on click

function testForChar(char) {  //Returns "city", "zip", or "Invalid".
  if (((char > '@') && (char < '[')) || ((char > '`') && (char<'{'))) { 
    return "city"; // It is an english alphabetical character  
  
  } else if ((char > '/' ) && (char < ':')) {
      return "zip"; //character is a number 0-9

    }  else {
         //invalid character
        return "invalid";
    }

}; //end function

}); //end document ready
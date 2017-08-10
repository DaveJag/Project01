$(document).ready(function() {
    
    var myLocation = "";
    var location = '';
    var locations = [];
    var mapsAPIkey = "AIzaSyBj9Al5NrRwRUiUF6pZfZyGMde4WK0ehBo";
    var yelpAPIkey = "sdLIuUoLXJ1foqbrvm9DJYuEmJQ28kBPkEjmp5bx4wBjztmgI-rl-IM_6bncvdCqLFnBF-CajWNwW8dpCgDtI7tTUC_Wuyvr-g6i1574oHE27GjGoiW_Z_kZ-BCBWXYx";
    var token = yelpAPIkey;
    var locationName = [];


    //Get the HTML input element for the autocomplete search box.
    var input = document.getElementById('pac-input');
    var options = {
        types: ['(cities)'], 
        componentRestrictions: {country: ['us', 'ca']} //restricts search to United States & Canada
    };
    
    //Create the input with autocomplete object.
    var autocomplete = new google.maps.places.Autocomplete(input,options);
    
    //Event listener for Submit button.
    $("#searchButton").on("click", function(){

        //Get user-selected input from the autocomplete input field.
        myLocation = $("#pac-input").val().trim();
   
        //Get the radius value and convert it to meters.
        var r = document.getElementById("radiusSelection");
        var radMiles = r.options[r.selectedIndex].value;
        var radMeters = radMiles * 1609.34 //meters-per-mile;
        radMeters = parseFloat(radMeters.toFixed(2));
        
        //Bobby's API call to Google Places
        var apiKey = "AIzaSyDYrSAKgq2_eSpoA_BRomMErBFF2nZL4JA"; <!-- Google zplaces api key -->
        var queryURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + myLocation + "&radius=" + radMeters + "&strictbounds&key=" + apiKey;

        // Create an AJAX call for the specific button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            for (var i=0; i<response.predictions.length; i++) {
            console.log("response.predictions = " + response.predictions[i].description);
          } // end for loop
        }); // end ajax call

        resetLocationName();

        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=coffee&location=" + myLocation,
            success: function(data, status) {
            //$(".api-results").append("<p>This is the closest Coffee Shop to you: " + data.businesses[0].name + ".</p><p>Enjoy!</p>");
            // console.log(data.businesses[0].location);
                for (var i = 0; i < data.businesses.length - 10; i++) {
                    location = (data.businesses[i].location.city);
                    locationName.push(data.businesses[0].name);
                    location = location.replace(" ", "+");
                    resetLocations();
                   
                    //The function previously known as "functionTwo"

                    $.ajax({
                        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + mapsAPIkey,
                        success: function(response) {
                            locations.push(response.results[0]);
                            writeToTable(locations);

                        // The function previously known as "functionThree" 
                            var map = new google.maps.Map(document.getElementById('googleMap'), {
                            zoom: 12,
                            center: locations[0].geometry.location
                            });
                            for (var j = 0; j < locations.length; j++) {
                                var marker = new google.maps.Marker({
                                position: locations[j].geometry.location, // TypeError: Cannot read property 'geometry' of undefined.
                                map: map,
                                title: locationName[j] + " " + locations[j].formatted_address
                                }); // end google.maps.Marker
                            } //end for loop
                        } // end function(response)
                  }); // end ajax call        

                } // end for loop
            }, // end function (data, status)
                beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization', 'Bearer ' + token); }
        }); // end ajax call
    }); // end on click event

    //Write values to table.
    function writeToTable(locations) {
        for (var i=0; i<locations.length; i++) {
            $(".table").append(
              "<tr class ='tableRow'>" + 
              "<td id='nameColId'>" + locations[i] + "</td>" + 
              "<td id='addressColId'>" + /*get data from api */ + "</td>" +
              "<td id='phoneColId'>" + /*get data from api */ + "</td>" + 
             "</tr>");
        }   // end for loop
    } // end function writeToTable


    function resetLocations(){
            locations = [];    
    }
    

    function resetLocationName(){
        locationName = [];
    }


    function initialize() {
    //Create the autocomplete object.
        autocomplete = new google.maps.places.Autocomplete(
        /** @type {HTMLInputElement} */ (document.getElementById('autocomplete')),
      { types: ['geocode']});
    }
  

    //Dynamic date data
    var today = new Date();
    document.getElementById('year').textContent = today.getFullYear();
 
}); //end document ready
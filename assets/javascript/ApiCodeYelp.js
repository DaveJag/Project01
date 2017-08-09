//JS - Yelp API
    $(document).ready(function () {
        var mapsAPIkey = "AIzaSyBj9Al5NrRwRUiUF6pZfZyGMde4WK0ehBo";
        var yelpAPIkey = "sdLIuUoLXJ1foqbrvm9DJYuEmJQ28kBPkEjmp5bx4wBjztmgI-rl-IM_6bncvdCqLFnBF-CajWNwW8dpCgDtI7tTUC_Wuyvr-g6i1574oHE27GjGoiW_Z_kZ-BCBWXYx";

        var city = $("#location-input").val().trim();

        // Get my Facebook API key from Local Storage
        var token = yelpAPIkey;

        var locationName = [];

        var location = "";
        $("#makeCall").click(function() {
            resetLocationName();
            var city = $("#location-input").val().trim();

            $.ajax({
                url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=coffee&location=" + city,
                success: function(data, status) {
                    $(".api-results").append("<p>This is the closest Coffee Shop to you: " + data.businesses[0].name + ".</p><p>Enjoy!</p>");
                    // console.log(data.businesses[0].location);

                    for (var i = 0; i < data.businesses.length - 10; i++) {
                        location = (data.businesses[i].location.address1 + ", " + data.businesses[i].location.city + ", " + data.businesses[i].location.state);
                        locationName.push(data.businesses[i].name);
                        location = location.replace(" ", "+");
                        console.log(location);
                        resetLocations();
                        functionTwo();
                    }

                    console.log("The returned data", data);
                },
                beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization', 'Bearer ' + token); }
            });
        });

        
        var locations = [];


        console.log(locations);


        function functionTwo() {
            $.ajax({
                url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + mapsAPIkey,
                success: function(response) {
                    console.log(response);
                    locations.push(response.results[0]);
                    console.log(locations);
                    functionThree();
                }
            });

            
        }

        function functionThree() {
            var map = new google.maps.Map(document.getElementById('googleMap'), {
                zoom: 12,
                center: locations[0].geometry.location
            });
            for (var i = 0; i < locations.length; i++) {
            var marker = new google.maps.Marker({
                position: locations[i].geometry.location,
                map: map,
                title: locationName[i] + " " + locations[i].formatted_address
            });
            }
        
        }
        function resetLocations(){
            locations = [];
            
        }
        function resetLocationName(){
            locationName = [];
        }
        
        });

        
    
    //Maps Api Call
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBj9Al5NrRwRUiUF6pZfZyGMde4WK0ehBo"></script>
    
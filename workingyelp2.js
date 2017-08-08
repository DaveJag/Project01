//JS - Yelp API
    var mapsAPIkey = "AIzaSyBj9Al5NrRwRUiUF6pZfZyGMde4WK0ehBo";
        var yelpAPIkey = "sdLIuUoLXJ1foqbrvm9DJYuEmJQ28kBPkEjmp5bx4wBjztmgI-rl-IM_6bncvdCqLFnBF-CajWNwW8dpCgDtI7tTUC_Wuyvr-g6i1574oHE27GjGoiW_Z_kZ-BCBWXYx";

        var city = $("#location-input").val().trim();
        $(function() {
            // Get my Facebook API key from Local Storage
            var token = yelpAPIkey;

            var location = "";
            $("#makeCall").click(function(){
                var city = $("#location-input").val().trim();

                


                $.ajax({
                    url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + city,
                    success: function(data, status) {


                        
                        $(".api-results").append("<p>This is the closest Coffee Shop to you: " + data.businesses[0].name + ".</p><p>Enjoy!</p>");
                        // console.log(data.businesses[0].location);

                        for (var i = 0; i < data.businesses.length; i++) {

                        location = (data.businesses[i].location.address1 + ", " + data.businesses[i].location.city + ", " + data.businesses[i].location.state);
                        location = location.replace(" ", "+");
                        console.log(location);
                        functionTwo();
                    }

                        return console.log("The returned data", data);

                    },
                    beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization', 'Bearer ' + token); }
                });



            });
            function functionTwo() {

                

                $.ajax({
                    url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + mapsAPIkey,
                    success: function(response) {
                        console.log(response);
                        
                        //console.log(response.results[0].geometry.location);

                        

                            //var LatLng = new google.maps.LatLng//
                            var myLatLng = (response.results[0].geometry.location);

                            var map = new google.maps.Map(document.getElementById('googleMap'), {
                                zoom: 16,
                                center: myLatLng
                            });
                            var marker = new google.maps.Marker({
                                position: myLatLng,
                                map: map,
                                title: response.results[0].formatted_address
                            });

                    }

                });
            }


            
            
        });
    //Maps Api Call
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBj9Al5NrRwRUiUF6pZfZyGMde4WK0ehBo"></script>
    
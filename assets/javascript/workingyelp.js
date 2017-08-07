//JS - Yelp API
    var mapsAPIkey = "AIzaSyBj9Al5NrRwRUiUF6pZfZyGMde4WK0ehBo";
    var yelpAPIkey = "sdLIuUoLXJ1foqbrvm9DJYuEmJQ28kBPkEjmp5bx4wBjztmgI-rl-IM_6bncvdCqLFnBF-CajWNwW8dpCgDtI7tTUC_Wuyvr-g6i1574oHE27GjGoiW_Z_kZ-BCBWXYx";
    $(function() {
    
    var token = yelpAPIkey;
    $(".search").click(function() {
        var city = $(".inputField").val().trim();

        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + city,
            success: function(data, status) {
                //$(".api-results").append("<p>Total number of results from API: " + data.total + ".</p><p>Check your console.</p>");
                console.log(data.businesses[0].location);
                return console.log("The returned data", data);

            },
            beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization', 'Bearer ' + token); }
        });
    });
    //Maps & Geocode incorporation in function
$("#makeCallgoogle").click(function() {

                

                $.ajax({
                    url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + mapsAPIkey,
                    success: function(response) {
                        console.log(response);
                        console.log("hello");
                        console.log(response.results[0].geometry.location);

                        

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
            });




});
    //Maps Api Call
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBj9Al5NrRwRUiUF6pZfZyGMde4WK0ehBo"></script>
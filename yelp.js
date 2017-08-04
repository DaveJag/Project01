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
                return console.log("The returned data", data);
            },
            beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization', 'Bearer ' + token); }
        });
    });
});
    
    
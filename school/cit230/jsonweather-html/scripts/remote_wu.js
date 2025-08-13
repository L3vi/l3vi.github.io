// Current Location Scripts
$(function () {

    var status = $('#status');

    (function getGeoLocation() {
        status.text('Getting Location...');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                // Call the getData function, send the lat and long
                getData(lat, long);

            });
        } else {
            status.text("Your browser doesn't support Geolocation or it is not enabled!");
        }

    })();

    // Get the data from the wunderground API
    function getData(lat, long) {
        $.ajax({
            url: "https://api.wunderground.com/api/436f9d65036b8775/conditions/geolookup/q/" + lat + "," + long + ".json",
            dataType: "jsonp",
            success: function(data) {
                $("#cover").fadeOut(250);
                console.log(data);
                let city = data['location']['city'];
                let state = data['location']['state'];
                let location = city + ", " + state;
                
                let temp_f = parseInt(data['current_observation']['temp_f']);
                let feels_like_f = parseInt(data['current_observation']['feelslike_f']);
                let summary = data['current_observation']['weather'];
                let image = data['current_observation']['icon_url'];
                
                $("title").prepend(location + " | ");
                $("#cityDisplay").html(location);
                $("#currentTemp").html(temp_f + " &#x2109;");
                $("#summary").text(summary);
                $("#add1").html("It feels like " + feels_like_f + " &#x2109;");
                $("#add2").append('<img src=' + image + '>');
            }
        });

    }

    // A function for changing a string to TitleCase
    function toTitleCase(str) {
        return str.replace(/\w+/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
});
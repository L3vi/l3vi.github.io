$(function () {

    (function getGeoLocation() {
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

    function getData(lat, long) {
        $.ajax({
            url: "https://api.wunderground.com/api/436f9d65036b8775/forecast/conditions/geolookup/q/" + lat + "," + long + ".json",
            dataType: "jsonp",
            success: function (data) {
                $("#cover").fadeOut(250);
                console.log(data);

                // Location Information
                let city = data['location']['city'];
                let state = data['location']['state'];
                let location = city + ", " + state;

                // Temperature Information
                let temp_f = parseInt(data['current_observation']['temp_f']);
                let temp_high_f = parseInt(data['forecast']['simpleforecast']['forecastday']['0']['high']['fahrenheit']);
                let temp_low_f = parseInt(data['forecast']['simpleforecast']['forecastday']['0']['low']['fahrenheit']);

                // Current Conditions Information
                let current_wind = data['current_observation']['wind_string'];
                let current_precip = data['current_observation']['precip_today_in'];

                let summary = data['current_observation']['weather'];
                let image = data['current_observation']['icon_url'];

                // Inserting information into document
                $(".city").html(location);
                $("title").prepend(location + " | ");
                $("#current_temp").html(temp_f);
                $("#current_high").html(temp_high_f);
                $("#current_low").html(temp_low_f);
                $("#current_wind").html(current_wind);
                $("#current_precip").html(current_precip + " inches");
                $("#current_image").append('<img src=' + image + '>');
                $("#current_summary").html(summary);
            }
        });
    }
});
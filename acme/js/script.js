$(function (data) {
    let navBar = $("nav ul");

    $.getJSON("/acme/js/acme.json", function (data) {
        console.log(data);
        $.each(data, function (key, value) {
            $(navBar).append("<li><a title=\"More about " + key + "\" href=\"#\">" + key + "</a></li>");
            console.log(key);
        });
    });

    $("nav").on("click", "a", function (event) {
        event.preventDefault();

        let item = $(this).text();

        $.ajax({
            url: "/acme/js/acme.json",
            dataType: "json",
            success: function (data) {
                // If the user presses the home button, everything resets
                if (item == "Home") {
                    console.log("Home sweet home...");
                    $(".wrapper").css("display", "flex");
                    $(".content").css("display", "none");
                }
                // If the user presses any of the other navigation buttons it loads the JSON into that page
                else {
                    console.log(data[item]);
                    $(".wrapper").css("display", "none");
                    $(".content").css("display", "flex");

                    $("#name").html(data[item].name);
                    $("#image").html("<img src=\"" + data[item].path + "\" alt=\"" + data[item].name + "\" >");

                    // Fill the page with the JSON information
                    $("#description").html(data[item].description);
                    $("#reviews").html("<b>Rating: </b>" + data[item].reviews);
                    $("#manufacturer").html("<b>Manufacturer: </b>" + data[item].manufacturer);
                    $("#price").html("<b>Price: </b>$" + data[item].price);

                };
            }
        })
    });
});
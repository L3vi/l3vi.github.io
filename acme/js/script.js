$(function (data) {
    let navBar = $("nav ul");
    $.getJSON("/acme/js/acme.json", function (data) {
        console.log(data);
        $.each(data, function (key, value) {
            $(navBar).append("<li>" + key + "</li>");
            console.log(key);
        });
    });
});
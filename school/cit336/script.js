$(document).ready(function(){
    $("#changeColor").click(function(){
        $("#div1").css("background-color", $("#colorInput").val());
    });
    
    $("#toggleVisibility").click(function() {
        $("#div3").fadeToggle();
    });
});

function clickMe() {
    alert("clicked");
}

function changeColor() {
    let newColor = document.getElementById('colorInput').value;
    let firstDiv = document.getElementById('div1');

    firstDiv.style.backgroundColor = newColor;
}
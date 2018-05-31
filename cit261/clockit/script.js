var interval = setInterval(testTimer, 0);

function testTimer() {
    var date = new Date();
    document.getElementById('time').innerHTML = date.toLocaleTimeString();
}
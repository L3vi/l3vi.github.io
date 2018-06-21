import Time from './time.js';

var isPressed = false;
var date1 = Date();
var date2 = Date();
var current = Date();
const timeSheet = [];
var weeklyTime = 0;
document.getElementById('toggle').addEventListener("click", toggleClock)

function toggleClock() {
    if (isPressed == false) {
        console.log("Clocked in!");
        isPressed = true;
        date1 = new Date();

        document.getElementById('toggle').innerHTML = "Clock Out";
        document.getElementById('toggle').style.backgroundColor = "red";
    } else {
        console.log("Clocked out!");
        isPressed = false;
        date2 = new Date();
        let t1 = new Time(date1, date2);

        timeSheet.push(t1);
        updateTimeSheet(t1);
        document.getElementById('toggle').innerHTML = "Clock In";
        document.getElementById('toggle').style.backgroundColor = "green";
    }
}

// Calls the timeClocked function every second to update the web page's timer.
var update = setInterval(displayTimeClockedIn, 100);

function displayTimeClockedIn() {
    current = new Date();
    var currentTime = new Time(date1, current);

    if (isPressed == true) {
        document.getElementById('time').innerHTML = currentTime.display();
    }
}

function updateTimeSheet(entry) {

    
    let timeTable = document.getElementById('timeList');

    let row = timeTable.insertRow(timeSheet.indexOf(entry));
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);

    cell1.innerHTML = entry.startDate.toDateString();
    //    Decides whether to display seconds, minutes, or hours
    let seconds = Math.floor(entry.seconds);
    let minutes = Math.floor(entry.minutes);
    if (entry.minutes < 1) {
        cell2.innerHTML = (entry.seconds == 1) ? (seconds + " Second") : (seconds + " Seconds");
    } else if (entry.hours < 1) {
        cell2.innerHTML = (entry.minutes > 2) ? (minutes + " Minutes") : (minutes + " Minute");
    } else {
        cell2.innerHTML = (Math.floor(entry.hours * 10) / 10) + " Hours";
    }
    
    weeklyTime += Math.round(entry.hours * 10) / 10
    document.getElementById('weeklyTime').innerHTML = weeklyTime;
}

var isPressed = false;
var date1 = Date();
var date2 = Date();
var current = Date();
const timeSheet = [];
var time = 0;


class Time {

    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.milliseconds = parseInt(endDate - startDate) % 1000;
        this.seconds = parseInt((endDate - startDate) / 1000) % 60;
        this.minutes = parseInt(((endDate - startDate) / 1000) / 60) % 60;
        this.hours = parseInt((((endDate - startDate) / 1000) / 60) / 60) % 60;
    }

    display() {
        console.log(((this.hours < 10) ? "0" + this.hours : this.hours) + ":" + ((this.minutes < 10) ? "0" + this.minutes : this.minutes) + ":" + ((this.seconds < 10) ? "0" + this.seconds : this.seconds));
        
        return (((this.hours < 10) ? "0" + this.hours : this.hours) + ":" + ((this.minutes < 10) ? "0" + this.minutes : this.minutes) + ":" + ((this.seconds < 10) ? "0" + this.seconds : this.seconds));
    }

}

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
        updateTimeSheet();
        document.getElementById('toggle').innerHTML = "Clock In";
        document.getElementById('toggle').style.backgroundColor = "green";
    }
}

// Calls the timeClocked function every second to update the web page's timer.
var update = setInterval(timeClocked, 100);

function timeClocked() {
    current = new Date();
    var currentTime = new Time(date1, current);
    if (isPressed == true) {
        document.getElementById('time').innerHTML = currentTime.display();
    }
}

function updateTimeSheet() {
    document.getElementById('timeList').innerHTML = "";
    for (let entry of timeSheet) {
        document.getElementById('timeList').innerHTML += "<li>" + entry.display() + "</li>";
    }
}
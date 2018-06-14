var isPressed = false;
var date1 = Date();
var date2 = Date();
var current = Date();
const timeSheet = [];


class Time {

    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.interval = (endDate - startDate);
        //        this.interval = 45296000;
        this.milliseconds = (this.interval) % 1000;
        this.seconds = (this.interval / 1000) % 60;
        this.minutes = ((this.interval / 1000) / 60) % 60;
        this.hours = (((this.interval / 1000) / 60) / 60) % 60;
    }

    display() {
        console.log(((this.hours < 10) ? "0" + parseInt(this.hours) : parseInt(this.hours)) + ":" +
            ((this.minutes < 10) ? "0" + parseInt(this.minutes) : parseInt(this.minutes)) + ":" +
            ((this.seconds < 10) ? "0" + parseInt(this.seconds) : parseInt(this.seconds)));

        return (((this.hours < 10) ? "0" + parseInt(this.hours) : parseInt(this.hours)) + ":" +
            ((this.minutes < 10) ? "0" + parseInt(this.minutes) : parseInt(this.minutes)) + ":" +
            ((this.seconds < 10) ? "0" + parseInt(this.seconds) : parseInt(this.seconds)));
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

    var weeklyTime = 0;
    let timeTable = document.getElementById('timeList');

    var row = timeTable.insertRow(timeSheet.indexOf(entry));
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = entry.startDate.toDateString();
//    Decides whether to display seconds, minutes, or hours
    if (entry.minutes < 1) {
        cell2.innerHTML = ((Math.floor(entry.seconds) == 1) ? ((Math.floor(entry.seconds)) + " Second") : ((Math.floor(entry.seconds)) + " Seconds"));
    } else if (entry.hours < 1) {
        cell2.innerHTML = ((entry.minutes > 2) ? ((Math.floor(entry.minutes)) + " Minutes") : ((Math.floor(entry.minutes)) + " Minute"));
    } else {
        cell2.innerHTML = (Math.floor(entry.hours * 100) / 100) + " Hours";
    }
    

    weeklyTime += Math.round(entry.hours * 10) / 10
    document.getElementById('weeklyTime').innerHTML = weeklyTime;
}

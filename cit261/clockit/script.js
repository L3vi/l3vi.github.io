import Time from './time.js';

var isPressed = false;
var weeklyTime = 0;
var date1 = Date();
var date2 = Date();
var current = Date();
const timeSheet = [];
let myJSON = JSON;

var entry = document.getElementById("entry");

if (document.getElementById('toggle') != null) {
    document.getElementById('toggle').addEventListener("click", toggleClock);
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
        let timeEntry = new Time(date1, date2);

        timeSheet.push(timeEntry);
        updateTimeSheet(timeEntry);
        
        localStorage.setItem("timeSheet", myJSON.stringify(timeSheet));
        
        document.getElementById('toggle').innerHTML = "Clock In";
        document.getElementById('toggle').style.backgroundColor = "green";
    }
}

function updateTimeSheet(entry) {
    
    let timeSheet = document.getElementById('timeSheet');
    
//    Working on adding list items to an unordered list
    let row = document.createElement("li");
    var cell1 = document.createElement("span");
    var cell2 = document.createElement("span");
    var cell3 = document.createElement("span");
    row.setAttribute("id", "entry");
    cell1.setAttribute("class", "entryCell");
    cell2.setAttribute("class", "entryCell");
    cell3.setAttribute("class", "entryCell");
    row.addEventListener("click", showEntry);
    
    var date = document.createTextNode(entry.startDate.toDateString());
    var time;
    var range = document.createTextNode("10:00 AM - 6:00 PM");
    
    //    Decides whether to display seconds, minutes, or hours
    let seconds = Math.floor(entry.seconds);
    let minutes = Math.floor(entry.minutes);
    
    if (entry.minutes < 1) {
        time = (parseInt(entry.seconds) == 1) ? (seconds + " Second") : (seconds + " Seconds");
    } else if (entry.hours < 1) {
        time = (entry.minutes > 2) ? (minutes + " Minutes") : (minutes + " Minute");
    } else if (entry.hours >= 1) {
        time = (Math.floor(entry.hours * 10) / 10) + " Hours";
    }
    
    cell1.appendChild(date);
    cell2.appendChild(document.createTextNode(time));
    cell3.appendChild(range);
    
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    timeSheet.appendChild(row);
    

    weeklyTime += Math.round(entry.hours * 10) / 10
    document.getElementById('weeklyTime').innerHTML = weeklyTime;
}



function showEntry() {
    if (this.scrollHeight > this.clientHeight) {
        // Shows the overflow
        this.style.overflow = "visible";
        this.style.height = "auto";
        this.style.paddingBottom = "0.5em";
        console.log("shown");
    } else if (this.scrollHeight == this.clientHeight) {
        // Hides the overflow
        this.style.overflow = "hidden";
        this.style.height = "0.75em";
        this.style.paddingBottom = "0em";
        console.log("hidden");
    };
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
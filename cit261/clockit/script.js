import Time from './time.js';

var isPressed = false;
var weeklyTime = 0;
var date1 = Date();
var date2 = Date();
var current = Date();
const timeSheet = [];
let myJSON = JSON;


if (document.getElementById('toggle') != null) {
    document.getElementById('toggle').addEventListener("touchend", toggleClock);
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
    
    // Sets unique identifier/index of entry in timeSheet
    var entryNumber = timeSheet.indexOf(entry);
    
    // Creates the html for the entry
    createEntry();
    
    // Stores empty html in a variable
    var emptyEntry = document.getElementsByClassName("entry")[entryNumber];
    
    // Populate empty html with entry data
    populateEntry(entry, emptyEntry);
    
    // Updates the weekly amount at the top
    updateTotalHours();
}

function createEntry(entryNumber) {
    let timeSheet = document.getElementById('timeSheet');
    // Creating the time entries
    let row = document.createElement("li");
    var cell1 = document.createElement("span");
    var cell2 = document.createElement("span");
    var cell3 = document.createElement("span");
    row.setAttribute("class", "entry");
    cell1.setAttribute("class", "entryCell");
    cell2.setAttribute("class", "entryCell");
    cell3.setAttribute("class", "entryCell");

    // If they press a time entry, do this function
    row.addEventListener("click", showEntry);

    var start = document.createElement("input");
    start.type = "time";

    var separator = document.createTextNode("to ");

    var end = document.createElement("input");
    end.type = "time";

    var cancelButton = document.createElement("button");
    cancelButton.innerHTML = "Cancel";
    var saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.style.backgroundColor = "green";
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.style.backgroundColor = "red";

    row.appendChild(cell1);

    row.appendChild(cell2);

    cell3.appendChild(start);
    cell3.appendChild(separator);
    cell3.appendChild(end);
    cell3.appendChild(deleteButton);
    cell3.appendChild(cancelButton);
    cell3.appendChild(saveButton);
    row.appendChild(cell3);

    timeSheet.appendChild(row);
}

function populateEntry(entry, emptyEntry) {
    var cell1 = emptyEntry.getElementsByClassName("entryCell")[0];
    var cell2 = emptyEntry.getElementsByClassName("entryCell")[1];
    var cell3 = emptyEntry.getElementsByClassName("entryCell")[2];
    var start = cell3.getElementsByTagName("input")[0];
    var end = cell3.getElementsByTagName("input")[1];
    var deleteButton = cell3.getElementsByTagName("button")[0];
    var cancelButton = cell3.getElementsByTagName("button")[1];
    var saveButton = cell3.getElementsByTagName("button")[2];
    
    var date = entry.startDate.toDateString();
    var time = "0";
    
    var seconds = Math.floor(entry.seconds);
    var minutes = Math.floor(entry.minutes);
    var hours = Math.floor(entry.hours);

    if (entry.minutes < 1) {
        time = (seconds + " Second" + ((parseInt(entry.seconds) == 1) ? '' : 's'));
    } else if (entry.hours < 1) {
        time = (minutes + " Minute" +
                ((entry.minutes > 2) ? 's' : ''));
    } else if (entry.hours >= 1) {
        time = (hours + " Hour" +
                ((entry.hours > 2) ? 's' : ''));
    }

    cell1.innerHTML = date;
    cell2.innerHTML = time;
    
    start.value =
        ((entry.startDate.getHours() < 10 ? '0' : '') +
         entry.startDate.getHours()) + ":" +
        ((entry.startDate.getMinutes() < 10 ? '0' : '') +
         entry.startDate.getMinutes());
    var startTime = start.value;
    
    end.value =
        ((entry.endDate.getHours() < 10 ? '0' : '') +
         entry.endDate.getHours()) + ":" +
        ((entry.endDate.getMinutes() < 10 ? '0' : '') +
         entry.endDate.getMinutes());
    var endTime = end.value;
    
    cell3.appendChild(document.createElement("br"));
    
    cancelButton.addEventListener("touchend", function (e) {
        // Resets the start/end values to what they were before the user started editing them.
        start.value =
            ((entry.startDate.getHours() < 10 ? '0' : '') +
             entry.startDate.getHours()) + ":" +
            ((entry.startDate.getMinutes() < 10 ? '0' : '') +
             entry.startDate.getMinutes());
        end.value =
            ((entry.endDate.getHours() < 10 ? '0' : '') +
             entry.endDate.getHours()) + ":" +
            ((entry.endDate.getMinutes() < 10 ? '0' : '') +
             entry.endDate.getMinutes());
    });

    saveButton.addEventListener("touchend", function (e) {
        // Extracts hours and minutes from input value
        entry.startDate.setHours(start.value.slice(0, 2));
        entry.startDate.setMinutes(start.value.slice(3, 5));

        entry.endDate.setHours(end.value.slice(0, 2));
        entry.endDate.setMinutes(end.value.slice(3, 5));
        
        // Updates the model (actual entry object)
        entry.update(entry.startDate, entry.endDate);
        
        // Updates the view
        updateEntry(entry, time, cell2);
    });
    
    deleteButton.addEventListener("touchend", function (e) {
        if (confirm("Are you sure you want to delete this entry?")) {
            deleteEntry(entry);
            console.log("Deleted.");     
        } else {
            console.log("Canceled.");
        }
    });
}

function updateEntry(entry, time, cell) {
    var seconds = Math.floor(entry.seconds);
    var minutes = Math.floor(entry.minutes);
    var hours = Math.floor(entry.hours);

    if (entry.minutes < 1 && entry.hours < 1) {
        time = (seconds + " Second" + ((parseInt(entry.seconds) == 1) ? '' : 's'));
    } else if (entry.hours < 1) {
        time = (minutes + " Minute" +
                ((entry.minutes > 2) ? 's' : ''));
    } else if (entry.hours >= 1) {
        time = (hours + " Hour" +
                ((entry.hours > 2) ? 's' : ''));
    }
    cell.innerHTML = time;
    updateTotalHours();
    
}

function updateTotalHours() {
    weeklyTime = 0;
    timeSheet.forEach(function(entry) {
        weeklyTime += Math.round(entry.hours * 10) / 10
        document.getElementById('weeklyTime').innerHTML = weeklyTime;
    });
}

function deleteEntry(entry) {
    var index = timeSheet.indexOf(entry);
    // Finds the timeSheet and removes this instance of HTML form it. 
    document.getElementById("timeSheet").removeChild(document.getElementsByClassName("entry")[index]);
    
    // Removes entry from timeSheet
    timeSheet.splice(index, 1);
    updateTotalHours();
}

function showEntry() {
    // as long as the user is not tapping on the time input, toggle the display of the time entry
    if (document.activeElement.tagName != "INPUT") {
        this.classList.toggle("entryDisplay");
    } else {
        console.log("Input clicked");
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

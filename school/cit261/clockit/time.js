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
    
    update(startDate, endDate) {
        this.setInterval(startDate, endDate);
        this.setMilliseconds(this.interval);
        this.setSeconds(this.interval);
        this.setMinutes(this.interval);
        this.setHours(this.interval);
    }
    
    setInterval(startDate, endDate) {
        // TODO: Validation
        this.interval = endDate - startDate;
    }
    
    setMilliseconds(interval) {
        this.milliseconds = interval % 1000;
    }
    
    setSeconds(interval) {
        this.seconds = (interval / 1000) % 60;
    }
    
    setMinutes(interval) {
        this.minutes = ((interval / 1000) / 60) % 60;
    }
    
    setHours(interval) {
        this.hours = (((interval / 1000) / 60) / 60) % 60;
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

export default Time;
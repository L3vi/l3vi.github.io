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
    
    test() {
        console.log("Hello World:)");
    }

}

export default Time;
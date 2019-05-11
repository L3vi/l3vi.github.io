export class Message {

    public id: Number;
    public subject: String;
    public message: String;
    public sender: String;

    constructor(id: Number, subject: String, message: String, sender: String) {
        this.id = id;
        this.subject = subject;
        this.message = message;
        this.sender = sender;
    }
}
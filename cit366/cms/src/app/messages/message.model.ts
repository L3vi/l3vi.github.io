export class Message {

    public id: number;
    public subject: String;
    public message: String;
    public sender: String;

    constructor(id: number, subject: String, message: String, sender: String) {
        this.id = id;
        this.subject = subject;
        this.message = message;
        this.sender = sender;
    }
}
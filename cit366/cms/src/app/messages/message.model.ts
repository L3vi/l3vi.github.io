export class Message {

    public id: number;
    public subject: string;
    public msgText: string;
    public sender: any;

    constructor(id: number, subject: string, msgText: string, sender: any) {
        this.id = id;
        this.subject = subject;
        this.msgText = msgText;
        this.sender = sender;
    }
}
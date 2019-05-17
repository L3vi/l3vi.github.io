export class Document {
    public id: Number;
    public name: String;
    public description: String;
    public url: String;
    public children: Document[];

    constructor(id: Number, name: String, description: String, url: String, children: Document[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.children = children;
    }
}
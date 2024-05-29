import slugify from "slugify";

let autoIncrement = 0;

export class Item {
    id: string;
    title: string;
    description: string;
    done: boolean = false;

    constructor(title?: string, description?: string) {
        if (title != null) {
            this.title = title;
        } else {
            this.title = "";
        }
        
        if (description != null) {
            this.description = description;
        } else {
            this.description = "";
        }

        this.id = slugify(`${this.title.slice(0, 15)}-${autoIncrement}`, {
            locale: "de"
        });

        autoIncrement++;
    }
}
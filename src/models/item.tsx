export class Item {
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
    }
}
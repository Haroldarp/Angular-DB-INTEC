export class Building{

    public courses:Array<string>;

    constructor(
        public name:string,
        public code:string
    ){
        this.courses = [];
    }
}
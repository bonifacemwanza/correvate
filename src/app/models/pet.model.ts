export interface Pet {
    id:string;
    name:string;
    category:any;
    tags:Array<object>;
    status:string;
    description?:string;
    photoUrls:Array<string>;
}

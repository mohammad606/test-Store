
export type inputTDataype = [
    {
        allQtn:number,
        client?:string,
        id:number,
        items:string[],
        noa:number,
        oop:string,
        qtn:number[]
        delete?:boolean,
        date:string
        error?:string
    }
]
export type OutDataType = [
    {
        allQtn:number,
        client:string,
        id:number,
        items:string[],
        noa:number,
        qtn:number[]
        delete?:boolean,
        date:string,
        sender:string,
    }
]

export type dataStoreType = [
    {
        box:string,
        qtn:number,
        item:string,
        id:number
    }
]

export type typeDataOrder =
    {
        allQtn:number,
        client?:string,
        date:string,
        id:number,
        items:string[],
        qtn:number[],
        sender?:string,
        noa?:number,
        delete?:boolean,
    }
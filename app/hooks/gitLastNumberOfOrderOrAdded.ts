import {dataStoreType, inputTDataype, OutDataType} from "@/app/module/dataType";


export const GitLastNumberOfOrderOrAdded = (data:inputTDataype|OutDataType|dataStoreType)=>{
    var arrayKeys:number[] = []
    data?.map((e:any)=>{
        const key = [e?.id]
        arrayKeys.push(...key)
    })
    return  arrayKeys.length?Math.max(...arrayKeys) + 1:0;
}
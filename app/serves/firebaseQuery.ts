import {get, query, ref,set,update,remove} from "firebase/database";
import {data} from "@/app/lib/firebase";
import {inputTDataype, OutDataType} from "@/app/module/dataType";



 const getData =  (dataBody:typeBody)=>{

           const db = query(ref(data,`${dataBody.path}`),dataBody.limit)
          return get(db)
               .then((s)=>{
                   const allData:any = []
                   s.forEach(ch=>{
                       allData.push(ch.val())
                   })
                   return allData
               })



}
export default getData
 interface typeBody {
     path:string,
     limit?:any
}


export const sendInputData = (dataSend:any,url:string)=>{
   return  set(ref(data, `${url}`), dataSend)
}

export const updateData = (url:string,req:any)=>{
    return update(ref(data,url),req);
}

export const deletData = (url:string)=>{
    return remove(ref(data,url));
}













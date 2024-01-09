import {updateData} from "@/app/serves/firebaseQuery";
import Swal from "sweetalert2";
import {dataStoreType} from "@/app/module/dataType";


export  const hundleAddeorReturnItems = (id:number,items:string[],qtn:number[],dataStore:dataStoreType,coc:string,type:string)=>{
    Swal.fire({
        title: "Are you sure?",
        text: `You Wont To ${type == 'remove'?'Delete':'Add'} This !!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
    }).then((result) => {
        if (result.isConfirmed) {
            const handleType = (e:any,d:any)=>{
                if(type == 'remove'){
                    return {qtn: e.qtn - d.qtn}
                }else {
                    return {qtn: e.qtn + d.qtn}
                }
            }
            dataStore.forEach(e=>{
                const mergedArrasy = items.map((key:string, index:number) => ({'name' : key ,'qtn' : qtn[index]}))
                mergedArrasy.forEach(d=>{
                    if(e.item == d.name){
                        updateData(`${coc}/Store/${e.id}`,handleType(e,d))
                        return window.location.reload()
                    }
                })
            })
        }
    });

}
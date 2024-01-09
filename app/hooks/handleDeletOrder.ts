import { ref,update} from "firebase/database";
import {data} from "@/app/lib/firebase";
import Swal from "sweetalert2";
import {dataStoreType} from "@/app/module/dataType";
const HandleDeletOrder = (allData:any,dataStore:dataStoreType,id:number,items:string[],qtn:number[],url:string,coc:string,type:string)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't Delete this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
    }).then((result) => {
        if (result.isConfirmed) {
            const HandleType = (i:any,e:any)=>{
                if(type == "order"){
                    return {qtn: Number(i.qtn) + Number(e.qtn)}
                }else {
                    return {qtn: Number(i.qtn) - Number(e.qtn)}
                }
            }
            allData.forEach((e:any)=>{
                if(e.id === id){
                    const mergedArrasy = items.map((key:string, index:number) => ({'name' : key ,'qtn' : qtn[index]}))
                    console.log(mergedArrasy)
                    mergedArrasy.map(e=>{
                        dataStore.forEach(i=>{
                            if(i.item === e.name ){
                                return   update(ref(data,`${coc}/Store/${i.id}`),HandleType(i,e));
                            }
                        })
                    })
                      update(ref(data, `${coc}/${url}/${e.id}`), {
                        delete:true
                    })
                return window.location.reload()
                }
            })
        }
    });

}

export default HandleDeletOrder
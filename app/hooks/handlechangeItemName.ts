import {dataStoreType, inputTDataype, OutDataType} from "@/app/module/dataType";
import {updateData} from "@/app/serves/firebaseQuery";
import Swal from "sweetalert2";


const HandlechangeItemName = (dataInput:inputTDataype , dataOut:OutDataType,dataStore:dataStoreType , itemOld:string,ItemNew:string,coc:string)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't Change Item Name !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
    }).then((result) => {
        if (result.isConfirmed) {
            dataInput.map(e=>{
                const items = e.items
                items.map((f,index)=>{
                    if(itemOld == f){
                        items.splice(index, 1, ItemNew);
                        return updateData(`${coc}/Input and output data/Input/${e.id}`, {items:items})
                    }
                })
            })
            dataOut.map(e=>{
                const items = e.items
                items.map((f,index)=>{
                    if(itemOld == f){
                        items.splice(index, 1, ItemNew);
                        return updateData(`${coc}/Input and output data/Output/${e.id}`, {items:items})
                    }
                })
            })
            dataStore.map(e=>{
                if(e.item == itemOld){
                    return updateData(`${coc}/Store/${e.id}`, {item:ItemNew})
                }
            })
            return window.location.reload()
        }
    });
}

export default HandlechangeItemName
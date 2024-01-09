import Swal from "sweetalert2";
import {updateData} from "@/app/serves/firebaseQuery";
import {dataStoreType, inputTDataype, OutDataType} from "@/app/module/dataType";


function replaceItemAtIndex(arr:[], index:number, newItem:number|string) {
    return [...arr.slice(0, index), newItem,...arr.slice(index + 1)];
}


const HandleEditOrder = (data:any,dataEdit:any,dataOrder:any,dataStore:dataStoreType,coc:string,typeOrder:string)=>{
    function handleTypeItem(dataOrder:any, dataEdit:any, data:any, dataStore:dataStoreType, coc:string,typeOrder:string) {
        const updatedItems = replaceItemAtIndex(dataOrder.items, dataEdit.id, data);

        const item = dataOrder.items.filter((e:any, index:number) => {
            return index == dataEdit.id
        })
        const qtnInStoreOld = dataStore.find((e) => e.item === item.toString())?.qtn;
        const qtnInStoreNew = dataStore.find((e) => e.item === data)?.qtn;
        const qtnArray = dataOrder.qtn.filter((e:any, index:number) => {
            return index == dataEdit.id
        })
        dataStore.map(e => {
            if (e.item == item.toString()) {
                if (typeOrder == 'input') {
                    return updateData(`${coc}/Store/${e.id}`, {qtn: (qtnInStoreOld?qtnInStoreOld:0) - qtnArray[0]})
                } else if (typeOrder == 'output') {
                    return updateData(`${coc}/Store/${e.id}`, {qtn: (qtnInStoreOld?qtnInStoreOld:0) + qtnArray[0]})
                }
            } else if (e.item == data) {
                if (typeOrder == 'input') {
                    return updateData(`${coc}/Store/${e.id}`, {qtn: (qtnInStoreNew?qtnInStoreNew:0) + qtnArray[0]})
                } else if (typeOrder == 'output') {
                    return updateData(`${coc}/Store/${e.id}`, {qtn: (qtnInStoreNew?qtnInStoreNew:0) - qtnArray[0]})
                }
            }
        })


        if (typeOrder == 'input') {
            updateData(`${coc}/Input and output data/Input/${dataOrder.id}/`, {items: updatedItems})
            return window.location.reload()
        } else if (typeOrder == 'output') {
            updateData(`${coc}/Input and output data/Output/${dataOrder.id}/`, {items: updatedItems})
            return window.location.reload()
        }
    }

     function handletypeQuantity() {
         const updatedItems = replaceItemAtIndex(dataOrder.qtn, dataEdit.id, Number(data));
         const allQtn = updatedItems ? updatedItems.reduce((accumulator:string|number, currentValue:string|number) => Number(accumulator) + Number(currentValue), 0) : 0;
         const itemArray = dataOrder.items.filter((e:any, index:number) => {
             return index == dataEdit.id
         })
         const item = itemArray.toString()
         const qtnInStore = dataStore.find((e) => e.item === item)?.qtn;
         const handleGetObjectPush = () => {
             if (data >= dataEdit.data) {
                 if (typeOrder == 'input') {
                     return {qtn: (qtnInStore?qtnInStore:0) + (data - dataEdit.data)}
                 } else if (typeOrder == 'output') {
                     return {qtn: (qtnInStore?qtnInStore:0) - (data - dataEdit.data)}
                 }
             } else if(dataEdit.data > data){
                 if (typeOrder == 'input') {
                     return {qtn: (qtnInStore?qtnInStore:0) - (dataEdit.data - data)}
                 } else if (typeOrder == 'output') {
                     return {qtn: (qtnInStore?qtnInStore:0) + (dataEdit.data - data)}
                 }
             }else{
                 return {qtn:0}
             }

         }
         dataStore.map(e => {
             if (e.item == item) {
                 return updateData(`${coc}/Store/${e.id}`, !!handleGetObjectPush())
             }
         })

         if (typeOrder == 'input') {
             updateData(`${coc}/Input and output data/Input/${dataOrder.id}/`, {qtn: updatedItems, allQtn: allQtn})
             return window.location.reload()
         } else if (typeOrder == 'output') {
             updateData(`${coc}/Input and output data/Output/${dataOrder.id}/`, {qtn: updatedItems, allQtn: allQtn})
             return window.location.reload()
         }
     }

     Swal.fire({
        title: "Are you sure?",
        text: "You won't to Edit it !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
    }).then((result) => {
        if (result.isConfirmed) {
            if(dataEdit.type == 'qtn'){
                return handletypeQuantity();
            }else if (dataEdit.type == 'item'){
                return handleTypeItem(dataOrder, dataEdit, data, dataStore, typeOrder, coc);
            }else if (dataEdit.type == 'sender'){
                updateData(`${coc}/Input and output data/Output/${dataOrder.id}/`, {sender:data } )
                return window.location.reload()

            }else if (dataEdit.type == 'client'){
                if(typeOrder == 'input'){
                    updateData(`${coc}/Input and output data/Input/${dataOrder.id}/`, {client:data } )
                    return window.location.reload()
                }else if(typeOrder == 'output'){
                    updateData(`${coc}/Input and output data/Output/${dataOrder.id}/`, {client:data } )
                    return window.location.reload()
                }
            }else if (dataEdit.type == 'noa'){
                if(typeOrder == 'input'){
                    updateData(`${coc}/Input and output data/Input/${dataOrder.id}/`, {noa:Number(data) } )
                    return window.location.reload()
                }else if(typeOrder == 'output'){
                    updateData(`${coc}/Input and output data/Output/${dataOrder.id}/`, {noa:Number(data) } )
                    return window.location.reload()
                }

            }
        }
    });
}

export default HandleEditOrder

import {cookies} from "next/headers";
import {AxiosCube} from "@/app/serves/axiosCube";
import ContenarOrderForItems from "@/app/commponant/orderForItem/contenarOrderforItems";
import {dataStoreType} from "@/app/module/dataType";


const OrderForItem =async ({params:{id}}:{params:{id:string[]}})=>{
    const idOrder = id[0]
    const typeOrder = id[1]
    const coc = cookies().get('token')?.value
    const cookie:string = typeof coc == 'string'?coc:'no token'

    if(typeOrder == 'input'){
        var AllInput = await AxiosCube(`${coc}/Input and output data/Input`,"GET")

    }else if(typeOrder == 'order'){
        var AllOutput =await AxiosCube(`${coc}/Input and output data/Output`,"GET")

    }
    const dataStore :dataStoreType= await AxiosCube(`${coc}/Store`,"GET")


    return (
        <>
          <ContenarOrderForItems typeOrder={typeOrder} dataOrder={typeOrder=="input"?AllInput:AllOutput} dataStore={dataStore} coc={cookie} id={idOrder}/>
        </>
    )
}

export default OrderForItem
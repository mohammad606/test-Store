import ContenarClientEditPage from "@/app/commponant/editeOrder/contenarClientEditPage";
import {AxiosCube} from "@/app/serves/axiosCube";
import {cookies} from "next/headers";



const EditeOrder =async ({params:{id}}:{params:{id:string[]}})=>{
    const idOrder = id[0]
    const typeOrder = id[1]
    const coc = cookies().get('token')?.value
    const cookie:string = typeof coc == 'string'?coc:'no token'

    if(typeOrder == 'input'){
        var AllInput = await AxiosCube(`${coc}/Input and output data/Input/${idOrder}`,"GET")

    }else if(typeOrder == 'output'){
        var AllOutput =await AxiosCube(`${coc}/Input and output data/Output/${idOrder}`,"GET")

    }

    const dataStore = await AxiosCube(`${coc}/Store`,"GET")




    return(
        <>
            <ContenarClientEditPage  typeOrder={typeOrder} dataOrder={typeOrder=="input"?AllInput:AllOutput} coc={cookie} dataStore={dataStore}/>
        </>
    )
}

export default EditeOrder
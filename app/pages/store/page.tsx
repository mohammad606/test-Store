
import ContenarClientStore from "@/app/commponant/store/contenarClientStore";
import {AxiosCube} from "@/app/serves/axiosCube";
import {cookies} from "next/headers";
import {dataStoreType, inputTDataype, OutDataType} from "@/app/module/dataType";

const Store =async ()=>{
    const coc = cookies().get('token')?.value
    const cookie:string = typeof coc == 'string'?coc:'no token'

    const dataStore :dataStoreType= await AxiosCube(`${coc}/Store`,"GET")
    const AllOutput:OutDataType =await AxiosCube(`${cookie}/Input and output data/Output`,"GET")
    const AllInput :inputTDataype= await AxiosCube(`${cookie}/Input and output data/Input`,"GET")

    return (
        <>
            <ContenarClientStore AllOutput={AllOutput} AllInput={AllInput} dataStore={dataStore} coc={cookie} />
        </>
    )
}
export default Store
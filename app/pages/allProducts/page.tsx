import ContenarClientAllAdded from "@/app/commponant/allAdded/contenarClientAllAdded"
import {AxiosCube} from "@/app/serves/axiosCube";
import {cookies} from "next/headers";
import {dataStoreType, inputTDataype} from "@/app/module/dataType";

const AllProducts =async ()=>{

    const coc = cookies().get('token')?.value
    const cookie:string = typeof coc == 'string'?coc:'no token'

    const AllInput :inputTDataype= await AxiosCube(`${coc}/Input and output data/Input`,"GET")
    const dataStore :dataStoreType= await AxiosCube(`${coc}/Store`,"GET")


    return (
        <div>

            <ContenarClientAllAdded AllAdded={AllInput} dataStore={dataStore} coc={cookie}/>
        </div>
    )
}
export default AllProducts
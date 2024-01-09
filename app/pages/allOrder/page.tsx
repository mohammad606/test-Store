'use server'
import {AxiosCube} from "@/app/serves/axiosCube";
import {cookies} from "next/headers";
import ContenerClientAllOrder from "@/app/commponant/allOrder/contenerClientAllOrder";
import {dataStoreType, OutDataType} from "@/app/module/dataType";


const AllOrder = async ()=>{
    const coc = cookies().get('token')?.value
    const cookie:string = typeof coc == 'string'?coc:'no token'

    const AllOutput :OutDataType=await AxiosCube(`${coc}/Input and output data/Output`,"GET")
    const dataStore :dataStoreType= await AxiosCube(`${coc}/Store`,"GET")


    return (
        <div>
            <ContenerClientAllOrder AllOutput={AllOutput} dataStore={dataStore} coc={cookie}/>
        </div>
    )
}
export default AllOrder
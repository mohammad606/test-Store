'use server'
import {cookies} from "next/headers";
import {limitToLast} from "firebase/database";
import {dataStoreType, inputTDataype, OutDataType} from "@/app/module/dataType";
import getData from "@/app/serves/firebaseQuery";
import {AxiosCube} from "@/app/serves/axiosCube";
import ClientHome from "@/app/commponant/home/contenarClientHome";

const Home = async () =>{

    const coc = cookies().get('token')?.value
    const cookie:string = typeof coc == 'string'?coc:'no token'
    const dataSendOutput = {
        path:`${cookie}/Input and output data/Output`,
        limit:limitToLast(4)
    }
    const dataSendInput = {
        path:`${cookie}/Input and output data/Input`,
        limit:limitToLast(4)
    }
    const OutputLimit :OutDataType= await getData(dataSendOutput)
    const InputLimit:inputTDataype = await getData(dataSendInput)
    const AllOutput:OutDataType =await AxiosCube(`${cookie}/Input and output data/Output`,"GET")
    const AllInput :inputTDataype= await AxiosCube(`${cookie}/Input and output data/Input`,"GET")
    const dataStore :dataStoreType= await AxiosCube(`${cookie}/Store`,"GET")


    return (
        <ClientHome InputLimit={InputLimit} OutputLimit={OutputLimit} Input={AllInput} Output={AllOutput} coc={cookie} dataStore={dataStore}/>
    );
}
export default Home


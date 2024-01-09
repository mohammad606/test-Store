'use client'
import Nav from "@/app/share/Nav/page";
import DataTablesAdded from "./dataTables"
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {dataStoreType, inputTDataype} from "@/app/module/dataType";

const ContenarClientAllAdded = ({AllAdded,dataStore,coc}:{AllAdded:inputTDataype,dataStore:dataStoreType,coc:string})=>{
    const {data:session} = useSession({
        required:true,
        onUnauthenticated(){
            redirect('/pages/signIn')
        }
    })
return(
    <>
        <Nav/>
        <DataTablesAdded AllAdded={AllAdded} dataStore={dataStore} coc={coc}/>
    </>
)
}

export default ContenarClientAllAdded

ContenarClientAllAdded.requireAuth = true
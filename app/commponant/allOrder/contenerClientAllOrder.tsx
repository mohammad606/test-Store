'use client'
import Nav from "@/app/share/Nav/page";
import DataTablesOrder from "@/app/commponant/allOrder/dataTables";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {dataStoreType, OutDataType} from "@/app/module/dataType";


const ContenerClientAllOrder = ({AllOutput,dataStore,coc}:{AllOutput:OutDataType,dataStore:dataStoreType,coc:string})=>{
    const {data:session} = useSession({
        required:true,
        onUnauthenticated(){
            redirect('/pages/signIn')
        }
    })

    return(
        <div>
            <Nav/>
            <DataTablesOrder AllOutput={AllOutput} dataStore={dataStore} coc={coc}/>

        </div>
    )
}

export default ContenerClientAllOrder
ContenerClientAllOrder.requireAuth = true
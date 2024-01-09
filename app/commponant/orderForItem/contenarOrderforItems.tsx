'use client'
import {dataStoreType, typeDataOrder} from "@/app/module/dataType";
import Nav from "@/app/share/Nav/page";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import DataTables from "@/app/commponant/orderForItem/dataTables";


const ContenarOrderForItems =({typeOrder,dataOrder,dataStore,coc,id}:{typeOrder:string,dataOrder:typeDataOrder,dataStore:dataStoreType,coc:string,id:string})=>{
    const {data:session} = useSession({
        required:true,
        onUnauthenticated(){
            redirect('/pages/signIn')
        }
    })

    return (
        <div>
            <Nav/>
            <DataTables dataOrder={dataOrder} dataStore={dataStore} coc={coc} typeOrder={typeOrder} id={id}/>
        </div>
    )
}
export default ContenarOrderForItems

ContenarOrderForItems.requireAuth = true
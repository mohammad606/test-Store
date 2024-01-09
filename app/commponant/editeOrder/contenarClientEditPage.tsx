'use client'
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {useState} from "react";
import FormEdit from "@/app/commponant/editeOrder/formEdit";
import Nav from "@/app/share/Nav/page";
import {dataStoreType,typeDataOrder} from "@/app/module/dataType";

const ContenarClientEditPage = ({typeOrder,dataOrder,coc,dataStore}:{typeOrder:string,dataOrder:typeDataOrder,coc:string,dataStore:dataStoreType})=>{
    const {data:session} = useSession({
        required:true,
        onUnauthenticated(){
            redirect('/pages/signIn')
        }
    })
    const data = [dataOrder]

    const [show , setShow] = useState(false)
    const [dataEdit , serDataEdit] = useState({})
    const [edit ,setEdit] = useState()

    const hamdleShow =(data:number|string|undefined,type:string,id?:number)=>{
        setShow(true)
        serDataEdit({
            data,
            type,
            id
        })
    }

    const filteredStory = dataStore?.filter(e =>!dataOrder.items.includes(e.item));

    return (
        <div className='w-full h-[100vh] relative bg-black'>
            <Nav/>
            <div className='absolute top-1/2 right-1/2 w-[650px] dd:w-full p-5 border-blue-950 border-2 rounded-2xl ' style={{transform:'translate(50%, -50%)'}}>
                {data?data?.map(e=>{
                    const qtn = e.qtn
                    const items = e.items

                    return(
                        <div key={e?.id} className='w-full bg-[#1f2937] flex flex-col my-2 py-2 rounded-2xl' id={`${e?.id}`}>
                            <div className='w-full flex flex-row justify-evenly mb-2'>
                                {e.noa?<p className='w-1/2 text-center cursor-pointer hover:bg-[#374151] rounded-xl' onClick={()=>hamdleShow(e?.noa,'noa')}>NOA<span className='text-green-700 text-2xl'>#</span> : {e?.noa}</p>
                                :false}
                                <p className='w-1/2 text-center pt-2 vsm:text-[16px]'>OrderNumber : <span className='text-green-700 text-lg'>{e?.id}</span></p>
                            </div>
                            {e.client?
                                <div className='w-full flex flex-row justify-evenly mb-2'>
                                    {e.sender?<p className='w-1/2 text-center  cursor-pointer hover:bg-[#374151] rounded-xl ' onClick={()=>hamdleShow(e?.sender,'sender')}>Sender : <span className='text-green-700 text-lg'>{e?.sender}</span></p>
                                        :false}
                                    <p className='w-1/2 text-center cursor-pointer hover:bg-[#374151] rounded-xl ' onClick={()=>hamdleShow(e?.client,'client')}>Client : <span className='text-green-700 text-lg' >{e?.client}</span></p>
                                </div>:false}
                            <table>
                                <thead >
                                <tr className='w-full flex flex-row justify-evenly bg-[#374151]'>
                                    <td className='w-1/2 text-center'>ITEM</td>
                                    <td className='w-1/2 text-center'>QTY</td>
                                </tr>
                                </thead>
                                <tbody className='flex flex-row'>
                                <tr className='flex flex-col w-1/2 '>
                                    {items?.map(d=>(
                                        <td key={items.indexOf(d)} onClick={()=>hamdleShow(d,'item',items.indexOf(d))}
                                            className='mb-2 border-b-2 pl-4  cursor-pointer hover:bg-[#374151] rounded-xl'>{d}</td>
                                    ))
                                    }
                                </tr>
                                <tr className='flex flex-col w-1/2'>
                                    {qtn?.map(f=>(
                                        <td key={qtn.indexOf(f)} onClick={()=>hamdleShow(f,'qtn',qtn.indexOf(f))}
                                            className='mb-2 border-b-2 w-full text-center  cursor-pointer hover:bg-[#374151] rounded-xl'>{f}</td>
                                    ))
                                    }
                                </tr>
                                </tbody>
                                <tfoot >
                                <tr className='w-full flex flex-row'>
                                    <td className='w-1/2 pl-4 text-blue-400'>All Qtn :</td>
                                    <td className='w-1/2 text-center text-blue-400 ' >{e?.allQtn}</td>
                                </tr>
                                </tfoot>
                            </table>

                        </div>
                    )
                }):false}
            </div>
            <div className=' flex flex-col items-center
            px-6 pb-6 bg-white border-2 border-blue-950 rounded-2xl absolute top-1/2 right-1/2 z-10 w-[250px] h-[180px] ease-in-out  duration-500'
                 style={show?{transform:'translate(50%, -60%)'}:{transform:'translate(50%, -500%)'}}>
                <FormEdit dataEdit={dataEdit} setShow={setShow} setEdit={setEdit} filteredStory={filteredStory} edit={edit}
                          dataOrder={dataOrder} dataStore={dataStore} coc={coc} typeOrder={typeOrder}/>

            </div>
        </div>
    )
}

export default ContenarClientEditPage

ContenarClientEditPage.requireAuth = true




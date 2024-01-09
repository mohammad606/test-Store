'use client'
import React, {useState} from "react"
import DataTable from "react-data-table-component";
import {OutDataType,dataStoreType} from "@/app/module/dataType";
import HandleDeletOrder from "@/app/hooks/handleDeletOrder";

const DataTablesOrder = ({AllOutput,dataStore,coc}:{AllOutput:OutDataType,dataStore:dataStoreType,coc:string})=>{
    const customSortFunction = (rowA:any,rowB:any)=>{
        if(rowA.sender){
            const a = rowA.sender.toLowerCase()
            const b = rowB.sender.toLowerCase()
            return  a>b?1:b>a?-1:0
        }else if(rowA.client){
            const a = rowA.client.toLowerCase()
            const b = rowB.client.toLowerCase()
            return  a>b?1:b>a?-1:0
        }else if(rowA.date){
            const a = rowA.date
            const b = rowB.date
            return  a>b?1:b>a?-1:0
        } else if(rowA.noa){
            const a = rowA.client
            const b = rowB.client
            return  a>b?1:b>a?-1:0
        }else if(rowA.id){
            const a = rowA.client
            const b = rowB.client
            return  a>b?1:b>a?-1:0
        }
    }


    const columns:any[] = [
        {
            name:'Items',
            selector:(row:any)=>{
                const items = row.items
                return(
                    <div className='flex flex-col justify-evenly h-full' style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>
                        {items.map((e:any,key:number)=>(
                            <p key={key}>{e}</p>
                        ))}
                    </div>
                )
            },
        },
        {
            name:'Qtn',
            selector:(row:any)=>{
                const qtn = row.qtn
                return(
                    <div className='flex flex-col justify-evenly h-full' style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>
                        {qtn.map((e:any,key:number)=>(
                            <p key={key}>{e}</p>
                        ))}
                    </div>
                )
            }
        },
        {
            name:'Sender',
            sortable:true,
            selector:(row:any)=>{
                return(
                    <p style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>{row.sender}</p>
                )
            },
            sortFunction:customSortFunction,
            style:{
                paddingTop:"15px"
            }
        },
        {
            name:'Client',
            sortable:true,
            selector:(row:any)=>{
                return(
                    <p style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>{row.client}</p>
                )
            },
            sortFunction:customSortFunction,
            style:{
                paddingTop:"15px"
            }
        },
        {
            name:'Date',
            sortable:true,
            selector:(row:any)=>{
                return(
                    <p style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>{row.date}</p>
                )
            },
            sortFunction:customSortFunction,
            style:{
                paddingTop:"15px"
            }
        },
        {
            name:'Noa',
            sortable:true,
            selector:(row:any)=>{
                return(
                    <p style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>{row.noa}</p>
                )
            },
            sortFunction:customSortFunction,
            style:{
                paddingTop:"15px"
            }
        },
        {
            name:'Id',
            sortable:true,
            selector:(row:any)=>{
                return(
                    <p style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>{row.id}</p>
                )
            },
            sortFunction:customSortFunction,
            style:{
                paddingTop:"15px"
            }

        },
        {
            name:'Delete',
            selector:(row:any)=>{
                return(
                    <button type="button"
                            onClick={()=>{
                                return HandleDeletOrder(AllOutput,dataStore,row.id,row.items,row.qtn,`Input and output data/Output`,coc,'order')
                            }}
                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Delete</button>

                )
            },
            style:{
                padding:'0px',
            }
        },


    ]

    const customStyles = {
        rows:{

            style:{
                borderWidth:'1px',
                borderStyle: 'soled',
                borderColor: '#fff',

                minHeight:'120px'
            }
        },
        headCells:{
            style: {
                backgroundColor:'#0f172a'
            }
        },
        pagination:{
            style:{
                backgroundColor:'#0f172a'
            }
        }

    }

    const [search ,setsearch] = useState('')
    const data = !search?AllOutput:AllOutput.filter(e=>{
       return  e.sender.includes(search) || e.client.includes(search)
    })
    const err = [
        {
            id:0,
            items:['no Data'],
            qtn:[0],
            sender:'no Data',
            client:'no Data',
            date : 'no Data',
            noa : 0,
            allQtn:0,
            delete:true,

        }
    ]

    // @ts-ignore
    const sheckData:OutDataType = data?data:err



    return(
     <div className='mx-8 mt-8'>
         <form className='flex flex-row bg-blue-950 w-full h-[80px] items-center pl-10 rounded-t-2xl'>
             <label htmlFor='inputSearch' className='mr-5'>Search : </label>
             <input value={search} id='inputSearch' type='text' onChange={(e)=>{setsearch(e.target.value)}}
                 className='w-[200px] h-1/2 text-black  rounded-2xl border-2 border-black mr-5 pl-4' placeholder='Sender,Client'/>
         </form>
         <DataTable
             columns={columns}
             data={sheckData}
             defaultSortFieldId={6}
             pagination
             highlightOnHover
             theme='dark'
             customStyles={customStyles}


         />
     </div>
 )
}





















export default DataTablesOrder
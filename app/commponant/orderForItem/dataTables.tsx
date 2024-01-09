
import {dataStoreType, typeDataOrder} from "@/app/module/dataType";
import HandleDeletOrder from "@/app/hooks/handleDeletOrder";
import React from "react";
import DataTable from "react-data-table-component";

const DataTables = ({dataOrder,dataStore, coc,typeOrder,id}:{dataOrder:any,dataStore:dataStoreType,coc:string,typeOrder:string,id:string})=>{

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
                                const url = typeOrder == 'order'?'Input and output data/Output':'Input and output data/Input'
                                return HandleDeletOrder(dataOrder,dataStore,row.id,row.items,row.qtn,url,coc,typeOrder)
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



    const ItemSelect = id?.replace(/%20/g, ' ');
    var allOrder:any = []
    dataOrder?.forEach((e:any)=>{
        var arrayitem =[...e.items]
        arrayitem.forEach(f=>{
            if(f == ItemSelect ){
                allOrder.push(e)
            }
        })
    })

    return(
        <div className='w-full h-full mt-8'>
            <DataTable
                columns={columns}
                data={allOrder}
                defaultSortFieldId={6}
                pagination
                highlightOnHover
                theme='dark'
                customStyles={customStyles}


            />
        </div>
    )
}
export default DataTables
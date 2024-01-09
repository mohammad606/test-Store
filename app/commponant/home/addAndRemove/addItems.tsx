import {useState} from "react";
import {sendInputData} from "@/app/serves/firebaseQuery";
import {hundleAddeorReturnItems} from "@/app/hooks/hundleAddeorReturnItems";
import {GitLastNumberOfOrderOrAdded} from "@/app/hooks/gitLastNumberOfOrderOrAdded";
import Swal from "sweetalert2";
import {dataStoreType, inputTDataype} from "@/app/module/dataType";


const AddItems = ({InputLimit,coc,dataStore}:{InputLimit:inputTDataype,coc:string,dataStore:dataStoreType})=>{
    const [addData , setAddData] = useState<addDataType>({
        OperationType:'',
        item:'',
        qtn:0,
        date:'',
        noa:0,
        client:''
    })
    const handleChange = (e:any)=> setAddData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    const [arrayOfItems , setArrayOfItems] = useState<string[]>([])
    const [arrayOfQtn, setArrayOfQtn] = useState<number[]>([])
    let{OperationType, item, qtn, date,noa,client}= addData
    const handelAddToOrder = (e:any) => {
        Swal.fire({
            position: "top-start",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
        });
        e.preventDefault()
        setArrayOfItems([...arrayOfItems,item])
        setArrayOfQtn([...arrayOfQtn,Number(qtn)])
    }


    const largestNumber:number =  GitLastNumberOfOrderOrAdded(InputLimit)

    const allQtn = arrayOfQtn?arrayOfQtn.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0):0;



    const dataSend:sendDataType = {
        id:largestNumber,
        oop:OperationType,
        items:arrayOfItems,
        qtn:arrayOfQtn,
        date:date,
        noa:Number(noa),
        client:client,
        allQtn:allQtn
    }
    const dataOnArray:sendDataType[] = [dataSend]

   const HandleAddToDatabase = (e:any)=>{
        e.preventDefault()
       sendInputData(dataSend,`${coc}/Input and output data/Input/${dataSend.id}`)
       hundleAddeorReturnItems(dataSend.id,dataSend.items,dataSend.qtn,dataStore,coc,'add')

   }





    return(
        <>
            <h1 className='text-black mt-4 ml-4'>Add Items</h1>
            <form className='flex flex-col mx-3 mt-5 max-h-[600px]'>
                <div className='flex flex-col my-6 border-b-2 border-blue-900 '>
                    <label htmlFor="OperationType" className='text-blue-950'>Operation Type :</label>
                    <select name="OperationType" id="OperationType" className='text-black border-black border-2 rounded-xl pl-3 my-2' onChange={handleChange} required>
                        <option></option>
                        <optgroup label="الهملية">
                            <option value="أنتاج">انتاج</option>
                            <option value="مرتجع">مرتجع</option>
                        </optgroup>
                    </select>
                </div>

                <div className='flex flex-col my-4 border-b-2 border-blue-900'>
                    <label htmlFor="date" className='text-blue-950'>Date</label>
                    <input type="date" id='date' name='date' className='text-black border-black border-2 rounded-xl px-3 my-2' onChange={handleChange} required />
                </div>
                {OperationType == "مرتجع"?
                    <>
                        <div className='flex flex-col my-4 border-b-2 border-blue-900'>
                            <label htmlFor='client' className='text-blue-950'>Client:</label>
                            <input id='client' className='text-black border-black border-2 rounded-xl pl-3 my-2' name='client' onChange={handleChange} placeholder='client...' type='text'/>
                        </div>
                        <div className='flex flex-col my-4 border-b-2 border-blue-900'>
                            <label htmlFor='noa' className='text-blue-950'>Noa<span className='text-green-700'>#</span>:</label>
                            <input id='noa' className='text-black border-black border-2 rounded-xl pl-3 my-2' name='noa' onChange={handleChange} placeholder='noa...' type='text'/>
                        </div>
                    </>:false}
                <div className='flex flex-col my-4 border-b-2 border-blue-900'>
                    <label htmlFor="item" className='text-blue-950'>item :</label>
                    <select name="item" id="item" className='text-black border-black border-2 rounded-xl pl-3 my-2'
                            onChange={handleChange}  required>
                        <option ></option>
                        <optgroup label="Items : ">
                            {dataStore?.map(e=>(
                                <option value={e.item} key={e.id}>{e.item}</option>
                            ))}
                        </optgroup>
                    </select>
                </div>
                <div className='flex flex-col my-4 border-b-2 border-blue-900'>
                    <label htmlFor="quantity" className='text-blue-950'>Quantity :</label>
                    <input type="number" id='quantity' name='qtn' className='text-black border-black border-2 rounded-xl pl-3 my-2 '
                           onChange={handleChange} placeholder='Quantity ...' required />
                </div>
                <div className='flex flex-row justify-center items-center my-2'>
                    <button
                        onClick={(e)=>{handelAddToOrder(e)}}
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                        Added
                    </button>

                </div>
                <div className='flex flex-col'>
                    {dataOnArray?.map(e=>{
                        const items = e.items
                        const qtn = e.qtn
                        return(
                            <div className='w-full bg-[#1f2937] ' key={e.id}>
                                <div className='w-full flex flex-row justify-between px-3'>
                                    <h1>{e.oop}</h1>
                                    <h1>{e.date}</h1>
                                </div>
                                <table className='w-full'>
                                    <thead >
                                    <tr className='w-full flex flex-row justify-evenly bg-[#374151]'>
                                        <td className='w-1/2 text-center'>ITEM</td>
                                        <td className='w-1/2 text-center'>QTY</td>
                                    </tr>
                                    </thead>
                                    <tbody className='flex flex-row'>
                                    <tr className='flex flex-col w-1/2 '>
                                        {items?.map(e=>(
                                            <td className='mb-2 border-b-2 pl-4'>{e}</td>
                                        ))
                                        }
                                    </tr>
                                    <tr className='flex flex-col w-1/2'>
                                        {qtn?.map(e=>(
                                            <td className='mb-2 border-b-2 w-full text-center'>{e}</td>
                                        ))
                                        }
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        )})}
                </div>
                <div className='flex flex-row justify-center items-center my-2'>
                    <button type="submit"
                            onClick={HandleAddToDatabase}
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                        Save
                    </button>

                </div>
            </form>
        </>
    )
}

export default AddItems


interface addDataType {
    OperationType:string,
    item:string,
    qtn:number,
    date:string,
    noa?:number,
    client?:string,


}
interface sendDataType {
    oop:string,
    items:string[],
    qtn:number[],
    date:string,
    noa?:number,
    client?:string,
    id:number,
    allQtn:number
}
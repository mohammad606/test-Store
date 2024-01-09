import {useState} from "react";
import {sendInputData} from "@/app/serves/firebaseQuery";
import {GitLastNumberOfOrderOrAdded} from "@/app/hooks/gitLastNumberOfOrderOrAdded";
import {dataStoreType} from "@/app/module/dataType";



const AddItems = ({dataStore,coc}:{dataStore:dataStoreType,coc:string})=>{
    const [inputData,setInputData] = useState({
        item:'',
        box:0,
        qtn:0
    })

    const handleChange = (e:any) => setInputData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const {item,box,qtn} = inputData

    const largestNumber = GitLastNumberOfOrderOrAdded(dataStore)




    const dataSend = {
        item:item,
        box:box,
        qtn:Number(qtn),
        id:largestNumber
    }

    return(
        <div className='w-[300px]  h-[344px] mt-5 px-4 py-2 border-2 border-blue-950 rounded-2xl flex flex-col'>

            <h1 className='my-3 text-2xl'>Add Items :</h1>

           <form className='flex flex-col'>

               <div className='my-2 flex flex-col' >
                   <label htmlFor='item'>Item Name :</label>
                   <input type='text' id="item" name='item' className='border-2 border-black rounded-xl pl-3 text-black' placeholder='Name...' onChange={handleChange}/>
               </div>
               <div className='my-2 flex flex-col'>
                   <label htmlFor='box'>In the box :</label>
                   <input type='number' id="box" name='box' className='border-2 border-black rounded-xl pl-3 text-black' placeholder='box...' onChange={handleChange}/>
               </div>
               <div className='my-2 flex flex-col'>
                   <label htmlFor='qtn'>Qtn :</label>
                   <input type='number' id="qtn" name='qtn' className='border-2 border-black rounded-xl pl-3 text-black' placeholder='qtn...' onChange={handleChange}/>
               </div>
               <div className='my-2 flex flex-col'>
                   <button type="submit"
                           onClick={(e)=> {
                             return  sendInputData(dataSend,`${coc}/Store/${dataSend.id}`)
                           }}
                           className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                       Save
                   </button>
               </div>
           </form>

        </div>
    )
}

export default AddItems
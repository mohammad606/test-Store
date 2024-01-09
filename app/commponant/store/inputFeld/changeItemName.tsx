import {dataStoreType, inputTDataype, OutDataType} from "@/app/module/dataType";
import {useState} from "react";
import HandlechangeItemName from "@/app/hooks/handlechangeItemName";


const ChangeItemName = ({coc,dataStore,AllOutput,AllInput}:{dataStore:dataStoreType,coc:string,AllOutput:OutDataType,AllInput:inputTDataype})=>{
    const [dataInput , setDataInput] = useState({
        item:'',
        name:''
    })

    const handleChange = (e:any) => setDataInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));


    return (
        <div className='w-[300px]  h-[344px] mt-5   px-4 py-2 border-2 border-blue-950 rounded-2xl flex flex-col'>

            <h1 className='text-2xl my-3'>Change Item Name : </h1>
            <form className='flex flex-col justify-between h-full'>
                <div className='my-2 flex flex-col'>
                    <label htmlFor='item'>Item : </label>
                    <select name="item" id="item" onChange={handleChange} className='text-black border-black border-2 rounded-xl pl-3 my-2'
                            required>
                        <option ></option>
                        <optgroup label="Items : ">
                            {dataStore?.map(e=>(
                                <option value={e.item} key={e.id}>{e.item}</option>
                            ))}
                        </optgroup>
                    </select>
                </div>
                <div className='my-2 flex flex-col'>
                    <label htmlFor='name'>New Name : </label>
                    <input type='text' id='name' name='name' onChange={handleChange}  required className='pl-2 border-2 border-black rounded-2xl text-black ' placeholder='Qtn ... '/>
                </div>
                <div className='my-2 flex flex-col'>
                    <button type="submit"
                            onClick={(e)=>
                              {
                                  e.preventDefault()
                                  HandlechangeItemName(AllInput,AllOutput,dataStore,dataInput.item,dataInput.name,coc)

                              }
                             }
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                        Save
                    </button>
                </div>
            </form>

        </div>
    )

}

export default ChangeItemName
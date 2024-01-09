import HandleEditOrder from "@/app/hooks/handleEditOrder";
import {dataStoreType} from "@/app/module/dataType";


const FormEdit = ({dataEdit, setShow, setEdit, filteredStory, edit, dataOrder, dataStore, coc,typeOrder}:
                      {dataEdit:any, setShow:any, setEdit:any, filteredStory:any, edit:string|number|undefined, dataOrder:any, dataStore:dataStoreType, coc:string,typeOrder:string})=>{

    return (
        <>
            <div className='relative w-full flex justify-end'>
                <p className='text-2xl text-black w-4 cursor-pointer' onClick={()=>setShow(false)}>X</p>
            </div>
            <label htmlFor='item' className='text-blue-950'>{dataEdit.type}</label>
            {dataEdit.type == 'item'?
                <select name="item" id="item" className='text-black border-black border-2 rounded-xl pl-3 w-full'
                        onChange={(e)=>setEdit(e.target.value)}  required>
                    <option ></option>
                    <optgroup label={`Items : `}>
                        {filteredStory?.map((e:any)=>(
                            <option value={e.item} key={e.id}>{e.item}</option>
                        ))}
                    </optgroup>
                </select>
                :
                <input type='text' id='item' onChange={(e)=>setEdit(e.target.value)}
                       className='border-2 pl-4 text-black border-black rounded-2xl w-full' placeholder={`${dataEdit.data}`}/>
            }
            <button type="button"
                    onClick={()=>HandleEditOrder(edit,dataEdit,dataOrder,dataStore,coc,typeOrder)}
                    className="my-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Save Edit
            </button>
        </>
    )
}

export default FormEdit

interface dataEditType  {
    data:string|number|undefined,
    type:string,
    id?:number
}
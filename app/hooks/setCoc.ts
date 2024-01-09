'use client'


import axios, {AxiosError} from "axios";

export default function createCookie(data: string) {
    const handletoken = async ()=>{
        try{

          return   await axios.post('https://test-store-virid.vercel.app/api', {id:`${data}`})

        }catch(e){
            return e as AxiosError

        }
    }
    return  handletoken()
}

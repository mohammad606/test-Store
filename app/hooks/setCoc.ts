'use client'


import axios, {AxiosError} from "axios";

export default function createCookie(data: string) {
    const handletoken = async ()=>{
        try{

          return   await axios.post('http://localhost:3000/api', {id:`${data}`})

        }catch(e){
            return e as AxiosError

        }
    }
    return  handletoken()
}

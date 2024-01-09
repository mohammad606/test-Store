
import {serialize} from "cookie";

export const POST = async (req:Request) =>{
    const body = await req.json()
   if(body.id == 'delete'){
       const ser = serialize("token",'',{
           httpOnly:true,
           sameSite:'strict',
           maxAge:60*60*24,
           path:'/'

       })
       const respons = {
           message : 'added'
       }
       return new Response(JSON.stringify(respons),{
           status:200,
           headers:{"Set-Cookie":ser}
       })
   }else {
       const token = body.id
       const ser = serialize("token",token,{
           httpOnly:true,
           sameSite:'strict',
           maxAge:60*60*24,
           path:'/'

       })
       const respons = {
           message : 'added'
       }

       return new Response(JSON.stringify(respons),{
           status:200,
           headers:{"Set-Cookie":ser}
       })
   }


}



















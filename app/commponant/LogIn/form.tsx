"use client"
import style from "../../cssModules/logIn.module.css"
import {signIn,} from "next-auth/react";
import {useState} from "react";



const FormLogIn = ()=>{
    const [email , setEmail ] = useState('')
    const [password ,setPassword] = useState('')

    return(
        <form >
            <div className={style.userBox}>
                <input type="email" name="email" onChange={e=>setEmail(e.target.value)} autoComplete='off' required />
                <label htmlFor="">Email</label>
            </div>
            <div className={style.userBox}>
                <input type="password" name="password" onChange={e=>setPassword(e.target.value)}  autoComplete='off' required />
                <label htmlFor="">Password</label>
            </div>
            <button onClick={(e)=> {
                e.preventDefault()
                 return signIn('credentials', {email, password, redirect: true, callbackUrl: '/pages/home'})
            }}
                    disabled={!email || !password}
                    className={style.btn} type="submit">Send</button>
        </form>
    )
}








export default FormLogIn
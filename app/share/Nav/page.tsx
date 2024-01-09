"use client"

import Links from "@/app/commponant/nav/links";

const Nav = ()=>{


    return(
        <div className='w-full h-[70px] bg-slate-900
                       flex flex-row justify-center items-center z-4  msm:justify-between'>
            <div className='w-1/4 h-full flex items-center justify-center msm:w-2/4 '>
                <h1 className='text-center text-2xl font-bold'>My Store</h1>
            </div>
           <Links />

        </div>
    )
}
export default Nav
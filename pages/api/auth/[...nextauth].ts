import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {auth} from "@/app/lib/firebase"
import { getAuth, getIdToken } from "firebase/auth"
export const authOptions:any = {
    pages:{
        signIn:'/signIn'
    },
    providers:[
        CredentialsProvider({
            name:'Credentials',
            credentials:{},

            async authorize(credentials):Promise<any>{
                return await signInWithEmailAndPassword(auth,(credentials as any).email || "", (credentials as any).password || "")
                    .then(usercredentials =>{

                            if(usercredentials.user){
                                return usercredentials.user
                            }
                            return auth
                        }
                    ).catch(err=>console.log(err))

            }
        })
    ],
    callbacks:{
        async jwt({token,user,session}:{token:any,user:any,session:any}){
            if(user){
                return{
                    ...token,
                    uid:user.uid
                }
            }
          return token

        },
        async session({session,token,user}:{token:any,user:any,session:any}){
            return {
                ...session,
                user:{
                    ...session.user,
                    uid:token.uid
                }
            }
            return session
        }
    }
}

export default NextAuth(authOptions)



'use server'

import { signIn } from "@/auth";
import { connectDB } from "@/lib/dbConnect";
import { CredentialsSignin } from "next-auth";
import { useRouter } from "next/navigation";

const  loginHanlder  = async (email:string, password:string) => {

  
    connectDB();
    try {
        await signIn('credentials', {
            email,
            password,
        });

    } catch (error:any) {     
       const err = error as CredentialsSignin
      return err.cause
    }
  };


export { loginHanlder }
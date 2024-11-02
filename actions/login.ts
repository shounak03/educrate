'use server'

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

const  loginHanlder  = async (email:string, password:string) => {

    try {
        const login = await signIn('credentials', {
            email,
            password,
        });
        
        console.log("login");
        console.log(login);
        return login  
    } catch (error:any) {
      const err = error as CredentialsSignin
      return err.cause
    }
  };


export { loginHanlder }
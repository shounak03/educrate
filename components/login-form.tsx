'use client'

import { CardContent } from "./ui/card"
import { Button } from "./ui/button"
import {Input} from '@/components/ui/input'
import { loginSchema } from "@/schema"
import { useState } from "react"
import { loginHanlder } from "@/actions/login"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"
import {useRouter,redirect} from "next/navigation"

export const LoginForm = ()=>{
    const router = useRouter()
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");    
    return(
        <form action={async (formData)=>{
            const email = formData.get("email");
            const password = formData.get("password");
            if(!email || !password)
                return setError("Please provide both email and password")
            const validatedData = loginSchema.parse({ email, password });
            console.log(validatedData);
            const error = await loginHanlder(validatedData.email,validatedData.password);

            console.log(error);
            
            if(!error){

                setSuccess("Logged-In Successfully")
                redirect("/courses")
            }
            else{
                return setError("something went wrong");
            }
        }}>
        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            name='email'
          />
          <Input
            type="password"
            placeholder="Password"
            name='password'
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full">Sign In</Button>
        </CardContent>
      </form>
    )
}
import React, { useState } from 'react';
import { signIn } from '@/auth';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc"
import { LoginForm } from '@/components/login-form';

const Page = () => {
 
  return (
    <Card className="w-[350px]">
      <CardHeader className="text-2xl font-bold text-center">Login</CardHeader>
      <LoginForm/>
      <CardFooter className="flex flex-col space-y-4">
        <Separator />
        <div className="flex items-center w-full gap-x-2">
          <Button size="lg" className="w-full" variant={"outline"}>
            <FcGoogle className="h-5 w-5" />
          </Button>
        </div>
        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Page;
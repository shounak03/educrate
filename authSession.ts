import { auth } from "./auth";



export const user = async () =>{
    const session = await auth();
    const role = session?.user?.role;

    return role;
}
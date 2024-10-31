
import { auth } from "@/auth";
import Header from "@/components/Header";
import { signOut, useSession } from "next-auth/react";



export default async function Dashboard() {
    
    // const {data:session} = useSession();
    //get data
    const session = await auth();
    console.log("session " + session);

   

    if (!session) {
        
        return <div>No estás autenticado</div>; // Cambia a la redirección directa si es necesario
    }

    return (
        <div>
        <Header session= {session}></Header>
            <p>Bienvenido, {session.user?.email}</p>
            
        </div>
    );
}
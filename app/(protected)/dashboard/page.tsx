import { auth } from "@/auth";



export default async function Dashboard() {
    
    //get data
    const session = await auth();
   

    if (!session) {
        return <div>No estás autenticado</div>; // Cambia a la redirección directa si es necesario
    }

    return (
        <div>
            <p>Bienvenido, {session.user?.email}</p>
        </div>
    );
}
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";


interface Params {
    params: { id: string }
    id: string
}




export async function GET(request:Request, {params}:Params) {   
    try {
        const id = await params.id;
    

    if (!id) {
        return NextResponse.json(
            { message: "El ID de la tarea no fue proporcionado." },
            { status: 400 }
        );
    }

        const task = await prisma.task.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        return NextResponse.json(task);
    
    } catch (error) {
       if (error instanceof Error) {
           return NextResponse.json(
               {
                   message: error.message,
               },
               {
                   status: 500,
               }
           );
       } 
    }
}




export async function PUT(request: Request, { params }: Params) {
  try {
    const id = await params.id;
    const data = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "El ID de la tarea no fue proporcionado." },
        { status: 400 }
      );
    }

    const { assignedUserIds, ...taskData } = data;

    // Actualiza la tarea en la tabla `tasks`
    const task = await prisma.task.update({
      where: {
        id: parseInt(id)
      },
      data: taskData
    });

    // Elimina las asignaciones actuales de la tarea
    await prisma.taskAssignment.deleteMany({
      where: {
        taskId: parseInt(id)
      }
    });

    // Crea las nuevas asignaciones de usuarios a la tarea
    await prisma.taskAssignment.createMany({
      data: assignedUserIds.map((userId: number) => ({
        taskId: parseInt(id),
        userId: userId
      }))
    });

    return NextResponse.json(task);

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

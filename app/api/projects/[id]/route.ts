import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";


interface Params {
    params: { id: string }
}

export async function GET(request:Request, {params}:Params){
    try {
        const id = await params.id;
        const project = await prisma.projects.findUnique({
            where: {id: parseInt(id)}
        });
        return NextResponse.json(project);
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


export async function PUT (request:Request, {params}:Params){
    try {

       const id = await params.id;
       
        
       if (!id) {
            return NextResponse.json(
                { message: "El ID del proyecto no fue proporcionado." },
                { status: 400 }
            );
        }

        const projectId = parseInt(params.id);
        const data = await request.json();

        const project = await prisma.projects.update({
            where: {id: projectId},
            data
        });

        return NextResponse.json(project);

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

export async function DELETE(request:Request, {params}:Params) {
    try {

          if (!params?.id) {
            return NextResponse.json(
                { message: "El ID del proyecto no fue proporcionado." },
                { status: 400 }
            );
        }
        
         const projectId = parseInt(params.id);

          await prisma.projects.delete({
            where: {id:projectId}
          });

          return NextResponse.json(
            { message: ' Project deleted'},
            {status: 200}
          );


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
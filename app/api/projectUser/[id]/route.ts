
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";


interface Params {
    params: { id: string }
}

export async function GET(request:Request, {params}:Params) {
    try {
        const id = await params.id;

         if (!id) {
            return NextResponse.json(
                { message: "El ID del proyecto no fue proporcionado." },
                { status: 400 }
            );
        }
        
        const project_users = await prisma.projects_users.findMany({
           include: {
               projects: true,
               user: {
                select: {
                    id: true,
                    email: true,
                    fullName: true
                }
               }
           },
           where: {projectId: parseInt(id)}
        });

        return NextResponse.json(project_users);
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
        const id = await params.id;

        if (!id) {
            return NextResponse.json(
                { message: "El ID del proyecto no fue proporcionado." },
                { status: 400 }
            );
        }

        const body = await request.json();
        const {userId} = body;

       if(!userId) {    
        return NextResponse.json(
            { message: "El ID del usuario no fue proporcionado." },
            { status: 400 }
        );
       }     
        const projectUsers = await prisma.projects_users.delete({
            where: {
                userId_projectId: {
                    projectId: parseInt(id),
                    userId: parseInt(userId)
                    }
                }
        });
        return NextResponse.json(projectUsers);
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
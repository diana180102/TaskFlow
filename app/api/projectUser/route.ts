import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    try {
        const {projectId, userId, role} = await request.json();

        // Validación para asegurarse de que el rol sea válido
        if (!["ADMIN", "USER"].includes(role)) {
            return NextResponse.json(
                { message: "Rol inválido. Debe ser ADMIN o USER." },
                { status: 400 }
            );
        }
         
         // Creación del registro con el rol proporcionado 
        const project_user = await prisma.projects_users.create({
            data: {
                projectId,
                userId,
                role
            }
        });

        return NextResponse.json(project_user);
    } catch (error) {
        {
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
}

export async function GET() {
    try {
        const project_users = await prisma.projects_users.findMany(
            {
              include: 
              {
                projects: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        image:true
                    }
                }
              }
            });
        return NextResponse.json({
            status: 200,
            project_users
        });

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


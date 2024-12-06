
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";


interface Params {
    params: { id: string }
}

export async function GET(request:Request, {params}:Params) {
    try {
        const id = await params.id;
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
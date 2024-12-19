import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

interface Params {
    params: {
        id: string;
    };
}
export async function GET(request:Request, {params}:Params) {
    
    
    
    try {
        const tasks = await prisma.taskAssignment.findMany({
            where: {taskId: parseInt(params.id)},
            include: {
                task: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true
                    }
                },
               

            }
        });
        
        
        
        
        
        return NextResponse.json({
            status: 200,
            tasks,
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

  
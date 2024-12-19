import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const tasks = await prisma.task.findMany();
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






export async function POST(request: Request) {
    try {
        const { title, description, status, projectId, priority, assignedUserIds } = await request.json();

        const task = await prisma.task.create({
            data: {
                title,
                description,
                status,
                priority,
                projectId,
                assignedTo: {
                    create: assignedUserIds.map((userId: number) => ({
                        user: {
                            connect: { id: userId }
                        }
                    })),
                },
            },
            
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

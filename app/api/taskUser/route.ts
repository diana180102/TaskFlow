import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";


export async function GET(request: Request) {  

    try {
        
        const taskUser = await prisma.taskAssignment.findMany({
              include: {
                  task: true,
                  user: {
                      select: {
                          id: true,
                          email: true,
                          fullName: true
                      }
                  }
              }
        });

        return NextResponse.json(taskUser);

    } catch (error) {
        
    }
}
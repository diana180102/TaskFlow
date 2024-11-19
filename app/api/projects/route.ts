import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";


export async function GET (){
     try {
        const projects = await prisma.projects.findMany();

        return NextResponse.json({
            status: 200,
            projects,
        });
     } catch (error) {
        if (error instanceof Error){
            return NextResponse.json(
                {
                    message: error.message
                },
                {
                    status: 500,
                }
            );
        }
     }
}

export async function POST(request:Request) {
    try {
        const {name, description} = await request.json();

        const project = await prisma.projects.create({
            data:{
                name, 
                description
            }
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


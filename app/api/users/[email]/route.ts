import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

interface Params {
    params: { email: string }
}

export async function GET(request: Request, { params }: Params) {
    try {

        const user = await prisma.users.findFirst({
            where: {
                email: params.email
            }
        });

        if (!user)
            return NextResponse.json(
                { message: "user not found" },
                { status: 400 }
            );

        return NextResponse.json(user)
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
        const {password, role}= await request.json();

        const user = await prisma.users.update({
            where: {
                email: params.email
            },
            data:{
             password,
             role
            }

            
        });

        if (!user)
            return NextResponse.json(
                { message: "user not found" },
                { status: 400 }
            );

        return NextResponse.json(user);
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

export async function DELETE(request: Request, { params }: Params) {
    try {
        const user = await prisma.users.delete({
            where: {
                email: params.email
            }
        });

        if (!user)
            return NextResponse.json(
                { message: "user not found" },
                { status: 400 }
            );

        return NextResponse.json(user);
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
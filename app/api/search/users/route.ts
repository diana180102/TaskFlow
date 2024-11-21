import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    if(!query || query.trim() === ''){
        return NextResponse.json({ message: 'Query parameter is required' }, { status: 400 });
    }

    try {
        const users = await prisma.user.findMany({
            where:{
                OR: [
                    {fullName:{ contains:query, mode: 'insensitive' }},
                    {email: {contains: query, mode: 'insensitive'}}
                ],
            },
            select: {id: true, email: true, fullName: true},
            take: 3
        });

        return NextResponse.json(users, {status:200});
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
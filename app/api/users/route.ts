import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import bcrypt from 'bcrypt';


export async function GET() {
  try {
    const users = await prisma.users.findMany();
    return NextResponse.json({
      status: 200,
      users,
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
    const { fullName, email, password} = await request.json();
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await prisma.users.create({
      data: {
        fullName,
        email,
        password:hashedPassword,
        
        
      },
    });

    const {password:_, ...userResponse} =user;

    return NextResponse.json(userResponse);
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



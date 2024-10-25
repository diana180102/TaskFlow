import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";


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
    const { username, email, password } = await request.json();
    const user = await prisma.users.create({
      data: {
        username,
        email,
        password,
      },
    });

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



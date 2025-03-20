import prisma from "@/libs/prisma";

import { NextResponse } from "next/server";

export async function POST(req:Request){
    try {
        const {user, imageUrl} = await req.json();

       

        if(!user|| !imageUrl){
            return NextResponse.json(
            {
                error: "Missing data"
            },{
                status:400
            });
        }

        //Save image
        const updatedUser = await prisma.user.update({
            where: {email: user},
            data:  {image: imageUrl}
        });

        return NextResponse.json(
            {
                message: "Update Image",
                user: updatedUser
            },
            {
                status: 200
            }

        )
    } catch (error) {
          return NextResponse.json(
            { error: "Error in save image" }, 
            { status: 500 }
            );
    }
}
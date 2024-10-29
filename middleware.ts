
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


 
export async function middleware(request:NextRequest) {
    //get TOKEN
    const session = await getToken({req:request, secret:process.env.AUTH_SECRET})
   
    
    if(!session){
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return NextResponse.next();

}

export const config ={
    matcher: ['/protected/:path*']
}
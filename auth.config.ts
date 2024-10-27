
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";

 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers:[
    
    CredentialsProvider ({
       name: "Credentials",
       credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      }, 
       async authorize(credentials, _req) {
          const user = await  prisma.users.findUnique({
            where: {email: credentials?.email}
          });

          return user;
      },
    },),

    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET as string
   })
 ],
} satisfies NextAuthOptions
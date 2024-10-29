// auth.ts
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from 'bcrypt';
import { AuthOptions, getServerSession } from "next-auth";

export const authOptions: AuthOptions = {
   providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, _req) {
                console.log("Credenciales recibidas:", credentials);

                const user = await prisma.users.findUnique({
                    where: { email: credentials?.email },
                });

                if (!user) {
                    console.log("Usuario no encontrado");
                    return null;
                }

                const passwordValid = await bcrypt.compare(credentials?.password || "", user.password);

                if (passwordValid) {
                    console.log("Autenticación exitosa para:", user.email);
                    return { ...user, id: user.id.toString() };
                } else {
                    console.log("Contraseña inválida para:", user.email);
                    return null;
                }
            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/auth/login',
    },

    callbacks: {
        //generate token
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
             
            return token;
        },
        //data of session after of JWT
        async session({ session, token }: {session:any, token:any}) {
            if (session.user) {
                session.user.email = token.email as string;
                session.user.id = token.id as string;
                session.user.name = token.name; 
            }
            
            return session;
        },
    },
    
};

export async function auth() {
    return await getServerSession(authOptions);
}

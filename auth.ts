// auth.ts
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from 'bcrypt';
import { AuthOptions, getServerSession } from "next-auth";
import { addUser } from "./services/userService";
import Github from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";


export const authOptions: AuthOptions = {
   adapter: PrismaAdapter(prisma),
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
            authorization: {
                params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
                },
        },
            
        },
        
        ),

        Github({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!,
        })
    ],
    debug:process.env.NODE_ENV ==='development' ,
    
    session: { strategy: "jwt" },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/auth/login',
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }    
            return token;
        },

        async session({ session, token }: { session: any, token: any }) {
            if (session.user) {
                session.user.email = token.email as string;
                session.user.id = token.id as string;
            }
            return session;
        },

        async signIn({ user, account, profile }) {
    console.log("Intentando iniciar sesión con Google:", { account, profile }); console.log("Usuario:", user);
        console.log("Cuenta:", account);
        console.log("Perfil:", profile);
       if (account?.provider === "google") {
          try {
            // Revisa si el usuario ya está registrado con Google
            const existingProvider = await prisma.users.findUnique({
                where: {
                    email: profile?.email,
                   },
                
            });

            console.log("Resultado de búsqueda del proveedor:", existingProvider);

            if (existingProvider) {
                console.log("Usuario ya registrado:", existingProvider.email);
                return true;
            }

            console.log("No se encontró un usuario, creando uno nuevo.");
            // Crear el usuario en la tabla de usuarios
            

            const newUser = await addUser({
                    fullName: profile?.name?.toString() ?? '',
                    email: profile?.email?.toString() ?? '',
                    password: await bcrypt.hash("NO_PASSWORD_AUTH", 10)
            });

            console.log("Nuevo usuario creado:",newUser);

            // Asocia el proveedor de autenticación con el nuevo usuario
             await prisma.account.crea

            console.log("Proveedor Google vinculado con el nuevo usuario");
            return true;

        } catch (error) {
            console.error("Error durante el registro con Google:", error);
            return false;
        }
    }

    return true; // Retorna true para otros proveedores de autenticación si existen.
}




    },
};

export async function auth() {
    return await getServerSession(authOptions);
}

// auth.ts
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { AuthOptions, getServerSession, Session } from "next-auth";

import Github from "next-auth/providers/github";
import { User } from "./types/users";





export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Login with credentials
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        console.log("Credenciales recibidas:", credentials);

        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) {
          console.log("Usuario no encontrado");
          return null;
        }

        const passwordValid = await bcrypt.compare(
          credentials?.password || "",
          user.password
        );

        if (passwordValid) {
          console.log("Autenticación exitosa para:", user.email);
          return { ...user, id: user.id.toString() };
        } else {
          console.log("Contraseña inválida para:", user.email);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),

    Github({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  debug: process.env.NODE_ENV === "development",

  session: { 
    strategy: "jwt",
    maxAge: 60 * 60 * 24
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async jwt({ token, user, profile, account }) {
      const users = user as unknown as User;

     
      

     if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = users.fullName;
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 
        
     }

     if (account?.provider && profile) {
      token.picture = profile.picture || null;
      token.email = profile.email;
      token.name = profile.name || "Usuario sin nombre";
    }
      return token;
    },

    async session({ session, token }: { session: Session; token: any }) {
      if (session.user) {
        session.user.image = token.picture;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.expires = token.exp as string;
      }

      return session;
    },

    async signIn({ user, account, profile }) {
        console.log("Perfil del usuario:", profile);

      const pass = await bcrypt.hash("NO_PASSWORD_AUTH", 10);

      if (account?.provider === "google" || account?.provider === "github") {
        
        
        const existingUser = await prisma.user.findUnique({
          where: { email: profile?.email },
        });

        if (!existingUser) {
          const data = {
            fullName: profile?.name || "Usuario Google",
            email: profile?.email || "",
            password: pass,
            image: profile?.image
          };

          if (!data.email) {
            console.log("No se recibió un email válido del perfil de Google.");
            return false;
          }

          try {
            const newUser = await prisma.user.create({ data });
            

            await prisma.account.create({
              data: {
                userId: newUser.id,
                providerType: "oauth",
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            });
          } catch (error) {
            console.error("Error al crear usuario o cuenta:", error);
            return false;
          }
        }
      }

      return true;
    },
  },
};

export async function auth() {
  return await getServerSession(authOptions);
}

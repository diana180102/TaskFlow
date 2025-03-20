
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
        id: string;
        email: string;
        name: string;
        image: string;
        };
    }

    interface Profile {
        iss?: string;
        azp?: string;
        aud?: string;
        sub: string;
        email: string;
        email_verified?: boolean;
        at_hash?: string;
        name: string;
        picture: string;
        given_name?: string;
        family_name?: string;
        iat?: number;
        exp?: number;
    }

}
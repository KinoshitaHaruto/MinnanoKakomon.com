
import NextAuth, { DefaultSession } from "next-auth";

// Extend the built-in session types
declare module "next-auth" {
    interface Session {
        user: {
            universityId?: string | null;
        } & DefaultSession["user"];
    }

    interface User {
        universityId?: string | null;
    }
}

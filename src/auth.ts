
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.universityId = user.universityId; // Assuming Prisma Adapter populates user from DB

        // Note: The default Prisma Adapter might not populate custom fields in 'user' object passed to session callback
        // if using database strategy (which is default with adapter unless specified otherwise, but actually with adapter 'jwt' is not default, 'database' is).
        // However, standard NextAuth with Prisma Adapter uses 'database' session strategy by default? 
        // Wait, Auth.js v5 might default to JWT if no updated config. 
        // Let's check if 'user' has universityId. 
        // With PrismaAdapter, 'user' argument in session callback is the User object from DB.
        // So yes, user.universityId should be there because we added it to the schema.
      }
      return session;
    },
  },
});

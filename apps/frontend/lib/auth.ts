import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.email = profile.email as string | undefined;
        token.name = profile.name as string | undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = session.user || {} as any;
        session.user.email = token.email as string | undefined;
        session.user.name = token.name as string | undefined;
      }
      return session;
    },
  },
};



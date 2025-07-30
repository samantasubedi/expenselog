import React from "react";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";

export const authoptions: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUBCLIENTID!,
      clientSecret: process.env.GITHUBCLIENTSECRET!,
    }),
    Google({
      clientId: process.env.GOOGLECLIENTID!,
      clientSecret: process.env.GOOGLECLIENTSECRET!,
    }),
  ],
  secret: process.env.NEXTAUTHSECRET,
};
const handler = NextAuth(authoptions);
export { handler as GET, handler as POST };

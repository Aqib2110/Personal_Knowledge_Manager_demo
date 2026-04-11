import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import {NextAuthOptions} from "next-auth"
import { prisma } from "@/lib/prisma";

export  const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
     CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // const user = await prisma.user.findUnique({
      //   where:{
      //       email:credentials?.username
      //   }
      // })

      // if (!user?.password) 
      //   {
      //   throw new Error("No user found with this email, please sign in with Google");
      //  }
      // else if (user && user.password === credentials?.password) 
      // {
      //   return user;
      // } else {
      //   // If you return null then an error will be displayed advising the user to check their details.
      //   return null;

      //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      // }
     

  if (!credentials?.username || !credentials?.password) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: credentials.username,
    },
  });

  if (!user) {
    throw new Error("No user found with this email");
  }

  if (!user.password) {
    throw new Error("Please login with Google");
  }

  const isValid = user.password === credentials.password;

  if (!isValid) {
    return null;
  }

  return user;
}

  }),
    Google({
       clientId: process.env.GOOGLE_ID!,
       clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    })
  ],
  session: { strategy: "jwt" },
 callbacks:{

async signIn({ user, account }) {
  if (account?.provider === "google") {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email! }
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: user.email!,
          name: user.name!,
          image: user.image,
          password: null,
        }
      });
    }
  }

  return true;
},
async jwt({ token, user }) {
  if (user?.email) {
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email }
    });

    if (dbUser) {
      token.id = dbUser.id;
    }
  }

  return token;
},
    async session({ session, token }) {
      (session.user as any).id = token.id;
      return session;
    }
  }
}

export default NextAuth(authOptions);
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
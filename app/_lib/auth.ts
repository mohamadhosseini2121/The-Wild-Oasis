import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";
import { getGuest } from "./data-service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: "text", name: "email" },
        password: { type: "password", name: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        let user = await prisma.guest.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          const hashedPassword = await bcrypt.hash(password, 12);
          const user = await prisma.guest.create({
            data: {
              email: credentials.email as string,
              password: hashedPassword,
              fullName: "",
              countryFlag: "",
              nationalID: "",
              nationality: "",
            },
          });
          return {
            email: user.email,
            name: user.fullName,
            id: user.id.toString(),
          };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          email: user.email,
          name: user.fullName,
          id: user.id.toString(),
        };
      },
    }),
  ],
  callbacks: {
    authorized: ({ request, auth }) => {
      return !!auth?.user;
    },
    session: async ({ session, token }) => {
      const user = await getGuest(session.user.email);
      if (user) {
        session.user.id = user.id.toString();
        session.user.name = user.fullName;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

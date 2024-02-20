import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma as any),
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            id: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }
                const cookieStore = cookies();
                const supabase = createClient(cookieStore);


                // const user = await prisma.user.findUnique({
                //     where: {
                //       email: credentials.email,
                //     },
                //   });

                const { data: user, error: existingError } = await supabase
                    .from('users')
                    .select('*')
                    .eq('email', credentials.email)
                    .single();

                if (!user || !(await compare(credentials.password, user.password!))) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                };
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey,
                };
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET
};

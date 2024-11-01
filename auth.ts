import NextAuth, { CredentialsSignin } from "next-auth"

import bcrypt from 'bcryptjs';
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schema";
import { User } from "./models/user.model";
import connectDB from "./lib/dbConnect";




export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { type: "email", label: "Email" },
                password: { type: "password", label: "Password" }
            },
            async authorize(credentials) {
                try {
                    await connectDB();
                    const { email, password } = await loginSchema.parseAsync(credentials);

                    if (!email || !password) {
                        throw new CredentialsSignin({ cause: "Please provide both email and password" });
                    }

                    const user = await User.findOne({ email });

                    if (!user) {
                        throw new CredentialsSignin({ cause: "User not found" });
                    }
                    if(!user.password)
                        throw new CredentialsSignin({ cause: "User not found" });


                    const isPasswordValid = await bcrypt.compare(password, user.password );

                    if (!isPasswordValid) {
                        throw new CredentialsSignin({ cause: "Invalid email or password" });
                    }

                    return user;
                } catch (error: any) {
                    throw new CredentialsSignin({ cause: error.message });
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
            }
            return session;
        }
    },
    secret: process.env.AUTH_SECRET,
})

import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schema";
import { connectDB, client } from "./lib/dbConnect";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import User from "./models/user.model";
import { log } from "console";

// declare module "next-auth" {
//     interface User {
//       role?: string
//     }
//     interface Session {
//       user: {
//         role?: string
//         id?: string
//       } 
//     }
//   }


export const { handlers, signIn, signOut, auth } = NextAuth({
    // adapter: MongoDBAdapter(client),
    providers: [

        Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }),

        Credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { type: "email", label: "Email" },
                password: { type: "password", label: "Password" }
            },
            async authorize(credentials) {
                const { email, password } = await loginSchema.parseAsync(credentials);
                
                const user = await User.findOne({ email })
                if (!user) {
                    throw new CredentialsSignin("User not found")
                }

                if (!user.password) {
                    throw new CredentialsSignin("Password not found")
                }

                const isPasswordValid = await bcrypt.compare(password, user.password)

                if (!isPasswordValid) {
                    throw new CredentialsSignin("Incorrect Email or Password")
                }
                console.log(user);

                return { id: user._id, email: user.email, role:user.role };
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;  // Add user role to token
            }
            return token;
        },
        async session({ session, token }) {
            // Add user ID and role to session
            session.user.id = token.id;
            session.user.role = token.role;  // Add role to session
            return session;
        },
    },
    
    pages: {
        signIn: '/auth/login',
    },
    secret: process.env.AUTH_SECRET,
});
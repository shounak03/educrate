// app/api/auth/login/route.ts
import { connectDB } from "@/lib/dbConnect"
import User from "@/models/user.model"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    await connectDB()
    
    const { email, password } = await req.json()
    
    const user = await User.findOne({ email })
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 401 }
      )
    }

    if (!user.password) {
      return NextResponse.json(
        { error: "Invalid login method" },
        { status: 401 }
      )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    return NextResponse.json({
        sucess:true,
      id: user._id.toString(),
      email: user.email,
      name: user.fullname,
      role: user.role,
      message:"User logged in"

    },{status:200})
    
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
import bcrypt from 'bcryptjs';
import { prisma } from '../db/prisma.js';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { upsertStreamUser } from '../db/stream.js';


export async function signup(req: Request, res: Response) {
  const { email, password, fullName } = req.body;

  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
   
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists, please use a diffrent one" });
    }

    const idx = Math.floor(Math.random() * 100) + 1; // generate a num between 1-100
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        fullName,
        password: hashedPassword,
        profilePic: randomAvatar,
      }
    })
    try {
        await upsertStreamUser({
      id: newUser.id.toString(),
      name: newUser.fullName,
      image: newUser.profilePic || "",
    });
    console.log("Stream user upserted successfully");
    } catch (error) {
      console.error("Error upserting Stream user:", error);
    }
  
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET_KEY!, 
      { expiresIn: "7d" }); 

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ success: true, user: userWithoutPassword ,
      message : "User created successfully"
    });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    const user = await prisma.user.findUnique({
      where: { email },
    });
   

    if (!user) {
      return  res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY!, 
      { expiresIn: "7d" });
   
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ success: true, user: userWithoutPassword });


  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
 }

  export async function logout(req: Request, res: Response) {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  }

  export async function onboard(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const {fullName,location, bio } = req.body; 
      
    if (!fullName || !bio ||  !location) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !location && "location",
        ].filter(Boolean),
      });
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName,
        location,
        bio,
        isOnboarded: true,
      },
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ success: true, user: updatedUser });
    }
    
  

    catch (error) {
      console.log("Error in onboarding controller", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
   }
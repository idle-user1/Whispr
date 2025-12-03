import { type Request, type Response } from 'express';
import { prisma } from '../db/prisma.js';
export async function getMyFriends(req: Request, res: Response) {
  try {
    const userId = req.user!.id;

    

    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { userId: userId },
          { friendId: userId }
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            profilePic: true,
          }
        },
        friend: {
          select: {
            id: true,
            fullName: true,
            profilePic: true,
          }
        }
      }
    });

    // Extract the OTHER person in each friendship
    const friends = friendships.map(friendship => 
      friendship.userId === userId ? friendship.friend : friendship.user
    );

    res.status(200).json(friends);
  } catch (error) {
    console.error("Error in getMyFriends controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getRecommendedUsers (req: Request, res: Response) { 
    try {
        const userId = req.user.id;
        const user = req.user
       const recommendedUsers = await prisma.user.findMany({
  where: {
    AND: [
      { id: { not: userId } }, 
      { 
      
        NOT: {
          friendOf: {
            some: {
              userId: userId
            }
          }
        }
      },
      {
        
        NOT: {
          friends: {
            some: {
              friendId: userId
            }
          }
        }
      },
      { isOnboarded: true },
    ],
  },
  select: {
    id: true,
    fullName: true,
    email: true,
    profilePic: true,
    bio: true,
    location: true,
    isOnboarded: true,
    createdAt: true,
  
  }
  
});

        res.status(200).json({ success: true, users: recommendedUsers });
    } catch (error) {
        console.error("Error in getRecommendedUsers controller", error);
        res.status(500).json({ message: "Internal Server Error at  getRecommendedUsers controller" });
    }
}
export async function sendFriendRequest(req: Request, res: Response) {
  try {
    const myId = req.user!.id;
    const recipientIdparam = req.params.id
    if (!recipientIdparam) {
      return res.status(400).json({ message: "Invalid recipient ID" });
    }
    const   recipientId = parseInt(recipientIdparam);

    if (myId === recipientId) {
      return res.status(400).json({ message: "You can't send friend request to yourself" });
    }

    const recipient = await prisma.user.findUnique({
      where: { id: recipientId },
    });

    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }
    const existingFriendship = await prisma.friendship.findFirst({ 
        where: {
            OR: [
                { userId: myId, friendId: recipientId },
                { userId: recipientId, friendId: myId }
                ]
            }
    })
    if (existingFriendship) {
        return res.status(400).json({ message: "You are already friends with this user" });
    }
    const existingRequest = await prisma.friendRequest.findFirst({
        where: {
            OR: [
                { senderId: myId, recipientId: recipientId },
                { senderId: recipientId, recipientId: myId }
            ]
        }
    })
    if (existingRequest) {
        return res.status(400).json({ message: "You have already sent a friend request to this user" });
    }
    const newRequest = await prisma.friendRequest.create({
        data: {
            senderId: myId,
            recipientId: recipientId,
            status: "pending"
        }
    })

    } catch (error) {
        console.error("Error in sendFriendRequest controller", error);
        res.status(500).json({ message: "Internal Server Error at sendFriendRequest controller" });
    }
 }

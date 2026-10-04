"use server";

import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import { initAuth } from "@/lib/auth";
import { headers } from "next/headers";

export interface PostType {
  id: string;
  date: Date;
  title: string;
  content: string[];
  author?: string;
}

export async function postBlog(post: PostType) {
  const auth = await initAuth();
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user) {
    throw new Error("Unauthorized: You must be signed in to create a post.");
  }

  try {
    await dbConnect();
    const postData = {
      ...post,
      author: session.user.name || session.user.email || "Anonymous",
    };

    const newPost = await Post.create(postData);
    console.log("Successfully created post:", newPost);
    return { success: true };
  } catch (error: any) {
    console.error("Database Error:", error);
    throw new Error(
      error.message || "Failed to save post to MongoDB database."
    );
  }
}
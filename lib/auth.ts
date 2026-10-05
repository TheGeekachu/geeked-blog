import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { dash } from "@better-auth/infra";
import dbConnect from "./mongoose";

export async function initAuth() {
  const mongooseInstance = await dbConnect();
  const client = mongooseInstance.connection.getClient();

  const baseUrl = process.env.BETTER_AUTH_URL;

  const instance = betterAuth({
    database: mongodbAdapter(client.db()),
    emailAndPassword: { enabled: true },
    baseURL: baseUrl,
    trustedOrigins: [
      "https://geeked-blog.vercel.app",
      "https://dash.better-auth.com",
      "https://*.better-auth.com",
    ],
    plugins: [dash({
      apiKey: process.env.BETTER_AUTH_API_KEY,
    })],
    secret: process.env.BETTER_AUTH_SECRET || process.env.BETTER_AUTH_API_KEY,
    advanced: {
      disableCSRFCheck: true,
      disableOriginCheck: true,
    },
  });

  return instance;
}
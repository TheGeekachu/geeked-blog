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
    trustedOrigins: baseUrl ? [baseUrl] : [],
    plugins: [dash()],
  });

  return instance;
}
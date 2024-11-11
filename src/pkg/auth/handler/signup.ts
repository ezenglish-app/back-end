import { User } from "../User.ts";
import { newErrorResponse, newSuccessResponse } from "@/response/response.ts";
import { type Context } from "hono";
import { hash } from "@ts-rex/bcrypt";
import { format } from "@formkit/tempo";
import { users } from "@/database/client.ts";
import { sign } from "hono/jwt";
import { env } from "@/env/load.ts";

export const SignUp = async (c: Context) => {
  const user: User = await c.req.json();
  user.password = hash(user.password);
  user.vocabulary = {
    new: 0,
    learning: 0,
    reviewing: 0,
    cards: {},
  };
  user.createdAt = format(new Date(), "short", "es");
  user.timeSpent = 0;

  const result = await users.insertOne(user);

  if (!result.insertedId) {
    return newErrorResponse(c, "User not created", 500);
  }

  const payload = {
    email: user.email,
    exp: Math.floor(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };

  const token = await sign(payload, env.SECRET);

  return newSuccessResponse(c, { token, user });
};

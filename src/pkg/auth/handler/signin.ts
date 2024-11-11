import { Response, User } from "../User.ts";
import { newErrorResponse, newSuccessResponse } from "@/response/response.ts";
import { type Context } from "hono";
import { verify } from "@ts-rex/bcrypt";
import { users } from "@/database/client.ts";
import { sign } from "hono/jwt";
import { env } from "@/env/load.ts";

export const SignIn = async (c: Context) => {
  const user: User = await c.req.json();

  const userFound = (await users.findOne({ email: user.email })) as User | null;

  if (!userFound || !verify(user.password, userFound.password)) {
    return newErrorResponse(c, "Invalid username or password", 401);
  }

  const payload = {
    email: user.email,
    exp: Math.floor(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };

  const token = await sign(payload, env.SECRET);
  const response: Response = { token, user: userFound };

  return newSuccessResponse(c, response);
};

import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export const newSuccessResponse = (c: Context, data: any) => {
  return c.json(
    {
      data,
    },
    200
  );
};

export const newErrorResponse = (
  c: Context,
  message: string,
  code: StatusCode
) => {
  return c.json(
    {
      message,
    },
    code
  );
};

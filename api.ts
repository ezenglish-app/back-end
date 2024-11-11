import { Hono } from "hono";

import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import vocabulary from "@/pkg/vocabulary/index.ts";
import auth from "./src/pkg/auth/index.ts";
import { serveStatic } from "hono/deno";

const app = new Hono();

// Middlewares
Deno.env.get("DENO_ENV") !== "test" && app.use(logger());
// app.use(secureHeaders())
app.use(cors());

// Routes
app.route("/auth", auth);
app.route("/vocabulary", vocabulary);

// Static files
app.use(
  "/images/*",
  serveStatic({
    root: "./static",
    onFound: (_path, c) => {
      c.header("Cache-Control", `public, immutable, max-age=31536000`);
    },
  })
);

app.use(
  "/audios/*",
  serveStatic({
    root: "./static",
    onFound: (_path, c) => {
      c.header("Cache-Control", `public, immutable, max-age=31536000`);
    },
  })
);

export default app;

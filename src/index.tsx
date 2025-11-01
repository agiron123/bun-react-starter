import { serve } from "bun";
import index from "./index.html";
import prisma from "./lib/prisma";
import { createAuthToken, verifyPassword } from "./lib/auth";
import { authenticateRequest, UnauthorizedError } from "./lib/auth-middleware";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    "/api/auth/login": {
      async POST(req) {
        try {
          const body = (await req.json()) as {
            email?: string;
            password?: string;
          };

          const email = body.email?.trim().toLowerCase();
          const password = body.password;

          if (!email || !password) {
            return new Response(JSON.stringify({ message: "Email and password are required." }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const user = await prisma.user.findUnique({ where: { email } });
          if (!user) {
            return new Response(JSON.stringify({ message: "Invalid email or password." }), {
              status: 401,
              headers: { "Content-Type": "application/json" },
            });
          }

          const passwordValid = await verifyPassword(password, user.password);
          if (!passwordValid) {
            return new Response(JSON.stringify({ message: "Invalid email or password." }), {
              status: 401,
              headers: { "Content-Type": "application/json" },
            });
          }

          const token = createAuthToken({
            sub: user.id.toString(),
            email: user.email,
          });

          return Response.json({
            token,
            user: {
              id: user.id,
              email: user.email,
              createdAt: user.createdAt,
            },
          });
        } catch (error) {
          if (error instanceof SyntaxError) {
            return new Response(JSON.stringify({ message: "Invalid JSON payload." }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          console.error("Login error", error);
          return new Response(JSON.stringify({ message: "Unexpected error during login." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },

    "/api/protected": {
      async GET(req) {
        try {
          const user = await authenticateRequest(req);
          return Response.json({
            message: "Protected content",
            user,
          });
        } catch (error) {
          if (error instanceof UnauthorizedError) {
            return new Response(JSON.stringify({ message: error.message }), {
              status: error.status,
              headers: { "Content-Type": "application/json" },
            });
          }

          console.error("Protected route error", error);
          return new Response(JSON.stringify({ message: "Unexpected error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);

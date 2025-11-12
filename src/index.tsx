import { serve } from "bun";
import index from "./index.html";
import type { CreateUserRequest, UpdateUserRequest, LoginRequest } from "./types/user";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  findUserByEmail,
  findUserByUsername,
  createToken,
  deleteToken,
} from "./store/mock-store";
import { hashPassword, verifyPassword, requireAuth, getAuthToken, errorResponse } from "./utils/auth";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET(_req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(_req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    // User CRUD routes
    "/api/users": {
      async POST(req) {
        try {
          const body = (await req.json()) as CreateUserRequest;

          // Validate required fields
          if (!body.email || !body.password || !body.username || !body.firstname || !body.lastname) {
            return errorResponse("Missing required fields", 400);
          }

          // Check if email already exists
          if (findUserByEmail(body.email)) {
            return errorResponse("Email already exists", 409);
          }

          // Check if username already exists
          if (findUserByUsername(body.username)) {
            return errorResponse("Username already exists", 409);
          }

          // Hash password
          const hashedPassword = await hashPassword(body.password);

          // Create user
          const user = {
            id: crypto.randomUUID(),
            email: body.email,
            password: hashedPassword,
            username: body.username,
            firstname: body.firstname,
            lastname: body.lastname,
            createdAt: new Date(),
          };

          createUser(user);

          // Return user without password
          const { password, ...userWithoutPassword } = user;
          return Response.json(userWithoutPassword, { status: 201 });
        } catch (error) {
          return errorResponse("Invalid request body", 400);
        }
      },
    },

    "/api/users/:id": {
      async GET(req) {
        const userId = requireAuth(req);
        if (!userId) {
          return errorResponse("Unauthorized", 401);
        }

        const id = req.params.id;
        const user = getUser(id);

        if (!user) {
          return errorResponse("User not found", 404);
        }

        // Users can only view their own profile (or we could allow all authenticated users)
        if (userId !== id) {
          return errorResponse("Forbidden", 403);
        }

        // Return user without password
        const { password, ...userWithoutPassword } = user;
        return Response.json(userWithoutPassword);
      },

      async PUT(req) {
        const userId = requireAuth(req);
        if (!userId) {
          return errorResponse("Unauthorized", 401);
        }

        const id = req.params.id;

        // Users can only update their own profile
        if (userId !== id) {
          return errorResponse("Forbidden", 403);
        }

        const user = getUser(id);
        if (!user) {
          return errorResponse("User not found", 404);
        }

        try {
          const body = (await req.json()) as UpdateUserRequest;

          // If email is being updated, check if it's already taken
          if (body.email && body.email !== user.email) {
            if (findUserByEmail(body.email)) {
              return errorResponse("Email already exists", 409);
            }
          }

          // If username is being updated, check if it's already taken
          if (body.username && body.username !== user.username) {
            if (findUserByUsername(body.username)) {
              return errorResponse("Username already exists", 409);
            }
          }

          // Hash password if it's being updated
          const updates: Partial<typeof user> = { ...body };
          if (body.password) {
            updates.password = await hashPassword(body.password);
          }

          const updatedUser = updateUser(id, updates);
          if (!updatedUser) {
            return errorResponse("Failed to update user", 500);
          }

          // Return user without password
          const { password, ...userWithoutPassword } = updatedUser;
          return Response.json(userWithoutPassword);
        } catch (error) {
          return errorResponse("Invalid request body", 400);
        }
      },

      async DELETE(req) {
        const userId = requireAuth(req);
        if (!userId) {
          return errorResponse("Unauthorized", 401);
        }

        const id = req.params.id;

        // Users can only delete their own profile
        if (userId !== id) {
          return errorResponse("Forbidden", 403);
        }

        const user = getUser(id);
        if (!user) {
          return errorResponse("User not found", 404);
        }

        deleteUser(id);
        return Response.json({ message: "User deleted successfully" });
      },
    },

    // Authentication routes
    "/api/auth/login": {
      async POST(req) {
        try {
          const body = (await req.json()) as LoginRequest;

          if (!body.emailOrUsername || !body.password) {
            return errorResponse("Email/username and password are required", 400);
          }

          // Find user by email or username
          let user = findUserByEmail(body.emailOrUsername);
          if (!user) {
            user = findUserByUsername(body.emailOrUsername);
          }

          if (!user) {
            return errorResponse("Invalid credentials", 401);
          }

          // Verify password
          const isValid = await verifyPassword(body.password, user.password);
          if (!isValid) {
            return errorResponse("Invalid credentials", 401);
          }

          // Create token
          const token = createToken(user.id);

          // Return token and user (without password)
          const { password, ...userWithoutPassword } = user;
          return Response.json({
            token: token.token,
            user: userWithoutPassword,
          });
        } catch (error) {
          return errorResponse("Invalid request body", 400);
        }
      },
    },

    "/api/auth/logout": {
      async POST(req) {
        const token = getAuthToken(req);
        if (!token) {
          return errorResponse("Unauthorized", 401);
        }

        const deleted = deleteToken(token);
        if (!deleted) {
          return errorResponse("Token not found", 404);
        }

        return Response.json({ message: "Logged out successfully" });
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

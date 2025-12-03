import type { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User; // Now TypeScript knows req.user exists
    }
  }
}
export {}; // Ensure this file is treated as a module
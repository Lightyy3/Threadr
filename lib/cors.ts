/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/cors.ts
import Cors from "cors";

// Initialize CORS middleware
const cors = Cors({
  origin: "http://localhost:3000", // Allow requests from localhost
  methods: ["GET", "POST"], // Allow only GET and POST methods
});

// Helper function to run the middleware
export const runCors = (req: any, res: any) => {
  return new Promise((resolve, reject) => {
    cors(req, res, (result: unknown) => {
      if (result instanceof Error) {
        reject(result);
      }
      resolve(result);
    });
  });
};

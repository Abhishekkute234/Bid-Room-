import User from "../../../helpers/models/User";
import connect from "../../../helpers/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import logger from "@/helpers/logger";

// Define input validation schema
const userSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.string().min(10),
});

// Define error messages
enum ErrorMessages {
  REQUIRED_FIELDS = "All fields are required",
  DUPLICATE_EMAIL = "Email already exists",
  UNKNOWN_ERROR = "Unknown error",
}

// Add MongoDB error interface
interface MongoError extends Error {
  code?: number;
}

export async function POST(request: Request) {
  try {
    // Connect to the database
    await connect();

    // Parse and validate the request body
    const body = await request.json();
    const validationResult = userSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        error: "Validation Error",
        message: ErrorMessages.REQUIRED_FIELDS,
        details: validationResult.error.errors,
      }, { status: 400 });
    }

    const { email, firstName, lastName, phoneNumber } = validationResult.data;

    // Create the user
    const user = await User.create({
      email,
      firstName,
      lastName,
      phoneNumber,
    });

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error: unknown) {
    logger.error("Error creating user:", error);

    // Handle MongoDB duplicate key error with proper type checking
    if (
      error instanceof Error &&
      (error as MongoError).code === 11000
    ) {
      return NextResponse.json({
        success: false,
        error: "Duplicate Error",
        message: ErrorMessages.DUPLICATE_EMAIL,
      }, { status: 400 });
    }

    // Handle other errors
    return NextResponse.json({
      success: false,
      error: "Server Error",
      message: error instanceof Error ? error.message : ErrorMessages.UNKNOWN_ERROR,
    }, { status: 500 });
  }
}
import User from "../../../helpers/models/User";
import connect from "../../../helpers/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connect();

    const body = await request.json();
    const { email, firstName, lastName, phoneNumber } = body;

    if (!email || !firstName || !lastName || !phoneNumber) {
      return NextResponse.json({
        success: false,
        error: "All fields are required"
      }, { status: 400 });
    }

    const user = await User.create({
      email,
      firstName,
      lastName,
      phoneNumber,
    });

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating user:", error);

    // Type guard for MongoDB duplicate key error
    interface MongoError {
      code?: number;
    }

    if (
      error &&
      typeof error === 'object' &&
      (error as MongoError).code === 11000
    ) {
      return NextResponse.json({
        success: false,
        error: "Email already exists"
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 400 });
  }
}

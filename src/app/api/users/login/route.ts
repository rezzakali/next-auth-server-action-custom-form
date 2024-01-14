import dbConnect from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { email, password } = reqBody;

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required!' },
        { status: 400 }
      );
    }
    if (!password) {
      return NextResponse.json(
        { message: 'Password is required!' },
        { status: 400 }
      );
    }

    await dbConnect();

    //   find user from the database
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized user!' },
        { status: 401 }
      );
    }

    // check if password matched or not
    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return NextResponse.json(
        { message: 'Invalid user details' },
        { status: 400 }
      );
    }

    // generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    const response = NextResponse.json({
      message: 'User logged in successfully!',
      token,
    });

    response.cookies.set('token', token, { httpOnly: true });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

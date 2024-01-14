'use server';

import { signIn } from '@/auth';
import dbConnect from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcrypt from 'bcrypt';

type Inputs = {
  email: string;
  password: string;
};

type InputsSignup = {
  name: string;
  email: string;
  password: string;
};

// signin (SERVER ACTION)

// export async function signin(previousState: any, formData: Inputs) {
//   //   const { email, password } = Object.fromEntries(formData) as {
//   //     email: string;
//   //     password: string;
//   //   };
//   const { email, password } = formData || {};

//   try {
//     if (!email) {
//       return { status: false, message: 'Email is required' };
//     }
//     if (!password) {
//       return { status: false, message: 'Password is required' };
//     }

//     await dbConnect();

//     //   find user from the database
//     const user = await User.findOne({ email });

//     if (!user) {
//       return { status: false, message: 'Unauthorized user' };
//     }

//     // check if password matched or not
//     const isMatchPassword = await bcrypt.compare(password, user.password);

//     if (!isMatchPassword) {
//       return { status: false, message: 'Invalid user credentials' };
//     }

//     // generate token
//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
//       expiresIn: '7d',
//     });

//     cookies().set('token', token);
//     return { status: true, message: 'Logged in successfully!' };
//   } catch (error: any) {
//     return { status: false, message: error.message };
//   }
// }

export async function signin(previousState: any, formData: Inputs) {
  const { email, password } = formData || {};
}

// sing up
export async function signup(previousState: any, formData: InputsSignup) {
  const { name, email, password } = formData || {};

  try {
    if (!name) {
      return { status: false, message: 'Name is required' };
    }
    if (!email) {
      return { status: false, message: 'Email is required' };
    }
    if (!password) {
      return { status: false, message: 'Password is required' };
    }

    await dbConnect();

    //   find user from the database
    const user = await User.findOne({ email });

    if (user) {
      return {
        status: false,
        message: 'User already exist with this email address',
      };
    }
    // hashed passwod
    const hashedPassword = await bcrypt.hash(password, 10);

    await dbConnect();
    // new user create
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
    });

    // save the user to db
    await newUser.save();

    return { status: true, message: 'Sign up success!' };
  } catch (error: any) {
    return { status: false, message: error.message };
  }
}

export const handleGithubLogin = async () => {
  'use server';
  await signIn('github');
};

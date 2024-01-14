import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { authConfig } from './auth.config';
import dbConnect from './dbConfig/dbConfig';
import User from './models/userModel';

type InputsSignup = {
  email: string;
  password: string;
};

const login = async (credentials: InputsSignup) => {
  try {
    dbConnect();
    const user = await User.findOne({ email: credentials.email });

    if (!user) throw new Error('Wrong credentials!');

    const isPasswordCorrect = bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error('Wrong credentials!');

    return user;
  } catch (err: any) {
    console.log(err);
    throw new Error('Failed to login!');
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // CredentialsProvider({
    //   async authorize(credentials) {
    //     try {
    //       const user = await login(credentials);
    //       return user;
    //     } catch (err) {
    //       return null;
    //     }
    //   },
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'github') {
        dbConnect();
        try {
          const user = await User.findOne({ email: profile?.email });

          if (!user) {
            const newUser = new User({
              username: profile?.login,
              email: profile?.email,
            });

            await newUser.save();
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});

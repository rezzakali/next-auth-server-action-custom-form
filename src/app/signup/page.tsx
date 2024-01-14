import Signup from '@/pages/Signup/Signup';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nextjs Full-Stack - Signup',
  description: 'Signup Page',
};

const page = () => {
  return <Signup />;
};

export default page;

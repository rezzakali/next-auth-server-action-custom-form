import { Metadata } from 'next';
import Signin from '../../pages/Signin/Signin';

export const metadata: Metadata = {
  title: 'Nextjs Full-Stack - Signin',
  description: 'Signin Page',
};

const page = () => {
  return <Signin />;
};

export default page;

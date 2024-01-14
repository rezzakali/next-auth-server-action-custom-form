import { Typography } from '@/components/MTComponents/MTComponents';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <Typography>Not Found</Typography>
      <Typography>Could not find requested resource</Typography>
      <Typography>
        <Link href="/">Go Home</Link>
      </Typography>
    </div>
  );
};
export default NotFound;

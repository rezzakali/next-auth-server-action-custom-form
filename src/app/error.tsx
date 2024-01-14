'use client';

import { Button, Typography } from '@/components/MTComponents/MTComponents';

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <Typography>Something went wrong!</Typography>
      <Button variant="text" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
};

export default Error;

'use client';

import { Button } from '@/components/MTComponents/MTComponents';
import { useFormStatus } from 'react-dom';

const SubmitButton = () => {
  const { pending } = useFormStatus();
  console.log('pending', pending);

  return (
    <Button type="submit" className="mt-6" fullWidth aria-disabled={pending}>
      {pending ? 'Loading...' : 'Sign In'}
    </Button>
  );
};

export default SubmitButton;

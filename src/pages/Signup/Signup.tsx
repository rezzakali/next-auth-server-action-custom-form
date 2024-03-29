'use client';

import { signup } from '@/app/actions';
import {
  Button,
  Card,
  Input,
  Typography,
} from '@/components/MTComponents/MTComponents';
import InputErrorText from '@/components/Shared/InputErrorText';
import Link from 'next/link';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Inputs = {
  email: string;
  password: string;
  name: string;
};
const Signup = () => {
  const [state, formAction] = useFormState(signup, undefined);

  useEffect(() => {
    const { status, message } = state || {};
    if (status) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }, [state]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => formAction(data);

  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="md"
              label="Name"
              {...register('name', {
                required: 'Name is required',
              })}
              required
            />
            {errors.name && (
              <InputErrorText errorMessage={errors?.name.message} />
            )}
            <Input
              size="md"
              label="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid email address',
                },
              })}
              required
            />
            {errors.email && (
              <InputErrorText errorMessage={errors?.email.message} />
            )}
            <Input
              type="password"
              size="md"
              label="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be 6 characters',
                },
              })}
              required
            />
            {errors.password && (
              <InputErrorText errorMessage={errors?.password.message} />
            )}
          </div>

          <Button
            type="submit"
            className="mt-6"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Loading...' : 'Sign Up'}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{' '}
            <Link
              href="/signin"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Signup;

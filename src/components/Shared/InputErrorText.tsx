import { Typography } from '@/components/MTComponents/MTComponents';

interface InputErrorTextProps {
  errorMessage: string | undefined;
}

const InputErrorText = ({ errorMessage }: InputErrorTextProps) => {
  return (
    <Typography color="red" className="-mt-6">
      {errorMessage}
    </Typography>
  );
};

export default InputErrorText;

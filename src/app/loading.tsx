import { Spinner } from '@/components/MTComponents/MTComponents';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Spinner className="h-12 w-12" />
    </div>
  );
};
export default Loading;

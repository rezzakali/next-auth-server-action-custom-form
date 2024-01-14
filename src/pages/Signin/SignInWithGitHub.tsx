import { signIn } from '@/app/actions';

const SignInWithGitHub = () => {
  const handleSignInWithGithub = async () => {
    await signIn('github');
  };

  return (
    <form action={handleSignInWithGithub}>
      <button>Sign in with GitHub</button>
    </form>
  );
};

export default SignInWithGitHub;

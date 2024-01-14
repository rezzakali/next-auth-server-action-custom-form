'use client';

import { handleGithubLogin } from '@/app/actions';

const SignInWithGitHub = () => {
  return (
    <button onClick={() => handleGithubLogin()}>Sign in with GitHub</button>
  );
};

export default SignInWithGitHub;

import React from 'react';
import { useUser, SignIn } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const Auth = () => {
  const { isSignedIn } = useUser();

  // If the user is signed in, redirect to home to avoid looping.
  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container">
      <SignIn path="/auth" routing="path" signUpUrl="/auth" />
    </div>
  );
};

export default Auth;


'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun } from 'lucide-react';
import { FirebaseError } from 'firebase/app';

// This is the component for the Google Sign-In button
function GoogleSignInButton() {
  const auth = useAuth();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // The onAuthStateChanged listener in AuthLayout will handle the redirect
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        // Handle specific Firebase errors (e.g., popup closed by user)
        console.error('Firebase sign-in error:', error.message);
      } else {
        console.error('An unknown error occurred during sign-in:', error);
      }
    }
  };

  return (
    <Button onClick={handleSignIn} className="w-full">
      Sign in with Google
    </Button>
  );
}


export default function LoginPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);


  // Do not render the login form if the user is already authenticated
  // or if we are still loading the user state.
  if (isUserLoading || user) {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
                <p>Loading...</p>
            </div>
        </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Sun className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="font-headline text-2xl">Welcome to DreamCoin</CardTitle>
          <CardDescription>Sign in to continue to your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleSignInButton />
        </CardContent>
      </Card>
    </div>
  );
}

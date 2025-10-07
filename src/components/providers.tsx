"use client";

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FirebaseProvider } from "@/firebase/provider";
import { initializeFirebase } from "@/firebase";

const { firebaseApp, firestore, auth } = initializeFirebase();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      firestore={firestore}
      auth={auth}
    >
      <TooltipProvider delayDuration={0}>
        {children}
        <Toaster />
      </TooltipProvider>
    </FirebaseProvider>
  );
}

import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { AuthLayout } from '@/components/layout/auth-layout';

const APP_NAME = "Dreamtoke";
const APP_DESCRIPTION = "Dreamtoke – Crypto Trading & Rewards Platform";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#111827",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Audiowide&family=Poppins:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Providers>
          <FirebaseClientProvider>
            <AuthLayout>
              <DashboardLayout>
                {children}
              </DashboardLayout>
            </AuthLayout>
          </FirebaseClientProvider>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000319',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "Anderson's Portfolio",
  description: "Frontend developer specialized in creating responsive and intuitive digital experiences with React and modern web technologies.",
  robots: "index, follow",
  verification: {
    google: "tu-verification-code",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: "Anderson's Portfolio"
  },
  applicationName: "Anderson's Portfolio",
  formatDetection: {
    telephone: false
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/metaIcon.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
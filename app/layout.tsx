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
  title: {
    template: '%s | Anderson Lopez Portfolio',
    default: "Anderson Lopez | Frontend Developer"
  },
  description: "Frontend Developer specialized in React ecosystem, creating responsive and intuitive digital experiences",
  keywords: ["Frontend Developer", "React", "JavaScript", "TypeScript", "Web Development"],
  authors: [{ name: "Anderson Lopez" }],
  openGraph: {
    title: "Anderson Lopez | Frontend Developer",
    description: "Creating seamless user experiences with modern web technologies",
    type: "website",
    locale: "en_US",
    url: "https://portfolio-deploy-ebon.vercel.app/"
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
      <meta name="viewport" content="width=device-width, initial-scale=1" />
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
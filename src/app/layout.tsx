import type { Metadata } from "next";
import { Irish_Grover } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/context/auth";
import { UserDataProvider } from "@/context/user-data";

const irishGrover = Irish_Grover({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-irish-grover",
});

export const metadata: Metadata = {
  title: "JC App",
  description: "J Counter App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${irishGrover.variable}`}>
        <AuthProvider>
          <UserDataProvider>{children}</UserDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

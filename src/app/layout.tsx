import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { TopBar } from "@/components/topBar";
import { Nav } from "@/components/nav";
import { fetchUserData } from "@/lib/fetchUserData";
import { log } from "console";
import { auth } from "@clerk/nextjs/server";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Best.Watch",
  description: "Find your next favorite watch",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className="lg:grid grid-cols-12 min-h-screen bg-[#1a1a1a] text-white  gap-4 px-10    ">
            <Nav />
            <div className=" col-span-10  py-10 flex flex-col gap-16 ">
              <TopBar />
              {children}
            </div>
          </main>
          <Toaster position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}

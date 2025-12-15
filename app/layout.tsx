"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import Navigationbar from "@/components/navigationbar";
import { ToastContainer } from "react-toastify";
// @ts-ignore
import "./globals.css";

import Sessionproviderwrapper from "./providers/sessionprovider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = new QueryClient();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer
          position="top-center"
          autoClose={1500}
          theme="colored"
        ></ToastContainer>
        <Sessionproviderwrapper>
          {" "}
          <QueryClientProvider client={client}>{children}</QueryClientProvider>
        </Sessionproviderwrapper>
      </body>
    </html>
  );
}

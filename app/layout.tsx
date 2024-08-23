import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";
import React from "react";
import { ToastContainer } from "react-toastify";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";
import { ModalProvider } from "@/components/ModalProvider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

// export const viewport: Viewport = {
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ],
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen flex flex-col bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <ModalProvider>
            <div className="relative flex flex-col h-screen">
              <TheHeader />
              <ToastContainer />
              <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                {children}
              </main>
              <TheFooter />
            </div>
          </ModalProvider>
        </Providers>
      </body>
    </html>
  );
}

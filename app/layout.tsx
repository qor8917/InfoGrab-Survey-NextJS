import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "🐣 출산율 설문조사",
  description: "남녀 그리고 연령별 출산에 대한 인식 조사",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased font-sans bg-[url('/7.png')] text-white bg-no-repeat bg-cover flex justify-center items-center min-h-[100vh] bg-fixed",
          mono.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}

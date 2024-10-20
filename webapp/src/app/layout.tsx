import { Inter as FontSans } from "next/font/google";
import { ApolloProvider } from "@/components/provider/ApolloProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { headers } from "next/headers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "/";
  const currentUrl = `https://kohakudiary.com${pathname}`;
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="琥珀日記" />
        <meta
          property="og:description"
          content="日記データを暗号化してブロックチェーンにバックアップした日記アプリです。"
        />
        <meta property="og:url" content={currentUrl} />
        <meta
          property="og:image"
          content="https://kohakudiary.com/kohakuTitle.jpg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="琥珀日記" />
        <meta property="og:locale" content="ja_JP" />
      </head>
      <UserProvider>
        <body
          className={cn(
            "h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ApolloProvider>
            <main className="h-full">{children}</main>
            <Toaster />
          </ApolloProvider>
        </body>
      </UserProvider>
    </html>
  );
}

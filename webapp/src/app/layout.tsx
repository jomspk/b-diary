import { Inter as FontSans, Noto_Sans_JP } from "next/font/google";
import { ApolloProvider } from "@/components/provider/ApolloProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto",
});

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <UserProvider>
        <body
          className={cn(
            "h-screen bg-background font-sans antialiased",
            noto.variable,
            fontSans.variable
          )}
        >
          <NextIntlClientProvider messages={messages}>
            <ApolloProvider>
              <main className="h-full">{children}</main>
              <Toaster />
            </ApolloProvider>
          </NextIntlClientProvider>
        </body>
      </UserProvider>
    </html>
  );
}

import { Inter as FontSans } from "next/font/google";
import { ApolloProvider } from "@/components/provider/ApolloProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
    </html>
  );
}

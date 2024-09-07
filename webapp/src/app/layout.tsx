import { Inter as FontSans } from "next/font/google";
import { ApolloProvider } from "@/components/provider/ApolloProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar, sideBarWidth } from "@/components/layout/Sidebar";
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
          <Sidebar />
          <main className="h-full" style={{ marginLeft: sideBarWidth }}>
            {children}
          </main>
          <Toaster />
        </ApolloProvider>
      </body>
    </html>
  );
}

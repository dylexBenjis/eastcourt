import type { Metadata } from "next";
import "./globals.css";
import ThemeModeProvider from "../components/theme-provider";
import ActiveTab_Provider from "../components/activeTab-provider";
import { Toaster } from "../components/ui/toaster";
import AuthState_Provider from "../lib/auth_state";
import NavBar from "../components/nav_bar";
import Footer from "../components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <ThemeModeProvider>
          <ActiveTab_Provider>
            <Toaster />
            <NavBar />
            {children}
            <Footer />
          </ActiveTab_Provider>
        </ThemeModeProvider>
      </body>
    </html>
  );
}

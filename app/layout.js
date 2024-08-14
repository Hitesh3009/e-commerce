import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-Commerce",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
        <Script src="https://kit.fontawesome.com/52afc80947.js" />
      </body>
    </html>
  );
}

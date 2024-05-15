import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  SignedOut,
} from "@clerk/nextjs";
import StoreProvider from "./StoreProvider";
import "~/styles/globals.css";
import styles from "../styles/loading.module.css";
import { Inter } from "next/font/google";
import MarketingHeader from "./_components/marketingHeader";
import MarketingFooter from "./_components/marketingFooter";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "TNNS Coach",
  description: "A tennis coach's toolkit",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <ClerkProvider>
        <html lang="en">
          <body className={`font-sans ${inter.variable}`}>
            <ClerkLoading>
              <div className="flex h-screen w-full items-center justify-center">
                <span className={styles.loader}>Load&nbsp;ng</span>
              </div>
            </ClerkLoading>
            <ClerkLoaded>
              <SignedOut>
                <MarketingHeader />
              </SignedOut>
              {children}
              <SignedOut>
                <MarketingFooter />
              </SignedOut>
            </ClerkLoaded>
          </body>
        </html>
      </ClerkProvider>
    </StoreProvider>
  );
}

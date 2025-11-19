import {
  ClerkProvider,
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/Logo.png";
import { neobrutalism } from "@clerk/themes";

export const metadata = {
  title: "What's For Dinner App",
  description:
    "Can't Decide What's for Dinner? Use this app that takes the decision out of your hands.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [neobrutalism],
      }}
    >
      <html lang="en" suppressHydrationWarning={true}>
        <body>
          <SignedOut>
            <div className="container">
              <SignIn routing="hash" id="auth-card" fallbackRedirectUrl="/" />
              <section id="logo">
                <Image src={logo} width={700} alt="logo" id="logo" />
              </section>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="topBar">
              <UserButton showName />
              <Link href="/attribution">Attribution</Link>
            </div>

            {children}
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}

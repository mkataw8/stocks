import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import "./globals.css";

export const metadata = {
  title: "Next.js with Clerk",
  description: "An example app with Clerk authentication.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>{children}</SignedOut>

          <SignedIn>{children}</SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}

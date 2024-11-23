import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
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
          <SignedOut>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <SignIn routing="hash" />
            </div>
          </SignedOut>

          <SignedIn>{children}</SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}

import "./globals.css";
import { NextAuthProvider } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#251955]">
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}

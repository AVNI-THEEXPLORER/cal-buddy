import Navigation from "@/components/landing/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cal Buddy",
  description:
    "Schedule, manage, and chat with your calendar. Boost your productivity with AI-powered task management.",
  icons: ["/logo.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <CopilotKit runtimeUrl="/api/copilotkit">
              {children}
              <CopilotPopup
                labels={{
                  title: "Cal Buddy 🗓️",
                  initial:
                    "Hello! I'm your Cal Buddy assistant. How can I help you today?",
                }}
              />
            </CopilotKit>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TWIGA Voice Lab",
  description: "Experimental voice AI testing lab — compare Gemini, ElevenLabs, Groq, OpenAI Realtime and LiveKit.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="bg-orange-500 text-white text-center py-2 text-sm">
          <a href="/twiga-dialer.apk" download className="underline font-semibold">Download Android Dialer APK</a>
        </div>
        {children}
      </body>
    </html>
  );
}

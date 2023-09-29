import "./globals.css";
import type { Metadata } from "next";
import { Provider } from "@/components/provider";
import { AppWrapper } from "@/lib/AppContext";
import { Toaster } from "@/components/ui/toaster";
// import localFont from "next/font/local";

// const spaceMono = localFont({
//   src: [
//     // {
//     //   path: "../public/fonts/space-mono/SpaceMono-Regular.ttf",
//     //   weight: "400",
//     //   style: "normal",
//     // },
//     // {
//     //   path: "../public/fonts/space-mono/SpaceMono-Italic.ttf",
//     //   weight: "400",
//     //   style: "italic",
//     // },
//     // {
//     //   path: "../public/fonts/space-mono/SpaceMono-Bold.ttf",
//     //   weight: "700",
//     //   style: "normal",
//     // },
//     // {
//     //   path: "../public/fonts/space-mono/SpaceMono-BoldItalic.ttf",
//     //   weight: "700",
//     //   style: "italic",
//     // },
//   ],
// });

export const metadata: Metadata = {
  title: "llm-ops-preview",
  generator: "Next.js",
  applicationName: "llm-ops-preview",
  referrer: "origin-when-cross-origin",
  keywords: ["llm", "ops", "llm-ops"],
  authors: [{ name: "Marlene", url: "https://marlene.top" }],
  colorScheme: "dark",
  creator: "Virgil",
  publisher: "Virgil",
  alternates: {},
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "llm-ops-preview",
    description: "简单易用、助力AIGC应用落地的LLM Ops框架",
    url: "https://llm-ops-preview.vercel.app",
    siteName: "llm-ops-preview",
    images: [
      {
        url: "https://llm-ops-preview.vercel.app/og.png",
        width: 4093,
        height: 1197,
        alt: "简单易用、助力AIGC应用落地的LLM Ops框架",
      },
      // {
      //   url: "https://llm-ops-preview.vercel.app/og-dark.png",
      //   width: 1800,
      //   height: 1600,
      //   alt: "Next.js, TailwindCSS and shadcn-ui Starter Template",
      // },
    ],
    locale: "zh-CN",
    type: "website",
  },
  robots: {
    index: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Provider attribute="class" defaultTheme="system" enableSystem>
          <AppWrapper>
            <main
              className={`text-zinc-700 bg-white dark:text-zinc-400 dark:bg-black md:h-screen`}
            >
              {children}
            </main>
            <Toaster />
          </AppWrapper>
        </Provider>
      </body>
    </html>
  );
}

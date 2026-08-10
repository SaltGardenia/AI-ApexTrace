import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/layout/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ApexTrace · AI 研究版图指数",
    template: "%s · ApexTrace",
  },
  description:
    "对标 Artificial Analysis 的 AI 顶刊顶会研究全景平台：汇总 CCF A/B/C 类顶会顶刊，指数化呈现研究方向热度、会议画像与投稿时间线。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground">
        <Providers>
          <div className="flex min-h-full flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
              <div className="mx-auto max-w-7xl px-6">
                <p>
                  ApexTrace · AI Research Landscape Index · 数据以 DBLP / OpenAlex
                  / Semantic Scholar / ccfddl 为口径（示例数据为结构化演示）
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { assetPath } from "@/content/assets";
import "./globals.css";

const manrope = localFont({ src: "../../public/assets/fonts/Manrope-Variable.ttf", display: "swap", variable: "--font-manrope" });
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");
export const metadata: Metadata = {
  title: "ОРБИТА — веб студия, дизайн и 3D",
  description: "Идеи обретают новую форму. Веб студия: дизайн, абстрактные 3D-эксперименты и интерактивные истории. Связаться — @webdiz3d.",
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: siteUrl + "/" } } : {}),
  openGraph: {
    title: "ОРБИТА — идеи обретают новую форму",
    description: "Веб-дизайн, 3D и движение. Исследуй пространство и напиши @webdiz3d.",
    type: "website", locale: "ru_RU",
    ...(siteUrl ? { url: siteUrl + "/", images: [{ url: siteUrl + "/assets/images/abstract-studio.webp", width: 1586, height: 992, alt: "Абстрактная 3D-композиция веб-студии ОРБИТА" }] } : {}),
  },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="ru" className={manrope.variable}>
    <head><link rel="preload" as="image" href={assetPath("/assets/images/abstract-studio.webp")} fetchPriority="high" /></head>
    <body><a className="skip-link" href="#main">Перейти к содержимому</a>{children}</body>
  </html>;
}

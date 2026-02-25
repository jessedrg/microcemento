import type { Metadata } from "next"
import { Inter, Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import WhatsAppButton from "@/components/whatsapp-button"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", weight: ["300", "400", "500", "600"], display: "swap" })

export const metadata: Metadata = {
  title: "microcemento — Microcemento Profesional en España",
  description: "Encuentra los mejores aplicadores de microcemento. Comparamos presupuestos, acabados y opiniones reales. Asesoramiento gratuito y personalizado.",
  keywords: "microcemento, microcemento suelos, microcemento baños, aplicador microcemento, cemento pulido, microcemento precio",
  openGraph: {
    title: "microcemento — Microcemento Profesional en España",
    description: "Encuentra los mejores aplicadores de microcemento. Asesoramiento gratuito.",
    type: "website",
    siteName: "microcemento",
    images: [{ url: "/og", width: 1200, height: 630, alt: "microcemento — Microcemento Profesional" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "microcemento — Microcemento Profesional",
    description: "Encuentra los mejores aplicadores de microcemento.",
    images: ["/og"],
  },
  icons: [{ rel: "icon", url: "/icon.svg", type: "image/svg+xml" }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}

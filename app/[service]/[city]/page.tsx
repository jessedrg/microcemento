import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ServiceCityContent } from "@/components/service-city-content"
import { VALID_SERVICES, MODIFIERS, CITIES, type Service } from "@/lib/sitemap-data"

export const dynamicParams = true
export const revalidate = 604800

const KNOWN_MODIFIERS = MODIFIERS.filter(m => m !== "").map(m => m.slice(1)) as string[]

const SERVICE_NAMES: Record<Service, { name: string; title: string; singular: string }> = {
  "microcemento-suelos": { name: "Microcemento Suelos", title: "Microcemento para Suelos", singular: "microcemento para suelos" },
  "microcemento-banos": { name: "Microcemento Baños", title: "Microcemento para Baños", singular: "microcemento para baños" },
  "microcemento-cocinas": { name: "Microcemento Cocinas", title: "Microcemento para Cocinas", singular: "microcemento para cocinas" },
  "microcemento-paredes": { name: "Microcemento Paredes", title: "Microcemento para Paredes", singular: "microcemento para paredes" },
  "microcemento-exterior": { name: "Microcemento Exterior", title: "Microcemento Exterior", singular: "microcemento exterior" },
  "microcemento-piscinas": { name: "Microcemento Piscinas", title: "Microcemento para Piscinas", singular: "microcemento para piscinas" },
  "microcemento-escaleras": { name: "Microcemento Escaleras", title: "Microcemento para Escaleras", singular: "microcemento para escaleras" },
  "aplicador-microcemento": { name: "Aplicador de Microcemento", title: "Aplicadores de Microcemento", singular: "aplicador de microcemento" },
  "microcemento-decorativo": { name: "Microcemento Decorativo", title: "Microcemento Decorativo", singular: "microcemento decorativo" },
  "cemento-pulido": { name: "Cemento Pulido", title: "Cemento Pulido", singular: "cemento pulido" },
}

function parseServiceAndModifier(rawService: string): { serviceId: Service | null; modifier?: string } {
  if (VALID_SERVICES.includes(rawService as Service)) return { serviceId: rawService as Service }
  for (const mod of KNOWN_MODIFIERS) {
    const suffix = `-${mod}`
    if (rawService.endsWith(suffix)) {
      const serviceId = rawService.slice(0, -suffix.length)
      if (VALID_SERVICES.includes(serviceId as Service)) return { serviceId: serviceId as Service, modifier: mod }
    }
  }
  return { serviceId: null }
}

function getCityDisplayName(slug: string): string {
  return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}

function formatModifier(modifier: string): string {
  const map: Record<string, string> = {
    "precios": "Precios", "barato": "Barato", "economico": "Económico",
    "cuanto-cuesta": "Cuánto Cuesta", "presupuesto": "Presupuesto",
    "presupuesto-online": "Presupuesto Online", "financiacion": "Financiación",
    "rapido": "Rápido", "urgente": "Urgente", "express": "Express",
    "mejor": "Mejor", "calidad-precio": "Calidad-Precio",
    "profesional": "Profesional", "de-confianza": "de Confianza",
    "mejor-valorado": "Mejor Valorado", "recomendado": "Recomendado",
    "llave-en-mano": "Llave en Mano", "integral": "Integral",
    "completo": "Completo", "sin-obras": "Sin Obras",
    "sobre-azulejos": "Sobre Azulejos", "moderno": "Moderno",
    "minimalista": "Minimalista", "rustico": "Rústico",
    "industrial": "Industrial", "efecto-piedra": "Efecto Piedra",
    "efecto-madera": "Efecto Madera", "efecto-hormigon": "Efecto Hormigón",
    "mate": "Mate", "satinado": "Satinado", "brillante": "Brillante",
    "blanco": "Blanco", "gris": "Gris", "negro": "Negro",
    "beige": "Beige", "arena": "Arena",
    "bicomponente": "Bicomponente", "monocomponente": "Monocomponente",
    "cerca-de-mi": "Cerca de Mí", "centro": "Centro",
    "economico-profesional": "Económico Profesional",
    "moderno-llave-en-mano": "Moderno Llave en Mano",
  }
  return map[modifier] || modifier.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
}

interface PageProps { params: Promise<{ service: string; city: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: rawService, city: citySlug } = await params
  const { serviceId, modifier } = parseServiceAndModifier(rawService)
  if (!serviceId) return { title: "No encontrado" }

  const serviceName = SERVICE_NAMES[serviceId]
  const cityName = getCityDisplayName(citySlug)
  const modifierText = modifier ? ` ${formatModifier(modifier)}` : ""
  const fullTitle = `${serviceName.title}${modifierText} en ${cityName}`

  return {
    title: `${fullTitle} | Compara Presupuestos | microcemento`,
    description: `${serviceName.title}${modifierText.toLowerCase()} en ${cityName}. Compara presupuestos de aplicadores certificados. Asesoramiento GRATUITO. WhatsApp: 711 267 223`,
    alternates: { canonical: `https://microcementohoy.com/${rawService}/${citySlug}/` },
    openGraph: { title: fullTitle, description: `Los mejores aplicadores de ${serviceName.singular} en ${cityName}. Presupuestos gratis.`, type: "website", siteName: "microcemento" },
  }
}

export default async function ServiceCityPage({ params }: PageProps) {
  const { service: rawService, city: citySlug } = await params
  const { serviceId, modifier } = parseServiceAndModifier(rawService)
  if (!serviceId) notFound()

  const serviceName = SERVICE_NAMES[serviceId as Service]
  const cityName = getCityDisplayName(citySlug)
  const modifierText = modifier ? formatModifier(modifier) : ""
  const pageTitle = modifier ? `${serviceName.title} ${modifierText} en ${cityName}` : `${serviceName.title} en ${cityName}`

  const cityIndex = CITIES.indexOf(citySlug)
  const nearbyCities = CITIES.slice(Math.max(0, cityIndex - 5), Math.min(CITIES.length, cityIndex + 6)).filter(c => c !== citySlug).slice(0, 5)
  const relatedServices = VALID_SERVICES.filter(s => s !== serviceId).slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <ServiceCityContent
          pageTitle={pageTitle} serviceName={serviceName} cityName={cityName}
          citySlug={citySlug} serviceId={serviceId as Service} modifierText={modifierText}
          nearbyCities={nearbyCities} relatedServices={relatedServices} serviceNames={SERVICE_NAMES}
        />
      </main>
      <Footer />
    </div>
  )
}

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { VALID_SERVICES, type Service } from "@/lib/sitemap-data"
import { MessageCircle, ArrowRight, MapPin } from "lucide-react"

export const dynamicParams = true
export const revalidate = 604800

const WA_URL = "https://wa.me/34711267223?text=Hola%2C%20me%20interesa%20un%20proyecto%20de%20microcemento."

const SERVICE_NAMES: Record<Service, { name: string; title: string; singular: string; description: string }> = {
  "microcemento-suelos": { name: "Microcemento Suelos", title: "Microcemento para Suelos", singular: "microcemento para suelos", description: "Suelos de microcemento continuo sin juntas. Aplicación sobre pavimento existente sin obras. Acabados mate, satinado o brillo." },
  "microcemento-banos": { name: "Microcemento Baños", title: "Microcemento para Baños", singular: "microcemento para baños", description: "Microcemento impermeable para baños. Aplicación sobre azulejos existentes. Platos de ducha, paredes y suelos." },
  "microcemento-cocinas": { name: "Microcemento Cocinas", title: "Microcemento para Cocinas", singular: "microcemento para cocinas", description: "Microcemento para cocinas: suelos, paredes y encimeras. Resistente al agua, manchas y calor. Fácil limpieza." },
  "microcemento-paredes": { name: "Microcemento Paredes", title: "Microcemento para Paredes", singular: "microcemento para paredes", description: "Revestimiento de paredes con microcemento. Acabado continuo y elegante. Interior y exterior." },
  "microcemento-exterior": { name: "Microcemento Exterior", title: "Microcemento Exterior", singular: "microcemento exterior", description: "Microcemento para exteriores: terrazas, patios y fachadas. Resistente a UV, lluvia y heladas. Acabado antideslizante." },
  "microcemento-piscinas": { name: "Microcemento Piscinas", title: "Microcemento para Piscinas", singular: "microcemento para piscinas", description: "Revestimiento de piscinas con microcemento. Resistente al cloro y rayos UV. Aplicación sobre gresite existente." },
  "microcemento-escaleras": { name: "Microcemento Escaleras", title: "Microcemento para Escaleras", singular: "microcemento para escaleras", description: "Escaleras revestidas con microcemento. Acabado continuo y antideslizante. Peldaños, tabicas y zancas." },
  "aplicador-microcemento": { name: "Aplicador Microcemento", title: "Aplicadores de Microcemento", singular: "aplicador de microcemento", description: "Aplicadores certificados de microcemento. Profesionales con experiencia y garantía. Presupuestos gratuitos." },
  "microcemento-decorativo": { name: "Microcemento Decorativo", title: "Microcemento Decorativo", singular: "microcemento decorativo", description: "Microcemento decorativo con efectos especiales. Texturas, veladuras y acabados personalizados." },
  "cemento-pulido": { name: "Cemento Pulido", title: "Cemento Pulido", singular: "cemento pulido", description: "Suelos de cemento pulido industrial. Acabado brillante y resistente. Ideal para locales y viviendas." },
}

const SERVICE_IMAGES: Record<string, string> = {
  "microcemento-suelos": "https://images.unsplash.com/photo-1559763194-521eef49b386?q=80&w=2469&auto=format&fit=crop",
  "microcemento-banos": "https://images.unsplash.com/photo-1565768502473-c5dc73b7eb33?q=80&w=2070&auto=format&fit=crop",
  "microcemento-cocinas": "https://images.unsplash.com/photo-1581710515207-e12b6e176779?q=80&w=2070&auto=format&fit=crop",
  "microcemento-paredes": "https://images.unsplash.com/photo-1677256466027-5fdb66b1c348?q=80&w=1026&auto=format&fit=crop",
  "microcemento-exterior": "https://images.unsplash.com/photo-1619280771206-d8330a0be617?q=80&w=977&auto=format&fit=crop",
  "microcemento-piscinas": "https://images.unsplash.com/photo-1559763194-521eef49b386?q=80&w=2469&auto=format&fit=crop",
  "microcemento-escaleras": "https://images.unsplash.com/photo-1581710515207-e12b6e176779?q=80&w=2070&auto=format&fit=crop",
  "aplicador-microcemento": "https://images.unsplash.com/photo-1677256466027-5fdb66b1c348?q=80&w=1026&auto=format&fit=crop",
  "microcemento-decorativo": "https://images.unsplash.com/photo-1565768502473-c5dc73b7eb33?q=80&w=2070&auto=format&fit=crop",
  "cemento-pulido": "https://images.unsplash.com/photo-1619280771206-d8330a0be617?q=80&w=977&auto=format&fit=crop",
}

const MAIN_CITIES = [
  "madrid", "barcelona", "valencia", "sevilla", "zaragoza", "malaga",
  "murcia", "palma-de-mallorca", "las-palmas-de-gran-canaria", "bilbao",
  "alicante", "cordoba", "valladolid", "vigo", "gijon", "hospitalet-de-llobregat",
  "vitoria-gasteiz", "la-coruna", "granada", "elche", "oviedo", "terrassa",
  "badalona", "cartagena", "jerez-de-la-frontera", "sabadell", "mostoles",
  "santa-cruz-de-tenerife", "alcala-de-henares", "pamplona", "fuenlabrada",
  "almeria", "san-sebastian", "leganes", "santander", "burgos", "albacete",
  "getafe", "salamanca", "logrono", "huelva", "badajoz", "tarragona",
  "lleida", "marbella", "leon", "cadiz", "dos-hermanas", "torrevieja",
]

function getCityDisplayName(slug: string): string {
  return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}

interface PageProps { params: Promise<{ service: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceId } = await params
  if (!VALID_SERVICES.includes(serviceId as Service)) return { title: "No encontrado" }

  const serviceName = SERVICE_NAMES[serviceId as Service]
  return {
    title: `${serviceName.title} en España | Aplicadores Certificados | microcemento`,
    description: `${serviceName.description} Servicio en toda España. Presupuestos gratis.`,
    alternates: { canonical: `https://microcementohoy.com/${serviceId}/` },
    openGraph: { title: `${serviceName.title} en España`, description: serviceName.description, type: "website", siteName: "microcemento" },
  }
}

export default async function ServiceHubPage({ params }: PageProps) {
  const { service: serviceId } = await params
  if (!VALID_SERVICES.includes(serviceId as Service)) notFound()

  const serviceName = SERVICE_NAMES[serviceId as Service]
  const heroImg = SERVICE_IMAGES[serviceId] || SERVICE_IMAGES["microcemento-suelos"]
  const relatedServices = VALID_SERVICES.filter(s => s !== serviceId).slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-foreground text-background overflow-hidden">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImg} alt={serviceName.title} className="w-full h-full object-cover opacity-30" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-28">
            <nav className="text-[10px] tracking-[0.3em] uppercase text-background/30 mb-8 font-sans flex items-center gap-2">
              <Link href="/" className="hover:text-background/60 transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-background/60">{serviceName.title}</span>
            </nav>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-background leading-[0.95]">
              {serviceName.title}
              <br />
              <span className="italic font-light">en toda España</span>
            </h1>
            <p className="text-sm sm:text-base text-background/50 mt-8 max-w-xl font-sans leading-relaxed">
              {serviceName.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
                <MessageCircle className="w-4 h-4" /> Presupuesto gratis
              </a>
              <a href="#ciudades" className="inline-flex items-center justify-center gap-2 border border-background/20 text-background px-8 py-4 text-sm font-sans hover:border-background/50 transition-colors">
                Ver ciudades <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Ciudades principales */}
        <section id="ciudades" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-12 gap-4 mb-16">
            <div className="lg:col-span-5">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Ciudades</p>
              <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-foreground leading-[1.05]">
                {serviceName.title}
                <br />
                <span className="italic font-light">cerca de ti</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                Selecciona tu ciudad para ver aplicadores certificados en tu zona. Servicio disponible en más de 8.000 localidades.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {MAIN_CITIES.map(city => (
              <Link
                key={city}
                href={`/${serviceId}/${city}/`}
                className="group flex items-center gap-2 p-4 border border-border hover:border-foreground/30 hover:bg-secondary transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                <span className="text-sm font-sans text-foreground truncate">{getCityDisplayName(city)}</span>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground font-sans">
              ¿No encuentras tu ciudad? <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:no-underline">Escríbenos por WhatsApp</a> y te conectamos con aplicadores de tu zona.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24 text-center">
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-background leading-[1.05]">
              {serviceName.title} profesional
              <br />
              <span className="italic font-light">con garantía</span>
            </h2>
            <p className="text-sm text-background/50 mt-6 font-sans max-w-md mx-auto">
              Aplicadores certificados. Presupuestos gratis. Acabados perfectos.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 mt-10 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
              <MessageCircle className="w-4 h-4" /> Contactar ahora
            </a>
          </div>
        </section>

        {/* Otros servicios */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Otros servicios</p>
          <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground mb-12">También te puede interesar</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedServices.map(svc => (
              <Link
                key={svc}
                href={`/${svc}/`}
                className="group p-6 border border-border hover:border-foreground/30 hover:bg-secondary transition-all"
              >
                <h3 className="text-sm font-sans font-medium text-foreground group-hover:underline">{SERVICE_NAMES[svc as Service]?.title}</h3>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{SERVICE_NAMES[svc as Service]?.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

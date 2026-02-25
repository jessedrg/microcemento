"use client"

import { useState } from "react"
import Link from "next/link"
import type { Service } from "@/lib/sitemap-data"
import { MessageCircle, Star, Shield, Clock, Ruler, Users, CheckCircle, ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react"

const WA_URL = "https://wa.me/34711267223?text=Hola%2C%20me%20interesa%20un%20proyecto%20de%20microcemento."
const PHONE = "+34711267223"

const SERVICE_IMAGES: Record<string, string> = {
  "microcemento-suelos": "https://images.unsplash.com/photo-1559763194-521eef49b386?q=80&w=2469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "microcemento-banos": "https://images.unsplash.com/photo-1565768502473-c5dc73b7eb33?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "microcemento-cocinas": "https://images.unsplash.com/photo-1581710515207-e12b6e176779?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "microcemento-paredes": "https://images.unsplash.com/photo-1677256466027-5fdb66b1c348?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "microcemento-exterior": "https://images.unsplash.com/photo-1619280771206-d8330a0be617?q=80&w=977&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "microcemento-piscinas": "https://images.unsplash.com/photo-1559763194-521eef49b386?q=80&w=2469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "microcemento-escaleras": "https://images.unsplash.com/photo-1581710515207-e12b6e176779?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "aplicador-microcemento": "https://images.unsplash.com/photo-1677256466027-5fdb66b1c348?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "microcemento-decorativo": "https://images.unsplash.com/photo-1565768502473-c5dc73b7eb33?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "cemento-pulido": "https://images.unsplash.com/photo-1619280771206-d8330a0be617?q=80&w=977&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash)
}

function generateReviews(cityName: string, serviceId: string) {
  const seed = hashCode(`${cityName}-${serviceId}`)
  const names = ["Maria L.", "Carlos G.", "Ana R.", "Javier M.", "Elena S.", "Roberto P.", "Patricia D.", "Fernando T.", "Laura B.", "Sergio V."]

  const suelosTemplates = [
    `Teniamos un suelo de terrazo de los anos 70 y no sabiamos que hacer. microcemento nos presento 3 presupuestos en ${cityName} y en solo 4 dias teniamos un suelo de microcemento gris perla espectacular. Sin obras, sin escombros. Increible.`,
    `Queriamos un suelo continuo sin juntas para toda la planta baja. El aplicador que nos recomendo microcemento en ${cityName} hizo un trabajo impecable. 80m2 de microcemento perfecto. Parece otra casa.`,
    `Presupuesto ajustado pero queriamos algo elegante. microcemento encontro un profesional en ${cityName} que nos hizo un microcemento color arena precioso. Mejor de lo que imaginabamos.`,
    `Microcemento sobre el pavimento existente, sin demoler nada. El aplicador de ${cityName} fue meticuloso con cada capa, cada lijado. El resultado es una superficie perfecta. Muy recomendable.`,
    `Salon y cocina integrados con microcemento continuo. El profesional que me recomendo microcemento en ${cityName} lo termino en 5 dias. El efecto visual es brutal. Nuestros amigos no se lo creen.`,
    `Segunda vivienda que hago con microcemento en ${cityName}. La primera vez fue tan bien que repeti sin dudarlo. El microcemento da un look increible y es superfacil de limpiar.`,
  ]

  const banosTemplates = [
    `Queriamos renovar el bano sin obra y parecia imposible. El aplicador que nos recomendo microcemento en ${cityName} hizo microcemento sobre los azulejos existentes. Parece un bano de hotel cinco estrellas.`,
    `Microcemento en suelo, paredes y plato de ducha. El profesional de ${cityName} que nos conecto microcemento hizo un trabajo de otra liga. Todo impermeabilizado a la perfeccion.`,
    `Bano pequeno de 4m2 que parecia imposible de renovar. El aplicador de ${cityName} transformo el espacio con microcemento blanco. Ahora parece el doble de grande. Magia.`,
    `Plato de ducha a ras de suelo con microcemento. El acabado antideslizante es perfecto. Seguro, bonito y facil de limpiar. El mejor dinero que he invertido en casa.`,
    `Dos banos reformados con microcemento gris claro. Sin obras, sin ruido, sin escombros. En una semana teniamos banos nuevos. El servicio de microcemento en ${cityName} es excepcional.`,
    `El aplicador de ${cityName} nos asesoro sobre el color y el acabado perfecto para nuestro bano. El resultado es espectacular. Profesionalidad total de principio a fin.`,
  ]

  const templates = serviceId.includes("bano") ? banosTemplates : suelosTemplates
  const startIdx = seed % templates.length

  return Array.from({ length: 6 }, (_, i) => ({
    name: names[(seed + i * 3) % names.length],
    city: cityName,
    rating: (seed + i) % 7 === 0 ? 4 : 5,
    text: templates[(startIdx + i) % templates.length],
    date: `${[3, 17, 8, 24, 11, 29][i]} de ${["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"][[7, 9, 8, 10, 11, 7][i]]} 2025`,
    verified: true,
  }))
}

function generateFAQs(cityName: string, serviceName: { title: string; singular: string }, serviceId: string) {
  const faqs = [
    { q: `Cuanto cuesta el ${serviceName.singular} en ${cityName}?`, a: `El precio del ${serviceName.singular} en ${cityName} depende de la superficie, el acabado y la complejidad. Como orientacion: suelos 50-120€/m2, banos 60-130€/m2, paredes 40-90€/m2. microcemento te presenta presupuestos detallados y comparados de aplicadores certificados en ${cityName}. Escribenos por WhatsApp para orientacion gratuita.` },
    { q: `El servicio de microcemento en ${cityName} tiene algun coste?`, a: `El asesoramiento de microcemento es completamente gratuito. Comparamos aplicadores, te presentamos presupuestos y te acompanamos durante la aplicacion. Sin comisiones ni costes ocultos. Escribenos por WhatsApp sin compromiso.` },
    { q: `Cuanto tiempo tarda la aplicacion de ${serviceName.singular} en ${cityName}?`, a: `Depende de la superficie y complejidad. Un bano completo suele tardar 5-7 dias laborables. Un suelo de salon 4-5 dias. Los aplicadores que recomendamos en ${cityName} siempre dan un plazo cerrado antes de empezar.` },
  ]

  if (serviceId.includes("suelo") || serviceId.includes("cemento-pulido")) {
    faqs.push(
      { q: "Se puede aplicar microcemento sobre cualquier suelo?", a: `Si. El microcemento se aplica sobre baldosas, terrazo, marmol, hormigon y la mayoria de pavimentos existentes. Los aplicadores certificados de ${cityName} evaluan la superficie antes de empezar para garantizar la adherencia perfecta.` },
      { q: "El microcemento en suelos es resistente?", a: "Si. Con el sellado adecuado, el microcemento para suelos es extremadamente resistente al trafico, los golpes y las manchas. Nuestros aplicadores utilizan selladores de ultima generacion que garantizan una durabilidad de mas de 15 anos." },
      { q: "Puedo elegir el color del microcemento?", a: "Por supuesto. El microcemento se pigmenta a medida con una gama practicamente infinita de colores. Los tonos mas populares son gris perla, arena, blanco roto, cemento y grafito. Tu aplicador te muestra muestras reales antes de decidir." },
    )
  } else if (serviceId.includes("bano")) {
    faqs.push(
      { q: "El microcemento en banos es impermeable?", a: `Si. Con el sellado profesional que realizan todos nuestros aplicadores certificados en ${cityName}, el microcemento es completamente impermeable. Es perfecto para duchas, platos de ducha y zonas de agua.` },
      { q: "Se puede aplicar microcemento sobre azulejos del bano?", a: `Si, es una de las grandes ventajas. Se aplica directamente sobre los azulejos existentes sin necesidad de demolicion. Ahorra tiempo, dinero y escombros. Los aplicadores de ${cityName} que recomendamos son expertos en esta tecnica.` },
    )
  } else if (serviceId.includes("piscina")) {
    faqs.push(
      { q: "El microcemento para piscinas es resistente al cloro?", a: `Si. Los sistemas de microcemento para piscinas estan formulados especificamente para resistir el cloro, los rayos UV y los cambios de temperatura. Nuestros aplicadores en ${cityName} utilizan productos certificados para contacto permanente con agua.` },
      { q: "Se puede revestir una piscina existente con microcemento?", a: `Si. El microcemento se aplica sobre el revestimiento existente de la piscina (gresite, azulejo, hormigon) sin necesidad de vaciado prolongado. El proceso completo suele tardar 7-10 dias.` },
    )
  } else if (serviceId.includes("exterior")) {
    faqs.push(
      { q: "El microcemento exterior resiste la lluvia y el sol?", a: `Si. Los sistemas de microcemento exterior estan formulados para resistir los rayos UV, la lluvia, las heladas y los cambios de temperatura. Nuestros aplicadores en ${cityName} utilizan productos especificos para exteriores con garantia.` },
      { q: "El microcemento exterior es antideslizante?", a: "Si. Para exteriores se aplica un acabado especifico con propiedades antideslizantes que cumple con la normativa de seguridad. Perfecto para terrazas, patios y zonas de piscina." },
    )
  } else {
    faqs.push(
      { q: `Puedo ver ejemplos de trabajos en ${cityName}?`, a: `Si. Nuestros aplicadores en ${cityName} tienen portfolios con trabajos anteriores que podras revisar antes de decidir. Ademas, muchos ofrecen la posibilidad de visitar proyectos ya terminados para que veas la calidad del acabado en persona.` },
      { q: "Ofreceis ayuda con financiacion?", a: "Si. Nuestros asesores conocen las opciones de financiacion de cada aplicador. Muchos ofrecen financiacion propia a 12, 24 o 36 meses. Te orientamos sobre todas las opciones disponibles." },
    )
  }
  return faqs
}

interface ServiceCityContentProps {
  pageTitle: string
  serviceName: { name: string; title: string; singular: string }
  cityName: string
  citySlug: string
  serviceId: Service
  modifierText: string
  nearbyCities: string[]
  relatedServices: string[]
  serviceNames: Record<Service, { name: string; title: string; singular: string }>
}

export function ServiceCityContent({
  pageTitle, serviceName, cityName, citySlug, serviceId, modifierText,
  nearbyCities, relatedServices, serviceNames,
}: ServiceCityContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [visibleReviews, setVisibleReviews] = useState(3)

  const reviews = generateReviews(cityName, serviceId)
  const faqs = generateFAQs(cityName, serviceName, serviceId)
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
  const heroImg = SERVICE_IMAGES[serviceId] || SERVICE_IMAGES["microcemento-suelos"]

  function getCityDisplayName(slug: string): string {
    return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImg} alt={pageTitle} className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <nav className="text-[10px] tracking-[0.3em] uppercase text-background/30 mb-8 font-sans flex items-center gap-2">
                <Link href="/" className="hover:text-background/60 transition-colors">Inicio</Link>
                <span>/</span>
                <span>{serviceName.title}</span>
                <span>/</span>
                <span className="text-background/60">{cityName}</span>
              </nav>

              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-background leading-[0.95]">
                {pageTitle}
              </h1>

              <p className="text-sm sm:text-base text-background/50 mt-8 max-w-xl font-sans leading-relaxed">
                {"Compara los mejores aplicadores de "}
                {serviceName.singular}
                {modifierText ? ` ${modifierText.toLowerCase()}` : ""}
                {` en ${cityName}. Presupuestos reales, opiniones verificadas. Gratis.`}
              </p>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex flex-col gap-3">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-sm font-sans font-medium hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-4 h-4" />
                  Presupuesto gratis por WhatsApp
                </a>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center gap-2 border border-background/20 text-background px-8 py-4 text-sm font-sans hover:border-background/50 transition-colors"
                >
                  Como funciona
                </a>
              </div>

              <div className="flex items-center gap-4 mt-6 text-xs text-background/40 font-sans">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current text-background/60" />)}
                  <span className="ml-1 text-background/60 font-medium">{avgRating}</span>
                </div>
                <span>|</span>
                <span>{reviews.length}+ opiniones</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: "Certificados", sub: "Aplicadores verificados" },
              { icon: Clock, label: "< 48 horas", sub: "Presupuestos en mano" },
              { icon: Ruler, label: "Gratuito", sub: "Sin compromiso" },
              { icon: Users, label: "1.200+ proyectos", sub: "Realizados con microcemento" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-xs font-sans font-medium text-foreground">{label}</p>
                  <p className="text-[10px] text-muted-foreground font-sans">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Proceso</p>
            <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground leading-[1.1]">
              {`Tu ${serviceName.singular} en ${cityName}, paso a paso`}
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 space-y-0">
            {[
              { n: "01", t: "Cuentanos tu proyecto", d: `Llamanos. Que superficie quieres revestir en ${cityName}, que acabado buscas, tu presupuesto. 5 minutos bastan.` },
              { n: "02", t: "Recibe presupuestos", d: `Contactamos con los mejores aplicadores de microcemento de ${cityName}. Recibes hasta 3 presupuestos comparados.` },
              { n: "03", t: "Elige y transforma", d: `Tu decides. Coordinamos la primera visita y te acompanamos durante toda la aplicacion en ${cityName}.` },
            ].map((step, i) => (
              <div key={step.n} className={`flex gap-8 py-8 ${i < 2 ? "border-b border-border" : ""}`}>
                <span className="font-serif text-4xl lg:text-5xl text-foreground/10 flex-shrink-0">{step.n}</span>
                <div>
                  <h3 className="text-sm font-sans font-medium text-foreground">{step.t}</h3>
                  <p className="text-xs text-muted-foreground mt-2 font-sans leading-relaxed max-w-md">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Opiniones</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground">
                {`Clientes de ${cityName} opinan`}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current text-foreground" />)}
              <span className="text-sm font-sans font-medium">{avgRating}/5</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            {reviews.slice(0, visibleReviews).map((r, i) => (
              <article key={i} className="bg-card p-8 flex flex-col justify-between">
                <p className="text-xs text-foreground/80 font-sans leading-relaxed">{r.text}</p>
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium font-sans">{r.name}</p>
                    <p className="text-[10px] text-muted-foreground font-sans">{r.city} · {r.date}</p>
                  </div>
                  {r.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-sans">
                      <CheckCircle className="w-3 h-3" /> Verificada
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>

          {visibleReviews < reviews.length && (
            <button onClick={() => setVisibleReviews(reviews.length)} className="mt-8 flex items-center gap-2 text-xs font-sans font-medium text-foreground hover:opacity-70 transition-opacity mx-auto">
              Ver mas opiniones <ChevronDown className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </section>

      {/* Mid CTA */}
      <section className="bg-foreground">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24 text-center">
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-background leading-[1.05]">
            {`Tus superficies en ${cityName} merecen`}
            <br />
            <span className="italic font-light">los mejores aplicadores.</span>
          </h2>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 mt-10 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
            <MessageCircle className="w-4 h-4" /> WhatsApp: 711 267 223
          </a>
          <p className="text-[10px] text-background/30 mt-4 font-sans">L-V 9:00-20:00 · S 10:00-14:00</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">FAQ</p>
        <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground mb-12">
          {`Preguntas sobre ${serviceName.singular} en ${cityName}`}
        </h2>
        <div className="border-t border-border">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-start justify-between gap-6 py-5 text-left group">
                <h3 className="text-xs sm:text-sm font-sans font-medium text-foreground leading-relaxed group-hover:opacity-70 transition-opacity">{faq.q}</h3>
                <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <div className="pb-5 -mt-1">
                  <p className="text-xs text-muted-foreground font-sans leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SEO content */}
      <section className="bg-secondary">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Guia</p>
          <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground mb-8">
            {`Guia para tu ${serviceName.singular} en ${cityName}`}
          </h2>
          <div className="prose-sm font-sans text-muted-foreground space-y-4 leading-relaxed text-xs sm:text-sm">
            <p>{`El microcemento se ha convertido en una de las tendencias mas solidas en decoracion y reformas en ${cityName}. Es un revestimiento continuo, sin juntas, que se aplica sobre la superficie existente sin necesidad de demolicion. En microcemento lo sabemos porque hemos acompanado a mas de 1.200 clientes en toda España en este proceso.`}</p>
            <h3 className="text-foreground font-medium text-sm pt-4">Que tener en cuenta</h3>
            <p>{`Al planificar tu ${serviceName.singular} en ${cityName}, define primero la superficie total en metros cuadrados, el acabado que buscas (mate, satinado, brillante), el color deseado y tu presupuesto orientativo. Con estos datos, nuestros aplicadores certificados te presentan opciones concretas y ajustadas.`}</p>
            <h3 className="text-foreground font-medium text-sm pt-4">{`Por que confiar en microcemento en ${cityName}`}</h3>
            <p>{`Nuestro equipo conoce a los aplicadores de microcemento de ${cityName} personalmente. Verificamos certificaciones, seguros, garantias y portfolios. Cuando te recomendamos un aplicador, es porque lo conocemos por dentro. Sin sorpresas, sin intermediarios opacos.`}</p>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">{serviceName.title} en otras ciudades</p>
            <h3 className="font-serif text-xl tracking-tight text-foreground mb-6">Localidades cercanas</h3>
            <nav><ul className="space-y-0">
              {nearbyCities.map(city => (
                <li key={city}>
                  <Link href={`/${serviceId}/${city}/`} className="flex items-center justify-between py-3 border-b border-border/50 group">
                    <span className="text-xs font-sans text-foreground group-hover:opacity-70 transition-opacity">{`${serviceName.title} en ${getCityDisplayName(city)}`}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul></nav>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Otros servicios en {cityName}</p>
            <h3 className="font-serif text-xl tracking-tight text-foreground mb-6">Tambien te puede interesar</h3>
            <nav><ul className="space-y-0">
              {relatedServices.map(svc => (
                <li key={svc}>
                  <Link href={`/${svc}/${citySlug}/`} className="flex items-center justify-between py-3 border-b border-border/50 group">
                    <span className="text-xs font-sans text-foreground group-hover:opacity-70 transition-opacity">{`${serviceNames[svc as Service]?.title || svc} en ${cityName}`}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul></nav>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-foreground">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-background/20 mb-4 font-sans">Da el primer paso</p>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-background">La superficie que imaginas, existe.</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
              <MessageCircle className="w-4 h-4" /> WhatsApp: 711 267 223
            </a>
            <Link href="/" className="inline-flex items-center justify-center gap-2 border border-background/20 text-background px-8 py-4 text-sm font-sans hover:border-background/50 transition-colors">
              Ver servicios <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LocalBusiness",
        name: `microcemento - ${pageTitle}`,
        description: `Los mejores aplicadores de ${serviceName.singular} en ${cityName}. Presupuestos gratis.`,
        telephone: PHONE, url: `https://microcementohoy.com/${serviceId}/${citySlug}/`,
        address: { "@type": "PostalAddress", addressLocality: cityName, addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: avgRating, reviewCount: reviews.length, bestRating: "5", worstRating: "1" },
      })}} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      })}} />
    </>
  )
}

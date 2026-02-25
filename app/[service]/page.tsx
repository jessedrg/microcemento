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

interface ServiceInfo {
  name: string
  title: string
  singular: string
  description: string
  benefits: string[]
  process: { step: string; desc: string }[]
  tips: string[]
  duration: string
  guarantee: string
}

const SERVICE_INFO: Record<Service, ServiceInfo> = {
  "microcemento-suelos": {
    name: "Microcemento Suelos", title: "Microcemento para Suelos", singular: "microcemento para suelos",
    description: "El microcemento para suelos es un revestimiento continuo sin juntas que transforma cualquier espacio. Se aplica directamente sobre el pavimento existente (baldosas, terrazo, hormigón) sin necesidad de demolición. El resultado es una superficie elegante, resistente y fácil de limpiar.",
    benefits: ["Sin juntas: superficie continua y uniforme", "Sin obras: se aplica sobre el suelo existente", "Resistente: soporta tráfico intenso y golpes", "Fácil limpieza: superficie lisa sin poros", "Personalizable: amplia gama de colores y acabados", "Duradero: más de 15 años con mantenimiento adecuado"],
    process: [
      { step: "Evaluación", desc: "El aplicador inspecciona el suelo existente, verifica su estado y te asesora sobre colores y acabados." },
      { step: "Preparación", desc: "Limpieza profunda y aplicación de imprimación para garantizar la adherencia perfecta del microcemento." },
      { step: "Aplicación base", desc: "Primera capa de microcemento que nivela y prepara la superficie. Secado de 24 horas." },
      { step: "Aplicación final", desc: "Capas de acabado con el color elegido. Lijado entre capas para un resultado perfecto." },
      { step: "Sellado", desc: "Aplicación de sellador de poliuretano que protege el microcemento y facilita su limpieza." },
    ],
    tips: ["Elige un color que no pase de moda", "Pide muestras reales antes de decidir", "Verifica que el aplicador tenga experiencia", "Pregunta por la garantía por escrito", "Planifica dónde estar durante la aplicación"],
    duration: "4-6 días", guarantee: "5-10 años"
  },
  "microcemento-banos": {
    name: "Microcemento Baños", title: "Microcemento para Baños", singular: "microcemento para baños",
    description: "El microcemento para baños es la solución perfecta para renovar sin obras. Se aplica directamente sobre los azulejos existentes, creando un espacio moderno y elegante. Con el sellado adecuado es completamente impermeable, ideal para duchas y zonas de agua.",
    benefits: ["Sin demolición: se aplica sobre azulejos", "Impermeable: perfecto para duchas y zonas húmedas", "Sin juntas: más higiénico y fácil de limpiar", "Amplía visualmente: el acabado continuo agranda el espacio", "Moderno: estética minimalista y actual", "Versátil: suelos, paredes y platos de ducha"],
    process: [
      { step: "Evaluación", desc: "Inspección del baño, verificación del estado de azulejos y asesoramiento sobre diseño." },
      { step: "Preparación", desc: "Limpieza, reparación de azulejos sueltos y aplicación de imprimación especial para cerámica." },
      { step: "Aplicación", desc: "Capas de microcemento en suelo, paredes y/o plato de ducha según el proyecto." },
      { step: "Impermeabilización", desc: "Sellado con productos específicos para zonas húmedas que garantizan la impermeabilidad." },
      { step: "Acabado", desc: "Capa final de protección con acabado mate, satinado o brillo según preferencia." },
    ],
    tips: ["El plato de ducha requiere acabado antideslizante", "Ventila bien el baño durante el secado", "Evita usar el baño durante 48-72 horas", "Usa productos de limpieza neutros", "Renueva el sellador cada 2-3 años"],
    duration: "5-7 días", guarantee: "5-10 años"
  },
  "microcemento-cocinas": {
    name: "Microcemento Cocinas", title: "Microcemento para Cocinas", singular: "microcemento para cocinas",
    description: "El microcemento en cocinas aporta un look industrial y moderno. Es resistente al agua, las manchas y el calor moderado. Se puede aplicar en suelos, paredes, encimeras y frentes de cocina, creando un espacio continuo y elegante.",
    benefits: ["Resistente a manchas: el sellado protege de aceites y líquidos", "Fácil limpieza: superficie lisa sin juntas donde se acumule suciedad", "Estética única: look industrial y minimalista", "Continuo: integra suelo, paredes y encimera", "Higiénico: sin juntas donde proliferen bacterias", "Duradero: resistente al uso diario intenso"],
    process: [
      { step: "Diseño", desc: "Definición de las zonas a revestir y selección de color y acabado." },
      { step: "Preparación", desc: "Protección de electrodomésticos y muebles, preparación de superficies." },
      { step: "Aplicación", desc: "Capas de microcemento en las zonas definidas, respetando tiempos de secado." },
      { step: "Sellado especial", desc: "En encimeras se aplica sellado alimentario resistente al calor." },
      { step: "Acabado", desc: "Protección final adaptada a cada zona según su uso." },
    ],
    tips: ["Las encimeras requieren sellado especial alimentario", "Usa salvamanteles para ollas calientes", "Limpia derrames rápidamente", "Evita productos abrasivos", "El microcemento no sustituye la encimera, la reviste"],
    duration: "5-7 días", guarantee: "5-10 años"
  },
  "microcemento-paredes": {
    name: "Microcemento Paredes", title: "Microcemento para Paredes", singular: "microcemento para paredes",
    description: "El microcemento en paredes crea ambientes únicos con un acabado continuo y elegante. Se puede aplicar sobre casi cualquier superficie: yeso, pladur, azulejos, hormigón. Ideal para salones, dormitorios, pasillos y cualquier estancia.",
    benefits: ["Acabado continuo: sin juntas ni interrupciones", "Versátil: sobre cualquier superficie existente", "Decorativo: texturas y efectos personalizados", "Resistente: no se agrieta ni despega", "Fácil mantenimiento: limpieza con paño húmedo", "Atemporal: estética que no pasa de moda"],
    process: [
      { step: "Preparación", desc: "Reparación de grietas, nivelación y aplicación de imprimación." },
      { step: "Base", desc: "Primera capa de microcemento que uniformiza la superficie." },
      { step: "Acabado", desc: "Capas finales con el color y textura elegidos." },
      { step: "Efectos", desc: "Si se desea, aplicación de veladuras o efectos decorativos." },
      { step: "Sellado", desc: "Protección final que facilita la limpieza y protege el acabado." },
    ],
    tips: ["Decide el efecto antes de empezar: liso, texturizado, velado", "Las paredes oscuras reducen visualmente el espacio", "Combina con otros materiales para crear contraste", "El microcemento en paredes no necesita tanto sellado como en suelos", "Pide ver trabajos anteriores del aplicador"],
    duration: "3-5 días", guarantee: "5-10 años"
  },
  "microcemento-exterior": {
    name: "Microcemento Exterior", title: "Microcemento Exterior", singular: "microcemento exterior",
    description: "El microcemento para exteriores está formulado para resistir la intemperie: lluvia, sol, heladas y cambios de temperatura. Ideal para terrazas, patios, fachadas y zonas de piscina. Incluye acabado antideslizante para mayor seguridad.",
    benefits: ["Resistente a UV: no amarillea ni decolora", "Impermeable: resiste lluvia y humedad", "Antideslizante: seguro incluso mojado", "Resistente a heladas: no se agrieta con el frío", "Estético: acabado continuo en exterior", "Duradero: formulación específica para intemperie"],
    process: [
      { step: "Evaluación", desc: "Análisis del soporte, pendientes de desagüe y condiciones climáticas." },
      { step: "Preparación", desc: "Limpieza profunda, reparación de grietas y aplicación de imprimación exterior." },
      { step: "Aplicación", desc: "Capas de microcemento exterior con aditivos específicos para intemperie." },
      { step: "Antideslizante", desc: "Acabado con partículas antideslizantes en zonas de paso." },
      { step: "Sellado", desc: "Sellador específico para exterior resistente a UV y agua." },
    ],
    tips: ["Verifica que el producto sea específico para exterior", "Las pendientes de desagüe son fundamentales", "Evita aplicar con previsión de lluvia", "El color claro refleja el calor", "Renueva el sellador cada 2-3 años"],
    duration: "5-7 días", guarantee: "5-10 años"
  },
  "microcemento-piscinas": {
    name: "Microcemento Piscinas", title: "Microcemento para Piscinas", singular: "microcemento para piscinas",
    description: "El microcemento para piscinas es un sistema específico resistente al cloro, los rayos UV y el contacto permanente con agua. Se puede aplicar sobre el revestimiento existente (gresite, azulejo) sin necesidad de vaciado prolongado. Resultado: una piscina única y elegante.",
    benefits: ["Resistente al cloro: formulación específica", "Sin juntas: más higiénico y fácil de limpiar", "Estética única: colores y acabados personalizados", "Sobre gresite: sin necesidad de demoler", "Coronación integrada: borde y playa a juego", "Duradero: garantía específica para piscinas"],
    process: [
      { step: "Vaciado", desc: "Vaciado de la piscina y limpieza profunda del vaso." },
      { step: "Preparación", desc: "Reparación de grietas, nivelación y aplicación de imprimación." },
      { step: "Impermeabilización", desc: "Capa de impermeabilización específica para piscinas." },
      { step: "Microcemento", desc: "Aplicación de microcemento para piscinas en varias capas." },
      { step: "Sellado", desc: "Sellador específico resistente al cloro y rayos UV." },
      { step: "Llenado", desc: "Tiempo de curado y llenado progresivo de la piscina." },
    ],
    tips: ["Planifica la obra fuera de temporada de baño", "El proceso completo requiere 10-15 días", "Mantén el pH del agua equilibrado", "Evita productos de limpieza agresivos", "El color claro hace el agua más transparente"],
    duration: "10-15 días", guarantee: "5-10 años"
  },
  "microcemento-escaleras": {
    name: "Microcemento Escaleras", title: "Microcemento para Escaleras", singular: "microcemento para escaleras",
    description: "Las escaleras de microcemento son un elemento decorativo espectacular. Se revisten peldaños, tabicas y zancas creando un conjunto continuo y elegante. El acabado antideslizante garantiza la seguridad sin sacrificar la estética.",
    benefits: ["Continuo: peldaños, tabicas y zancas integrados", "Antideslizante: seguro sin perder estética", "Sin juntas: limpieza fácil", "Personalizable: colores y acabados a medida", "Resistente: soporta el tráfico diario", "Elegante: transforma la escalera en protagonista"],
    process: [
      { step: "Medición", desc: "Medición precisa de cada peldaño y definición del diseño." },
      { step: "Preparación", desc: "Protección de zonas adyacentes y preparación de superficies." },
      { step: "Aplicación", desc: "Revestimiento de peldaños, tabicas y zancas con microcemento." },
      { step: "Cantos", desc: "Tratamiento especial de cantos y aristas para mayor resistencia." },
      { step: "Antideslizante", desc: "Acabado con propiedades antideslizantes en la huella." },
    ],
    tips: ["El canto del peldaño es la zona más delicada", "Pide acabado antideslizante siempre", "Evita usar la escalera durante el secado", "Protege los cantos de golpes", "Combina con el suelo de la planta"],
    duration: "4-6 días", guarantee: "5-10 años"
  },
  "aplicador-microcemento": {
    name: "Aplicador Microcemento", title: "Aplicadores de Microcemento", singular: "aplicador de microcemento",
    description: "Un buen aplicador de microcemento es la clave del éxito. La técnica de aplicación es tan importante como el material. Conectamos con aplicadores certificados, con experiencia demostrable y garantía por escrito. Compara presupuestos y elige con confianza.",
    benefits: ["Certificados: formación específica en microcemento", "Experiencia: portfolio de trabajos anteriores", "Garantía: compromiso por escrito", "Asesoramiento: te ayudan a elegir color y acabado", "Materiales: trabajan con marcas de calidad", "Seguimiento: servicio postventa incluido"],
    process: [
      { step: "Contacto", desc: "Nos cuentas tu proyecto y te conectamos con aplicadores de tu zona." },
      { step: "Visita", desc: "El aplicador visita tu espacio, evalúa y te asesora." },
      { step: "Presupuesto", desc: "Recibes presupuesto detallado con materiales, plazos y garantía." },
      { step: "Comparación", desc: "Compara varios presupuestos y elige el que más te convenza." },
      { step: "Ejecución", desc: "El aplicador ejecuta el trabajo con seguimiento de calidad." },
    ],
    tips: ["Pide ver trabajos anteriores", "Verifica que tenga seguro de responsabilidad civil", "Exige presupuesto detallado por escrito", "Pregunta por la marca de microcemento que usa", "La garantía debe cubrir material y mano de obra"],
    duration: "Según proyecto", guarantee: "5-10 años"
  },
  "microcemento-decorativo": {
    name: "Microcemento Decorativo", title: "Microcemento Decorativo", singular: "microcemento decorativo",
    description: "El microcemento decorativo va más allá del acabado liso tradicional. Incluye técnicas especiales como veladuras, texturas, efectos óxido, degradados y acabados personalizados. Ideal para crear espacios únicos y con personalidad.",
    benefits: ["Efectos únicos: óxido, veladura, degradado", "Texturas: desde liso hasta rugoso", "Personalización: diseños a medida", "Artesanal: cada aplicación es única", "Combinable: con otros materiales y técnicas", "Exclusivo: resultados irrepetibles"],
    process: [
      { step: "Diseño", desc: "Definición del efecto deseado con muestras y referencias." },
      { step: "Preparación", desc: "Preparación del soporte según el efecto a conseguir." },
      { step: "Base", desc: "Aplicación de capas base que servirán de fondo." },
      { step: "Efecto", desc: "Aplicación de la técnica decorativa elegida." },
      { step: "Protección", desc: "Sellado que protege el efecto sin alterar su aspecto." },
    ],
    tips: ["Pide muestras del efecto exacto", "Los efectos decorativos requieren aplicadores especializados", "El resultado puede variar ligeramente de la muestra", "Combina zonas lisas con zonas decorativas", "Menos es más: no abuses de los efectos"],
    duration: "5-10 días", guarantee: "5-10 años"
  },
  "cemento-pulido": {
    name: "Cemento Pulido", title: "Cemento Pulido", singular: "cemento pulido",
    description: "El cemento pulido es un acabado industrial que se consigue puliendo y tratando el hormigón existente o una solera nueva. El resultado es una superficie brillante, extremadamente resistente y con un aspecto único. Ideal para locales comerciales, naves y viviendas de estilo industrial.",
    benefits: ["Ultra resistente: soporta tráfico pesado", "Brillante: acabado espejo muy decorativo", "Económico: aprovecha el hormigón existente", "Duradero: décadas de vida útil", "Fácil mantenimiento: solo requiere fregado", "Industrial: estética de tendencia"],
    process: [
      { step: "Evaluación", desc: "Análisis del hormigón existente o planificación de solera nueva." },
      { step: "Desbaste", desc: "Eliminación de irregularidades con discos de diamante." },
      { step: "Pulido", desc: "Pulido progresivo con discos de grano cada vez más fino." },
      { step: "Densificado", desc: "Aplicación de densificador que endurece la superficie." },
      { step: "Abrillantado", desc: "Pulido final que consigue el efecto espejo." },
    ],
    tips: ["El hormigón existente debe estar en buen estado", "El resultado depende de la calidad del hormigón", "Requiere maquinaria industrial especializada", "Ideal para grandes superficies", "Combina con microcemento en otras zonas"],
    duration: "3-5 días", guarantee: "10-15 años"
  },
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

  const serviceInfo = SERVICE_INFO[serviceId as Service]
  return {
    title: `${serviceInfo.title} en España | Aplicadores Certificados | microcemento`,
    description: `${serviceInfo.description} Servicio en toda España. Presupuestos gratis.`,
    alternates: { canonical: `https://microcementohoy.com/${serviceId}/` },
    openGraph: { title: `${serviceInfo.title} en España`, description: serviceInfo.description, type: "website", siteName: "microcemento" },
  }
}

export default async function ServiceHubPage({ params }: PageProps) {
  const { service: serviceId } = await params
  if (!VALID_SERVICES.includes(serviceId as Service)) notFound()

  const serviceInfo = SERVICE_INFO[serviceId as Service]
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
            <img src={heroImg} alt={serviceInfo.title} className="w-full h-full object-cover opacity-30" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-28">
            <nav className="text-[10px] tracking-[0.3em] uppercase text-background/30 mb-8 font-sans flex items-center gap-2">
              <Link href="/" className="hover:text-background/60 transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-background/60">{serviceInfo.title}</span>
            </nav>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-background leading-[0.95]">
              {serviceInfo.title}
              <br />
              <span className="italic font-light">en toda España</span>
            </h1>
            <p className="text-sm sm:text-base text-background/50 mt-8 max-w-xl font-sans leading-relaxed">
              {serviceInfo.description}
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

        {/* Ventajas */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 border-b border-border">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Ventajas</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground leading-[1.05]">
                ¿Por qué elegir {serviceInfo.singular}?
              </h2>
              <p className="text-sm text-muted-foreground mt-4 font-sans leading-relaxed">
                El microcemento ofrece ventajas únicas frente a otros materiales. Estas son las principales:
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="grid sm:grid-cols-2 gap-4">
                {serviceInfo.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 bg-secondary/50">
                    <span className="text-xs text-muted-foreground font-mono mt-0.5">0{i + 1}</span>
                    <span className="text-sm text-foreground font-sans">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 border-b border-border">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">El proceso</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground leading-[1.05]">
                Cómo trabajamos
              </h2>
              <p className="text-sm text-muted-foreground mt-4 font-sans leading-relaxed">
                Nuestros aplicadores certificados siguen un proceso profesional para garantizar un acabado perfecto.
              </p>
              <div className="mt-6 p-4 bg-secondary/50">
                <p className="text-xs text-muted-foreground font-sans">Duración estimada</p>
                <p className="text-lg font-serif text-foreground mt-1">{serviceInfo.duration}</p>
                <p className="text-xs text-muted-foreground font-sans mt-3">Garantía</p>
                <p className="text-lg font-serif text-foreground mt-1">{serviceInfo.guarantee}</p>
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-6">
                {serviceInfo.process.map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-foreground text-background flex items-center justify-center font-serif text-lg">
                      {i + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-base font-sans font-medium text-foreground">{step.step}</h3>
                      <p className="text-sm text-muted-foreground mt-2 font-sans leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Consejos */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 border-b border-border">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Consejos</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground leading-[1.05]">
                Lo que debes saber
              </h2>
              <p className="text-sm text-muted-foreground mt-4 font-sans leading-relaxed">
                Antes de empezar tu proyecto de microcemento, ten en cuenta estos consejos:
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="space-y-4">
                {serviceInfo.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 border border-border">
                    <svg className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-foreground font-sans">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Ciudades principales */}
        <section id="ciudades" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-12 gap-4 mb-16">
            <div className="lg:col-span-5">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Ciudades</p>
              <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-foreground leading-[1.05]">
                {serviceInfo.title}
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
              {serviceInfo.title} profesional
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
                <h3 className="text-sm font-sans font-medium text-foreground group-hover:underline">{SERVICE_INFO[svc as Service]?.title}</h3>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{SERVICE_INFO[svc as Service]?.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

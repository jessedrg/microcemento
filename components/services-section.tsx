import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const services = [
  {
    id: "microcemento-suelos",
    title: "Suelos de microcemento",
    desc: "Superficies continuas sin juntas. Sobre pavimento existente, sin obras. Acabado impecable para cualquier estancia.",
    img: "https://images.unsplash.com/photo-1559763194-521eef49b386?q=80&w=2469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: "microcemento-banos",
    title: "Baños de microcemento",
    desc: "Paredes, suelos y platos de ducha. Impermeabilidad total y estetica unica.",
    img: "https://images.unsplash.com/photo-1565768502473-c5dc73b7eb33?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "",
  },
  {
    id: "microcemento-cocinas",
    title: "Cocinas de microcemento",
    desc: "Encimeras, paredes y suelos. Resistencia y diseño en un solo material.",
    img: "https://images.unsplash.com/photo-1581710515207-e12b6e176779?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "",
  },
  {
    id: "microcemento-paredes",
    title: "Paredes de microcemento",
    desc: "Revestimiento decorativo para interiores. Texturas, colores y acabados a medida.",
    img: "https://images.unsplash.com/photo-1677256466027-5fdb66b1c348?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "",
  },
  {
    id: "microcemento-exterior",
    title: "Microcemento exterior",
    desc: "Terrazas, patios y fachadas. Resistencia a la intemperie con acabado premium.",
    img: "https://images.unsplash.com/photo-1619280771206-d8330a0be617?q=80&w=977&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "",
  },
  {
    id: "microcemento-piscinas",
    title: "Piscinas de microcemento",
    desc: "Revestimiento integral, coronacion y playas. Estetica unica para tu piscina.",
    img: "https://images.unsplash.com/photo-1565768502473-c5dc73b7eb33?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "md:col-span-2",
  },
]

export function ServicesSection() {
  return (
    <section id="servicios" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
      <div className="grid lg:grid-cols-12 gap-4 mb-16 lg:mb-24">
        <div className="lg:col-span-5">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Servicios</p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-foreground leading-[1.05]">
            Microcemento para cada superficie
          </h2>
        </div>
        <div className="lg:col-span-4 lg:col-start-8 flex items-end">
          <p className="text-sm text-muted-foreground font-sans leading-relaxed">
            Desde suelos hasta piscinas. Encontramos los aplicadores certificados perfectos para cada proyecto de microcemento.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-3">
        {services.map((svc) => (
          <Link
            key={svc.id}
            href={`/${svc.id}/`}
            className={`group relative overflow-hidden bg-secondary aspect-[4/3] ${svc.span}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={svc.img}
              alt={svc.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />
            <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 bg-foreground/40 group-hover:bg-foreground/60 transition-colors duration-500">
              <div className="flex justify-between items-start">
                <h3 className="font-serif text-xl sm:text-2xl text-background transition-colors duration-500">{svc.title}</h3>
                <ArrowUpRight className="w-5 h-5 text-background/60 group-hover:text-background transition-colors duration-500" />
              </div>
              <p className="text-xs text-background/70 group-hover:text-background/90 transition-colors duration-500 max-w-xs font-sans">
                {svc.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

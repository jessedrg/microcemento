import { MessageCircle, ArrowRight } from "lucide-react"

const WA_URL = "https://wa.me/34711267223?text=Hola%2C%20me%20interesa%20un%20proyecto%20de%20microcemento."

export function CtaSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1581710515207-e12b6e176779?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Interior con microcemento"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-40">
        <div className="max-w-2xl">
          <p className="text-[10px] tracking-[0.4em] uppercase text-background/30 mb-4 font-sans">Tu espacio perfecto</p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-background leading-[1.05]">
            Cada superficie tiene
            <br />
            <span className="italic font-light">una historia nueva.</span>
          </h2>
          <p className="text-sm text-background/60 mt-6 font-sans leading-relaxed max-w-md">
            Empieza la tuya con un mensaje. Sin compromiso, sin coste. Solo el primer paso hacia el acabado perfecto que mereces.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-sm font-sans font-medium hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp: 711 267 223
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center gap-2 border border-background/30 text-background px-8 py-4 text-sm font-sans hover:border-background/60 transition-colors"
            >
              Ver servicios
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

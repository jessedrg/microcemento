import { MessageCircle, ArrowDown } from "lucide-react"

const WA_URL = "https://wa.me/34711267223?text=Hola%2C%20me%20interesa%20un%20proyecto%20de%20microcemento."

export function HomeHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end bg-foreground text-background overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1619280771206-d8330a0be617?q=80&w=977&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Interior moderno con microcemento"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-24 pt-32">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-background/40 mb-6 font-sans">
              Microcemento profesional en toda España
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-background leading-[0.9]">
              Superficies
              <br />
              <span className="italic font-light">sin limites.</span>
            </h1>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <p className="text-sm text-background/60 font-sans leading-relaxed max-w-sm lg:ml-auto mb-8">
              Conectamos con los mejores aplicadores de microcemento de tu zona. Presupuestos reales, sin compromiso. Tu espacio perfecto empieza con un mensaje.
            </p>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-sm font-sans font-medium hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-4 h-4" />
                Presupuesto gratis
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 border border-background/30 text-background px-8 py-4 text-sm font-sans hover:border-background/60 transition-colors"
              >
                Explorar servicios
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-px mt-16 lg:mt-24 border-t border-background/10 pt-8">
          <div>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-background">1.200+</p>
            <p className="text-[10px] sm:text-xs text-background/40 mt-1 font-sans tracking-wide">Proyectos realizados</p>
          </div>
          <div>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-background">4.9<span className="text-lg text-background/40">/5</span></p>
            <p className="text-[10px] sm:text-xs text-background/40 mt-1 font-sans tracking-wide">Valoracion media</p>
          </div>
          <div>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-background">100%</p>
            <p className="text-[10px] sm:text-xs text-background/40 mt-1 font-sans tracking-wide">Aplicadores certificados</p>
          </div>
        </div>
      </div>
    </section>
  )
}

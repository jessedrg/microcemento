import { MessageCircle } from "lucide-react"

const WA_URL = "https://wa.me/34711267223?text=Hola%2C%20me%20interesa%20un%20proyecto%20de%20microcemento."

const steps = [
  {
    num: "01",
    title: "Cuentanos tu proyecto",
    desc: "Escribenos por WhatsApp. Que superficie quieres revestir, que acabado buscas, tu presupuesto orientativo. 5 minutos bastan.",
  },
  {
    num: "02",
    title: "Recibe presupuestos",
    desc: "Contactamos con los mejores aplicadores de microcemento de tu zona. Recibes hasta 3 presupuestos detallados y comparados.",
  },
  {
    num: "03",
    title: "Elige y transforma",
    desc: "Tu decides. Coordinamos la primera visita y te acompanamos durante toda la aplicacion. Sin sorpresas.",
  },
]

export function HowItWorks() {
  return (
    <section id="proceso" className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="text-[10px] tracking-[0.4em] uppercase text-background/30 mb-3 font-sans">Proceso</p>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-background leading-[1.05]">
              Tres pasos. Cero complicaciones.
            </h2>
            <p className="text-sm text-background/50 mt-6 font-sans leading-relaxed">
              Nos encargamos de todo para que tu solo tengas que elegir el acabado perfecto.
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 mt-10 text-sm font-sans font-medium hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" />
              Empezar ahora
            </a>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 space-y-0">
            {steps.map((step, i) => (
              <div key={step.num} className={`flex gap-8 py-10 ${i < steps.length - 1 ? "border-b border-background/10" : ""}`}>
                <span className="font-serif text-5xl lg:text-6xl text-background/10 flex-shrink-0 leading-none">{step.num}</span>
                <div>
                  <h3 className="text-base sm:text-lg font-sans font-medium text-background">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-background/50 mt-2 font-sans leading-relaxed max-w-md">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

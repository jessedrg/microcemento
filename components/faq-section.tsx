"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "Cuanto cuesta el microcemento por metro cuadrado?",
    a: "El precio del microcemento depende del tipo de superficie, el acabado y la complejidad del proyecto. Como orientacion, los precios oscilan entre 50-120€/m2 para suelos, 60-130€/m2 para banos y 40-90€/m2 para paredes. microcemento te presenta presupuestos detallados y comparados de aplicadores certificados para que elijas con informacion real.",
  },
  {
    q: "Se puede aplicar microcemento sobre azulejos?",
    a: "Si, una de las grandes ventajas del microcemento es que se aplica directamente sobre el revestimiento existente (azulejos, baldosas, terrazo, marmol) sin necesidad de demolicion. Esto ahorra tiempo, dinero y escombros. Es la solucion ideal para renovar sin obras.",
  },
  {
    q: "El servicio de microcemento tiene algun coste?",
    a: "No. Nuestro asesoramiento es 100% gratuito. Comparamos aplicadores, te presentamos presupuestos y te acompanamos durante la aplicacion. Sin comisiones, sin costes ocultos.",
  },
  {
    q: "Cuanto tiempo tarda la aplicacion de microcemento?",
    a: "La aplicacion completa suele tardar entre 5-7 dias laborables para un proyecto medio (bano o cocina). Un suelo de salon puede completarse en 4-5 dias. El tiempo incluye la preparacion de la superficie, las capas de microcemento, el sellado y el curado.",
  },
  {
    q: "El microcemento es resistente al agua?",
    a: "Si. Con el sellado adecuado (que todos nuestros aplicadores certificados realizan), el microcemento es completamente impermeable. Es perfecto para banos, cocinas, duchas e incluso piscinas. La clave esta en la calidad del sellador y la correcta aplicacion.",
  },
  {
    q: "Trabajais en toda España?",
    a: "Si. Tenemos aplicadores de microcemento certificados en mas de 8.000 municipios de toda España. Desde grandes ciudades hasta localidades pequenas.",
  },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
      <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">FAQ</p>
      <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-foreground mb-16">
        Preguntas frecuentes
      </h2>

      <div className="border-t border-border">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-border">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-start justify-between gap-6 py-6 text-left group"
            >
              <h3 className="text-sm font-sans font-medium text-foreground leading-relaxed group-hover:opacity-70 transition-opacity">
                {faq.q}
              </h3>
              <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-96 pb-6" : "max-h-0"}`}>
              <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed -mt-2">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

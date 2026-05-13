import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const phoneNumber = '523340187767'

const services = [
  {
    title: 'Brand Sites',
    detail: 'Webs de marca con narrativa visual y estructura enfocada en conversion.',
    metric: 'Desde 3 semanas',
  },
  {
    title: 'Landing Systems',
    detail: 'Sistemas de landing pages para campanas, captacion y pruebas continuas.',
    metric: 'CRO continuo',
  },
  {
    title: 'Motion Direction',
    detail: 'Animacion con intencion: transiciones, scroll stories y microinteracciones.',
    metric: 'GSAP + Framer',
  },
]

const stats = [
  { value: '+142%', label: 'conversion promedio' },
  { value: '-38%', label: 'rebote en mobile' },
  { value: '4.9/5', label: 'satisfaccion clientes' },
]

const navItems = [
  { label: 'Servicios', href: '#services' },
  { label: 'Resultados', href: '#results' },
  { label: 'Contacto', href: '#contact' },
]

function App() {
  const pageRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-shell', {
        y: -35,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      })

      gsap.from('.title-reveal > span', {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.09,
      })

      gsap.from('.hero-grid > *', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.2,
      })

      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 46,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      gsap.to('.noise-line', {
        backgroundPositionX: '220px',
        ease: 'none',
        repeat: -1,
        duration: 8,
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const whatsappLink = `https://wa.me/${phoneNumber}?text=Hola%20alpha,%20quiero%20una%20web%20de%20alto%20impacto`;

  return (
    <div className="site" ref={pageRef}>
      <header className="nav-shell">
        <a href="#top" className="wordmark">alpha</a>

        <nav className="main-nav">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <a href={whatsappLink} className="nav-cta" target="_blank" rel="noreferrer">WhatsApp</a>

        <button
          type="button"
          className={`menu-btn ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="mobile-card" initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 28, opacity: 0 }}>
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
              ))}
              <a href={whatsappLink} onClick={() => setMenuOpen(false)} target="_blank" rel="noreferrer">Contactar alpha</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="top">
        <section className="hero-frame">
          <div className="noise-line" aria-hidden="true" />

          <div className="hero-grid">
            <div className="hero-left">
              <p className="eyebrow">digital studio - web design & development</p>
              <h1 className="title-reveal">
                <span>alpha diseña</span>
                <span>experiencias web</span>
                <span>que se sienten caras.</span>
              </h1>
              <p className="lead">
                Estrategia, estilo y tecnologia para negocios que quieren verse premium y vender mas en desktop y mobile.
              </p>
              <div className="hero-actions">
                <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} href={whatsappLink} target="_blank" rel="noreferrer" className="btn solid">Iniciar por WhatsApp</motion.a>
                <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} href="#services" className="btn outline">Explorar servicios</motion.a>
              </div>
            </div>

            <div className="hero-right">
              <div className="panel top">
                <small>NOW BUILDING</small>
                <strong>alpha.mx</strong>
                <p>Interfaces sobrias, motion elegante y estructura pensada para conversion.</p>
              </div>
              <div className="panel bottom">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <span>{stat.value}</span>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="reveal section">
          <div className="section-head">
            <p className="eyebrow">servicios alpha</p>
            <h2>Un enfoque visual totalmente distinto, sin plantillas genericas.</h2>
          </div>

          <div className="service-stack">
            {services.map((service, index) => (
              <motion.article key={service.title} className="service-item" whileHover={{ x: 6 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
                <span>0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.detail}</p>
                <small>{service.metric}</small>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="results" className="reveal section result-band">
          <h2>Tu marca no necesita otra web bonita. Necesita una web que produzca.</h2>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn solid">Hablar con alpha - 3340187767</a>
        </section>

        <section id="contact" className="reveal section contact-block">
          <p className="eyebrow">contacto directo</p>
          <h2>Escribenos y te enviamos propuesta inicial en menos de 24 horas.</h2>
          <div className="contact-links">
            <a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp: 3340187767</a>
            <span>Marca: alpha</span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'Web de Alto Impacto',
    description: 'Experiencias web que convierten visitas en ventas con diseño, velocidad y narrativa visual.',
    tag: 'Brand + Conversion',
  },
  {
    title: 'Ecommerce Escalable',
    description: 'Tiendas optimizadas para crecimiento con journeys claros, UX premium y performance extremo.',
    tag: 'Commerce + CRO',
  },
  {
    title: 'Animaciones Pro',
    description: 'Microinteracciones y motion systems que elevan percepción de marca y tiempo de permanencia.',
    tag: 'GSAP + Framer',
  },
]

const process = [
  'Descubrimos la meta de negocio y diseñamos la estrategia digital.',
  'Creamos UI/UX con identidad visual clara y prototipo interactivo.',
  'Desarrollamos en React con enfoque en performance y SEO técnico.',
  'Lanzamos, medimos y optimizamos para escalar resultados.',
]

function App() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav', {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })

      gsap.from('.hero-title .line', {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.1,
      })

      gsap.to('.hero-orb', {
        y: 28,
        x: 20,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: 'sine.inOut',
      })

      gsap.utils.toArray('.reveal').forEach((item) => {
        gsap.from(item, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      gsap.to('.parallax-grid', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          scrub: 1,
          start: 'top top',
          end: 'bottom top',
        },
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="page" ref={pageRef}>
      <header className="nav">
        <span className="brand">alpha</span>
        <nav>
          <a href="#services">Servicios</a>
          <a href="#process">Proceso</a>
          <a href="#contact">Contacto</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="kicker">Agencia web de nueva generación</p>
            <h1 className="hero-title">
              <span className="line-wrap"><span className="line">Creamos webs</span></span>
              <span className="line-wrap"><span className="line">que venden,</span></span>
              <span className="line-wrap"><span className="line">enamoran y escalan.</span></span>
            </h1>
            <p className="hero-subtitle">
              En alpha mezclamos estrategia, diseño y desarrollo para lanzar experiencias web que se sienten premium y convierten mejor.
            </p>
            <div className="hero-actions">
              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary"
                type="button"
              >
                Iniciar proyecto
              </motion.button>
              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-ghost"
                type="button"
              >
                Ver casos
              </motion.button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-orb" />
            <div className="parallax-grid" />
            <motion.div
              className="hero-card"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p>+187%</p>
              <span>Incremento promedio en conversiones</span>
            </motion.div>
          </div>
        </section>

        <section id="services" className="section reveal">
          <div className="section-heading">
            <p className="kicker">Servicios</p>
            <h2>Todo lo necesario para dominar digitalmente</h2>
          </div>
          <div className="cards">
            {services.map((service) => (
              <motion.article
                key={service.title}
                className="card"
                whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              >
                <span className="chip">{service.tag}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="process" className="section reveal">
          <div className="section-heading">
            <p className="kicker">Proceso</p>
            <h2>Metodología clara, ejecución impecable</h2>
          </div>
          <div className="timeline">
            {process.map((item, index) => (
              <motion.div
                key={item}
                className="timeline-item"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <span className="step">0{index + 1}</span>
                <p>{item}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="section cta reveal">
          <h2>Tu siguiente web puede ser brutal</h2>
          <p>Si quieres una presencia digital que se vea premium y además rinda, armemos algo grande juntos.</p>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 0 8px rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-primary"
            type="button"
          >
            Agendar llamada
          </motion.button>
        </section>
      </main>

      <footer className="footer">
        <span>alpha</span>
        <small>Web Agency - Crafted with React, Framer Motion and GSAP</small>
      </footer>
    </div>
  )
}

export default App

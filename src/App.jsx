import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const phoneNumber = '523340187767'

const showcase = [
  {
    title: 'Ecommerce Fashion',
    type: 'Tienda online',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Coffee Brand Site',
    type: 'Marca + conversion',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Beauty Store UX',
    type: 'Catalogo premium',
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Restaurant Booking',
    type: 'Reservas y branding',
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80',
  },
]

const offerings = [
  'Tiendas ecommerce que venden desde mobile',
  'Landing pages para anuncios de alto ROAS',
  'Webs corporativas premium con SEO tecnico',
  'Motion systems con Framer Motion y GSAP',
]

const navItems = [
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Contacto', href: '#contacto' },
]

function App() {
  const pageRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const whatsappLink = `https://wa.me/${phoneNumber}?text=Hola%20alpha,%20quiero%20una%20pagina%20top%20para%20mi%20negocio`

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-shell', { y: -30, opacity: 0, duration: 0.7, ease: 'power3.out' })
      gsap.from('.hero-headline .line', {
        yPercent: 110,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power4.out',
      })

      gsap.utils.toArray('.reveal').forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      gsap.to('.hero-glow', {
        x: 22,
        y: 18,
        yoyo: true,
        repeat: -1,
        duration: 4.5,
        ease: 'sine.inOut',
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

  return (
    <div className="site" ref={pageRef}>
      <header className="nav-shell">
        <a href="#top" className="wordmark">alpha</a>
        <nav className="main-nav">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <a href={whatsappLink} target="_blank" rel="noreferrer" className="nav-cta">Empezar</a>
        <button
          type="button"
          className={`menu-btn ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((p) => !p)}
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
            <motion.div className="mobile-card" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }}>
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
              ))}
              <a href={whatsappLink} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>WhatsApp 3340187767</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <p className="kicker">alpha - web agency de alto rendimiento</p>
            <h1 className="hero-headline">
              <span className="line-wrap"><span className="line">Construimos paginas</span></span>
              <span className="line-wrap"><span className="line">que te atrapan</span></span>
              <span className="line-wrap"><span className="line">y te hacen vender.</span></span>
            </h1>
            <p className="hero-sub">
              Somos top creando sitios para tiendas, marcas, restaurantes, servicios y startups. Diseno, codigo y conversion en un solo equipo.
            </p>
            <div className="hero-actions">
              <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} href={whatsappLink} target="_blank" rel="noreferrer" className="btn solid">Quiero mi web top</motion.a>
              <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} href="#proyectos" className="btn ghost">Ver ejemplos</motion.a>
            </div>
          </div>

          <div className="hero-media">
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80" alt="Dashboard y crecimiento digital" />
            <div className="hero-glow" />
            <div className="floating-card">
              <strong>+220%</strong>
              <span>crecimiento en ventas online</span>
            </div>
          </div>
        </section>

        <section id="proyectos" className="section reveal">
          <div className="section-head">
            <p className="kicker">proyectos de muestra</p>
            <h2>Ejemplos reales de lo que podemos construir para tu negocio.</h2>
          </div>

          <div className="showcase-grid">
            {showcase.map((item) => (
              <motion.article key={item.title} className="showcase-card" whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="showcase-overlay">
                  <p>{item.type}</p>
                  <h3>{item.title}</h3>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="servicios" className="section reveal services-band">
          <div className="section-head">
            <p className="kicker">lo que hacemos</p>
            <h2>De todo lo necesario para dominar digitalmente.</h2>
          </div>
          <div className="offer-list">
            {offerings.map((item) => (
              <div key={item} className="offer-item">
                <span>+</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contacto" className="section reveal cta">
          <h2>Si quieres una web que impresione y convierta, hablemos hoy.</h2>
          <p>Escribenos directo y te proponemos una idea inicial para tu negocio.</p>
          <div className="cta-actions">
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn solid">WhatsApp 3340187767</a>
            <span>alpha</span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const PHONE_NUMBER = '523340187767'

const pageLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/tienda', label: 'Demo Tienda' },
  { to: '/restaurante', label: 'Demo Restaurante' },
  { to: '/catalogo', label: 'Demo Catalogo' },
]

const showcasePages = [
  {
    title: 'Tienda Completa',
    subtitle: 'carrito, cupones, descuentos y checkout',
    to: '/tienda',
    image:
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1400&q=80',
    tone: 'warm',
  },
  {
    title: 'Reserva Restaurante',
    subtitle: 'slots en tiempo real y confirmacion',
    to: '/restaurante',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
    tone: 'ruby',
  },
  {
    title: 'Catalogo Inteligente',
    subtitle: 'filtros, busqueda y vista rapida',
    to: '/catalogo',
    image:
      'https://images.unsplash.com/photo-1521917441209-e886f0404a7b?auto=format&fit=crop&w=1400&q=80',
    tone: 'azure',
  },
]

const storeProducts = [
  {
    id: 'A1',
    name: 'Nebula Hoodie',
    category: 'Streetwear',
    price: 1490,
    discount: 24,
    stock: 12,
    image:
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'A2',
    name: 'Pulse Sneakers',
    category: 'Calzado',
    price: 2090,
    discount: 18,
    stock: 6,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'A3',
    name: 'Orbit Backpack',
    category: 'Accesorios',
    price: 1090,
    discount: 16,
    stock: 20,
    image:
      'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'A4',
    name: 'Core Tee',
    category: 'Streetwear',
    price: 650,
    discount: 12,
    stock: 40,
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'A5',
    name: 'Ridge Watch',
    category: 'Accesorios',
    price: 2480,
    discount: 32,
    stock: 4,
    image:
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'A6',
    name: 'Storm Jacket',
    category: 'Streetwear',
    price: 1890,
    discount: 28,
    stock: 9,
    image:
      'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=900&q=80',
  },
]

const catalogItems = [
  {
    id: 'C1',
    title: 'Aurora Lamp',
    category: 'Hogar',
    price: 1390,
    stock: 15,
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    description: 'Lampara led ambient para interiores premium.',
  },
  {
    id: 'C2',
    title: 'Signal Keyboard',
    category: 'Tech',
    price: 2290,
    stock: 8,
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
    description: 'Teclado mecanico compacto para setups creativos.',
  },
  {
    id: 'C3',
    title: 'Canvas Jacket',
    category: 'Moda',
    price: 1780,
    stock: 24,
    image:
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=80',
    description: 'Jacket urbana de corte relajado y tela pesada.',
  },
  {
    id: 'C4',
    title: 'Heritage Beans',
    category: 'Gourmet',
    price: 420,
    stock: 100,
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
    description: 'Cafe de especialidad con notas a cacao y frutos rojos.',
  },
  {
    id: 'C5',
    title: 'Halo Speaker',
    category: 'Tech',
    price: 1690,
    stock: 17,
    image:
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=80',
    description: 'Bocina bluetooth de alto rango y baja distorsion.',
  },
  {
    id: 'C6',
    title: 'Nordic Chair',
    category: 'Hogar',
    price: 3120,
    stock: 5,
    image:
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80',
    description: 'Silla de diseno con estructura robusta y tela suave.',
  },
  {
    id: 'C7',
    title: 'Mono Boots',
    category: 'Moda',
    price: 2560,
    stock: 10,
    image:
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80',
    description: 'Botas de piel para outfits urbanos y premium.',
  },
  {
    id: 'C8',
    title: 'Chef Knife Set',
    category: 'Gourmet',
    price: 1890,
    stock: 13,
    image:
      'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=900&q=80',
    description: 'Set profesional para cocina de precision.',
  },
  {
    id: 'C9',
    title: 'Wave Monitor',
    category: 'Tech',
    price: 5690,
    stock: 3,
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
    description: 'Monitor 4K ultra wide para productividad y diseno.',
  },
]

const reservationSlots = ['18:00', '18:45', '19:30', '20:15', '21:00', '21:45']

const promoCodes = {
  ALPHA10: 10,
  STORE20: 20,
  HOT30: 30,
}

function formatCurrency(value) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(value)
}

function getSalePrice(product) {
  return Math.round(product.price * (1 - product.discount / 100))
}

function todayISO() {
  const now = new Date()
  const month = `${now.getMonth() + 1}`.padStart(2, '0')
  const day = `${now.getDate()}`.padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

function App() {
  const location = useLocation()
  return <AppLayout key={location.pathname} location={location} />
}

function AppLayout({ location }) {
  const rootRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const themeMap = {
      '/': 'theme-home',
      '/tienda': 'theme-store',
      '/restaurante': 'theme-restaurant',
      '/catalogo': 'theme-catalog',
    }

    document.body.dataset.theme = themeMap[location.pathname] || 'theme-home'
  }, [location.pathname])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.top-nav', {
        y: -24,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out',
      })

      gsap.from('.page-hero .headline-line', {
        yPercent: 120,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power4.out',
      })

      gsap.utils.toArray('.reveal').forEach((item) => {
        gsap.from(item, {
          y: 36,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      gsap.to('.floating-orb', {
        x: 20,
        y: 14,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, rootRef)

    return () => ctx.revert()
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className="app-shell" ref={rootRef}>
      <header className="top-nav">
        <Link className="brand" to="/">alpha</Link>

        <nav className="desktop-nav">
          {pageLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <a
          className="main-cta"
          href={`https://wa.me/${PHONE_NUMBER}?text=Hola%20alpha,%20quiero%20una%20demo%20como%20esta`}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
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
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="mobile-panel"
              initial={{ y: 26, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 26, opacity: 0 }}
            >
              {pageLinks.map((link) => (
                <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </NavLink>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tienda" element={<StoreDemoPage />} />
        <Route path="/restaurante" element={<RestaurantDemoPage />} />
        <Route path="/catalogo" element={<CatalogDemoPage />} />
      </Routes>
    </div>
  )
}

function HomePage() {
  const pillars = [
    {
      title: 'Quienes Somos',
      text: 'alpha es una agencia de diseno y desarrollo web enfocada en crecimiento. No hacemos paginas bonitas sin estrategia: construimos activos digitales que venden.',
    },
    {
      title: 'Como Funcionamos',
      text: 'Trabajamos por sprints: descubrimiento, propuesta visual, desarrollo, QA y optimizacion post-lanzamiento. Cada etapa tiene entregables claros.',
    },
    {
      title: 'En Que Somos Top',
      text: 'Conversion, velocidad, experiencia mobile y narrativa visual. Unimos branding + performance para que tu web tenga impacto real.',
    },
  ]

  const processSteps = [
    '01. Discovery de negocio, objetivos y audiencia.',
    '02. Arquitectura de contenido y wireframes de conversion.',
    '03. UI de alto impacto + motion system.',
    '04. Desarrollo React con performance y SEO tecnico.',
    '05. Lanzamiento, metricas y mejoras continuas.',
  ]

  const testimonials = [
    {
      name: 'Sofia M. - Fundadora de Nox Wear',
      quote: 'Con alpha subimos conversion en mobile y por fin la marca se siente premium.',
    },
    {
      name: 'Daniel R. - Restaurante Brava',
      quote: 'La web nueva nos trajo mas reservaciones directas y mejor imagen de marca.',
    },
    {
      name: 'Paula G. - Ecom Beauty',
      quote: 'Su proceso fue clarisimo. Diseñaron pensando en ventas, no solo en estetica.',
    },
  ]

  return (
    <main className="page-wrap">
      <section className="page-hero reveal">
        <p className="eyebrow">alpha web agency</p>
        <h1>
          <span className="headline-line-wrap"><span className="headline-line">Somos alpha.</span></span>
          <span className="headline-line-wrap"><span className="headline-line">Creamos webs top</span></span>
          <span className="headline-line-wrap"><span className="headline-line">que hacen crecer marcas.</span></span>
        </h1>
        <p>
          Ayudamos a negocios ambiciosos a verse premium, convertir mejor y escalar digitalmente con
          estrategia, diseno, desarrollo y optimizacion continua.
        </p>
      </section>

      <section className="pillar-grid reveal">
        {pillars.map((item) => (
          <article key={item.title} className="pillar-card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="value-band reveal">
        <h2>alpha entrega estrategia, diseno y codigo en una sola capa.</h2>
        <p>
          Nuestro enfoque no es hacer una web y ya. Buscamos resultados: mas leads, mas ventas, mejor
          experiencia y una marca que se vea mas fuerte que su competencia.
        </p>
      </section>

      <section className="process-section reveal">
        <div className="section-title-row">
          <h2>Como trabajamos contigo</h2>
          <p>Proceso simple, transparente y orientado a negocio.</p>
        </div>
        <div className="process-list">
          {processSteps.map((step) => (
            <article key={step} className="process-item">
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="stats-row reveal">
        <article>
          <strong>+220%</strong>
          <p>Crecimiento en ventas online en proyectos de ecommerce.</p>
        </article>
        <article>
          <strong>-42%</strong>
          <p>Reduccion de rebote mobile con rediseño UX/UI.</p>
        </article>
        <article>
          <strong>4.9/5</strong>
          <p>Satisfaccion promedio de clientes alpha.</p>
        </article>
      </section>

      <section className="testimonials reveal">
        <div className="section-title-row">
          <h2>Lo que dicen nuestros clientes</h2>
          <p>Resultados que se sienten en marca y en caja.</p>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article key={item.name} className="testimonial-card">
              <p>"{item.quote}"</p>
              <span>{item.name}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="faq-section reveal">
        <div className="section-title-row">
          <h2>Preguntas frecuentes</h2>
          <p>Lo esencial para empezar con confianza.</p>
        </div>
        <div className="faq-grid">
          <article>
            <h3>Cuanto tarda un proyecto?</h3>
            <p>Entre 3 y 8 semanas, segun alcance y contenido.</p>
          </article>
          <article>
            <h3>Solo hacen diseno o tambien desarrollo?</h3>
            <p>Hacemos todo: estrategia, UX/UI, desarrollo, QA y mejoras post-lanzamiento.</p>
          </article>
          <article>
            <h3>Pueden mejorar una web existente?</h3>
            <p>Si. Auditamos tu web actual y rediseñamos solo lo que impacta resultados.</p>
          </article>
        </div>
      </section>

      <section className="secondary-demo-section reveal">
        <div className="section-title-row">
          <h2>Demos de funcionalidades (secundario)</h2>
          <p>Ejemplos tecnicos para que veas la calidad de ejecucion.</p>
        </div>
        <div className="showcase-grid">
          {showcasePages.map((page) => (
            <motion.article
              key={page.title}
              className={`showcase-card tone-${page.tone}`}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <img src={page.image} alt={page.title} loading="lazy" />
              <div className="showcase-content">
                <small>{page.subtitle}</small>
                <h3>{page.title}</h3>
                <Link to={page.to}>Ver ejemplo</Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="home-cta reveal">
        <h2>Listo para que tu marca se vea top y venda mejor?</h2>
        <p>Escribenos y te enviamos propuesta inicial orientada a resultados.</p>
        <a
          className="solid-btn cta-inline"
          href={`https://wa.me/${PHONE_NUMBER}?text=Hola%20alpha,%20quiero%20una%20propuesta%20para%20mi%20marca`}
          target="_blank"
          rel="noreferrer"
        >
          Hablar con alpha
        </a>
      </section>
    </main>
  )
}

function StoreDemoPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todas')
  const [sort, setSort] = useState('featured')
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState([])
  const [promoInput, setPromoInput] = useState('')
  const [activePromo, setActivePromo] = useState(null)
  const [promoError, setPromoError] = useState('')

  const categories = useMemo(() => ['Todas', ...new Set(storeProducts.map((item) => item.category))], [])

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    const base = storeProducts.filter((item) => {
      const matchesCategory = category === 'Todas' || item.category === category
      const matchesQuery = !normalized || item.name.toLowerCase().includes(normalized)
      return matchesCategory && matchesQuery
    })

    const sorted = [...base]

    if (sort === 'priceAsc') {
      sorted.sort((a, b) => getSalePrice(a) - getSalePrice(b))
    }
    if (sort === 'priceDesc') {
      sorted.sort((a, b) => getSalePrice(b) - getSalePrice(a))
    }
    if (sort === 'discount') {
      sorted.sort((a, b) => b.discount - a.discount)
    }

    return sorted
  }, [query, category, sort])

  const subtotal = cart.reduce((acc, item) => acc + item.salePrice * item.qty, 0)
  const promoPercent = activePromo ? promoCodes[activePromo] : 0
  const promoAmount = Math.round((subtotal * promoPercent) / 100)
  const shipping = subtotal > 0 && subtotal < 2500 ? 149 : 0
  const total = subtotal - promoAmount + shipping

  const addToCart = (product) => {
    const salePrice = getSalePrice(product)
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id)
      if (found) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item,
        )
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          salePrice,
          image: product.image,
          qty: 1,
        },
      ]
    })
  }

  const updateQty = (id, direction) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) {
            return item
          }

          return {
            ...item,
            qty: direction === 'up' ? item.qty + 1 : item.qty - 1,
          }
        })
        .filter((item) => item.qty > 0),
    )
  }

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (!promoCodes[code]) {
      setPromoError('Codigo invalido. Usa ALPHA10, STORE20 o HOT30.')
      return
    }

    setPromoError('')
    setActivePromo(code)
  }

  const checkoutMessage = encodeURIComponent(
    [
      'Hola alpha, quiero comprar:',
      ...cart.map((item) => `- ${item.name} x${item.qty}`),
      `Subtotal: ${formatCurrency(subtotal)}`,
      activePromo ? `Cupon ${activePromo}: -${formatCurrency(promoAmount)}` : 'Sin cupon',
      `Envio: ${formatCurrency(shipping)}`,
      `Total: ${formatCurrency(total)}`,
    ].join('\n'),
  )

  return (
    <main className="page-wrap">
      <section className="page-hero reveal">
        <p className="eyebrow">demo tienda ecommerce</p>
        <h1>
          <span className="headline-line-wrap"><span className="headline-line">Tienda completa con</span></span>
          <span className="headline-line-wrap"><span className="headline-line">precio, descuento y carrito.</span></span>
        </h1>
        <p>Todo lo necesario para vender online: filtros, favoritos, cupones, envio y checkout.</p>
      </section>

      <section className="toolbar reveal">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar producto"
        />

        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="featured">Destacados</option>
          <option value="priceAsc">Precio menor a mayor</option>
          <option value="priceDesc">Precio mayor a menor</option>
          <option value="discount">Mayor descuento</option>
        </select>
      </section>

      <section className="store-layout">
        <div className="product-grid reveal">
          {filteredProducts.map((product) => {
            const salePrice = getSalePrice(product)
            const isFavorite = favorites.includes(product.id)
            return (
              <article key={product.id} className="product-card">
                <img src={product.image} alt={product.name} loading="lazy" />
                <div className="product-body">
                  <div className="product-top">
                    <span>{product.category}</span>
                    <button type="button" onClick={() => toggleFavorite(product.id)}>
                      {isFavorite ? 'Guardado' : 'Guardar'}
                    </button>
                  </div>

                  <h3>{product.name}</h3>

                  <div className="price-row">
                    <strong>{formatCurrency(salePrice)}</strong>
                    <small>{formatCurrency(product.price)}</small>
                    <em>-{product.discount}%</em>
                  </div>

                  <p>Stock: {product.stock}</p>

                  <motion.button
                    type="button"
                    className="solid-btn"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addToCart(product)}
                  >
                    Agregar al carrito
                  </motion.button>
                </div>
              </article>
            )
          })}
        </div>

        <aside className="cart-panel reveal">
          <h3>Carrito</h3>
          {cart.length === 0 && <p>Tu carrito esta vacio.</p>}

          {cart.length > 0 && (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <strong>{item.name}</strong>
                      <span>{formatCurrency(item.salePrice)}</span>
                    </div>
                    <div className="qty-controls">
                      <button type="button" onClick={() => updateQty(item.id, 'down')}>
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => updateQty(item.id, 'up')}>
                        +
                      </button>
                    </div>
                    <button type="button" onClick={() => removeItem(item.id)}>
                      X
                    </button>
                  </div>
                ))}
              </div>

              <div className="promo-row">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(event) => setPromoInput(event.target.value)}
                  placeholder="Codigo de descuento"
                />
                <button type="button" onClick={applyPromo}>
                  Aplicar
                </button>
              </div>

              {promoError && <small className="error-text">{promoError}</small>}

              <div className="totals">
                <p>
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </p>
                <p>
                  <span>Descuento</span>
                  <span>-{formatCurrency(promoAmount)}</span>
                </p>
                <p>
                  <span>Envio</span>
                  <span>{formatCurrency(shipping)}</span>
                </p>
                <p className="total-row">
                  <span>Total</span>
                  <strong>{formatCurrency(total)}</strong>
                </p>
              </div>

              <a
                className="solid-btn"
                href={`https://wa.me/${PHONE_NUMBER}?text=${checkoutMessage}`}
                target="_blank"
                rel="noreferrer"
              >
                Finalizar por WhatsApp
              </a>
            </>
          )}
        </aside>
      </section>
    </main>
  )
}

function RestaurantDemoPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: todayISO(),
    people: '2',
    slot: '',
    area: 'Salon',
    notes: '',
  })
  const [bookings, setBookings] = useState([])
  const [bookedSlots, setBookedSlots] = useState({})
  const [message, setMessage] = useState('')

  const unavailableForDate = bookedSlots[form.date] || []

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleReserve = (event) => {
    event.preventDefault()

    if (!form.name || !form.phone || !form.date || !form.slot) {
      setMessage('Completa nombre, telefono, fecha y horario.')
      return
    }

    if (form.date < todayISO()) {
      setMessage('La fecha no puede ser anterior a hoy.')
      return
    }

    if (unavailableForDate.includes(form.slot)) {
      setMessage('Ese horario ya no esta disponible, elige otro.')
      return
    }

    const code = `ALP-${Math.floor(1000 + Math.random() * 9000)}`

    const newBooking = {
      code,
      ...form,
    }

    setBookings((prev) => [newBooking, ...prev].slice(0, 5))
    setBookedSlots((prev) => ({
      ...prev,
      [form.date]: [...(prev[form.date] || []), form.slot],
    }))

    setMessage(`Reservacion confirmada. Codigo: ${code}`)
    setForm((prev) => ({ ...prev, slot: '', notes: '' }))
  }

  return (
    <main className="page-wrap">
      <section className="page-hero reveal">
        <p className="eyebrow">demo restaurante</p>
        <h1>
          <span className="headline-line-wrap"><span className="headline-line">Reservacion online</span></span>
          <span className="headline-line-wrap"><span className="headline-line">lista para operar.</span></span>
        </h1>
        <p>Simula un restaurante ficticio con agenda por horario y confirmacion al instante.</p>
      </section>

      <section className="restaurant-grid">
        <form className="reserve-form reveal" onSubmit={handleReserve}>
          <h3>Reservar mesa</h3>

          <label>
            Nombre
            <input
              type="text"
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              placeholder="Nombre completo"
            />
          </label>

          <label>
            Telefono
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              placeholder="3340187767"
            />
          </label>

          <div className="field-row">
            <label>
              Fecha
              <input
                type="date"
                value={form.date}
                onChange={(event) => updateField('date', event.target.value)}
              />
            </label>

            <label>
              Personas
              <select
                value={form.people}
                onChange={(event) => updateField('people', event.target.value)}
              >
                {['1', '2', '3', '4', '5', '6', '7', '8'].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label>
            Area
            <select value={form.area} onChange={(event) => updateField('area', event.target.value)}>
              <option value="Salon">Salon</option>
              <option value="Terraza">Terraza</option>
              <option value="Privado">Privado</option>
            </select>
          </label>

          <p className="slots-title">Horarios disponibles</p>
          <div className="slot-grid">
            {reservationSlots.map((slot) => {
              const busy = unavailableForDate.includes(slot)
              return (
                <button
                  type="button"
                  key={slot}
                  disabled={busy}
                  className={form.slot === slot ? 'selected-slot' : ''}
                  onClick={() => updateField('slot', slot)}
                >
                  {slot}
                </button>
              )
            })}
          </div>

          <label>
            Notas
            <textarea
              rows="3"
              value={form.notes}
              onChange={(event) => updateField('notes', event.target.value)}
              placeholder="Cumpleanos, alergias, peticiones especiales"
            />
          </label>

          <button type="submit" className="solid-btn">
            Confirmar reservacion
          </button>

          {message && <p className="status-text">{message}</p>}
        </form>

        <aside className="booking-panel reveal">
          <h3>Ultimas reservaciones</h3>
          {bookings.length === 0 && <p>Aun no hay reservaciones.</p>}
          <div className="booking-list">
            {bookings.map((booking) => (
              <article key={booking.code}>
                <strong>{booking.code}</strong>
                <p>{booking.name} - {booking.people} personas</p>
                <p>{booking.date} - {booking.slot} - {booking.area}</p>
              </article>
            ))}
          </div>

          <div className="menu-mini">
            <h4>Mini menu demo</h4>
            <p>Ribeye al grill - {formatCurrency(480)}</p>
            <p>Pasta trufada - {formatCurrency(360)}</p>
            <p>Mocktail house - {formatCurrency(180)}</p>
          </div>
        </aside>
      </section>
    </main>
  )
}

function CatalogDemoPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todas')
  const [maxPrice, setMaxPrice] = useState(6000)
  const [sort, setSort] = useState('relevance')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)

  const categories = useMemo(() => ['Todas', ...new Set(catalogItems.map((item) => item.category))], [])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    const items = catalogItems.filter((item) => {
      const byCategory = category === 'Todas' || item.category === category
      const bySearch = !normalized || item.title.toLowerCase().includes(normalized)
      const byPrice = item.price <= maxPrice
      return byCategory && bySearch && byPrice
    })

    const sorted = [...items]

    if (sort === 'priceAsc') {
      sorted.sort((a, b) => a.price - b.price)
    }
    if (sort === 'priceDesc') {
      sorted.sort((a, b) => b.price - a.price)
    }

    return sorted
  }, [query, category, maxPrice, sort])

  const pageSize = 6
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, pageCount)

  const updateQuery = (value) => {
    setQuery(value)
    setPage(1)
  }

  const updateCategory = (value) => {
    setCategory(value)
    setPage(1)
  }

  const updateSort = (value) => {
    setSort(value)
    setPage(1)
  }

  const updateMaxPrice = (value) => {
    setMaxPrice(value)
    setPage(1)
  }

  const currentItems = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)

  return (
    <main className="page-wrap">
      <section className="page-hero reveal">
        <p className="eyebrow">demo catalogo</p>
        <h1>
          <span className="headline-line-wrap"><span className="headline-line">Catalogo navegable</span></span>
          <span className="headline-line-wrap"><span className="headline-line">con filtro y vista rapida.</span></span>
        </h1>
        <p>Ideal para marketplaces, tiendas multi categoria y catlogos empresariales.</p>
      </section>

      <section className="catalog-toolbar reveal">
        <input
          type="search"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          placeholder="Buscar en catalogo"
        />

        <select value={category} onChange={(event) => updateCategory(event.target.value)}>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select value={sort} onChange={(event) => updateSort(event.target.value)}>
          <option value="relevance">Relevancia</option>
          <option value="priceAsc">Precio ascendente</option>
          <option value="priceDesc">Precio descendente</option>
        </select>

        <label className="range-filter">
          Max {formatCurrency(maxPrice)}
          <input
            type="range"
            min="300"
            max="6000"
            step="100"
            value={maxPrice}
            onChange={(event) => updateMaxPrice(Number(event.target.value))}
          />
        </label>
      </section>

      <section className="catalog-grid reveal">
        {currentItems.map((item) => (
          <article key={item.id} className="catalog-card">
            <img src={item.image} alt={item.title} loading="lazy" />
            <div className="catalog-body">
              <small>{item.category}</small>
              <h3>{item.title}</h3>
              <p>{formatCurrency(item.price)}</p>
              <button type="button" className="ghost-btn" onClick={() => setSelected(item)}>
                Vista rapida
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="pagination reveal">
        <button type="button" disabled={safePage === 1} onClick={() => setPage((prev) => prev - 1)}>
          Anterior
        </button>
        <span>Pagina {safePage} de {pageCount}</span>
        <button
          type="button"
          disabled={safePage === pageCount}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Siguiente
        </button>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="quick-view-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.article
              className="quick-view-card"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <img src={selected.image} alt={selected.title} />
              <div>
                <small>{selected.category}</small>
                <h3>{selected.title}</h3>
                <p>{selected.description}</p>
                <p>Stock: {selected.stock}</p>
                <strong>{formatCurrency(selected.price)}</strong>
                <a
                  className="solid-btn"
                  href={`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(`Hola alpha, me interesa ${selected.title}`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Consultar por WhatsApp
                </a>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default App

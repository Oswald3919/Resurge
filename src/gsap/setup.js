import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const REGISTRY_KEY = '__alpha_gsap_plugins_registered__'

if (!globalThis[REGISTRY_KEY]) {
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
  })
  globalThis[REGISTRY_KEY] = true
}

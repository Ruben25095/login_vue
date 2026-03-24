<!-- src/views/HomeView.vue -->
<template>
  <div class="home">

    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg" aria-hidden="true">
        <div class="orb orb--1"></div>
        <div class="orb orb--2"></div>
        <div class="hex-grid"></div>
      </div>

      <div class="hero-content">
        <div class="hero-chip">
          <span class="chip-dot"></span>
          Vue 3 + Composition API
        </div>

        <h1 class="hero-title">
          Aprende <em>autenticación</em><br/>
          con Vue Router
        </h1>

        <p class="hero-desc">
          Proyecto de práctica para dominar el flujo completo de login,
          protección de rutas y manejo de sesión con la Composition API.
        </p>

        <div class="hero-actions">
          <RouterLink v-if="!isAuthenticated" to="/login" class="btn btn--primary">
            Iniciar sesión →
          </RouterLink>
          <RouterLink v-else to="/dashboard" class="btn btn--primary">
            Ir al Dashboard →
          </RouterLink>

            href="https://router.vuejs.org"
            target="_blank"
            rel="noopener"
            class="btn btn--ghost"
          >
            Ver documentación ↗

        </div>
      </div>

      <div class="hero-visual" aria-hidden="true">
        <div class="code-card">
          <div class="code-card__bar">
            <span></span><span></span><span></span>
          </div>
          <pre class="code-card__body"><code><span class="t-comment">// Navigation Guard </span>
<span class="t-keyword">router</span>.<span class="t-fn">beforeEach</span>(<span class="t-param">(to, from)</span> => {
  <span class="t-keyword">const</span> { isAuthenticated }
    = <span class="t-fn">useAuth</span>()

  <span class="t-keyword">if</span> (to.meta.<span class="t-prop">requiresAuth</span>
    && !isAuthenticated.<span class="t-prop">value</span>) {
    <span class="t-keyword">return</span> { <span class="t-prop">name</span>: <span class="t-string">'login'</span> }
  }
})</code></pre>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="features">
      <div
        v-for="(feat, i) in features"
        :key="feat.title"
        class="feat-card"
        :style="{ animationDelay: `${i * 0.1}s` }"
      >
        <div class="feat-icon">{{ feat.icon }}</div>
        <h3 class="feat-title">{{ feat.title }}</h3>
        <p class="feat-desc">{{ feat.desc }}</p>
        <div class="feat-tag">{{ feat.tag }}</div>
      </div>
    </section>

    <!-- FLUJO -->
    <section class="flow-section">
      <h2 class="section-title">Flujo de autenticación</h2>
      <p class="section-sub">Así viaja el usuario por la aplicación</p>

      <div class="flow">
        <div
          v-for="(step, i) in flowSteps"
          :key="step.label"
          class="flow-item"
        >
          <div class="flow-node" :class="`node--${step.color}`">
            <span>{{ step.icon }}</span>
          </div>
          <span class="flow-label">{{ step.label }}</span>
          <div v-if="i < flowSteps.length - 1" class="flow-arrow">→</div>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="cta-section">
      <h2 class="cta-title">¿Listo para practicar?</h2>
      <p class="cta-sub">
        Inicia sesión con las credenciales de prueba y explora
        la protección de rutas en acción.
      </p>
      <RouterLink v-if="!isAuthenticated" to="/login" class="btn btn--primary btn--lg">
        Comenzar ahora →
      </RouterLink>
      <RouterLink v-else to="/dashboard" class="btn btn--primary btn--lg">
        Ver mi Dashboard →
      </RouterLink>
    </section>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { isAuthenticated } = useAuth()

const features = [
  {
    icon: '🔐',
    title: 'Login reactivo',
    desc: 'Formulario con validación en tiempo real usando reactive() y computed().',
    tag: 'LoginView.vue',
  },
  {
    icon: '🛡️',
    title: 'Rutas protegidas',
    desc: 'Navigation guards con beforeEach bloquean el acceso sin autenticación.',
    tag: 'router/index.js',
  },
  {
    icon: '⚡',
    title: 'Estado global',
    desc: 'useAuth() comparte el estado de sesión entre todos los componentes.',
    tag: 'useAuth.js',
  },
  {
    icon: '💾',
    title: 'Persistencia',
    desc: 'El token se guarda en localStorage para mantener la sesión activa.',
    tag: 'composable',
  },
]

const flowSteps = [
  { icon: '🏠', label: 'Home',        color: 'gold'  },
  { icon: '🔑', label: 'Login',       color: 'blue'  },
  { icon: '✅', label: 'Autenticado', color: 'green' },
  { icon: '📊', label: 'Dashboard',   color: 'gold'  },
]
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 5rem;
  padding-bottom: 3rem;
}

/* ── HERO ── */
.hero {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  min-height: 480px;
  padding: 3rem 0;
  overflow: hidden;
}

@media (max-width: 768px) {
  .hero { grid-template-columns: 1fr; }
  .hero-visual { display: none; }
}

/* Fondo decorativo */
.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.12;
}

.orb--1 {
  width: 400px; height: 400px;
  background: #c8a96e;
  top: -100px; left: -100px;
  animation: drift 8s ease-in-out infinite alternate;
}

.orb--2 {
  width: 300px; height: 300px;
  background: #6eb4e8;
  bottom: -80px; right: 100px;
  animation: drift 10s ease-in-out infinite alternate-reverse;
}

@keyframes drift {
  from { transform: translate(0, 0); }
  to   { transform: translate(30px, 20px); }
}

.hex-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(200, 169, 110, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200, 169, 110, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Contenido hero */
.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.hero-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(200, 169, 110, 0.08);
  border: 1px solid rgba(200, 169, 110, 0.2);
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  font-size: 0.78rem;
  color: #c8a96e;
  width: fit-content;
  letter-spacing: 0.03em;
}

.chip-dot {
  width: 6px; height: 6px;
  background: #c8a96e;
  border-radius: 50%;
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

.hero-title {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #e8e4dc;
  line-height: 1.15;
  margin: 0;
}

.hero-title em {
  font-style: normal;
  background: linear-gradient(135deg, #c8a96e, #e8d5a3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  color: #6b6560;
  font-size: 1rem;
  line-height: 1.65;
  margin: 0;
  max-width: 440px;
}

.hero-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* Botones */
.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 1.4rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: inherit;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn--primary {
  background: linear-gradient(135deg, #c8a96e, #a0834e);
  color: #0d0d0f;
}

.btn--primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(200, 169, 110, 0.25);
}

.btn--ghost {
  background: rgba(255,255,255,0.05);
  color: #9a938c;
  border: 1px solid rgba(255,255,255,0.08);
}

.btn--ghost:hover {
  background: rgba(255,255,255,0.09);
  color: #e8e4dc;
}

.btn--lg { padding: 0.85rem 2rem; font-size: 1rem; }

/* Tarjeta de código */
.hero-visual {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
}

.code-card {
  background: #111113;
  border: 1px solid rgba(200, 169, 110, 0.15);
  border-radius: 14px;
  overflow: hidden;
  width: 100%;
  max-width: 380px;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.03),
    0 24px 48px rgba(0,0,0,0.4);
  animation: floatCard 6s ease-in-out infinite;
}

@keyframes floatCard {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}

.code-card__bar {
  display: flex;
  gap: 6px;
  padding: 0.7rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(255,255,255,0.02);
}

.code-card__bar span {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.12);
}

.code-card__body {
  padding: 1.25rem 1.4rem;
  margin: 0;
  font-family: 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.78rem;
  line-height: 1.75;
  overflow-x: auto;
}

/* Syntax highlight manual */
.t-comment { color: #4a4a5a; }
.t-keyword  { color: #6eb4e8; }
.t-fn       { color: #c8a96e; }
.t-param    { color: #b08ce8; }
.t-prop     { color: #e8c46e; }
.t-string   { color: #6fcf97; }

/* ── FEATURES ── */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.feat-card {
  padding: 1.5rem;
  background: rgba(22, 22, 26, 0.8);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  animation: slideUp 0.4s ease both;
  transition: border-color 0.2s, transform 0.2s;
}

.feat-card:hover {
  border-color: rgba(200, 169, 110, 0.2);
  transform: translateY(-3px);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.feat-icon  { font-size: 1.75rem; }
.feat-title { font-size: 1rem; font-weight: 700; color: #e8e4dc; margin: 0; }
.feat-desc  { font-size: 0.85rem; color: #5a5550; line-height: 1.55; margin: 0; flex: 1; }

.feat-tag {
  font-size: 0.72rem;
  font-family: monospace;
  color: #c8a96e;
  background: rgba(200, 169, 110, 0.08);
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  width: fit-content;
}

/* ── FLUJO ── */
.flow-section {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e8e4dc;
  letter-spacing: -0.03em;
  margin: 0;
}

.section-sub {
  color: #5a5550;
  font-size: 0.9rem;
  margin: 0;
}

.flow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.5rem;
}

.flow-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.flow-node {
  width: 56px; height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}

.node--gold  { background: rgba(200,169,110,0.12); border: 1px solid rgba(200,169,110,0.25); }
.node--blue  { background: rgba(110,180,232,0.12); border: 1px solid rgba(110,180,232,0.25); }
.node--green { background: rgba(111,207,151,0.12); border: 1px solid rgba(111,207,151,0.25); }

.flow-label {
  font-size: 0.75rem;
  color: #5a5550;
  position: absolute;
  margin-top: 72px;
}

.flow-item { position: relative; }

.flow-arrow {
  color: #3a3530;
  font-size: 1.2rem;
  margin: 0 0.25rem;
}

/* ── CTA ── */
.cta-section {
  text-align: center;
  padding: 3rem 2rem;
  background: rgba(22, 22, 26, 0.8);
  border: 1px solid rgba(200, 169, 110, 0.1);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.cta-title {
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #e8e4dc;
  margin: 0;
}

.cta-sub {
  color: #5a5550;
  font-size: 0.95rem;
  max-width: 400px;
  line-height: 1.6;
  margin: 0;
}
</style>

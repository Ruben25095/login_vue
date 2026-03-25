<!-- App.vue -->
<template>
  <div id="app">
    <!-- NAVBAR -->
    <nav class="navbar">
      <div class="nav-brand">
        <RouterLink to="/" class="brand-link">
          <span class="brand-icon">⬡</span>
          <span class="brand-text">VueAuth</span>
        </RouterLink>
      </div>

      <div class="nav-links">
        <RouterLink to="/" class="nav-link">Inicio</RouterLink>

        <!-- Si NO está autenticado -->
        <template v-if="!isAuthenticated">
          <RouterLink to="/login" class="nav-link nav-link--cta">
            Iniciar sesión
          </RouterLink>
          <RouterLink to="/register" class="nav-link">Registrarse</RouterLink>
        </template>

        <!-- Si SÍ está autenticado -->
        <template v-else>
          <RouterLink to="/dashboard" class="nav-link">Dashboard</RouterLink>
          <span class="nav-user">{{ user?.name }}</span>
          <button class="nav-link nav-link--logout" @click="handleLogout">
            Cerrar sesión
          </button>
        </template>
      </div>
    </nav>

    <!-- CONTENIDO PRINCIPAL -->
    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { isAuthenticated, user, logout } = useAuth()

async function handleLogout() {
  logout()
  await router.push('/login')
}
</script>

<style>
/* Reset global */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #0d0d0f;
  color: #e8e4dc;
  font-family: 'DM Sans', sans-serif;
}
</style>

<style scoped>
#app {
  min-height: 100vh;
}

/* ── NAVBAR ── */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2.5rem;
  background: rgba(13, 13, 15, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: sticky;
  top: 0;
  z-index: 100;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: -0.02em;
}

.brand-icon {
  color: #c8a96e;
  font-size: 1.4rem;
}

.brand-text {
  background: linear-gradient(135deg, #e8e4dc, #c8a96e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-link {
  padding: 0.45rem 1rem;
  border-radius: 6px;
  color: #a09a91;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #e8e4dc;
  background: rgba(255, 255, 255, 0.07);
}

.nav-link--cta {
  background: linear-gradient(135deg, #c8a96e, #a0834e);
  color: #0d0d0f !important;
  font-weight: 600;
  padding: 0.45rem 1.25rem;
}

.nav-link--cta:hover {
  opacity: 0.9;
  background: linear-gradient(135deg, #c8a96e, #a0834e) !important;
}

.nav-user {
  font-size: 0.85rem;
  color: #c8a96e;
  padding: 0 0.75rem;
  border-left: 1px solid rgba(200, 169, 110, 0.3);
  border-right: 1px solid rgba(200, 169, 110, 0.3);
}

.nav-link--logout {
  color: #e07070 !important;
}

.nav-link--logout:hover {
  background: rgba(224, 112, 112, 0.1) !important;
}

/* ── MAIN ── */
.main-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

/* ── TRANSICIONES ── */
.page-enter-active,
.page-leave-active {
  transition: all 0.25s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

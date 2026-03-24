// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

// Importación lazy de vistas (carga bajo demanda)
const HomeView      = () => import('@/views/HomeView.vue')
//const signup     = () => import('@/views/Signup.vue')
const LoginView     = () => import('@/views/LoginView.vue')
const DashboardView = () => import('@/views/DashboardView.vue')
const NotFoundView  = () => import('@/views/NotFoundView.vue')
const RegisterView  = () => import('@/views/RegisterView.vue')
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Inicio',
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Iniciar sesión',
      requiresAuth: false,
      guestOnly: true,   // Si ya estás autenticado, te redirige al dashboard
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      title: 'Dashboard',
      requiresAuth: true,  // 🔒 Ruta protegida
    },
  },
  {
    // Catch-all: cualquier ruta no definida → 404
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: 'Página no encontrada' },
  },
  {

  },

//   {
// path: '/signup',
// name: 'about',
// component: signup,
// meta: {
//   title: 'Acerca de',
//   requiresAuth: false,  

// },



//},
{
  path: '/register',
  name: 'register',
  component: RegisterView,
  meta: {
    title: 'Registro',
    requiresAuth: false,  
    guestOnly: true,   // Si ya estás autenticado, te redirige al dashboard
  },
}





]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Restaura el scroll al tope al cambiar de página
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

// ─────────────────────────────────────────
//  NAVIGATION GUARD — el corazón del sistema
// ─────────────────────────────────────────
router.beforeEach((to, from) => {
  const { isAuthenticated } = useAuth()

  // 1. Actualiza el <title> del documento
  document.title = `${to.meta.title ?? 'App'} | VueAuth`

  // 2. Ruta protegida + usuario NO autenticado → redirige a /login
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }, // guarda la ruta destino
    }
  }

  // 3. Ruta guestOnly + usuario YA autenticado → redirige a /dashboard
  if (to.meta.guestOnly && isAuthenticated.value) {
    return { name: 'dashboard' }
  }

  // 4. Todo bien, permite la navegación
  return true
})

export default router

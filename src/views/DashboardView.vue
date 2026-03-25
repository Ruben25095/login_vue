<!-- src/views/DashboardView.vue -->
<template>
  <div class="dashboard">

    <!-- HEADER DE BIENVENIDA -->
    <section class="welcome-section">
      <div class="welcome-text">
        <p class="welcome-label">Panel de control</p>
        <h1 class="welcome-title">
          Hola, <span class="highlight">{{ user?.name }}</span> 👋
        </h1>
        <p class="welcome-sub">{{ currentDate }} — Todo en orden por aquí.</p>
      </div>
      <div class="welcome-badge">
        <span class="badge-icon">⬡</span>
        <span class="badge-text">Sesión activa</span>
      </div>
    </section>

    <!-- TARJETAS DE STATS -->
    <section class="stats-grid">
      <div
        v-for="(stat, i) in stats"
        :key="stat.label"
        class="stat-card"
        :style="{ animationDelay: `${i * 0.08}s` }"
      >
        <div class="stat-icon">{{ stat.icon }}</div>
        <div class="stat-info">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
        <div class="stat-trend" :class="stat.trend > 0 ? 'trend--up' : 'trend--down'">
          {{ stat.trend > 0 ? '↑' : '↓' }} {{ Math.abs(stat.trend) }}%
        </div>
      </div>
    </section>

    <!-- CONTENIDO PRINCIPAL -->
    <div class="dashboard-body">

      <!-- ACTIVIDAD RECIENTE -->
      <section class="panel">
        <div class="panel-header">
          <h2 class="panel-title">Actividad reciente</h2>
          <span class="panel-badge">{{ activity.length }} eventos</span>
        </div>
        <ul class="activity-list">
          <li
            v-for="(item, i) in activity"
            :key="i"
            class="activity-item"
            :style="{ animationDelay: `${i * 0.07}s` }"
          >
            <span class="activity-dot" :class="`dot--${item.type}`"></span>
            <div class="activity-content">
              <span class="activity-msg">{{ item.msg }}</span>
              <span class="activity-time">{{ item.time }}</span>
            </div>
          </li>
        </ul>
      </section>

      <!-- INFO DE SESIÓN -->
      <section class="panel">
        <div class="panel-header">
          <h2 class="panel-title">Tu sesión</h2>
        </div>
        <div class="session-info">
          <div class="session-row">
            <span class="session-key">Usuario</span>
            <span class="session-val">{{ user?.name }}</span>
          </div>
          <div class="session-row">
            <span class="session-key">Email</span>
            <span class="session-val">{{ user?.email }}</span>
          </div>
          <div class="session-row">
            <span class="session-key">Token</span>
            <span class="session-val token-val">{{ maskedToken }}</span>
          </div>
          <div class="session-row">
            <span class="session-key">Estado</span>
            <span class="session-val status-active">● Autenticado</span>
          </div>
        </div>

        <button class="btn-logout" @click="handleLogout">
          Cerrar sesión
        </button>
      </section>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { user, logout } = useAuth()

// ── Fecha actual formateada ──
const currentDate = computed(() =>
  new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
)

// ── Token enmascarado ──
const maskedToken = computed(() => {
  const token = localStorage.getItem('auth_token') || ''
  return token.slice(0, 10) + '••••••••••••'
})

// ── Datos de estadísticas ──
const stats = [
  { icon: '📦', label: 'Proyectos',   value: '12',  trend: +8  },
  { icon: '✅', label: 'Tareas',      value: '48',  trend: +15 },
  { icon: '👥', label: 'Usuarios',    value: '7',   trend: -2  },
  { icon: '📈', label: 'Rendimiento', value: '94%', trend: +3  },
]

// ── Actividad reciente simulada ──
const activity = [
  { type: 'success', msg: 'Inicio de sesión exitoso',        time: 'Justo ahora'   },
  { type: 'info',    msg: 'Perfil actualizado',              time: 'Hace 2 horas'  },
  { type: 'warning', msg: 'Intento de acceso denegado',      time: 'Ayer, 11:30pm' },
  { type: 'success', msg: 'Nueva tarea completada',          time: 'Hace 2 días'   },
  { type: 'info',    msg: 'Reporte mensual generado',        time: 'Hace 3 días'   },
]

// ── Logout ──
async function handleLogout() {
  await logout()
   router.push('/login')
}
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  animation: fadeIn 0.4s ease both;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── WELCOME ── */
.welcome-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1.75rem 2rem;
  background: rgba(22, 22, 26, 0.8);
  border: 1px solid rgba(200, 169, 110, 0.12);
  border-radius: 16px;
}

.welcome-label {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #c8a96e;
  margin: 0 0 0.35rem;
}

.welcome-title {
  font-size: 1.85rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #e8e4dc;
  margin: 0 0 0.35rem;
}

.highlight {
  background: linear-gradient(135deg, #c8a96e, #e8d5a3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.welcome-sub {
  color: #5a5550;
  font-size: 0.875rem;
  margin: 0;
  text-transform: capitalize;
}

.welcome-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(200, 169, 110, 0.08);
  border: 1px solid rgba(200, 169, 110, 0.2);
  border-radius: 999px;
  font-size: 0.82rem;
  color: #c8a96e;
}

.badge-icon { font-size: 1rem; }

/* ── STATS ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: rgba(22, 22, 26, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  animation: slideUp 0.4s ease both;
  transition: border-color 0.2s, transform 0.2s;
}

.stat-card:hover {
  border-color: rgba(200, 169, 110, 0.2);
  transform: translateY(-2px);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.stat-icon { font-size: 1.5rem; }

.stat-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.stat-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: #e8e4dc;
  letter-spacing: -0.02em;
  line-height: 1;
}

.stat-label {
  font-size: 0.78rem;
  color: #5a5550;
  margin-top: 0.2rem;
}

.stat-trend {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
}

.trend--up   { color: #6fcf97; background: rgba(111, 207, 151, 0.1); }
.trend--down { color: #e07070; background: rgba(224, 112, 112, 0.1); }

/* ── BODY ── */
.dashboard-body {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1rem;
}

@media (max-width: 768px) {
  .dashboard-body { grid-template-columns: 1fr; }
}

/* ── PANEL ── */
.panel {
  background: rgba(22, 22, 26, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 1.5rem;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.panel-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #e8e4dc;
  margin: 0;
}

.panel-badge {
  font-size: 0.75rem;
  color: #c8a96e;
  background: rgba(200, 169, 110, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
}

/* ── ACTIVIDAD ── */
.activity-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  animation: slideUp 0.35s ease both;
}

.activity-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 5px;
  flex-shrink: 0;
}

.dot--success { background: #6fcf97; box-shadow: 0 0 6px #6fcf9788; }
.dot--info    { background: #6eb4e8; box-shadow: 0 0 6px #6eb4e888; }
.dot--warning { background: #e8c46e; box-shadow: 0 0 6px #e8c46e88; }

.activity-content {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.activity-msg  { font-size: 0.875rem; color: #c8c2ba; }
.activity-time { font-size: 0.75rem;  color: #4a4540; }

/* ── SESIÓN ── */
.session-info {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 1.5rem;
}

.session-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.55rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  font-size: 0.875rem;
}

.session-key { color: #5a5550; }
.session-val { color: #c8c2ba; font-weight: 500; }

.token-val {
  font-family: monospace;
  font-size: 0.8rem;
  color: #c8a96e;
}

.status-active {
  color: #6fcf97 !important;
  font-size: 0.82rem;
}

/* ── LOGOUT ── */
.btn-logout {
  width: 100%;
  padding: 0.7rem;
  background: rgba(224, 112, 112, 0.08);
  border: 1px solid rgba(224, 112, 112, 0.25);
  border-radius: 10px;
  color: #e07070;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}

.btn-logout:hover {
  background: rgba(224, 112, 112, 0.15);
  transform: translateY(-1px);
}
</style>

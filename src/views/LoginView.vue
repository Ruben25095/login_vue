<!-- src/views/LoginView.vue -->
<template>
  <div class="login-page">
    <!-- Fondo decorativo -->
    <div class="bg-grid" aria-hidden="true"></div>
    <div class="bg-glow" aria-hidden="true"></div>

    <div class="login-card">
      <!-- Encabezado -->
      <div class="card-header">
        <span class="card-icon">⬡</span>
        <h1 class="card-title">Bienvenido</h1>
        <p class="card-subtitle">Ingresa tus credenciales para continuar</p>
      </div>

      <!-- Alerta de error -->
      <Transition name="alert">
        <div v-if="errorMsg" class="alert-error" role="alert">
          <span>⚠</span> {{ errorMsg }}
        </div>
      </Transition>

      <!-- Formulario -->
      <form class="login-form" @submit.prevent="handleLogin" novalidate>

        <!-- Campo email -->
        <div class="field" :class="{ 'field--error': errors.email }">
          <label for="email" class="field-label">Correo electrónico</label>
          <div class="field-input-wrap">
            <span class="field-icon">✉</span>
            <input
              id="email"
              v-model.trim="form.email"
              type="email"
              class="field-input"
              placeholder="usuario@ejemplo.com"
              autocomplete="email"
              @blur="validateEmail"
            />
          </div>
          <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
        </div>

        <!-- Campo contraseña -->
        <div class="field" :class="{ 'field--error': errors.password }">
          <label for="password" class="field-label">Contraseña</label>
          <div class="field-input-wrap">
            <span class="field-icon">🔑</span>
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="field-input"
              placeholder="••••••••"
              autocomplete="current-password"
              @blur="validatePassword"
            />
            <button
              type="button"
              class="field-toggle"
              @click="showPassword = !showPassword"
              :aria-label="showPassword ? 'Ocultar contraseña' : 'Ver contraseña'"
            >
              {{ showPassword ? '🙈' : '👁' }}
            </button>
          </div>
          <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
        </div>

        <!-- Credenciales de prueba -->
          
           <a class="linkregister" @click="gotosingup">Registrarse</a>
          

        

        <!-- Botón submit -->
        <button
          type="submit"
          class="btn-submit"
          :disabled="isLoading"
          :class="{ 'btn-submit--loading': isLoading }"
        >
          <span v-if="!isLoading">Iniciar sesión →</span>
          <span v-else class="spinner"></span>
        </button>
              <a class="link" @click="gotosingup">Olvide mi contraseña</a>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login } = useAuth()

// ── Estado del formulario ──

const gotosingup= () => {
  router.push('/register')
}




const form = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
})

const showPassword = ref(false)
const isLoading = ref(false)
const errorMsg = ref('')

// ── Validaciones individuales ──
function validateEmail() {
  if (!form.email) {
    errors.email = 'El correo es obligatorio.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Ingresa un correo válido.'
  } else {
    errors.email = ''
  }
}

function validatePassword() {
  if (!form.password) {
    errors.password = 'La contraseña es obligatoria.'
  } else if (form.password.length < 6) {
    errors.password = 'Mínimo 6 caracteres.'
  } else {
    errors.password = ''
  }
}

function isFormValid() {
  validateEmail()
  validatePassword()
  return !errors.email && !errors.password
}

 async function handleLogin() {
  try {

    await login(email.value, password.value)

    router.push('/dashboard')

  } catch (error) {
    console.error(error.message)
  }
}

  
</script>

<style scoped>
/* ── PÁGINA ── */
.login-page {
  min-height: calc(100vh - 65px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem 1rem;
}

/* Fondo decorativo */
.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(200, 169, 110, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200, 169, 110, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
}

.bg-glow {
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(200, 169, 110, 0.08) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

/* ── CARD ── */
.login-card {
  position: relative;
  width: 100%;
  max-width: 420px;
  background: rgba(22, 22, 26, 0.95);
  border: 1px solid rgba(200, 169, 110, 0.15);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.03),
    0 24px 48px rgba(0, 0, 0, 0.5);
  animation: cardIn 0.4s ease both;
 

}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* ── HEADER ── */
.card-header {
  text-align: center;
  margin-bottom: 1.75rem;
}

.card-icon {
  display: block;
  font-size: 2rem;
  color: #c8a96e;
  margin-bottom: 0.75rem;
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.card-title {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #e8e4dc, #c8a96e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 0.4rem;
}

.card-subtitle {
  color: #6b6560;
  font-size: 0.88rem;
  margin: 0;
}

/* ── ALERTA ── */
.alert-error {
  background: rgba(224, 112, 112, 0.1);
  border: 1px solid rgba(224, 112, 112, 0.3);
  color: #e07070;
  border-radius: 8px;
  padding: 0.65rem 1rem;
  font-size: 0.88rem;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.alert-enter-active, .alert-leave-active { transition: all 0.3s ease; }
.alert-enter-from, .alert-leave-to { opacity: 0; transform: translateY(-8px); }

/* ── FORMULARIO ── */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: #9a938c;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.field-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.field-icon {
  position: absolute;
  left: 0.85rem;
  font-size: 0.9rem;
  pointer-events: none;
  opacity: 0.5;
}

.field-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 0.65rem 2.75rem 0.65rem 2.5rem;
  color: #e8e4dc;
  font-size: 0.95rem;
  font-family: inherit;
  transition: border-color 0.2s, background 0.2s;
  outline: none;
  box-sizing: border-box;
}

.linkregister {


  max-width: 25%;
  color: #c8a96e;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: color 0.2s;
}
.link {
  flex: 1;
  
  max-width: 50%;
  color: #c8a96e;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: color 0.2s;
}

.field-input::placeholder { color: #3e3a36; }

.field-input:focus {
  border-color: rgba(200, 169, 110, 0.5);
  background: rgba(200, 169, 110, 0.04);
}

.field--error .field-input {
  border-color: rgba(224, 112, 112, 0.5);
}

.field-error {
  font-size: 0.8rem;
  color: #e07070;
}

.field-toggle {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  opacity: 0.6;
  transition: opacity 0.2s;
  padding: 0;
}

.field-toggle:hover { opacity: 1; }

/* ── HINT BOX ── */
.hint-box {
  background: rgba(200, 169, 110, 0.06);
  border: 1px dashed rgba(200, 169, 110, 0.2);
  border-radius: 8px;
  padding: 0.65rem 0.9rem;
  font-size: 0.8rem;
  color: #7a7168;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.hint-label { color: #9a938c; }

code {
  background: rgba(200, 169, 110, 0.12);
  color: #c8a96e;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

/* ── BOTÓN SUBMIT ── */
.btn-submit {
  margin-top: 0.5rem;
  padding: 0.8rem;
  background: linear-gradient(135deg, #c8a96e, #a0834e);
  color: #0d0d0f;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  letter-spacing: 0.01em;
   
}

.btn-submit:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Spinner */
.spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(13, 13, 15, 0.3);
  border-top-color: #0d0d0f;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  vertical-align: middle;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>

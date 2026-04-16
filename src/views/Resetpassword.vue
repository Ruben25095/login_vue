<template>
  <div class="reset-password">
    <h1>Nueva contraseña</h1>
    <p>Introduce tu nueva contraseña a continuación.</p>
    
    <form @submit.prevent="handleUpdate">
      <input 
        type="password" 
        v-model="password" 
        placeholder="Nueva contraseña" 
        required 
        minlength="6"
      />
      <input 
        type="password" 
        v-model="confirmPassword" 
        placeholder="Confirmar contraseña" 
        required 
      />
      <button type="submit" :disabled="loading">
        {{ loading ? 'Actualizando...' : 'Cambiar contraseña' }}
      </button>
    </form>

    <p v-if="message" :class="{'success': success, 'error': !success}">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const password = ref('')
const confirmPassword = ref('')
const message = ref('')
const success = ref(false)
const loading = ref(false)

const router = useRouter()
const { updatePassword } = useAuth() // Asegúrate de haberla agregado a tu auth.js

async function handleUpdate() {
  // 1. Validación básica de coincidencia
  if (password.value !== confirmPassword.value) {
    success.value = false
    message.value = 'Las contraseñas no coinciden.'
    return
  }

  loading.value = true
  message.value = ''

  // Extraemos el token (asumiendo que viene en la URL: ?token=abc...)
  const token = router.currentRoute.value.query.token 

  // Enviamos la petición al servidor
  const result = await updatePassword(password.value, token)
  
  success.value = result.success
  loading.value = false

  if (result.success) {
    message.value = 'Contraseña actualizada correctamente. Redirigiendo...'

    // --- INICIO DE LIMPIEZA EN EL CLIENTE ---
    
    // A. Limpiar almacenamiento local (LocalStorage / SessionStorage)
    // Borramos el token o cualquier bandera de "recuperación"
    localStorage.removeItem('recovery_token'); 
    sessionStorage.clear(); // Opcional: Limpia toda la sesión temporal

    // B. Limpiar Cookies (si el token se manejó por ahí)
    // Document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // C. Reiniciar el estado de los inputs (Seguridad visual)
    password.value = '';
    confirmPassword.value = '';

    // D. Invalidar estado en el Store (Si usas Pinia o Vuex)
    // authStore.resetRecoveryState();

    // --- FIN DE LIMPIEZA ---

    setTimeout(() => {
      // Usamos replace en lugar de push para que el usuario no pueda 
      // volver atrás a la página de "cambio de contraseña" con el botón del navegador
      router.replace('/login')
    }, 2000)
    
  } else {
    message.value = result.message || 'Error al actualizar la contraseña.'
  }
}

// async function handleUpdate() {
//   // 1. Validación básica de coincidencia
//   if (password.value !== confirmPassword.value) {
//     success.value = false
//     message.value = 'Las contraseñas no coinciden.'
//     return
//   }

//   loading.value = true
//   message.value = ''

//   const result = await updatePassword(password.value)
  
//   success.value = result.success
//   loading.value = false

//   if (result.success) {
//     message.value = 'Contraseña actualizada correctamente. Redirigiendo...'
//     // Esperamos 2 segundos para que el usuario lea el mensaje y redirigimos al login
//     setTimeout(() => {
//       router.push('/login')
//     }, 2000)
//   } else {
//     message.value = result.message || 'Error al actualizar la contraseña.'
//   }
// }
</script>

<style scoped>
/* He mantenido tus estilos exactos para mantener la coherencia */
.reset-password {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: #1a1a1f;
  border-radius: 8px;
  text-align: center;
  color: #fff; /* Añadido para que el texto se vea bien en el fondo oscuro */
}
.reset-password h1 {
  margin-bottom: 10px;
}
.reset-password p {
  margin-bottom: 20px;
}
.reset-password form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.reset-password input {
  padding: 10px;
  border: none;   
  border-radius: 4px;
  background: #2a2a30; /* Un poco más claro que el fondo para que resalte */
  color: white;
}
.reset-password button {
  padding: 10px;
  background: #c8a96e;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.reset-password button:hover {
  background: #b07f4e;
}
.reset-password button:disabled {
  background: #555;
  cursor: not-allowed;
}
.success {
  color: #4caf50;
  margin-top: 15px;
}
.error {
  color: #f44336;
  margin-top: 15px;
}
</style>
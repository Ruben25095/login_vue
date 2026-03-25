<template>
  <div class="reset-password">
    <h1>Restablecer contraseña</h1>
    <p>Introduce tu email para recibir un enlace de restablecimiento de contraseña.</p>
    
    <form @submit.prevent="handleReset">
      <input 
        type="email" 
        v-model="email" 
        placeholder="Tu email" 
        required 
      />
      <button type="submit">Enviar enlace</button>
    </form>

    <p v-if="message" :class="{'success': success, 'error': !success}">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'         


const email = ref('')
const message = ref('')
const success = ref(false)      

const { resetPassword } = useAuth()

async function handleReset() {
  const { success: resetSuccess, message: resetMessage } = await resetPassword(email.value)
  success.value = resetSuccess
  message.value = resetMessage || (resetSuccess ? 'Enlace enviado. Revisa tu email.' : 'Error al enviar el enlace.')
}
</script>

<style scoped>
.reset-password {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: #1a1a1f;
  border-radius: 8px;
  text-align: center;
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
}
.reset-password button {
  padding: 10px;
    background: #c8a96e;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.reset-password button:hover {
  background: #b07f4e;
}
.success {
  color: #4caf50;
}
.error {
  color: #f44336;
}
</style>




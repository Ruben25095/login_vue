import { computed, ref } from 'vue';
import { supabase } from '@/lib/supabase';

// Estado global persistente (fuera de la función para compartirlo entre componentes)
const _user = ref(null)
const _session = ref(null)

export function useAuth() {
  const isAuthenticated = computed(() => !!_session.value)
  const user = computed(() => _user.value)

  /**
   * Registro de nuevo usuario con manejo de errores amigable
   */
  async function signUp(email, password, metadata = {}) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata // Aquí guardamos full_name, etc.
        }
      })

      if (error) {
        return { ok: false, error: error.message }
      }

      // Si la confirmación de email está desactivada en Supabase,
      // asignamos la sesión inmediatamente
      if (data?.session) {
        _session.value = data.session
        _user.value = data.user
      }
      
      return { ok: true, data }
    } catch (err) {
      return { ok: false, error: err.message || 'Error de conexión' }
    }
  }

  async function login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) return { ok: false, error: error.message }

      _user.value = data.user
      _session.value = data.session
      return { ok: true, data }
    } catch (err) {
      return { ok: false, error: err.message }
    }
  }

  async function logout() {
    await supabase.auth.signOut()
    _user.value = null
    _session.value = null
  }

  async function getSession() {
    const { data } = await supabase.auth.getSession()
    _session.value = data.session
    _user.value = data.session?.user ?? null
  }

  return {
    user,
    isAuthenticated,
    signUp,
    login,
    logout,
    getSession
  }
}
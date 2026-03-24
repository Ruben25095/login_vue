import { computed, ref } from 'vue';
import { supabase } from '@/lib/supabase';

// Estado global persistente fuera de la función para que sea compartido
const _user = ref(null)
const _session = ref(null)

export function useAuth() {

  const isAuthenticated = computed(() => !!_session.value)
  const user = computed(() => _user.value)

  /**
   * Registro de nuevo usuario
   */
  async function signUp(email, password, metadata = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Aquí puedes pasar el nombre o datos adicionales
        data: metadata 
      }
    })

    if (error) throw error

    // Si la confirmación de email está desactivada en Supabase, 
    // podemos asignar la sesión inmediatamente
    if (data?.session) {
      _session.value = data.session
      _user.value = data.user
    }
    
    return data
  }

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    _user.value = data.user
    _session.value = data.session
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
    signUp, // <--- Nueva función expuesta
    login,
    logout,
    getSession
  }
}
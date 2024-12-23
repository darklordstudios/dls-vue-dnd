import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { supabase } from '../helpers/supabase.js'
// import type { User } from '../interfaces/user'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref(null);
  const userProfile = ref(null);
  let isAuthenticated = ref(false);
  console.log(supabase)
  supabase.auth.onAuthStateChange((event, session) => {
    console.log(event)
    user.value = session ? session.user : null;
    isAuthenticated.value = user.value ? true : false
  })
  const login = async (email, password) => {
    return await supabase.auth.signInWithPassword({
      email,
      password
    })
  }
  const AuthStoreInitialized = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) return null;
    return data.user ? true : false;
  } 
  const logout = async () => {
    return await supabase.auth.signOut();
  }
  const signup = async (email, password) => {
    console.log("SUPABASE SIGNUP CALLED: " + email + ", " + password)
    return await supabase.auth.signUp({
      email,
      password
    })
  }
  const updateProfile = async (email, fullname) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ other_column: 'otherValue' })
      .eq('some_column', 'someValue')
      .select()
    if (error) {
      console.log("ERROR UPPDATING PROFILE: " + error)
    } else {

    }
  }
  return { login, logout, signup, user, userProfile, isAuthenticated, AuthStoreInitialized }
})

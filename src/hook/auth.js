import { ref } from "vue"
import { supabase } from '../supabase.js'

export const useLoginStatus = () => {
  const isAuth = ref(false)

  supabase.auth.getSession().then(({ data }) => {
    console.log('session登录态', data)
    isAuth.value = !!data.session
  })

  return {
    isAuth
  }
}
import { ref } from "vue"
import { supabase } from '../supabase'
import login from '@/api/modules/login.ts'

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

export const userGetOpenId = () => {
  const getOpenId = async(code) => {
    const loginRes = await uni.login()
    const res = await login.getOpenId(loginRes.code)
    return res
  }

  return { 
    getOpenId
  }
}

export const userLogin = () => {
  const loginByOpenId = async(data) => {
    const res = await login.createUser(data)
    return res
  }

  return { 
    loginByOpenId
  }
}
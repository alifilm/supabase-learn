import request from '../request'
import { supabase } from '../../supabase.ts'
const token = uni.getStorageSync('access_token')

export default {
  getLearnCategory: function() {
    return supabase.from('learn_category').select()
  },

  getCardCollection: function() {
    return supabase.from('card_collection').select()
  }
}
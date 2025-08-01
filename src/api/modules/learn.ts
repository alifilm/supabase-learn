import request from '../request'
import { supabase } from '../../supabase.ts'

export default {
  getLearnCategory: function () {
    return supabase.from('learn_category').select()
  },
}
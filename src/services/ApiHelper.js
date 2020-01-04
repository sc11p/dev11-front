import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_RAILS_API_URL

export default {
  async login (userDetails) {
    const response = await axios.post('login', userDetails)
    return response.data
  },

  async acts () {
    const response = await axios.get('acts')
    return response.data
  },

  async act (actData) {
    const response = await axios.post('acts', actData)
    return response.data
  },

  async updateAct (act) {
    const updatedActHash = { is_completed: act.is_completed }
    const response = await axios.put('acts/' + act.id, updatedActHash)
    return response.data
  }
}

import { handleApi } from '../utils/handleApi'
export const state = () => ({
})

export const getters = {}

export const mutations = {
}

export const actions = {
  getAllStoresContact(context) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/contacts/all'), context)
    })
  },
  getAdminPhoneNumber(context) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/contacts/admin-tel'), context)
    })
  },
  createStoreContact(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/contacts', data), context)
    })
  }
}

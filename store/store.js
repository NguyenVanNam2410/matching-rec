import { handleApi } from '../utils/handleApi'
export const state = () => ({
})

export const getters = {}

export const mutations = {
}

export const actions = {
  getListStores(context, resource) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/stores?' + new URLSearchParams(resource)), context)
    })
  },
  getStoreDetail(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/stores/${id}`), context)
    })
  },
  deleteStore(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.delete(`/stores/${id}`), context)
    })
  },
  createStore(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/stores', data), context)
    })
  },
  editStore(context, { id, data }) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/stores/update/${id}`, data), context)
    })
  }
}

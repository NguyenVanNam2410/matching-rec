import { handleApi } from '../utils/handleApi'
export const state = () => ({
})

export const getters = {}

export const mutations = {
}

export const actions = {
  detailApplication(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/applications/' + id), context)
    })
  },
  updateApplication(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/applications/' + data.id, data.form), context)
    })
  },
  getListApplication(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/applications?' + new URLSearchParams(data)), context)
    })
  },
  getApplicationUser(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/applications/user-profile/' + id), context)
    })
  }
}

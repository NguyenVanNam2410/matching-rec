import { handleApi } from '../utils/handleApi'
export const state = () => ({
})

export const getters = {}

export const mutations = {
}

export const actions = {
  getListJob(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/jobs?' + new URLSearchParams(data)), context)
    })
  },
  getAllStores(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/stores/all'), context)
    })
  },
  registerJob(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/jobs/create', data), context)
    })
  },
  updateJob(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/jobs/update/' + data.id, data.form), context)
    })
  },
  detailJob(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/jobs/' + id), context)
    })
  },
  deleteJob(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/jobs/delete/' + id), context)
    })
  }
}

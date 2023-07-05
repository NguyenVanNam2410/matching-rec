import { handleApi } from '@/utils/handleApi'
export const state = () => ({
  roles: [],
  permissions: []
})

export const mutations = {
  setRoles(state, roles) {
    state.roles = roles
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  }
}

export const actions = {
  saveOrder(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/orders/create', params), context)
    })
  },
  getDraft(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/orders/' + params.code + '/info'), context)
    })
  },
  updateOrder(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/orders/' + params.code + '/update', params), context)
    })
  },
  listOrder(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/orders', { params }), context)
    })
  },
  saveEvaluate(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/products/' + params.id + '/add-comment', params), context)
    })
  },
  getEvaluate(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/products/' + params.id + '/detail-comment'), context)
    })
  }
}

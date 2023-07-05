import { handleApi } from '../utils/handleApi'
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
  detail(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/products/' + params.id), context)
    })
  },
  comment(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/products/' + params.id + '/comments', { params }), context)
    })
  },
  commentImage(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/products/' + params.id + '/comment-images'), context)
    })
  },
  favoriteList(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/favorite-product', { params }), context)
    })
  },
  oldList(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/viewed-product', { params }), context)
    })
  },
  like(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/favorite-product/' + params.id, params), context)
    })
  },
  related(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/products/' + params.id + '/relates'), context)
    })
  },
  getProductDaily(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/suggestion/list', params), context)
    })
  },
  getProductLastSeen(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/viewed-product/list', params), context)
    })
  },
  productSearch(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/products/search?' + new URLSearchParams(params).toString()), context)
    })
  }
}

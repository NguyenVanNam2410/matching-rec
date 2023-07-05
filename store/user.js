import { handleApi } from '../utils/handleApi'
export const state = () => ({
})

export const getters = {}

export const mutations = {
}

export const actions = {
  favouriteStatus(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/users/favorite', data), context)
    })
  },
  getFavouriteList(context, param) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/users/favorites${param}`), context)
    })
  },
  getProfile(context) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/profile'), context)
    })
  },
  userDetail(context, param) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/users/detail/${param}`), context)
    })
  },
  usersFilter(context, param) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/users?${param || ''}`), context)
    })
  },
  list5NewUsers(context) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/users/new'), context)
    })
  },
  listNewUsers(context, param) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/users/new' + (param || '')), context)
    })
  },
  listSuggestedUsers(context, param) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/users/suggest' + (param || '')), context)
    })
  },
  list5SuggestedUsers(context) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/users/suggest'), context)
    })
  },
  updateProfile(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/profile', data), context)
    })
  },
  uploadAvatar(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/auth/upload-avatar', data), context)
    })
  }
}

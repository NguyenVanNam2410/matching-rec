import { handleApi } from '../utils/handleApi'
export const state = () => ({
})

export const getters = {}

export const mutations = {
}

export const actions = {
  getListStoreHot(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/shop/highlight/get', data), context)
    })
  },
  getStoreDetail(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/shop/${id}`), context)
    })
  },
  getListCategoryByStore(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/shop/${id}/category`), context)
    })
  },
  getListProductByStore(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/shop/${data.id}/products?` + new URLSearchParams(data.filters).toString()), context)
    })
  },
  followShop(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/shop/follow/${data.id}`, data.body), context)
    })
  }
}

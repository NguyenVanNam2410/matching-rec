import { handleApi } from '../utils/handleApi'
export const state = () => ({
})

export const mutations = {
}

export const actions = {
  getOutStanding(context) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/category/outstanding'), context)
    })
  },
  getDetail(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/category/${id}`), context)
    })
  },
  getListProduct(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/category/${data.id}/products?` + new URLSearchParams(data.filters).toString()), context)
    })
  },
  categorySearch(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/category/search?' + new URLSearchParams(params).toString()), context)
    })
  }
}

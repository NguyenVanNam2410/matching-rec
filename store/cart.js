import _ from 'lodash'
import { handleApi } from '@/utils/handleApi'

export const state = () => ({
  count: 0,
  checkoutData: {}
})

export const getters = {
}

export const mutations = {
  setCount(state, field) {
    state.count = _.cloneDeep(field)
  },
  setCheckoutData(state, field) {
    state.checkoutData = _.cloneDeep(field)
  }
}

export const actions = {
  cartCount(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/cart/count', data), context)
    })
  },
  addCard(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/cart/add', params), context)
    })
  },
  getCart(context) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/cart'), context)
    })
  },
  removeCart(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/cart/remove', params), context)
    })
  },
  setCart(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/cart/set', params), context)
    })
  }
}

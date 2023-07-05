import { handleApi } from '../utils/handleApi'
export const state = () => ({
})

export const getters = {}

export const mutations = {
}

export const actions = {
  countNotifications(context) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/notifications/count'), context)
    })
  },
  listNotifications(context, param) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/notifications${param || ''}`), context)
    })
  },
  readNotification(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/notifications/update-read/${id}`), context)
    })
  },
  getAnnouncement(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/notifications/announcement/matching'), context)
    })
  },
  setAnnouncement(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/notifications/announcement/update-matching'), context)
    })
  },
  settingNotify(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/setting/notification'), context)
    })
  },
  updateNotify(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/setting/notification', params), context)
    })
  }
}

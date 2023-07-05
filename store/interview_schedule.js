import { handleApi } from '../utils/handleApi'
export const state = () => ({
  storeIds: []
})

export const getters = {}

export const mutations = {
  getStoreIds(state, storeIds) {
    state.storeIds = storeIds
  }
}

export const actions = {
  updateInterviewScheduleDay(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/interview-schedule/update-date', data), context)
    })
  },
  updateInterviewSchedule(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/interview-schedule', data), context)
    })
  },
  getListInterviewSchedule(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/interview-schedule?' + data), context)
    })
  }
}

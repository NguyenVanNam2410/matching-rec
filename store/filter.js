import _ from 'lodash'

export const state = () => ({
  removeFilter: {
    type: '',
    value: ''
  },
  addFilter: {
    type: '',
    value: []
  },
  clearAllFilter: true
})

export const getters = {
}

export const mutations = {
  setRemoveFilter(state, field) {
    state.removeFilter = _.cloneDeep(field)
  },
  setAddFilter(state, field) {
    state.addFilter = _.cloneDeep(field)
  },
  setClearAllFilter(state, field) {
    state.clearAllFilter = _.cloneDeep(field)
  }
}

export const actions = {}

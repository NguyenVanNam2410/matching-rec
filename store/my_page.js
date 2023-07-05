export const state = () => ({
  statePage: 'top_page',
  showDetailMessage: false
})

export const mutations = {
  setStatePage(state, page) {
    state.statePage = page
  },
  setShowDetailMessage(state, status) {
    state.showDetailMessage = status
  }
}

export const actions = {
}

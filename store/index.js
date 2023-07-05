import _ from 'lodash'
import { handleApi } from '../utils/handleApi'
export const state = () => ({
  notifySuccess: { show: false, text: '' },
  notifyError: { show: false, text: '' },
  notifyWarning: { show: false, text: '' },
  loading: false,
  hideFooter: false,
  openSidebar: 0,
  sideBarCollapsed: false,
  stateMenu: false,
  notificationsCount: '',
  titleMenu: [{ title: 'ホーム', subTitle: 'Home' }],
  showViewSp: false,
  listStores: [],
  listStoreActives: [],
  showMessageSP: false,
  previousUrl: '/',
  backLogin: []
})

export const getters = {}

export const mutations = {
  setNotifySuccess(state, notify) {
    state.notifySuccess = _.cloneDeep(notify)
  },
  setNotifyError(state, notify) {
    state.notifyError = _.cloneDeep(notify)
  },
  setNotifyWarning(state, notify) {
    state.notifyWarning = _.cloneDeep(notify)
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setHideFooter(state, hideFooter) {
    state.hideFooter = hideFooter
  },
  setOpenSidebar(state, openSidebar) {
    state.openSidebar = openSidebar
  },
  setTitleMenu(state, titleMenu) {
    state.titleMenu = titleMenu
  },
  setStateMenu(state, stateMenu) {
    state.stateMenu = stateMenu
  },
  setSideBarCollapse(state, sideBarCollapsed) {
    state.sideBarCollapsed = sideBarCollapsed
  },
  setNotificationsCount(state, notificationsCount) {
    state.notificationsCount = notificationsCount
  },
  setShowViewSp(state, showViewSp) {
    state.showViewSp = showViewSp
  },
  getListStores(state, listStores) {
    state.listStores = listStores
  },
  setListStoreActives(state, listStoreActives) {
    state.listStoreActives = listStoreActives
  },
  setShowMessageSP(state, showMessageSP) {
    state.showMessageSP = showMessageSP
  },
  setPreviousUrl(state, previousUrl) {
    state.previousUrl = previousUrl
  },
  setBackLogin(state, backLogin) {
    state.backLogin = backLogin
  }
}

export const actions = {
  getMasterData(context, resource) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/master-data?${resource}`), context)
    })
  },
  uploadFile(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/upload-image', data), context)
    })
  },
  registerReceiveEmail(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/register-receive-email', data), context)
    })
  },
  getZipCode(context, param) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/zipcode?zipcode=${param}`), context)
    })
  },
  getCountChat(context, param) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/chats/count`), context)
    })
  }
}

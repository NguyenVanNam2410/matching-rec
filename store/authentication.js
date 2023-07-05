import { handleApi } from '../utils/handleApi'
export const state = () => ({
  roles: [],
  permissions: [],
  openModalLoginState: true,
  resetCartState: true
})

export const mutations = {
  setRoles(state, roles) {
    state.roles = roles
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
  setOpenModalLoginState(state, permissions) {
    state.openModalLoginState = permissions
  },
  setResetCartState(state, data) {
    state.resetCartState = data
  }
}

export const actions = {
  logout(context) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/logout'), context)
    })
  },
  sendOtp(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/send-otp', data), context)
    })
  },
  reSendOtp(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/resend-otp', data), context)
    })
  },
  verifyOtp(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/verify-otp', data), context)
    })
  },
  register(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/auth/register', data), context)
    })
  },
  forgotPass(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/forgot-password', data), context)
    })
  },
  forgotPasswordVerifyOtp(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/forgot-password/reset-password-verifyotp', data), context)
    })
  },
  resetPass(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/forgot-password/reset-password', data), context)
    })
  },
  changePass(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/auth/change-password', data), context)
    })
  },
  checkToken(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/forgot-password/check-token', data), context)
    })
  },
  checkRegisterToken(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/auth/verify-register', data), context)
    })
  }
}

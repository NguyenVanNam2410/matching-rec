<template>
  <div class="login">
    <div class="login-container reset-password">
      <el-form ref="accountForm" :model="accountForm" :rules="accountRules" autocomplete="off">
        <img class="logo-login" src="/assets/images/logo_white.svg" alt="">
        <div class="login-element">
          <img class="icon_back" src="/assets/images/icon_back.svg" alt="back" @click="redirectBack">
          <div class="login-form">
            <span class="login-form_title">{{ $t('forgot_pass.reset') }}</span>
            <div class="login-form_des">{{ $t('forgot_pass.reset_des') }}</div>
            <el-form-item prop="password">
              <div class="login-form_input">
                <span>{{ $t('login.password') }}</span>
                <div class="password-input">
                  <el-input ref="password" v-model="accountForm.password" :placeholder="$t('login.password')"
                            name="password" :type="showPass ? 'text' : 'password'" tabindex="3" maxlength="12" autocomplete="off"
                            @keydown.native.enter="login" @focus="resetValidate('password')" @change="checkPassword">
                    <i slot="suffix">
                      <img v-if="showPass" class="password-icon" @click="showPass = !showPass" src="../assets/icons/show-password.svg" />
                      <img v-else class="password-icon" @click="showPass = !showPass" src="../assets/icons/hide-password.svg" />
                    </i>
                  </el-input>
                </div>
              </div>
            </el-form-item>

            <el-form-item prop="password_confirmation">
              <div class="login-form_input">
                <span>{{ $t('register.password_confirmation') }}</span>
                <div class="password-input">
                  <el-input ref="password_confirmation" v-model="accountForm.password_confirmation"
                            :placeholder="$t('register.password_confirmation')" name="password_confirmation"
                            :type="showPassConfirm ? 'text' : 'password'" tabindex="3" maxlength="12" autocomplete="off"
                            @keydown.native.enter="login" @keydown.native.tab.prevent="$refs.email.focus()"
                            @focus="resetValidate('password_confirmation')">
                    <i slot="suffix">
                      <img v-if="showPassConfirm" class="password-icon" @click="showPassConfirm = !showPassConfirm" src="../assets/icons/show-password.svg" />
                      <img v-else class="password-icon" @click="showPassConfirm = !showPassConfirm" src="../assets/icons/hide-password.svg" />
                    </i>
                  </el-input>
                </div>
              </div>
            </el-form-item>

            <el-form-item>
              <div>
                <el-button type="danger" v-loading.fullscreen.lock="fullscreenLoading" :loading="loading"
                           @click.native.prevent="login">
                  {{ $t('forgot_pass.reset') }}
                </el-button>
              </div>
            </el-form-item>

            <span @click="changeLink('register')" class="create-account link-text">
            {{ $t('login.create_new_account') }}
          </span>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import {
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_ERROR,
  AUTH_CHECK_TOKEN,
  AUTH_RESET_PASS,
  SET_BACK_LOGIN
} from '../store/store.const'
import { validEmail, validOnlyHalfWidth } from '@/utils/validate'

export default {
  name: 'ResetPassword',
  layout: 'none',
  middleware: 'guest',
  auth: false,
  data() {
    const validFormEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error(this.$t('validation.email', { _field_: this.$t('login.email') })))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('validation.required', { _field_: this.$t('register.password') }).toString()))
      } else {
        if (!validOnlyHalfWidth(value)) {
          callback(new Error(this.$t('validation.halfwidth_length', { _field_: this.$t('login.password') })))
        }
        if (value.length < 4 || value.length > 12) {
          callback(new Error(this.$t('validation.pass_format', { _field_: this.$t('register.password') })))
        }
        callback()
      }
    }
    const validateConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('validation.required', { _field_: this.$t('register.password_confirmation') }).toString()))
      } else if (value !== this.accountForm.password) {
        callback(new Error(this.$t('validation.pass_not_match', { _field_: this.$t('register.password_confirmation') }).toString()))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        email: '',
        password: '',
        password_confirmation: '',
        has_terms: false,
        has_agreement: false,
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        email: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('login.email') }), trigger: 'blur' },
          { validator: validFormEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('login.password') }), trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        password_confirmation: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('register.password_confirmation') }), trigger: 'blur' },
          {
            validator: validateConfirmPass,
            message: this.$t('validation.pass_not_match', { _field_: this.$t('register.password_confirmation') }),
            trigger: 'blur'
          }
        ],
        remember: []
      },
      valid: false,
      capsToolPasswordTip: false,
      loading: false,
      fullscreenLoading: false,
      showPass: true,
      showPassConfirm: true
    }
  },
  computed: {
    ...mapState({
      previousUrl: state => state.previousUrl,
      backLogin: state => state.backLogin
    })
  },
  async created() {
    this.token = this.$route.query.token
    await this.checkToken()
  },
  methods: {
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    },
    checkPassword() {
      if (this.accountForm.password_confirmation) {
        this.validate('password_confirmation')
      }
    },
    validate(ref) {
      this.$refs.accountForm.validateField(ref)
    },
    login() {
      this.error = { key: null, value: '' }
      this.$refs.accountForm.validate(async valid => {
        if (valid) {
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const dto = {
              token: this.token,
              password: this.accountForm.password,
              password_confirmation: this.accountForm.password_confirmation
            }
            const data = await this.$store.dispatch(AUTH_RESET_PASS, dto)

            switch (data.status_code) {
              case 200:
                this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: data.messages
                })
                this.$router.push('/login')
                break
              case 422:
                for (const [k] of Object.entries(data.data)) {
                  this.error = { key: k, value: data.data[k][0] }
                  this.errorResponse.push({ key: k, value: data.data[k][0] })
                }
                break
              default:
                this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
                break
            }
          } catch (err) {
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
          }
          await this.$store.commit(INDEX_SET_LOADING, false)
        }
      })
    },
    async checkToken() {
      if (this.token === null || this.token === '') {
        await this.$router.push('/login')
      } else {
        const data = await this.$store.dispatch(AUTH_CHECK_TOKEN, {
          token: this.token
        })
        if (data.status_code !== 200) {
          await this.$router.push('/login')
          this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
        }
      }
    },
    changeLink(state) {
      this.$router.push(state)
      const data = _.cloneDeep(this.backLogin)
      data.push(state)
      this.$store.commit(SET_BACK_LOGIN, data)
    },
    redirectBack() {
      const data = _.cloneDeep(this.backLogin)
      if (data.length > 1) {
        data.splice(-1, 1)
        const prev = data[data.length - 1]
        this.$store.commit(SET_BACK_LOGIN, data)
        this.$router.push('/' + prev)
      } else {
        console.log(this.previousUrl)
        this.$router.push(this.previousUrl)
      }
    }
  }
}
</script>

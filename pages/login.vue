<template>
  <div class="login">
    <div class="login-container">
      <el-form ref="accountForm" :model="accountForm" :rules="accountRules" autocomplete="off">
        <img class="logo-login" src="/assets/images/logo_white.svg" alt="">
        <div class="login-element">
          <img class="icon_back" src="/assets/images/icon_back.svg" alt="back" @click="redirectBack">
          <div class="login-form">
            <span class="login-form_title">{{ $t('login.title') }}</span>
            <el-form-item prop="email" :error="(error.key === 'email') ? error.value : ''">
              <div class="login-form_input">
                <span>{{ $t('login.email') }}</span>
                <el-input ref="email" v-model.trim="accountForm.email" :placeholder="$t('login.email')" name="email"
                          type="text" tabindex="2" @focus="resetValidate('email')" maxlength="255" />
              </div>
            </el-form-item>
            <el-form-item class="password-login" label="" prop="password"
                          :error="(error.key === 'password') ? error.value : ''">
              <div class="login-form_input">
                <span>{{ $t('login.password') }}</span>
                <div class="password-input">
                  <el-input ref="password" v-model="accountForm.password" :placeholder="$t('login.password')"
                            name="password" :type="showPass ? 'text' : 'password'" tabindex="3" maxlength="12"
                            autocomplete="off" @keydown.native.enter="login" @keydown.native.tab.prevent="$refs.email.focus()"
                            @focus="resetValidate('password')">
                    <i slot="suffix" class="cursor-pointer">
                      <img v-if="showPass" class="password-icon" @click="showPass = !showPass" src="../assets/icons/show-password.svg" />
                      <img v-else class="password-icon" @click="showPass = !showPass" src="../assets/icons/hide-password.svg" />
                    </i>
                  </el-input>
                </div>
              </div>
            </el-form-item>

            <div class="login-form_checkbox">
              <div class="checkbox-form">
                <el-checkbox v-model="accountForm.remember" :label="$t('login.remember_me')" size="large"></el-checkbox>
              </div>
              <div class="checkbox-form checkbox-pc">
                <span>{{ $t('login.forgot_password') }}</span>
                <span class="reset-password link-text" @click="changeLink('forgot-password')">{{ $t('login.here') }}</span>
              </div>
            </div>

            <el-form-item>
              <div>
                <el-button type="danger" v-loading.fullscreen.lock="fullscreenLoading" :loading="loading"
                           @click.native.prevent="login">{{ $t('login.title') }}</el-button>
              </div>
            </el-form-item>
            <span @click="changeLink('register')" class="create-account link-text">
            {{ $t('login.create_new_account') }}
          </span>
            <div class="checkbox-form-reset checkbox-form show-sp">
              <span>{{ $t('login.forgot_password') }}</span>
              <span class="reset-password link-text" @click="changeLink('forgot-password')">{{ $t('login.here') }}</span>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import {
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_ERROR,
  SET_BACK_LOGIN
} from '../store/store.const'
import { SIDE_BAR_INDEX } from '../constants/store'
import { validEmail, validHalfWidth, validOnlyHalfWidth } from '@/utils/validate'

export default {
  name: 'LoginPage',
  layout: 'none',
  middleware: 'guest',
  data() {
    // this.$store.commit(SET_BACK_LOGIN, 'login')
    const validFormEmail = (rule, value, callback) => {
      if (value && value.length > 255) {
        callback(new Error(this.$t('validation.max_length', { _field_: this.$t('login.email') })))
      }
      if (value.search(' ') !== -1) {
        callback(new Error(this.$t('validation.email', { _field_: this.$t('login.email') })))
      }
      if (!validHalfWidth(value)) {
        callback(new Error(this.$t('validation.halfwidth_length', { _field_: this.$t('login.email') })))
      }
      if (!validEmail(value)) {
        callback(new Error(this.$t('validation.email', { _field_: this.$t('login.email') })))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('validation.required', { _field_: this.$t('login.password') }).toString()))
      } else {
        if (!validOnlyHalfWidth(value)) {
          callback(new Error(this.$t('validation.halfwidth_length', { _field_: this.$t('login.password') })))
        }
        if (value.length < 4 || value.length > 12) {
          callback(new Error(this.$t('validation.pass_format', { _field_: this.$t('login.password') })))
        }
        callback()
      }
    }
    return {
      accountForm: {
        email: '',
        password: '',
        remember: false,
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
        remember: []
      },
      valid: false,
      capsToolPasswordTip: false,
      loading: false,
      fullscreenLoading: false,
      showPass: true,
      routerBack: '/'
    }
  },
  computed: {
    ...mapState({
      previousUrl: state => state.previousUrl,
      backLogin: state => state.backLogin
    })
  },
  created() {
    const dataBack = _.cloneDeep(this.$cookies.get('auth.redirect'))
    if (dataBack !== undefined) {
      this.routerBack = this.$route.fullPath.replace('/login', dataBack)
    }
    if (this.$refs.accountForm !== undefined) {
      this.resetValidate('accountForm')
    }
  },
  methods: {
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    },
    login() {
      this.error = { key: null, value: '' }
      this.$refs.accountForm.validate(async valid => {
        if (valid) {
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const { data } = await this.$auth.loginWith('local', {
              data: {
                email: this.accountForm.email,
                password: this.accountForm.password,
                remember: this.accountForm.remember ? 1 : 0
              }
            })
            switch (data.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: data.messages
                })
                await this.$router.push(this.routerBack)
                this.$cookies.set(SIDE_BAR_INDEX, 1)
                if (this.routerBack !== '/') {
                  this.$cookies.set('auth.redirect', '/')
                }
                break
              case 422:
                for (const [key] of Object.entries(data.data)) {
                  this.error = { key, value: data.data[key][0] }
                }
                break
              default:
                await this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
                break
            }
          } catch (err) {
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
          }
          await this.$store.commit(INDEX_SET_LOADING, false)
        }
      })
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
        this.$router.push(this.previousUrl)
      }
    }
  }
}
</script>


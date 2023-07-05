<template>
  <div class="login">
    <div class="login-container">
      <el-form ref="accountForm" :model="accountForm" :rules="accountRules" autocomplete="off">
        <img class="logo-login" src="/assets/images/logo_white.svg" alt="">
        <div class="login-element">
          <img class="icon_back" src="/assets/images/icon_back.svg" alt="back" @click="redirectBack">
          <div class="login-form">
            <el-form-item class="email-login" prop="email" :error="(error.key === 'email') ? error.value : ''">
              <span class="login-form_title">{{ $t('forgot_pass.title') }}</span>
              <div class="login-form_des">
                <div>{{ $t('forgot_pass.description') }}</div>
                <span>{{ $t('forgot_pass.description_second') }}</span>
              </div>
              <div class="login-form_input">
                <span>{{ $t('login.email') }}</span>
                <el-input ref="email" v-model.trim="accountForm.email" :placeholder="$t('login.email')" name="email"
                          type="text" tabindex="2" @focus="resetValidate('email')" maxlength="255" />
              </div>
            </el-form-item>

            <el-form-item class="button-login">
              <div>
                <el-button type="danger" v-loading.fullscreen.lock="fullscreenLoading" :loading="loading"
                           @click.native.prevent="login">
                  {{ $t('register.send') }}
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
  USER_FORGOT_PASS,
  SET_BACK_LOGIN
} from '../store/store.const'
import { validEmail, validHalfWidth } from '@/utils/validate'

export default {
  name: 'ForgotPassword',
  layout: 'none',
  middleware: 'guest',
  auth: false,
  data() {
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
    return {
      accountForm: {
        email: '',
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
        ]
      },
      valid: false,
      loading: false,
      fullscreenLoading: false
    }
  },
  computed: {
    ...mapState({
      previousUrl: state => state.previousUrl,
      backLogin: state => state.backLogin
    })
  },
  created() {
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
            const dto = {
              email: this.accountForm.email
            }
            const data = await this.$store.dispatch(USER_FORGOT_PASS, {
              ...dto
            })
            switch (data.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: data.messages
                })
                this.$router.push('/login')
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

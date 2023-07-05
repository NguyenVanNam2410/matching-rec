<template>
  <div class="login">
    <div class="login-container login-register">
      <el-form ref="accountForm" :model="accountForm" :rules="accountRules" autocomplete="off">
        <img class="logo-login register-logo-sp" src="/assets/images/logo_white.svg" alt="">
        <div class="login-element">
          <img class="icon_back" src="/assets/images/icon_back.svg" alt="back" @click="redirectBack">
          <div class="login-form">
            <span class="login-form_title">{{ $t('register.title') }}</span>
            <div class="login-form_input">
              <div class="input-required" ref="first_name">
                <span>{{ $t('my_page.name') }}</span>
                <div class="box-required">{{ $t('form.required') }}</div>
              </div>
              <div class="content-input" ref="last_name">
                <el-row class="d-flex">
                  <el-col :md="24" :sm="12" class="first-name">
                    <el-form-item label="" prop="first_name" :error="(error.key === 'first_name') ? error.value : ''">
                      <el-input
                        v-model="accountForm.first_name"
                        :placeholder="$t('my_page.first_name')"
                        name="first_name"
                        type="text"
                        tabindex="2"
                        maxlength="255"
                        @focus="resetValidate('first_name')"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :md="24" :sm="12" class="last-name">
                    <el-form-item label="" prop="last_name" :error="(error.key === 'last_name') ? error.value : ''">
                      <el-input
                        v-model="accountForm.last_name"
                        :placeholder="$t('my_page.last_name')"
                        name="last_name"
                        type="text"
                        tabindex="2"
                        maxlength="255"
                        @focus="resetValidate('last_name')"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="login-form_input">
              <div class="input-required" ref="furi_first_name">
                <span>{{ $t('my_page.furi_name') }}</span>
                <div class="box-required">{{ $t('form.required') }}</div>
              </div>
              <div class="content-input" ref="furi_last_name">
                <el-row class="d-flex">
                  <el-col :md="24" :sm="12" class="first-name">
                    <el-form-item label="" prop="furi_first_name" :error="(error.key === 'furi_first_name') ? error.value : ''">
                      <el-input
                        v-model="accountForm.furi_first_name"
                        :placeholder="$t('my_page.furi_first_name')"
                        name="furi_first_name"
                        type="text"
                        tabindex="2"
                        maxlength="255"
                        @focus="resetValidate('furi_first_name')"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :md="24" :sm="12" class="last-name">
                    <el-form-item label="" prop="furi_last_name" :error="(error.key === 'furi_last_name') ? error.value : ''">
                      <el-input
                        v-model="accountForm.furi_last_name"
                        :placeholder="$t('my_page.furi_last_name')"
                        name="furi_last_name"
                        type="text"
                        tabindex="2"
                        maxlength="255"
                        @focus="resetValidate('furi_last_name')"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-form-item prop="email" :error="(error.key === 'email') ? error.value : ''">
              <div class="login-form_input">
                <div class="input-required">
                  <span>{{ $t('login.email') }}</span>
                  <div class="box-required">{{ $t('form.required') }}</div>
                </div>
                <el-input ref="email" v-model.trim="accountForm.email" :placeholder="$t('login.email')" name="email"
                          type="text" tabindex="2" @focus="resetValidate('email')" maxlength="255" />
              </div>
            </el-form-item>

            <el-form-item prop="password" :error="(error.key === 'password') ? error.value : ''">
              <div class="login-form_input">
                <div class="input-required">
                  <span>{{ $t('login.password') }}</span>
                  <div class="box-required">{{ $t('form.required') }}</div>
                </div>
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

            <el-form-item prop="password_confirmation"
                          :error="(error.key === 'password_confirmation') ? error.value : ''">
              <div class="login-form_input">
                <div class="input-required">
                  <span>{{ $t('register.password_confirmation') }}</span>
                  <div class="box-required">{{ $t('form.required') }}</div>
                </div>
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

            <div class="login-form_checkbox">
              <div class="checkbox-form">
                <el-checkbox v-model="accountForm.has_terms"></el-checkbox>
                <div class="checkbox-des">
                  <span class="service-terms link-text">{{ $t('register.terms') }}</span>
                  <span>{{ $t('register.agree') }}</span>
                </div>
              </div>
            </div>

            <div class="login-form_checkbox">
              <div class="checkbox-form">
                <el-checkbox v-model="accountForm.has_agreement"></el-checkbox>
                <span class="checkbox-long_des">{{ $t('register.description') }}</span>
              </div>
            </div>

            <el-form-item>
              <div :class="disabledButton">
                <el-button type="danger" v-loading.fullscreen.lock="fullscreenLoading" :disabled="disabledButton" :loading="loading"
                           @click.native.prevent="login">
                  {{ $t('form.register') }}
                </el-button>
              </div>
            </el-form-item>

            <div class="have-account">
              <span>{{ $t('register.have_account') }}</span>
              <span @click="changeLink('login')" class="service-terms link-text">{{ $t('register.here') }}</span>
            </div>
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
  AUTH_REGISTER,
  SET_BACK_LOGIN
} from '../store/store.const'
import { validEmail, validFurigana, validHalfWidth, validOnlyHalfWidth, validFullWidthKana } from '@/utils/validate'

export default {
  name: 'RegisterPage',
  layout: 'none',
  middleware: 'guest',
  auth: false,
  data() {
    const validRequired = (rule, value, callback, message) => {
      if (!value || value.trim() === '') {
        callback(new Error(message))
      } else {
        callback()
      }
    }
    const validFormLength = (rule, value, callback, message) => {
      if (value && value.length > 255) {
        callback(new Error(this.$t('validation.max_length', { _field_: message })))
      } else {
        callback()
      }
    }
    const validFullWidthLength = (rule, value, callback, message) => {
      if (!validFurigana(value)) {
        callback(new Error(this.$t('validation.max_length', { _field_: message })))
      } else {
        callback()
      }
    }
    const validFullWidthKanaLength = (rule, value, callback, message) => {
      if (!validFullWidthKana(value)) {
        callback(new Error(this.$t('validation.max_length', { _field_: message })))
      } else {
        callback()
      }
    }
    const validFormEmail = (rule, value, callback) => {
      if (value && value.length > 255) {
        callback(new Error(this.$t('validation.max_length', { _field_: this.$t('register.email') })))
      }
      if (value.search(' ') !== -1) {
        callback(new Error(this.$t('validation.email', { _field_: this.$t('register.email') })))
      }
      if (!validHalfWidth(value)) {
        callback(new Error(this.$t('validation.halfwidth_length', { _field_: this.$t('register.email') })))
      }
      if (!validEmail(value)) {
        callback(new Error(this.$t('validation.email', { _field_: this.$t('register.email') })))
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
        first_name: '',
        last_name: '',
        furi_first_name: '',
        furi_last_name: '',
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
        first_name: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('my_page.first_name') }), trigger: 'blur' },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.first_name') }), trigger: 'blur' }
        ],
        last_name: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('my_page.last_name') }), trigger: 'blur' },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.last_name') }), trigger: 'blur' }
        ],
        furi_first_name: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('my_page.furi_first_name') }), trigger: 'blur' },
          { validator: validFullWidthLength, message: this.$t('validation.fullwidth_length', { _field_: this.$t('my_page.furi_first_name') }), trigger: 'blur' },
          { validator: validFullWidthKanaLength, message: this.$t('validation.fullwidth_length', { _field_: this.$t('my_page.furi_first_name') }), trigger: 'blur' }
        ],
        furi_last_name: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('my_page.furi_last_name') }), trigger: 'blur' },
          { validator: validFullWidthLength, message: this.$t('validation.fullwidth_length', { _field_: this.$t('my_page.furi_last_name') }), trigger: 'blur' },
          { validator: validFullWidthKanaLength, message: this.$t('validation.fullwidth_length', { _field_: this.$t('my_page.furi_last_name') }), trigger: 'blur' }
        ],
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
    }),
    disabledButton() {
      return !this.accountForm.has_terms || !this.accountForm.has_agreement
    }
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
            const dto = _.cloneDeep(this.accountForm)
            delete dto.errors
            const data = await this.$store.dispatch(AUTH_REGISTER, {
              ...dto
            })
            switch (data.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: data.messages
                })
                this.changeLink('/login')
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


<template>
  <div class="password">
    <div class="breadcrumb">
      <span @click="$router.push('/')" class="breadcrumb-previous cursor-pointer">{{ $t('my_page.top_page') }}</span>
      <img class="breadcrumb-arrow" src="../assets/icons/breadcrumb-arrow.svg" />
      <span @click="$router.push('/basic-information')" class="breadcrumb-previous cursor-pointer">{{ $t('my_page.basic_information') }}</span>
      <img class="breadcrumb-arrow" src="../assets/icons/breadcrumb-arrow.svg" />
      <span class="breadcrumb-current">{{ $t('my_page.change_password') }}</span>
    </div>
    <el-form ref="accountForm" :model="accountForm" :rules="accountRules" autocomplete="off">
      <div class="password-table">
        <div class="password-container">
          <div class="password-col">
            <div class="password-title">{{ $t('my_page.current_password') }}</div>
            <div class="password-content relative">
              <el-form-item prop="current_password" :error="(error.key === 'current_password') ? error.value : ''">
                <el-input name="current_password" maxlength="12" autocomplete="off"
                  @focus="resetValidate('current_password')" ref="current_password" :placeholder="$t('my_page.current_password')"
                  v-model="accountForm.current_password" :type="showCurrentPassword ? 'text' : 'password'">
                  <i slot="suffix" class="cursor-pointer d-flex">
                    <img v-if="showCurrentPassword" class="password-icon" @click="showCurrentPassword = !showCurrentPassword" src="../assets/icons/show-password.svg" />
                    <img v-else class="password-icon" @click="showCurrentPassword = !showCurrentPassword" src="../assets/icons/hide-password.svg" />
                  </i>
                </el-input>
              </el-form-item>
            </div>
          </div>
          <div class="password-col">
            <div class="password-title">{{ $t('my_page.new_password') }}</div>
            <div class="password-content relative">
              <el-form-item prop="new_password" :error="(error.key === 'new_password') ? error.value : ''">
                <el-input :type="showNewPassword ? 'text' : 'password'" name="new_password" maxlength="12" autocomplete="off" :placeholder="$t('my_page.new_password')"
                  @focus="resetValidate('new_password')" ref="new_password" v-model="accountForm.new_password" @change="checkPassword">
                  <i slot="suffix" class="cursor-pointer d-flex">
                    <img v-if="showNewPassword" class="password-icon" @click="showNewPassword = !showNewPassword" src="../assets/icons/show-password.svg" />
                    <img v-else class="password-icon" @click="showNewPassword = !showNewPassword" src="../assets/icons/hide-password.svg" />
                  </i>
                </el-input>
              </el-form-item>
            </div>
          </div>
          <div class="password-col">
            <div class="password-title">{{ $t('my_page.new_password_confirmation') }}</div>
            <div class="password-content relative">
              <el-form-item label="" prop="new_password_confirmation"
                :error="(error.key === 'password_confirmation') ? error.value : ''">
                <el-input :type="showNewPasswordConfirm ? 'text' : 'password'" ref="new_password_confirmation" :placeholder="$t('my_page.new_password_confirmation')"
                  v-model="accountForm.new_password_confirmation" name="new_password_confirmation" maxlength="12"
                  autocomplete="off" @focus="resetValidate('new_password_confirmation')">
                  <i slot="suffix" class="cursor-pointer d-flex">
                    <img v-if="showNewPasswordConfirm" class="password-icon" @click="showNewPasswordConfirm = !showNewPasswordConfirm" src="../assets/icons/show-password.svg" />
                    <img v-else class="password-icon" @click="showNewPasswordConfirm = !showNewPasswordConfirm" src="../assets/icons/hide-password.svg" />
                  </i>
                </el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="password-button">
          <div />
          <el-button @click="submit" type="danger" :loading="loading">{{ $t('my_page.change') }}</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import { validOnlyHalfWidth } from '../utils/validate'
import {
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_ERROR,
  CHANGE_PASS,
  INDEX_SET_TITLE_MENU
} from '../store/store.const'

export default {
  name: 'ChangePassword',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('validation.required', { _field_: this.$t('my_page.current_password') }).toString()))
      } else {
        if (!validOnlyHalfWidth(value)) {
          callback(new Error(this.$t('validation.halfwidth_length', { _field_: this.$t('login.password') })))
        }
        if (value.length < 4 || value.length > 12) {
          callback(new Error(this.$t('validation.pass_format', { _field_: this.$t('my_page.current_password') })))
        }
        callback()
      }
    }
    const validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('validation.required', { _field_: this.$t('my_page.new_password') }).toString()))
      } else {
        if (!validOnlyHalfWidth(value)) {
          callback(new Error(this.$t('validation.halfwidth_length', { _field_: this.$t('login.password') })))
        }
        if (value.length < 4 || value.length > 12) {
          callback(new Error(this.$t('validation.pass_format', { _field_: this.$t('my_page.new_password') })))
        }
        callback()
      }
      if (this.accountForm.password_confirmation !== '') {
        this.$refs.accountForm.validateField('password_confirmation')
      }
    }
    const validateConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('validation.required', { _field_: this.$t('register.password_confirmation') }).toString()))
      } else if (value !== this.accountForm.new_password) {
        callback(new Error(this.$t('validation.pass_not_match', { _field_: this.$t('register.password_confirmation') }).toString()))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        current_password: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('my_page.current_password') }), trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        new_password: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('my_page.new_password') }), trigger: 'blur' },
          { validator: validateNewPass, trigger: 'blur' }
        ],
        new_password_confirmation: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('my_page.new_password_confirmation') }), trigger: 'blur' },
          { validator: validateConfirmPass, trigger: 'blur' }
        ],
        remember: []
      },
      valid: false,
      capsToolPasswordTip: false,
      loading: false,
      showCurrentPassword: true,
      showNewPassword: true,
      showNewPasswordConfirm: true,
      clonedAccountForm: {}
    }
  },
  created() {
    this.clonedAccountForm = _.cloneDeep(this.accountForm)
    this.$store.commit(INDEX_SET_TITLE_MENU, { title: this.$t('page.my_page'), subTitle: 'My page' })
  },
  methods: {
    checkPassword() {
      if (this.accountForm.new_password_confirmation) {
        this.validate('new_password_confirmation')
      }
    },
    validate(ref) {
      this.$refs.accountForm.validateField(ref)
    },
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    },
    submit() {
      this.error = { key: null, value: '' }
      this.$refs.accountForm.validate(async valid => {
        if (valid) {
          try {
            this.$store.commit(INDEX_SET_LOADING, true)
            const data = await this.$store.dispatch(CHANGE_PASS, {
              current_password: this.accountForm.current_password,
              password_confirmation: this.accountForm.new_password_confirmation,
              password: this.accountForm.new_password
            })

            switch (data.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: data.messages
                })
                this.accountForm = {
                  current_password: '',
                  new_password: '',
                  new_password_confirmation: '',
                  errors: {}
                }
                break
              case 401:
                await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
                this.$auth.logout()
                break
              case 422:
                for (const [key] of Object.entries(data.data)) {
                  this.error = { key, value: data.data[key][0] }
                }
                break
              case 500:
                await this.$store.commit(INDEX_SET_ERROR, {
                  show: true,
                  text: this.$t('content.EXC_001')
                })
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
    }
  },
  beforeRouteLeave(to, from, next) {
    const dataClone = this.clonedAccountForm
    const data = _.cloneDeep(this.accountForm)
    dataClone.errors = {}
    data.errors = {}
    if (!_.isEqual(data, dataClone)) {
      this.$confirm(this.$t('content.CON_002'), {
        confirmButtonText: this.$t('confirm_modal.yes'),
        cancelButtonText: this.$t('confirm_modal.no'),
        type: 'warning'
      })
        .then(function() {
          next()
        })
        .catch(function() {
          next(false)
        })
    } else {
      next()
    }
  }
}
</script>

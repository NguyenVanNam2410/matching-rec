<template>
  <div class="inquiry-page">
    <div class="breadcrumb-header">
      <span class="breadcrumb-previous" @click="$router.push('/')">{{ $t('my_page.top_page') }}</span>
      <span class="breadcrumb-point">
        <img src="/assets/icon/icon_next.svg" alt="">
      </span>
      <span class="breadcrumb-current">{{ $t('footer.inquiry') }}</span>
    </div>
    <div class="inquiry-content">
      <div class="inquiry-container">
        <div class="left-container">
          <div class="inquiry-title">{{ $t('inquiry.form') }}</div>
          <div class="description text-primary-black">{{ $t('inquiry.des_1') }}</div>
          <div class="description2 text-primary-black">{{ $t('inquiry.des_2') }}</div>
          <div class="edit-cv-element">
            <div class="edit-cv-content edit-form-content">
              <el-form
                  ref="accountForm"
                  :model="accountForm"
                  :rules="accountRules"
                  autocomplete="off"
                  label-position="left"
              >
                <div class="edit-form-input">
                    <div class="col-label">
                      <div class="label"><span>{{ $t('inquiry.email') }}</span></div>
                    </div>
                    <div class="form-right first-form">
                      <div class="content-input">
                        <el-row class="d-flex">
                          <el-col :md="24" :sm="24">
                            <el-form-item label="" prop="email">
                              <div class="show-user-data">{{ accountForm.email }}</div>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <div class="col-label">
                      <div class="label"><span>{{ $t('job_list.store_name') }}</span></div>
                      <div class="required">{{ $t('form.required') }}</div>
                    </div>
                    <div class="form-right">
                      <div class="content-input form-select">
                        <el-row class="d-flex">
                          <el-col :md="24" :sm="24">
                            <el-form-item label="" prop="store_id" :error="(error.key === 'store_id') ? error.value : ''">
                              <el-select
                                v-model="accountForm.store_id"
                                :placeholder="$t('career.enter_occupation')"
                                :no-data-text="$t('common.select_no_data')"
                                @focus="resetValidate('store_id')"
                                class="wp-100"
                              >
                                <el-option
                                  v-for="item in allStores"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id"
                                >
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <div class="col-label">
                      <div class="label"><span>{{ $t('inquiry.phone') }}</span></div>
                    </div>
                    <div class="form-right">
                      <div class="content-input">
                        <el-row class="d-flex">
                          <el-col :md="24" :sm="24">
                            <el-form-item label="" prop="tel">
                              <div class="show-user-data show-phone">{{ accountForm.tel }}</div>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <div class="col-label col-textarea">
                      <div class="label"><span>{{ $t('inquiry.content') }}</span></div>
                      <div class="required">{{ $t('form.required') }}</div>
                    </div>
                    <div  class="form-right">
                      <div class="content-input form-textarea">
                        <el-row class="d-flex">
                          <el-col :md="24" :sm="24">
                            <el-form-item label="" prop="content" :error="(error.key === 'content') ? error.value : ''">
                              <el-input
                                  maxlength="1000"
                                  ref="pr"
                                  v-model="accountForm.content"
                                  :placeholder="$t('inquiry.enter_content')"
                                  :autosize="{ minRows: 4, maxRows: 12}"
                                  name="content"
                                  type="textarea"
                                  tabindex="2"
                                  @focus="resetValidate('content')"
                              />
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                </div>
              </el-form>
            </div>
          </div>
          <div id="btn-center" class="text-center">
            <el-button class="card-button btn-right" type="danger" @click.native="submit" >{{ $t('inquiry.send') }}</el-button>
          </div>
        </div>
        <div class="right-container text-center">
          <div class="here text-bold">{{ $t('inquiry.here') }}</div>
          <div class="schedule-des">
            <div class="phone-number">{{ phone }}</div>
            <div class="time text-primary-black">{{ $t('inquiry.time') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import str from 'lodash'
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_TITLE_MENU,
  ALL_STORES_CONTACT,
  ADMIN_PHONE_NUMBER_CONTACT,
  CREATE_CONTACT
} from '../../store/store.const'

export default {
  name: 'InquiryPage',
  data() {
    const validAreaLength = (rule, value, callback, message) => {
      if (value && value.length > 1000) {
        callback(new Error(this.$t('validation.short_area_length', { _field_: message })))
      } else {
        callback()
      }
    }
    const validFormOnlySpace = (rule, value, callback, message) => {
      if (str.trim(value) === '') {
        callback(new Error(this.$t('validation.required', { _field_: message })))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        email: this.$auth.user.email,
        content: '',
        store_id: '',
        tel: this.phoneFormat(this.$auth.user.tel),
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        store_id: [
          { required: true, message: this.$t('validation.required_select', { _field_: this.$t('career.store_name') }), trigger: 'blur' }
        ],
        content: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('inquiry.content') }), trigger: 'blur' },
          { validator: validAreaLength, message: this.$t('validation.area_length_2', { _field_: this.$t('inquiry.content') }), trigger: 'blur' },
          { validator: validFormOnlySpace, message: this.$t('validation.required', { _field_: this.$t('inquiry.content') }), trigger: 'blur' }
        ]
      },
      phone: '',
      allStores: []
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.inquiry'), route: '/my-page' }
    ])
    this.getPhoneNumber()
    this.getAllStoresName()
  },
  methods: {
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    },
    phoneFormat(phone) {
      if (phone) {
        const tel = phone.toString().replace(/-/g, '')
        return tel.toString().slice(0, 4) + '-' + tel.toString().slice(4, 7) + '-' + tel.toString().slice(7, 13)
      }
      return ''
    },
    submit() {
      this.error = { key: null, value: '' }
      this.$refs.accountForm.validate(async valid => {
        if (valid) {
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const dto = this.accountForm
            const response = await this.$store.dispatch(CREATE_CONTACT, {
              ...dto,
              tel: this.accountForm.tel ? this.accountForm.tel.replace(/-/g, '') : '',
              errors: {}
            })
            switch (response.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: response.messages
                })
                this.accountForm.store_id = this.allStores[0].id
                this.accountForm.content = ''
                break
              case 401:
                await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
                this.$auth.logout()
                break
              case 500:
                await this.$store.commit(INDEX_SET_ERROR, {
                  show: true,
                  text: this.$t('content.EXC_001')
                })
                break
              default:
                await this.$store.commit(INDEX_SET_ERROR, {
                  show: true,
                  text: response.messages
                })
                break
            }
            await this.$store.commit(INDEX_SET_LOADING, false)
          } catch (err) {
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
          }
          await this.$store.commit(INDEX_SET_LOADING, false)
        }
      })
    },
    async getPhoneNumber() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(ADMIN_PHONE_NUMBER_CONTACT)
        const { data, status_code } = response
        if (status_code === 200) {
          const phoneNumber = data.replace(/\D/g, '')
          this.phone = phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3')
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    },
    async getAllStoresName() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(ALL_STORES_CONTACT)
        switch (response.status_code) {
          case 200:
            this.allStores = response.data
            this.accountForm.store_id = response.data[0].id
            break
          case 401:
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
            this.$auth.logout()
            break
          case 500:
            await this.$store.commit(INDEX_SET_ERROR, {
              show: true,
              text: this.$t('content.EXC_001')
            })
            break
          default:
            await this.$store.commit(INDEX_SET_ERROR, {
              show: true,
              text: response.messages
            })
            break
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>

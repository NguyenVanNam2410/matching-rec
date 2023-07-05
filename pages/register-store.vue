<template>
  <div class="register main-job-container register-store-element">
    <div class="show-pc">
      <div class="breadcrumb-box">
        <span class="breadcrumb-previous" @click="$router.push('/')">{{ $t('my_page.top_page') }}</span>
        <img class="breadcrumb-arrow" src="../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-previous" @click="$router.push('/store-management')">{{ $t('my_page.store_management') }}</span>
        <img class="breadcrumb-arrow" src="../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-current">{{ $t('my_page.register_store') }}</span>
      </div>
    </div>
    <div class="show-sp">
      <div class="d-flex items-center text-black-hover">
        <img src="../assets/icons/breadcrumb-arrow-black.svg" @click="$router.push('/store-management')" />
        <span class="register-sp__text">{{ $t('my_page.register_store') }}</span>
      </div>
    </div>
    <el-form ref="accountForm" :model="accountForm" :rules="accountRules" autocomplete="off">
      <div class="register__body">
        <div class="register-table">
          <div class="register-col">
            <div class="register-left">{{ $t('my_page.store_image') }}</div>
            <div class="register-right first-right flex-col">
              <input id="upload-avatar" ref="fileUploadAvatar" class="d-none" type="file" @change="onFileChange" accept=".jpeg, .jpg, .png, .svg">
              <div class="upload-container">
                <button class="upload-button" type="button">
                  <label for="upload-avatar">
                    {{ $t('my_page.select_file') }}
                  </label>
                </button>
                <div class="upload-description">{{ $t('my_page.file_limit') }}</div>
              </div>
              <div v-if="imageAvatarShow" class="show-image-upload">
                <img width="130px" height="130px" :src="imageAvatarShow" />
                <img class="image-close" src="/assets/icon/icon_close_image.svg" alt="" @click="removeImage">
              </div>
            </div>
          </div>
          <div class="register-col">
            <div class="register-left justify-between">
              <span class="register-title">{{ $t('career.store_name') }}</span>
              <div class="required-field">{{ $t('form.required') }}</div>
            </div>
            <div ref="store_name" class="register-right">
              <el-form-item class="wp-100" prop="store_name" :error="(error.key === 'store_name') ? error.value : ''">
                <el-input
                  maxlength="255"
                  v-model="accountForm.store_name"
                  class="resize-width"
                  :placeholder="$t('career.store_name')"
                  @focus="resetValidate('store_name')"
                />
              </el-form-item>
            </div>
          </div>
          <div class="register-col">
            <div class="register-left">{{ $t('page.home') }}</div>
            <div ref="website" class="register-right">
              <el-form-item class="wp-100" prop="website" :error="(error.key === 'website') ? error.value : ''">
                <el-input
                  maxlength="255"
                  v-model="accountForm.website"
                  class="resize-width"
                  placeholder="www.beautysalon.com"
                  @focus="resetValidate('website')"
                />
              </el-form-item>
            </div>
          </div>
          <div class="register-col">
            <div class="register-left">{{ $t('my_page.application_tel') }}</div>
            <div ref="application_tel" class="register-right">
              <el-form-item prop="application_tel" :error="(error.key === 'application_tel') ? error.value : ''">
                <el-input
                  maxlength="255"
                  v-model="accountForm.application_tel"
                  class="w-252 resize-width"
                  pattern="[0-9]*"
                  type="text"
                  placeholder="000-1230-001"
                  @input="phoneInput('application_tel')"
                  @focus="resetValidate('application_tel')"
                />
              </el-form-item>
              <span class="show-note-phone">{{ $t('my_page.note_phone_interview') }}</span>
            </div>
          </div>
          <div class="register-col">
            <div class="register-left justify-between">
              <span class="register-title">{{ $t('my_page.phone') }}</span>
              <div class="required-field">{{ $t('form.required') }}</div>
            </div>
            <div ref="tel" class="register-right">
              <el-form-item prop="tel" :error="(error.key === 'tel') ? error.value : ''">
                <el-input
                  v-model="accountForm.tel"
                  name="tel"
                  pattern="[0-9]*"
                  class="w-252 resize-width"
                  placeholder="000-1230-001"
                  @input="phoneInput('tel')"
                  @focus="resetValidate('tel')"
                />
              </el-form-item>
            </div>
          </div>
          <div class="register-col">
            <div class="register-left justify-between">
              <span class="register-title">{{ $t('my_page.address') }}</span>
              <div class="required-field">{{ $t('form.required') }}</div>
            </div>
            <div ref="postal_code" class="register-right flex-col">
              <el-form-item prop="postal_code" :error="(error.key === 'postal_code') ? error.value : ''">
                <el-input
                  v-model="accountForm.postal_code"
                  pattern="[0-9]*"
                  class="w-130 resize-width"
                  placeholder="000-0000"
                  @input="zipCodeInput"
                  @change="checkPostalCode"
                  @blur="checkPostalCodeValid"
                  @focus="resetValidate('postal_code')"
                />
              </el-form-item>
              <div class="d-flex address-col  g-16">
                <div ref="province_id" class="d-flex flex-col">
                <span class="date-text">
                  {{ $t('my_page.prefectures') }}
                  <span class="show-sp">
                    <span class="required-field">{{ $t('form.required') }}</span>
                  </span>
                </span>
                  <el-form-item prop="province_id" :error="(error.key === 'province_id') ? error.value : ''">
                    <el-select
                      v-model="accountForm.province_id"
                      class="w-130"
                      :placeholder="$t('common.select')"
                      @change="selectCity"
                      @focus="resetValidate('province_id')"
                      @visible-change="(event) => { checkValidate('province_id', event) }"
                    >
                      <el-option v-for="item in listProvinces" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div ref="province_city_id" class="d-flex flex-col">
                <span class="date-text">
                  {{ $t('my_page.municipalities') }}
                  <span class="show-sp">
                    <span class="required-field">{{ $t('form.required') }}</span>
                  </span>
                </span>
                  <el-form-item prop="province_city_id" :error="(error.key === 'province_city_id') ? error.value : ''">
                    <el-select
                      v-model="accountForm.province_city_id"
                      class="w-130 resize-width address-select"
                      :placeholder="$t('common.select')"
                      :disabled="!accountForm.province_id"
                      @focus="resetValidate('province_city_id')"
                      @visible-change="(event) => { checkValidate('province_city_id', event) }"
                    >
                      <el-option v-for="item in listProvinceCity" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div ref="address" class="d-flex flex-col">
                <span class="date-text">
                  {{ $t('my_page.address2') }}
                  <span class="show-sp">
                    <span class="required-field">{{ $t('form.required') }}</span>
                  </span>
                </span>
                  <el-form-item prop="address" :error="(error.key === 'address') ? error.value : ''">
                    <el-input
                      v-model="accountForm.address"
                      maxlength="255"
                      class="w-130 resize-width"
                      :placeholder="$t('career.placeholder_address')"
                      @focus="resetValidate('address')"
                    />
                  </el-form-item>
                </div>
                <div ref="building" class="d-flex flex-col">
                  <span class="date-text">{{ $t('my_page.building_name') }}</span>
                  <el-form-item prop="building" :error="(error.key === 'building') ? error.value : ''">
                    <el-input
                      v-model="accountForm.building"
                      maxlength="255"
                      :placeholder="$t('career.placeholder_building')"
                      @focus="resetValidate('building')"
                    />
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
          <div class="register-col">
            <div class="register-left">{{ $t('my_page.store_manager') }}</div>
            <div ref="manager_name" class="register-right">
              <el-form-item class="wp-100" prop="manager_name" :error="(error.key === 'manager_name') ? error.value : ''">
                <el-input
                  v-model="accountForm.manager_name"
                  maxlength="255"
                  class="resize-width"
                  :placeholder="$t('my_page.store_manager')"
                  @focus="resetValidate('manager_name')"
                />
              </el-form-item>
            </div>
          </div>
          <div class="register-col">
            <div class="register-left">{{ $t('my_page.number_of_employees') }}</div>
            <div ref="employee_quantity" class="register-right">
              <el-form-item class="wp-100" prop="employee_quantity" :error="(error.key === 'employee_quantity') ? error.value : ''">
                <el-input
                  v-model="accountForm.employee_quantity"
                  maxlength="255"
                  class="resize-width"
                  :placeholder="$t('my_page.number_of_employees')"
                  @focus="resetValidate('employee_quantity')"
                />
              </el-form-item>
            </div>
          </div>
          <div class="register-col">
            <div class="register-left">{{ $t('my_page.establish') }}</div>
            <div ref="establish" class="register-right items-center g-12">
              <el-form-item prop="establish" :error="(error.key === 'establish') ? error.value : ''">
                <el-select
                  v-model="accountForm.year"
                  class="w-90 select-datetime"
                  placeholder="YYYY"
                >
                  <el-option v-for="item in linksYear" :key="item.value" :label="item.value" :value="item.value"></el-option>
                </el-select>
                <span class="register-date">{{ $t('my_page.year') }}</span>
                <el-select
                  v-model="accountForm.month"
                  class="w-90 select-datetime"
                  placeholder="MM"
                >
                  <el-option v-for="item in linksMonth" :key="item.value" :label="item.value" :value="item.value"></el-option>
                </el-select>
                <span class="register-date">{{ $t('my_page.month') }}</span>
              </el-form-item>
            </div>
          </div>
          <div class="register-col">
            <div class="register-left">{{ $t('my_page.business_content') }}</div>
            <div ref="business_segment" class="register-right flex-col">
              <el-form-item class="wp-100" prop="business_segment" :error="(error.key === 'business_segment') ? error.value : ''">
                <el-input
                  v-model="accountForm.business_segment"
                  maxlength="2000"
                  type="textarea"
                  :rows="3"
                  :placeholder="$t('my_page.business_content')"
                  @focus="resetValidate('business_segment')"
                />
              </el-form-item>
              <span class="text-limit">{{ $t('career.limit_character', { _count_: countBusinessSegment }) }}</span>
            </div>
          </div>
          <div class="register-col">
            <div class="register-left">{{ $t('my_page.recruiter') }}</div>
            <div ref="recruiter_name" class="register-right">
              <el-form-item class="wp-100" prop="recruiter_name" :error="(error.key === 'recruiter_name') ? error.value : ''">
                <el-input
                  v-model="accountForm.recruiter_name"
                  maxlength="255"
                  class="resize-width input-text"
                  :placeholder="$t('my_page.recruiter')"
                  @focus="resetValidate('recruiter_name')"
                />
              </el-form-item>
            </div>
          </div>
          <div class="register-col">
            <div class="register-left">{{ $t('my_page.current_job') }}</div>
            <div class="register-right">
              <el-select
                multiple
                v-model="accountForm.specialize_ids"
                class="resize-width wp-100"
                :placeholder="$t('common.select')"
              >
                <el-option v-for="item in listJobTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
          </div>
          <div class="register-col">
            <div class="register-left">
              <div class="show-pc" v-html="$t('my_page.store_features2')"></div>
              <div class="show-sp" v-html="$t('my_page.store_features')"></div>
            </div>
            <div ref="store_features" class="register-right flex-col">
              <el-form-item prop="store_features" :error="(error.key === 'store_features') ? error.value : ''">
                <el-input
                  v-model="accountForm.store_features"
                  class="input-text"
                  maxlength="2000"
                  type="textarea"
                  :rows="3"
                  :placeholder="$t('my_page.store_features')"
                  @focus="resetValidate('store_features')"
                />
              </el-form-item>
              <span class="text-limit">{{ $t('career.limit_character', { _count_: countStoreFeatures }) }}</span>
            </div>
          </div>
          <div class="register-button">
            <el-button type="danger" @click="register">{{ $t('form.register') }}</el-button>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import {
  UPLOAD_IMAGE,
  INDEX_SET_ERROR,
  MASTER_GET_DATA,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  CREATE_STORES,
  GET_ZIP_CODE,
  SET_STATE_MENU
} from '../store/store.const'
import { LINKS_MONTH } from '@/constants/store'
import { validHalfWidth } from '@/utils/validate'
export default {
  name: 'RegisterStore',
  data() {
    const validFormOnlySpace = (rule, value, callback, message) => {
      if (_.trim(value) === '') {
        callback(new Error(this.$t('validation.required', { _field_: message })))
      } else {
        callback()
      }
    }
    const validFormHalfSize = (rule, value, callback, message) => {
      if (value && !validHalfWidth(value)) {
        callback(new Error(this.$t('validation.halfwidth_length', { _field_: message })))
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
    const validFormLength2 = (rule, value, callback, message) => {
      if (value && value.length > 2000) {
        callback(new Error(this.$t('validation.max_length', { _field_: message })))
      } else {
        callback()
      }
    }
    const validPhone = (rule, value, callback) => {
      if (value && (value.length > 13 || value.length < 12 || !value.startsWith(0))) {
        callback(new Error(this.$t('validation.phone_length', { _field_: this.$t('my_page.phone') })))
      } else {
        callback()
      }
    }
    const validPostCode = (rule, value, callback) => {
      if (value && value.length < 8) {
        callback(new Error(this.$t('validation.postcode_length', { _field_: this.$t('my_page.post_code') })))
      } else {
        callback()
      }
    }
    const validDate = (rule, value, callback) => {
      const chooseDate = new Date(`${this.accountForm.year}-${this.accountForm.month}`)
      if (chooseDate > new Date()) {
        callback(new Error(this.$t('content.ERR_042')))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        url: '',
        store_name: '',
        website: '',
        tel: '',
        application_tel: '',
        address: '',
        postal_code: '',
        province_id: '',
        province_city_id: '',
        building: '',
        manager_name: '',
        employee_quantity: '',
        founded_year: '',
        business_segment: '',
        specialize_ids: [],
        store_features: '',
        recruiter_name: '',
        year: '2000',
        month: '01',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      file: '',
      accountRules: {
        establish: [
          { validator: validDate, trigger: 'change' }
        ],
        company_name: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('career.company_name') }), trigger: 'blur' }
        ],
        website: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('page.home') }), trigger: 'blur' },
          { validator: validFormHalfSize, message: this.$t('validation.halfwidth_length', { _field_: this.$t('page.home') }), trigger: 'blur' }
        ],
        recruiter_name: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.recruiter') }), trigger: 'blur' }
        ],
        store_features: [
          { validator: validFormLength2, message: this.$t('validation.com013', { _field_: this.$t('my_page.store_features') }), trigger: 'blur' }
        ],
        business_segment: [
          { validator: validFormLength2, message: this.$t('validation.com013', { _field_: this.$t('my_page.business_content') }), trigger: 'blur' }
        ],
        tel: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('my_page.phone') }), trigger: 'blur' },
          { validator: validPhone, trigger: 'blur' }
        ],
        application_tel: [
          { validator: validPhone, trigger: 'blur' }
        ],
        province_id: [
          { required: true, message: this.$t('validation.required_select', { _field_: this.$t('my_page.prefectures') }), trigger: 'blur' }
        ],
        province_city_id: [
          { required: true, message: this.$t('validation.required_select', { _field_: this.$t('my_page.municipalities') }), trigger: 'blur' }
        ],
        store_name: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('career.store_name') }), trigger: 'blur' },
          { validator: validFormOnlySpace, message: this.$t('validation.required', { _field_: this.$t('career.store_name') }), trigger: 'blur' },
          { required: true, message: this.$t('validation.required', { _field_: this.$t('career.store_name') }), trigger: 'blur' }
        ],
        address: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('career.address') }), trigger: 'blur' },
          { required: true, message: this.$t('validation.required', { _field_: this.$t('career.address') }), trigger: 'blur' }
        ],
        building: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.building_name') }), trigger: 'blur' }
        ],
        employee_quantity: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.number_of_employees') }), trigger: 'blur' }
        ],
        manager_name: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('career.manager') }), trigger: 'blur' }
        ],
        postal_code: [
          { validator: validPostCode, message: this.$t('validation.postcode_length', { _field_: this.$t('my_page.post_code') }), trigger: 'blur' }
        ]
      },
      listProvinceDistrict: [],
      listProvinces: [],
      listProvinceCity: [],
      listJobTypes: [],
      linksYear: [],
      linksMonth: [],
      imageAvatarShow: '',
      clonedAccountForm: {}
    }
  },
  computed: {
    ...mapState({
      stateMenu: state => state.stateMenu
    }),
    countBusinessSegment() {
      return ('000' + this.accountForm.business_segment.length).slice(-4)
    },
    countStoreFeatures() {
      return ('000' + this.accountForm.store_features.length).slice(-4)
    }
  },
  watch: {
    listProvinces() {
      this.listProvinceCity = this.accountForm.province_id ? this.listProvinces[this.accountForm.province_id].province_city : ''
    },
    'accountForm.province_city_id'() {
      if (this.accountForm.province_id) {
        this.resetValidate('province_city_id')
        this.resetValidate('province_id')
      }
    }
  },
  async created() {
    await this.getProvinceMaster()
    await this.getJobTypes()
    this.clonedAccountForm = _.cloneDeep(this.accountForm)
  },
  mounted() {
    this.loadAllYear()
    this.loadAllMonth()
  },
  methods: {
    checkValidate(ref, event) {
      if (!event) {
        this.$refs.accountForm.validateField(ref)
      }
    },
    removeImage() {
      this.imageAvatarShow = null
      this.accountForm.url = null
    },
    async getZipCode() {
      const postalCode = this.accountForm.postal_code.replace(/-/g, '')
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const { data } = await this.$store.dispatch(GET_ZIP_CODE, postalCode)
        if (data.province_id) {
          this.accountForm.province_id = data.province_id
          this.listProvinceCity = this.listProvinces[data.province_id].province_city
          this.accountForm.province_city_id = data.province_city_id
        } else {
          this.error = { key: 'postal_code', value: this.$t('validation.com015', { _field_: this.$t('my_page.post_code') }) }
          this.accountForm.province_id = ''
          this.accountForm.province_city_id = ''
        }
        await this.$store.commit(INDEX_SET_LOADING, false)
      } catch (err) {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    loadAllYear() {
      for (let i = new Date().getFullYear(); i >= 1970; i--) {
        this.linksYear.push({ value: i.toString() })
      }
    },
    loadAllMonth() {
      this.linksMonth = LINKS_MONTH
    },
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    },
    validate(ref) {
      this.$refs.accountForm.validateField(ref)
    },
    getJobTypes() {
      const dataResources = [
        'resources[m_job_types]={"model": "MJobType"}'
      ]
      this.$store.dispatch(MASTER_GET_DATA, dataResources).then(res => {
        this.listJobTypes = res.data.m_job_types
      })
    },
    getProvinceMaster() {
      const dataResources = [
        'resources[province_districts]={}'
      ]
      this.$store.dispatch(MASTER_GET_DATA, dataResources).then(res => {
        this.listProvinceDistrict = res.data.province_districts
        const listCity = {}
        this.listProvinceDistrict.forEach((district) => {
          district.provinces.forEach((provinces) => {
            listCity[provinces.id] = provinces
          })
        })
        this.listProvinces = listCity
      })
    },
    selectCity(value) {
      this.listProvinceCity = this.listProvinces[value].province_city
      this.accountForm.province_city_id = ''
      this.validate('province_id')
    },
    async upLoadFile(type) {
      const formData = new FormData()
      formData.append('image', this.file)
      formData.append('type', type)
      const data = await this.$store.dispatch(UPLOAD_IMAGE, formData)
      switch (data.status_code) {
        case 200:
          this.accountForm.url = data.data.url
          break
        case 422:
          for (const [key] of Object.entries(data.data)) {
            this.error = { key: key === 'image' ? 'imageAvatar' : key, value: data.data[key][0] }
          }
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
          await this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
          break
      }
    },
    checkFile(file) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.svg)$/i
      if (file.size >= 20000000) {
        return this.$t('validation.err003')
      }
      if (!['image/jpeg', 'image/png', 'image/jpg', 'image/svg'].includes(file.type) && !allowedExtensions.exec(file.name)) {
        return this.$t('validation.err005')
      }
      return ''
    },
    async onFileChange(e) {
      const file = e.target.files[0]
      const valid = this.checkFile(file)
      if (valid) {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: valid })
      } else {
        this.imageAvatarShow = URL.createObjectURL(file)
        this.file = file
        await this.upLoadFile('store_banner')
      }
      this.$refs.fileUploadAvatar.value = null
    },
    scrollToElement(key) {
      const el = this.$refs[key]
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    register() {
      if (this.error.key) {
        this.scrollToElement(this.error.key)
        return
      }
      this.error = { key: null, value: '' }
      this.$refs.accountForm.validate(async(valid, key) => {
        if (valid) {
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const dto = {
              ...this.accountForm,
              postal_code: this.accountForm.postal_code ? this.accountForm.postal_code.replace(/[^0-9]/g, '') : '',
              founded_year: `${this.accountForm.year}/${this.accountForm.month}`,
              tel: this.accountForm.tel ? this.accountForm.tel.replace(/-/g, '') : '',
              application_tel: this.accountForm.application_tel ? this.accountForm.application_tel.replace(/-/g, '') : ''
            }
            const response = await this.$store.dispatch(CREATE_STORES, dto)
            switch (response.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: response.messages
                })
                this.accountForm = this.clonedAccountForm
                await this.$router.push('/store-management')
                break
              case 401:
                await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
                this.$auth.logout()
                break
              case 422:
                for (const [key] of Object.entries(response.data)) {
                  this.error = { key, value: response.data[key][0] }
                  this.scrollToElement(key)
                }
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
        } else {
          this.scrollToElement(Object.keys(key)[0])
        }
      })
    },
    phoneInput(key) {
      const x = this.accountForm[key].replace(/\D/g, '').match(/(\d{0,3})(\d{0,4})(\d{0,4})/)
      this.accountForm[key] = !x[2] ? x[1] : '' + x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '')
    },
    zipCodeInput() {
      const x = this.accountForm.postal_code.replace(/\D/g, '').match(/(\d{0,3})(\d{0,4})/)
      this.accountForm.postal_code = !x[2] ? x[1] : '' + x[1] + '-' + x[2]
    },
    zipCodeFormat(zip) {
      return zip ? zip.toString().slice(0, 3) + '-' + zip.toString().slice(3) : ''
    },
    async checkPostalCode() {
      try {
        if (this.accountForm.postal_code.length === 8) {
          await this.$store.commit(INDEX_SET_LOADING, true)
          let dto = _.cloneDeep(this.accountForm.postal_code)
          dto = dto.replace(/[^0-9]/g, '')
          const data = await this.$store.dispatch(GET_ZIP_CODE, dto)
          let province_city_id = 0
          switch (data.status_code) {
            case 200:
              if (data.data.length === undefined) {
                this.accountForm.province_id = data.data.province_id
                this.listProvinceCity = this.listProvinces[data.data.province_id].province_city
                for (const key in this.listProvinceCity) {
                  if (this.listProvinceCity[key].id === data.data.province_city_id) {
                    province_city_id = Number(key)
                  }
                }
                this.accountForm.province_city_id = this.listProvinceCity[province_city_id].id
                this.accountForm.address = data.data.address
              } else if (data.data.length === 0) {
                this.error = {
                  key: 'postal_code',
                  value: this.$t('validation.com015', { _field_: this.$t('my_page.post_code') })
                }
              }
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
        }
        await this.$store.commit(INDEX_SET_LOADING, false)
      } catch (err) {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
    },
    async checkPostalCodeValid() {
      try {
        if (this.accountForm.postal_code.length === 8) {
          let dto = _.cloneDeep(this.accountForm.postal_code)
          dto = dto.replace(/[^0-9]/g, '')
          const data = await this.$store.dispatch(GET_ZIP_CODE, dto)
          let province_city_id = 0
          switch (data.status_code) {
            case 200:
              if (data.data.length === undefined) {
                this.accountForm.province_id = data.data.province_id
                this.listProvinceCity = this.listProvinces[data.data.province_id].province_city
                for (const key in this.listProvinceCity) {
                  if (this.listProvinceCity[key].id === data.data.province_city_id) {
                    province_city_id = Number(key)
                  }
                }
                this.accountForm.province_city_id = this.listProvinceCity[province_city_id].id
              } else if (data.data.length === 0) {
                this.error = {
                  key: 'postal_code',
                  value: this.$t('validation.com015', { _field_: this.$t('my_page.post_code') })
                }
              }
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
        }
      } catch (err) {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
    }
  },
  async beforeRouteLeave(to, from, next) {
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
      await this.$store.commit(SET_STATE_MENU, !this.stateMenu)
    } else {
      next()
    }
  }
}
</script>

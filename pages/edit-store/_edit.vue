<template>
  <div class="register main-job-container">
    <div class="register-pc">
      <div class="breadcrumb-box">
        <span class="breadcrumb-previous" @click="$router.push('/')">{{ $t('my_page.top_page') }}</span>
        <img class="breadcrumb-arrow" src="../../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-previous" @click="$router.push('/store-management')">{{ $t('my_page.store_management') }}</span>
        <img class="breadcrumb-arrow" src="../../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-current">{{ $t('my_page.edit_store') }}</span>
      </div>
      <div v-if="jobDelete">
        <div class="detail-delete">{{ $t('no_data.store_detail_delete') }}</div>
      </div>
      <div v-else>
        <el-form ref="editForm" :model="editForm" :rules="editRules" autocomplete="off">
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
                <el-form-item prop="store_name" :error="(error.key === 'store_name') ? error.value : ''">
                  <el-input
                    v-model="editForm.store_name"
                    maxlength="255"
                    class="w-633 resize-width"
                    :placeholder="$t('career.store_name')"
                    @focus="resetValidate('store_name')"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="register-col">
              <div class="register-left">{{ $t('page.home') }}</div>
              <div ref="website" class="register-right">
                <el-form-item prop="website" :error="(error.key === 'website') ? error.value : ''">
                  <el-input
                    v-model="editForm.website"
                    maxlength="255"
                    class="w-633 resize-width"
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
                    v-model="editForm.application_tel"
                    class="w-252 resize-width"
                    pattern="[0-9]*"
                    type="text"
                    placeholder="000-1230-001"
                    @input="phoneInput('application_tel')"
                    @focus="resetValidate('application_tel')"
                  />
                </el-form-item>
                <span class="show-note-phone">
                {{ $t('my_page.note_phone_interview') }}
              </span>
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
                    v-model="editForm.tel"
                    name="tel"
                    pattern="[0-9]*"
                    class="w-252 resize-width"
                    :placeholder="$t('my_page.phone')"
                    @input="phoneInput('tel')"
                    @focus="resetValidate('tel')"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="register-col">
              <div class="register-left justify-between">
              </div>
              <div ref="postal_code" class="register-right flex-col">
                <el-form-item prop="postal_code" :error="(error.key === 'postal_code') ? error.value : ''">
                  <el-input
                    v-model="editForm.postal_code"
                    pattern="[0-9]*"
                    class="w-130 resize-width"
                    placeholder="000-0000"
                    @input="zipCodeInput"
                    @change="checkPostalCode"
                    @blur="checkPostalCodeValid"
                    @focus="resetValidate('postal_code')"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="register-col">
              <div class="register-left justify-between">
                <span class="register-title">{{ $t('my_page.address') }}</span>
                <div class="required-field">{{ $t('form.required') }}</div>
              </div>
              <div class="d-flex address-col  g-16">
                <div ref="province_id" class="d-flex flex-col">
                  <span class="date-text">{{ $t('my_page.prefectures') }}</span>
                  <el-form-item prop="province_id" :error="(error.key === 'province_id') ? error.value : ''">
                    <el-select
                      v-model="editForm.province_id"
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
                  <span class="date-text">{{ $t('my_page.municipalities') }}</span>
                  <el-form-item prop="province_city_id" :error="(error.key === 'province_city_id') ? error.value : ''">
                    <el-select
                      v-model="editForm.province_city_id"
                      class="w-130 resize-width"
                      :placeholder="$t('common.select')"
                      :disabled="!editForm.province_id"
                      @focus="resetValidate('province_city_id')"
                      @visible-change="(event) => { checkValidate('province_id', event) }"
                    >
                      <el-option v-for="item in listProvinceCity" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div ref="address" class="d-flex flex-col">
                  <span class="date-text">{{ $t('my_page.address2') }}</span>
                  <el-form-item prop="address" :error="(error.key === 'address') ? error.value : ''">
                    <el-input
                      v-model="editForm.address"
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
                      v-model="editForm.building"
                      maxlength="255"
                      :placeholder="$t('career.placeholder_building')"
                      @focus="resetValidate('building')"
                    />
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="register-col">
              <div class="register-left">{{ $t('my_page.store_manager') }}</div>
              <div ref="manager_name" class="register-right">
                <el-form-item prop="manager_name" :error="(error.key === 'manager_name') ? error.value : ''">
                  <el-input
                    v-model="editForm.manager_name"
                    maxlength="255"
                    class="w-633 resize-width"
                    :placeholder="$t('my_page.store_manager')"
                    @focus="resetValidate('manager_name')"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="register-col">
              <div class="register-left">{{ $t('my_page.number_of_employees') }}</div>
              <div ref="employee_quantity" class="register-right">
                <el-form-item prop="employee_quantity" :error="(error.key === 'employee_quantity') ? error.value : ''">
                  <el-input
                    v-model="editForm.employee_quantity"
                    maxlength="255"
                    class="w-633 resize-width"
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
                    v-model="editForm.year"
                    class="w-90 select-datetime"
                    placeholder="YYYY"
                  >
                    <el-option v-for="item in linksYear" :key="item.value" :label="item.value" :value="item.value"></el-option>
                  </el-select>
                  <span class="register-date">{{ $t('my_page.year') }}</span>
                  <el-select
                    v-model="editForm.month"
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
                <el-form-item prop="business_segment" :error="(error.key === 'business_segment') ? error.value : ''">
                  <el-input
                    v-model="editForm.business_segment"
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
                <el-form-item prop="recruiter_name" :error="(error.key === 'recruiter_name') ? error.value : ''">
                  <el-input
                    v-model="editForm.recruiter_name"
                    maxlength="255"
                    class="w-633 resize-width"
                    :placeholder="$t('my_page.number_of_employees')"
                    @focus="resetValidate('recruiter_name')"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="register-col">
              <div class="register-left">{{ $t('my_page.current_job') }}</div>
              <div class="register-right">
                <el-select
                  v-model="editForm.specialize_ids"
                  multiple
                  class="w-633 resize-width"
                  :placeholder="$t('common.select')"
                >
                  <el-option v-for="item in listJobTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
            </div>
            <div class="register-col">
              <div class="register-left">{{ $t('my_page.store_features') }}</div>
              <div ref="store_features" class="register-right flex-col">
                <el-form-item prop="store_features" :error="(error.key === 'store_features') ? error.value : ''">
                  <el-input
                    v-model="editForm.store_features"
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
              <el-button type="danger" @click="edit">{{ $t('form.update') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="register-sp">
      <div class="d-flex items-center text-black-hover">
        <img src="../../assets/icons/breadcrumb-arrow-black.svg" @click="$router.push('/store-management')" />
        <span class="register-sp__text">{{ $t('my_page.register_edit') }}</span>
      </div>
      <div v-if="jobDelete">
        <div class="detail-delete">{{ $t('no_data.store_detail_delete') }}</div>
      </div>
      <div v-else>
        <el-form ref="editForm1" :model="editForm" :rules="editRules" autocomplete="off">
          <div class="register-sp__table">
            <div class="d-flex flex-col register-sp__item">
              <span class="register-sp__title">{{ $t('my_page.store_image') }}</span>
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
            <div class="d-flex flex-col register-sp__item">
              <div class="d-flex items-center pb-5">
                <span class="register-sp__title">{{ $t('career.store_name') }}</span>
                <div class="required-field">{{ $t('form.required') }}</div>
              </div>
              <el-input
                v-model="editForm.store_name"
                :placeholder="$t('career.store_name')"
              />
            </div>
            <div class="d-flex flex-col register-sp__item">
              <span class="register-sp__title">{{ $t('page.home') }}</span>
              <el-form-item prop="website" :error="(error.key === 'website') ? error.value : ''">
                <el-input
                  v-model="editForm.website"
                  maxlength="255"
                  placeholder="www.beautysalon.com"
                  @focus="resetValidate('website')"
                />
              </el-form-item>
            </div>
            <div class="d-flex flex-col register-sp__item">
              <div class="d-flex items-center pb-5">
                <span class="register-sp__title">{{ $t('my_page.application_tel') }}</span>
              </div>
              <el-input
                maxlength="255"
                v-model="editForm.application_tel"
                style="width: 48%"
                pattern="[0-9]*"
                type="text"
                placeholder="000-1230-001"
                @input="phoneInput('application_tel')"
                @focus="resetValidate('application_tel')"
              />
              <div>
            <span class="show-note-phone">
              {{ $t('my_page.note_phone_interview') }}
            </span>
              </div>
            </div>
            <div class="d-flex flex-col register-sp__item">
              <div class="d-flex items-center pb-5">
                <span class="register-sp__title">{{ $t('my_page.phone') }}</span>
                <div class="required-field">{{ $t('form.required') }}</div>
              </div>
              <el-form-item prop="tel" :error="(error.key === 'tel') ? error.value : ''">
                <el-input
                  v-model="editForm.tel"
                  name="tel"
                  pattern="[0-9]*"
                  style="width: 48%"
                  :placeholder="$t('my_page.phone')"
                  @input="phoneInput('tel')"
                  @focus="resetValidate('tel')"
                />
              </el-form-item>
            </div>
            <div class="d-flex flex-col register-sp__item">
              <div class="d-flex items-center pb-5">
                <span class="register-sp__title">{{ $t('my_page.post_code') }}</span>
              </div>
              <el-input
                v-model="editForm.postal_code"
                style="width: 48%"
                :placeholder="$t('my_page.post_code')"
                @change="checkPostalCode"
                @blur="checkPostalCodeValid"
              />
            </div>
            <div class="d-flex register-sp__item">
              <div class="d-flex justify-between g-16">
                <div class="d-flex flex-col">
                  <div class="d-flex items-center pb-5">
                    <span class="register-sp__title">{{ $t('my_page.prefectures') }}</span>
                    <div class="required-field">{{ $t('form.required') }}</div>
                  </div>
                  <el-select
                    v-model="editForm.province_id"
                    :placeholder="$t('common.select')"
                    @change="selectCity"
                  >
                    <el-option v-for="item in listProvinces" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </div>
                <div class="d-flex flex-col">
                  <div class="d-flex items-center pb-5">
                    <span class="register-sp__title">{{ $t('my_page.municipalities') }}</span>
                    <div class="required-field">{{ $t('form.required') }}</div>
                  </div>
                  <el-select
                    v-model="editForm.province_city_id"
                    :placeholder="$t('common.select')"
                    :disabled="!editForm.province_id"
                  >
                    <el-option v-for="item in listProvinceCity" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="d-flex register-sp__item">
              <div class="d-flex justify-between g-16">
                <div class="d-flex flex-col">
                  <div class="d-flex items-center pb-5">
                    <span class="register-sp__title">{{ $t('my_page.address2') }}</span>
                    <div class="required-field">{{ $t('form.required') }}</div>
                  </div>
                  <el-input
                    v-model="editForm.city"
                    :placeholder="$t('career.placeholder_address')"
                  />
                </div>
                <div class="d-flex flex-col">
                  <span class="register-sp__title building-name">{{ $t('my_page.building_name') }}</span>
                  <el-input
                    v-model="editForm.address"
                    :placeholder="$t('career.placeholder_building')"
                  />
                </div>
              </div>
            </div>
            <div class="d-flex flex-col register-sp__item">
              <span class="register-sp__title">{{ $t('my_page.store_manager') }}</span>
              <el-input
                v-model="editForm.manager_name"
                :placeholder="$t('my_page.store_manager')"
              />
            </div>
            <div class="d-flex flex-col register-sp__item">
              <span class="register-sp__title">{{ $t('my_page.number_of_employees') }}</span>
              <el-input
                v-model="editForm.employee_quantity"
                :placeholder="$t('my_page.number_of_employees')"
              />
            </div>
            <div class="d-flex flex-col register-sp__item">
              <span class="register-sp__title">{{ $t('my_page.establish') }}</span>
              <div class="d-flex g-12 items-center">
                <el-input
                  v-model="editForm.year"
                  class="w-90"
                  placeholder="YYYY"
                />
                <span class="register-date">{{ $t('my_page.year') }}</span>
                <el-input
                  v-model="editForm.month"
                  class="w-90"
                  placeholder="MM"
                />
                <span class="register-date">{{ $t('my_page.month') }}</span>
              </div>
            </div>
            <div class="d-flex flex-col register-sp__item">
              <span class="register-sp__title">{{ $t('my_page.business_content') }}</span>
              <div class="d-flex flex-col">
                <el-input
                  v-model="editForm.business_segment"
                  type="textarea"
                  :rows="3"
                  :placeholder="$t('my_page.business_content')"
                />
                <span class="text-limit">{{ $t('career.limit_character', { _count_: countBusinessSegment }) }}</span>
              </div>
            </div>
            <div class="d-flex flex-col register-sp__item">
              <span class="register-sp__title">{{ $t('my_page.recruiter') }}</span>
              <el-input
                v-model="editForm.recruiter_name"
                :placeholder="$t('my_page.recruiter')"
              />
            </div>
            <div class="d-flex flex-col register-sp__item">
              <span class="register-sp__title">{{ $t('my_page.current_job') }}</span>
              <el-select v-model="editForm.specialize_ids" multiple :placeholder="$t('common.select')">
                <el-option v-for="item in listJobTypes" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="d-flex flex-col">
              <span class="register-sp__title">{{ $t('my_page.store_features') }}</span>
              <div class="d-flex flex-col">
                <el-input
                  v-model="editForm.store_features"
                  type="textarea"
                  :rows="3"
                  :placeholder="$t('my_page.store_features')"
                />
                <span class="text-limit">{{ $t('career.limit_character', { _count_: countStoreFeatures }) }}</span>
              </div>
            </div>
            <div class="register-button">
              <el-button type="danger" @click="edit">{{ $t('form.update') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
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
  GET_STORE_DETAIL,
  GET_ZIP_CODE,
  EDIT_STORE,
  SET_STATE_MENU, INDEX_SET_TITLE_MENU
} from '../../store/store.const'
import { LINKS_MONTH } from '@/constants/store'
import { validHalfWidth } from '@/utils/validate'
export default {
  name: 'EditStore',
  asyncData({ params }) {
    const param = params.edit
    return { param }
  },
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
      if (value && (value.length > 13 || value.length < 10 || !value.startsWith(0))) {
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
      const chooseDate = new Date(`${this.editForm.year}-${this.editForm.month}`)
      if (chooseDate > new Date()) {
        callback(new Error(this.$t('content.ERR_042')))
      } else {
        callback()
      }
    }
    return {
      editForm: {
        image: '',
        store_name: '',
        website: '',
        application_tel: '',
        tel: '',
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
      editRules: {
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
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.manager') }), trigger: 'blur' }
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
      clonedEditForm: {},
      jobDelete: false
    }
  },
  computed: {
    ...mapState({
      stateMenu: state => state.stateMenu
    }),
    countBusinessSegment() {
      if (this.editForm.business_segment) {
        return ('000' + this.editForm.business_segment.length).slice(-4)
      }
      return '0000'
    },
    countStoreFeatures() {
      if (this.editForm.store_features) {
        return ('000' + this.editForm.store_features.length).slice(-4)
      }
      return '0000'
    }
  },
  watch: {
    listProvinces() {
      this.listProvinceCity = this.editForm.province_id ? this.listProvinces[this.editForm.province_id].province_city : ''
    }
  },
  async created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, { title: this.$t('my_page.application_management'), subTitle: 'Store management' })
    await this.getProvinceMaster()
    await this.getJobTypes()
    await this.getStore()
    this.clonedEditForm = _.cloneDeep(this.editForm)
  },
  mounted() {
    this.loadAllYear()
    this.loadAllMonth()
  },
  methods: {
    checkValidate(ref, event) {
      if (!event) {
        this.$refs.editForm.validateField(ref)
      }
    },
    removeImage() {
      this.imageAvatarShow = null
      this.editForm.url = null
    },
    async getZipCode() {
      const postalCode = this.editForm.postal_code.replace(/-/g, '')
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const { data } = await this.$store.dispatch(GET_ZIP_CODE, postalCode)
        if (data.province_id) {
          this.editForm.province_id = data.province_id
          this.listProvinceCity = this.listProvinces[data.province_id].province_city
          this.editForm.province_city_id = data.province_city_id
        } else {
          this.error = { key: 'postal_code', value: this.$t('validation.com015', { _field_: this.$t('my_page.post_code') }) }
        }
        await this.$store.commit(INDEX_SET_LOADING, false)
      } catch (err) {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('content.EXC_001') })
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
      this.$refs.editForm.fields.find((f) => f.prop === ref).clearValidate()
    },
    validate(ref) {
      this.$refs.editForm.validateField(ref)
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
      this.editForm.province_city_id = ''
      this.validate('province_id')
    },
    async upLoadFile(type) {
      const formData = new FormData()
      formData.append('image', this.file)
      formData.append('type', type)
      const data = await this.$store.dispatch(UPLOAD_IMAGE, formData)
      switch (data.status_code) {
        case 200:
          this.editForm.url = data.data.url
          break
        case 401:
          await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
          this.$auth.logout()
          break
        case 422:
          for (const [key] of Object.entries(data.data)) {
            this.error = { key: key === 'image' ? 'imageAvatar' : key, value: data.data[key][0] }
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
    phoneFormat(num) {
      if (num) {
        const format = num.toString().replace(/-/g, '')
        return format.toString().slice(0, 3) + '-' + format.toString().slice(3, 7) + '-' + format.toString().slice(7, 12)
      }
      return ''
    },
    async getStore() {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const data = await this.$store.dispatch(GET_STORE_DETAIL, this.param)
        const dataApi = data.data[0]
        switch (data.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: data.messages
            })
            this.imageAvatarShow = dataApi.url
            this.editForm = {
              ...dataApi,
              tel: this.phoneFormat(dataApi.tel),
              postal_code: this.zipCodeFormat(dataApi.address.postal_code),
              address: dataApi.address.address,
              building: dataApi.address.building,
              year: dataApi.date.year,
              month: dataApi.date.month,
              specialize_ids: dataApi.specialize_ids.map(item => item.id),
              province_id: dataApi.address.province_id,
              province_city_id: dataApi.address.province_city_id
            }
            this.jobDelete = false
            break
          case 400:
            this.jobDelete = true
            break
          case 404:
            await this.$router.push('/404-not-found')
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
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
            break
        }
      } catch {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('content.EXC_001') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    scrollToElement(key) {
      const el = this.$refs[key]
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    edit() {
      if (this.error.key) {
        this.scrollToElement(this.error.key)
        return
      }
      this.error = { key: null, value: '' }
      this.$refs.editForm.validate(async(valid, key) => {
        if (valid) {
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const dto = {
              ...this.editForm,
              postal_code: this.editForm.postal_code ? this.editForm.postal_code.replace(/[^0-9]/g, '') : '',
              founded_year: `${this.editForm.year}/${this.editForm.month}`,
              tel: this.editForm.tel ? this.editForm.tel.replace(/-/g, '') : ''
            }
            const response = await this.$store.dispatch(EDIT_STORE, {
              id: this.param,
              data: dto
            })
            switch (response.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: response.messages
                })
                this.editForm = this.clonedEditForm
                await this.$router.push(`/store-details/${this.param}`)
                break
              case 422:
                for (const [key] of Object.entries(response.data)) {
                  this.error = { key, value: response.data[key][0] }
                  this.scrollToElement(key)
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
                this.$store.commit(INDEX_SET_ERROR, { show: true, text: response.messages })
                break
            }
            await this.$store.commit(INDEX_SET_LOADING, false)
          } catch (err) {
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('content.EXC_001') })
          }
          await this.$store.commit(INDEX_SET_LOADING, false)
        } else {
          this.scrollToElement(Object.keys(key)[0])
        }
      })
    },
    phoneInput(key) {
      const x = this.editForm[key].replace(/\D/g, '').match(/(\d{0,3})(\d{0,4})(\d{0,4})/)
      this.editForm[key] = !x[2] ? x[1] : '' + x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '')
    },
    zipCodeInput() {
      const x = this.editForm.postal_code.replace(/\D/g, '').match(/(\d{0,3})(\d{0,4})/)
      this.editForm.postal_code = !x[2] ? x[1] : '' + x[1] + '-' + x[2]
    },
    zipCodeFormat(zip) {
      return zip ? zip.toString().slice(0, 3) + '-' + zip.toString().slice(3) : ''
    },
    async checkPostalCode() {
      try {
        if (this.editForm.postal_code.length === 8) {
          await this.$store.commit(INDEX_SET_LOADING, true)
          let dto = _.cloneDeep(this.editForm.postal_code)
          dto = dto.replace(/[^0-9]/g, '')
          const data = await this.$store.dispatch(GET_ZIP_CODE, dto)
          let province_city_id = 0
          switch (data.status_code) {
            case 200:
              if (data.data.length === undefined) {
                this.editForm.province_id = data.data.province_id
                this.listProvinceCity = this.listProvinces[data.data.province_id].province_city
                for (const key in this.listProvinceCity) {
                  if (this.listProvinceCity[key].id === data.data.province_city_id) {
                    province_city_id = Number(key)
                  }
                }
                this.editForm.province_city_id = this.listProvinceCity[province_city_id].id
                this.editForm.address = data.data.address
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
        if (this.editForm.postal_code.length === 8) {
          let dto = _.cloneDeep(this.editForm.postal_code)
          dto = dto.replace(/[^0-9]/g, '')
          const data = await this.$store.dispatch(GET_ZIP_CODE, dto)
          let province_city_id = 0
          switch (data.status_code) {
            case 200:
              if (data.data.length === undefined) {
                this.editForm.province_id = data.data.province_id
                this.listProvinceCity = this.listProvinces[data.data.province_id].province_city
                for (const key in this.listProvinceCity) {
                  if (this.listProvinceCity[key].id === data.data.province_city_id) {
                    province_city_id = Number(key)
                  }
                }
                this.editForm.province_city_id = this.listProvinceCity[province_city_id].id
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
    const dataClone = this.clonedEditForm
    const data = _.cloneDeep(this.editForm)
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

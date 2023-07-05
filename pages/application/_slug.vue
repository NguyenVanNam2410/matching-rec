<template>
  <div class="application-detail main-job-container">
    <div class="application-detail__pc">
      <div class="breadcrumb-box item-pc">
        <span class="breadcrumb-previous" @click="$router.push('/')">{{ $t('my_page.top_page') }}</span>
        <img class="breadcrumb-arrow" src="../../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-previous" @click="$router.push('/application-list')">{{ $t('application.application_list') }}</span>
        <img class="breadcrumb-arrow" src="../../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-current">{{ $t('application.application_details') }}</span>
      </div>
      <div class="application-detail__body">
        <div class="item-sp">
          <div class="back d-flex cursor-pointer" @click="handleRouter('/application-list')">
            <img src="../../assets/icons/breadcrumb-arrow-black.svg" alt="">
            <div class="text-bold">{{  $t('application.application_details')}}</div>
          </div>
        </div>
        <div>
          <div class="application-detail__header">{{ $t('application.application_title') }}</div>
          <div class="application-detail__table">
            <div class="application-detail__col">
              <div class="application-detail__left ">{{ $t('application.image') }}</div>
              <div class="application-detail__right d-flex">
                <el-image
                  class="img-avatar"
                  :src="user.avatar_banner ? user.avatar_banner : avatarDefault"
                  :preview-src-list="[(user.avatar_banner ? user.avatar_banner : avatarDefault)]">
                </el-image>
              </div>
            </div>
            <div class="application-detail__col">
              <div class="application-detail__left">{{ $t('application.name') }}</div>
              <div class="application-detail__right name " >
              <span class="text-blue-hover cursor-pointer"   @click="$router.push('/user-details/' + user.user_id + '?application=' + $route.params.slug)">
                {{ (user.first_name || '') + ' ' + (user.last_name || '') }}
              </span>
              </div>
            </div>
            <div class="application-detail__col">
              <div class="application-detail__left">{{ $t('application.birth') }}</div>
              <div class="application-detail__right">{{ user.birthday }}</div>
            </div>
            <div class="application-detail__col">
              <div class="application-detail__left">{{ $t('application.age') }}</div>
              <div class="application-detail__right">{{ user.age ? (user.age + $t('common.age')) : '' }}</div>
            </div>
            <div class="application-detail__col">
              <div class="application-detail__left">{{ $t('application.sex') }}</div>
              <div class="application-detail__right">{{ user.gender }}</div>
            </div>
            <div class="application-detail__col">
              <div class="application-detail__left">{{ $t('application.phone') }}</div>
              <div class="application-detail__right">{{ user.tel }}</div>
            </div>
            <div class="application-detail__col">
              <div class="application-detail__left">{{ $t('application.email') }}</div>
              <div class="application-detail__right">{{ user.email }}</div>
            </div>
            <div class="application-detail__col">
              <div class="application-detail__left">{{ $t('application.address') }}</div>
              <div class="application-detail__right">{{ showAddress }}</div>
            </div>
            <div class="application-detail__header second">{{ $t('application.application_details') }}</div>
            <el-form
              ref="applicationForm"
              :model="applicationForm"
              :rules="applicationRules"
              autocomplete="off"
              label-position="left"
            >
              <div class="application-detail__col">
                <div class="application-detail__left">{{ $t('application.job_title') }}</div>
                <div class="application-detail__right name">
                  <span @click="$router.push('/job/' + application.job_id)" class="cursor-pointer text-blue-hover">{{ application.job_name }}</span>
                </div>

              </div>
              <div class="application-detail__col">
                <div class="application-detail__left">{{ $t('application.date') }}</div>
                <div class="application-detail__right">{{ application.created_at }}</div>
              </div>
              <div class="application-detail__col">
                <div class="application-detail__left">{{ $t('application.status') }}</div>
                <div ref="interview_status_id" class="application-detail__right application-el-form">
                  <el-form-item label="" prop="interview_status_id" :error="(error.key === 'interview_status_id') ? error.value : ''">
                    <el-select
                      v-model="applicationForm.interview_status_id"
                      class="w-140"
                      :placeholder="$t('job_list.enter_place')"
                      :disabled="!application.can_change_status"
                      @change="validate('interview_status_id')"
                      @focus="resetValidate('interview_status_id')"
                      @visible-change="(event) => { checkValidate('interview_status_id', event) }"
                    >
                      <el-option v-for="item in listStatus" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="application-detail__col">
                <div class="application-detail__left">{{ $t('application.interview_time') }}</div>
                <div class="application-detail__right">{{ application.interview_date }}</div>
              </div>
              <div class="application-detail__col">
                <div class="application-detail__left">{{ $t('application.interview_method') }}</div>
                <div class="application-detail__right">{{ application.interview_approach_name }}</div>
              </div>
              <div v-show="application.has_input_link" class="application-detail__col">
                <div class="application-detail__left">{{ $t('application.meet_link') }}</div>
                <div class="application-detail__right application-el-form" ref="meet_link">
                  <el-form-item label="" prop="meet_link" :error="(error.key === 'meet_link') ? error.value : ''">
                    <el-input
                      class="w-504 meet-link-w100"
                      type="text"
                      v-model="applicationForm.meet_link"
                      :placeholder="$t('application.meet_link')"
                      maxlength="255"
                      @focus="resetValidate('meet_link')"
                    >
                    </el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="application-detail__col">
                <div class="application-detail__left">{{ $t('job.question_request1') }}</div>
                <div class="application-detail__right right-note">{{ application.note }}</div>
              </div>
              <div class="application-detail__col">
                <div class="application-detail__left">{{ $t('application.memo') }}</div>
                <div ref="owner_memo" class="application-detail__right">
                  <el-form-item label="" prop="owner_memo" :error="(error.key === 'owner_memo') ? error.value : ''">
                    <el-input
                      class="w-620 application-memo-w100"
                      type="textarea"
                      :rows="3"
                      v-model="applicationForm.owner_memo"
                      :placeholder="$t('application.enter_memo')"
                      maxlength="2000"
                      @focus="resetValidate('owner_memo')"
                    >
                    </el-input>
                  </el-form-item>
                  <div class="register-job__description application-des">{{ showLimitMemo }}</div>
                </div>
              </div>
            </el-form>
            <div class="application-detail__button">
              <el-button type="danger" @click="updateConfirm">{{ $t('application.update') }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog class="popup-confirm" :visible.sync="dialogConfirm" width="570px">
      <div class="image-confirm text-center">
        <img src="/assets/icon/icon_confirm.svg" alt="">
      </div>
      <div class="content-confirm text-center">
        {{ $t('content.CON_013') }}
      </div>
      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="dialogConfirm = false">{{ $t('confirm_modal.no') }}</el-button>
        <el-button type="danger" @click="update">{{ $t('confirm_modal.yes') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  APPLICATION_DETAIL,
  APPLICATION_UPDATE,
  INDEX_SET_SUCCESS,
  MASTER_GET_DATA, INDEX_SET_TITLE_MENU
} from '../../store/store.const'
import { validFullWidth } from '../../utils/validate'

export default {
  name: 'ApplicationDetailPage',
  data() {
    const validFormLength = (rule, value, callback, message) => {
      if (value && value.length > 2000) {
        callback(new Error(this.$t('validation.area_length', { _field_: message })))
      } else {
        callback()
      }
    }
    const validTextLength = (rule, value, callback, message) => {
      if (value && value.length > 255) {
        callback(new Error(this.$t('validation.max_length', { _field_: message })))
      } else {
        callback()
      }
    }
    const validFullWidthLength = (rule, value, callback, message) => {
      if (value === '') {
        callback()
      }
      if (validFullWidth(value)) {
        callback(new Error(this.$t('validation.max_length', { _field_: message })))
      } else {
        callback()
      }
    }
    return {
      storeName: '虎ノ門店舗 (デモ美容室)',
      event: 'スタッフ向け、美容イベントを開催',
      recruitmentType: 'ヘア、ネイル・マツゲ、整体・カ',
      application: {},
      user: {},
      userStatus: '',
      dialogConfirm: false,
      applicationForm: {
        interview_status_id: '',
        can_change_status: false,
        meet_link: '',
        owner_memo: '',
        errors: {}
      },
      error: {
        key: '',
        value: ''
      },
      applicationRules: {
        interview_status_id: [],
        meet_link: [
          { validator: validTextLength, message: this.$t('validation.max_length', { _field_: this.$t('application.meet_link') }), trigger: 'blur' },
          { validator: validFullWidthLength, message: this.$t('validation.fullwidth_length', { _field_: this.$t('application.meet_link') }), trigger: 'blur' }
        ],
        owner_memo: [
          { validator: validFormLength, message: this.$t('validation.area_length', { _field_: this.$t('application.memo') }), trigger: 'blur' }
        ]
      },
      listStatus: [
        {
          id: '',
          name: this.$t('common.select'),
          disabled: true
        }
      ],
      avatarDefault: require(`~/assets/icons/avatar-header.svg`),
      jobDelete: false
    }
  },
  computed: {
    showAddress() {
      if (this.user.address === undefined) {
        return ''
      }
      return (this.user.postal_code ? ('〒' + this.user.postal_code + ' ') : '') + this.user.address.province_name + (this.user.address.province_city_name || '') + this.user.address.address + (this.user.address.building || '')
    },
    showLimitMemo() {
      const showData = this.applicationForm.owner_memo ? this.applicationForm.owner_memo.length : 0
      return this.$t('common.limit_characters', { current: ('000' + showData).slice(-4), max: 2000 })
    }
  },
  async created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, { title: this.$t('my_page.application_management'), subTitle: 'Application management' })
    await this.getDetailApplication()
  },
  methods: {
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.applicationForm.fields.find((f) => f.prop === ref).clearValidate()
      this.applicationForm.errors[ref] = ''
    },
    validate(ref) {
      this.$refs.applicationForm.validateField(ref)
    },
    checkValidate(ref, event) {
      if (!event) {
        this.$refs.applicationForm.validateField(ref)
      }
    },
    async getDetailApplication() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const id = this.$route.params.slug
      const response = await this.$store.dispatch(APPLICATION_DETAIL, id)
      switch (response.status_code) {
        case 200:
          this.application = response.data
          this.user = response.data.user
          this.userStatus = response.data.interview_status.id
          this.applicationForm.interview_status_id = response.data.interview_status.id
          this.applicationForm.owner_memo = response.data.owner_memo
          this.applicationForm.meet_link = response.data.meet_link
          this.listStatus = response.data.interview_statuses
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
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: response.messages
          })
          break
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    showDataArray(value, key) {
      if (value) {
        const resultValue = []
        value.forEach(item => {
          if (key) {
            resultValue.push(item[key])
          } else {
            resultValue.push(item)
          }
        })
        return resultValue.join('、')
      }
      return ''
    },
    handleRouter(route) {
      this.$router.push(route)
    },
    async getMasterData() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataResources = [
        'resources[m_interviews_status]={"model": "MInterviewStatus"}'
      ]
      const dataMasterData = await this.$store.dispatch(MASTER_GET_DATA, dataResources.join('&'))
      if (dataMasterData.status_code === 200) {
        this.listStatus = dataMasterData.data.m_interviews_status
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async update() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dto = this.applicationForm
      const response = await this.$store.dispatch(APPLICATION_UPDATE, { id: this.$route.params.slug, form: dto })
      switch (response.status_code) {
        case 200:
          await this.$store.commit(INDEX_SET_SUCCESS, {
            show: true,
            text: response.messages
          })
          await this.$router.push('/application-list')
          break
        case 400:
          if (response.data) {
            if (response.data.is_user_deleted) {
              await this.$router.push('/user-details/' + this.user.user_id)
            } else if (response.data.is_job_deleted) {
              await this.$router.push('/job/not-found')
            } else {
              await this.$router.push('/application/not-found')
            }
          } else {
            await this.$router.push('/application/not-found')
          }
          break
        case 401:
          await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
          this.$auth.logout()
          break
        case 422:
          for (const [key] of Object.entries(response.data)) {
            this.error = { key, value: response.data[key][0] }
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
      this.dialogConfirm = false
    },
    updateConfirm() {
      if (this.error.key) {
        this.scrollToElement(this.error.key)
        return
      }
      this.$refs.applicationForm.validate(async(valid, key) => {
        if (valid) {
          if (this.userStatus !== this.applicationForm.interview_status_id) {
            this.dialogConfirm = true
          } else {
            await this.update()
          }
        } else {
          this.scrollToElement(Object.keys(key)[0])
        }
      })
    },
    scrollToElement(key) {
      const el = this.$refs[key]
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>

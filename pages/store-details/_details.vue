<template>
  <div class="store-details main-job-container">
    <div class="header-breadcrumb">
      <div class="breadcrumb-box">
        <span class="breadcrumb-previous cursor-pointer" @click="$router.push('/')">{{ $t('my_page.top_page') }}</span>
        <img class="breadcrumb-arrow" src="../../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-previous cursor-pointer" @click="$router.push('/store-management')">{{ $t('my_page.store_management') }}</span>
        <img class="breadcrumb-arrow" src="../../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-current">{{ $t('my_page.store_details') }}</span>
      </div>
    </div>
    <div class="store-details__header">{{ $t('my_page.store_details') }}</div>
    <div v-if="jobDelete">
      <div class="detail-delete">{{ $t('no_data.store_detail_delete') }}</div>
    </div>
    <div v-else class="store-details__table">
      <div class="store-details__col">
        <div class="store-details__left">{{ $t('my_page.store_image') }}</div>
        <div class="store-details__right">
          <el-image
            v-if="storeDetail.url"
            class="store-details__avt"
            :src="storeDetail.url"
            :preview-src-list="[storeDetail.url]">
          </el-image>
        </div>
      </div>
      <div class="store-details__col">
        <div class="store-details__left">{{ $t('career.store_name') }}</div>
        <div class="store-details__right website-text">{{ storeDetail.store_name }}</div>
      </div>
      <div class="store-details__col">
        <div class="store-details__left">{{ $t('page.home') }}</div>
        <div class="store-details__right">
          <a class="cursor-pointer link-text" :href="storeDetail.website" target="_blank">{{ storeDetail.website }}</a>
        </div>
      </div>
      <div class="store-details__col">
        <div class="store-details__left">{{ $t('my_page.application_tel') }}</div>
        <div class="store-details__right website-text">{{ storeDetail.application_tel }}</div>
      </div>
      <div class="store-details__col">
        <div class="store-details__left">{{ $t('my_page.phone') }}</div>
        <div class="store-details__right website-text">{{ storeDetail.tel }}</div>
      </div>
      <div class="store-details__col">
        <div class="store-details__left">{{ $t('my_page.address') }}</div>
        <div class="store-details__right website-text">{{ storeDetail.address }}</div>
      </div>
      <div class="store-details__col">
        <div class="store-details__left">{{ $t('my_page.store_manager') }}</div>
        <div class="store-details__right website-text">{{ storeDetail.manager_name }}</div>
      </div>
      <div class="store-details__col">
        <div class="store-details__left">{{ $t('my_page.number_of_employees') }}</div>
        <div class="store-details__right website-text">{{ storeDetail.employee_quantity }}</div>
      </div>
      <div class="store-details__col">
        <div class="store-details__left">{{ $t('my_page.establish') }}</div>
        <div class="store-details__right website-text">{{ storeDetail.founded_year }}</div>
      </div>
      <div class="store-details__col">
        <div class="store-details__left">{{ $t('my_page.business_content') }}</div>
        <div class="store-details__right website-text">{{ storeDetail.business_segment }}</div>
      </div>
      <div class="store-details__col">
        <div class="store-details__left">{{ $t('my_page.recruiter') }}</div>
        <div class="store-details__right website-text">{{ storeDetail.recruiter_name }}</div>
      </div>
      <div class="store-details__col">
        <div class="store-details__left">{{ $t('my_page.current_job') }}</div>
        <div class="store-details__right website-text">{{ storeDetail.specialize_ids }}</div>
      </div>
      <div class="store-details__col">
        <div class="store-details__left">{{ $t('my_page.store_features1') }}</div>
        <div class="store-details__right website-text">{{ storeDetail.store_features }}</div>
      </div>
      <div class="register-button">
        <el-button type="danger" @click="$router.push(`/edit-store/${param}`)">{{ $t('my_page.edit') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  GET_STORE_DETAIL
} from '../../store/store.const'
export default {
  name: 'StoreDetails',
  asyncData({ params }) {
    const param = params.details
    return { param }
  },
  data() {
    return {
      storeDetail: [],
      jobDelete: false
    }
  },
  created() {
    this.getStore()
  },
  methods: {
    phoneFormat(num) {
      if (num) {
        const format = num.toString().replace(/-/g, '')
        return format.toString().slice(0, 3) + '-' + format.toString().slice(3, 7) + '-' + format.toString().slice(7, 12)
      }
      return ''
    },
    postalCodeFormat(num) {
      if (num) {
        const format = num.toString().replace(/-/g, '')
        return format.toString().slice(0, 3) + '-' + format.toString().slice(3)
      }
      return ''
    },
    showAddress(store) {
      if (store.address === undefined) {
        return ''
      }
      return (store.address.postal_code ? ('〒' + this.postalCodeFormat(store.address.postal_code)) : '') + store.address.province + (store.address.province_city_name || '') + store.address.address + (store.address.building || '')
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
            this.storeDetail = {
              ...dataApi,
              tel: this.phoneFormat(dataApi.tel),
              founded_year: dataApi.date.founded_year,
              specialize_ids: dataApi.specialize_ids.map(item => item.name).join('、'),
              address: this.showAddress(dataApi)
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
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('content.EXC_001') })
            break
        }
      } catch {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('content.EXC_001') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>

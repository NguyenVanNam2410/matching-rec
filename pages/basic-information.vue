<template>
  <div class="information">
    <div class="breadcrumb">
      <span @click="$router.push('/')" class="breadcrumb-previous cursor-pointer">{{ $t('my_page.top_page') }}</span>
      <img class="breadcrumb-arrow" src="../assets/icons/breadcrumb-arrow.svg" />
      <span class="breadcrumb-current">{{ $t('my_page.basic_information') }}</span>
    </div>
    <div class="information-table">
      <div class="information-container">
        <div class="information-left">
          <div class="information-col">
            <div class="information-title">{{ $t('career.store_name') }}</div>
            <div class="information-content show-dot-text">{{ storeName }}</div>
          </div>
          <div class="information-col">
            <div class="information-title">{{ $t('my_page.name') }}</div>
            <div class="information-content show-dot-text">{{ name }}</div>
          </div>
          <div class="information-col">
            <div class="information-title">{{ $t('my_page.furi') }}</div>
            <div class="information-content show-dot-text">{{ furiName }}</div>
          </div>
          <div class="information-col">
            <div class="information-title">{{ $t('career.company_name') }}</div>
            <div class="information-content show-dot-text">{{ profileData.company_name }}</div>
          </div>
          <div class="information-col">
            <div class="information-title">{{ $t('page.home') }}</div>
            <div class="information-content show-dot-text">{{ profileData.home_page_recruiter }}</div>
          </div>
          <div class="information-col">
            <div class="information-title">{{ $t('my_page.phone') }}</div>
            <div class="information-content show-dot-text">{{ phoneFormat(profileData.tel) }}</div>
          </div>
          <div class="information-col">
            <div class="information-title">{{ $t('my_page.address') }}</div>
            <div class="information-content show-dot-text">{{ fullAddress }}</div>
          </div>
          <div class="information-col">
            <div class="information-title">{{ $t('my_page.representative_name') }}</div>
            <div class="information-content show-dot-text">{{ profileData.alias_name }}</div>
          </div>
          <div class="information-col">
            <div class="information-title">{{ $t('my_page.number_of_employees') }}</div>
            <div class="information-content show-dot-text">{{ profileData.employee_quantity }}</div>
          </div>
        </div>
        <div class="information-right">
          <div class="information-col">
            <div class="information-title">{{ $t('my_page.establish') }}</div>
            <div class="information-content show-dot-text">{{ establish }}</div>
          </div>
          <div class="information-col">
            <div class="information-title">{{ $t('my_page.capital') }}</div>
            <div class="information-content show-dot-text">{{ profileData.capital_stock }}
            </div>
          </div>
          <div class="information-col">
            <div class="information-title">{{ $t('my_page.manager') }}</div>
            <div class="information-content show-dot-text">{{ profileData.manager_name }}
            </div>
          </div>
          <div class="information-col">
            <div class="information-title">LINE ID</div>
            <div class="information-content show-dot-text">{{ profileData.line_id }}
            </div>
          </div>
          <div class="information-col">
            <div class="information-title">Facebook</div>
            <div class="information-content show-dot-text">{{ profileData.facebook }}
            </div>
          </div>
          <div class="information-col">
            <div class="information-title">Instagram</div>
            <div class="information-content show-dot-text">{{ profileData.instagram }}
            </div>
          </div>
          <div class="information-col">
            <div class="information-title">Twitter</div>
            <div class="information-content show-dot-text">{{ profileData.twitter }}
            </div>
          </div>
          <div class="information-col">
            <div class="information-title">{{ $t('my_page.usage_status') }}</div>
            <div class="information-content"></div>
          </div>
        </div>
      </div>

      <div class="information-button">
        <el-button type="danger" @click="$router.push('/edit-basic-information')">{{ $t('my_page.edit') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_ERROR,
  USER_PROFILE,
  INDEX_SET_TITLE_MENU
} from '../store/store.const'

export default {
  name: 'BasicInformation',
  data() {
    return {
      profileData: [],
      storeName: '',
      fullAddress: '',
      establish: '',
      name: '',
      furiName: ''
    }
  },
  methods: {
    postalCodeFormat(num) {
      if (num) {
        const format = num.toString().replace(/-/g, '')
        return format.toString().slice(0, 3) + '-' + format.toString().slice(3)
      }
      return ''
    },
    phoneFormat(num) {
      if (num) {
        const format = num.toString().replace(/-/g, '')
        return format.toString().slice(0, 3) + '-' + format.toString().slice(3, 7) + '-' + format.toString().slice(7, 12)
      }
      return ''
    }
  },
  async created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, { title: this.$t('page.my_page'), subTitle: 'My page' })
    try {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const data = await this.$store.dispatch(USER_PROFILE)
      const dataApi = data.data[0]
      const dataAddress = dataApi.address_information
      switch (data.status_code) {
        case 200:
          this.$store.commit(INDEX_SET_SUCCESS, {
            show: true,
            text: data.messages
          })
          this.storeName = dataApi.store_name.join('、')
          this.fullAddress = dataAddress.postal_code ? `〒${this.postalCodeFormat(dataAddress.postal_code || '')} ${dataAddress.province_name || ''}${dataAddress.province_city_name || ''}${dataAddress.address || ''}${dataAddress.building || ''}` : ''
          this.establish = dataApi.date.founded_year
          this.name = `${dataApi.first_name || ''}${dataApi.last_name || ''}`
          this.furiName = `${dataApi.furi_first_name || ''}${dataApi.furi_last_name || ''}`
          this.profileData = dataApi
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
      await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
    }
    await this.$store.commit(INDEX_SET_LOADING, false)
  }
}
</script>

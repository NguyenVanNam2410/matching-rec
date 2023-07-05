<template>
  <div class="basic-tab">
    <div class="basic-tab__pc">
      <div class="basic-tab__header">
        <div class="basic-tab__left">
          <el-image
            class="basic-tab__avt"
            :src="(detail.avatar || userExample)"
            :preview-src-list="[(detail.avatar || userExample)]">
          </el-image>
        </div>
        <div class="basic-tab__right">
          <div class="d-flex justify-between items-center pb-16 basic-tab__info">
            <div>
              <span class="basic-tab__name">{{ `${detail.first_name || ''} ${detail.last_name || ''}` }}</span>
              <span class="basic-tab__age">{{ ageFormat(detail.age) }}</span>
            </div>
            <span class="basic-tab__login">{{ $t('login.last_login') + '： ' + `${detail.last_login_at || ''}` }}</span>
          </div>
          <div class="d-flex items-center gap-10">
            <img src="../../assets/icons/Union.svg" />
            <span class="data-content">{{ formatAddress }}</span>
          </div>
          <div class="basic-tab__sub mt-6">
            <div class="d-flex items-center pr-80 gap-10">
              <img src="../../assets/icons/icon_phone.svg" />
              <span v-if="!detail.is_public_tel" class="view-after-matching">{{ $t('all.view_after_matching') }}</span>
              <span v-else class="data-content">{{ detail.tel }}</span>
            </div>
            <div class="d-flex items-center gap-10">
              <img src="../../assets/icons/icon_email.svg" />
              <span v-if="!detail.is_public_email" class="view-after-matching">{{ $t('all.view_after_matching') }}</span>
              <span v-else class="data-content">{{ detail.email }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="basic-tab__body">
        <div class="first-col">
          <div class="first-col__left left-col">
            <span class="col-title">{{ $t('my_page.image_detail') }}</span>
          </div>
          <div class="first-col__right right-col">
            <div v-for="(image, index) in listDetails" :key="index" class="basic-tab__img-details">
              <el-image
                class="basic-tab__small"
                :src="image"
                :preview-src-list="listDetails"
              />
            </div>
          </div>
        </div>
        <div class="second-col">
          <div class="second-col__layout">
            <div class="left-col">
              <span class="col-title">{{ $t('my_page.alias_name') }}</span>
            </div>
            <div class="right-col ml-12">
              <span class="">{{ detail.alias_name }}</span>
            </div>
          </div>
          <div class="second-col__layout">
            <div class="left-col">
              <span class="col-title">{{ $t('my_page.birth') }}</span>
            </div>
            <div v-if="!detail.is_public_age" class="right-col ml-12">
              <span class="view-after-matching">{{ $t('all.view_after_matching') }}</span>
            </div>
            <div v-else class="right-col ml-12">
              <span class="">{{ detail.birthday }}</span>
            </div>
          </div>
        </div>
        <div class="second-col">
          <div class="second-col__layout">
            <div class="left-col">
              <span class="col-title">{{ $t('my_page.furi_name') }}</span>
            </div>
            <div class="right-col ml-12">
              <span class="">{{ `${detail.furi_first_name || ''} ${detail.furi_last_name || ''}` }}</span>
            </div>
          </div>
          <div class="second-col__layout">
            <div class="left-col">
              <span class="col-title">{{ $t('my_page.gender') }}</span>
            </div>
            <div class="right-col ml-12">
              <span class="">{{ detail.gender }}</span>
            </div>
          </div>
        </div>
        <div class="last-col">
          <div class="left-col">
            <span class="col-title">{{ $t('my_page.stores_SNS') }}</span>
          </div>
          <div v-if="!detail.is_public_social" class="right-col short-col">
            <span class="view-after-matching">{{ $t('all.view_after_matching') }}</span>
          </div>
          <div v-else class="right-col short-col">
            <div v-if="detail.facebook" @click="openLink(detail.facebook)" class="social-redirect">
              <img src="../../assets/icons/facebook.svg" />
            </div>
            <div v-else class="social-disable">
              <img src="../../assets/icons/facebook_disable.svg" />
            </div>
            <div v-if="detail.twitter" @click="openLink(detail.twitter)" class="social-redirect">
              <img src="../../assets/icons/twitter.svg" />
            </div>
            <div v-else class="social-disable">
              <img src="../../assets/icons/twitter_disable.svg" />
            </div>
            <div v-if="detail.instagram" @click="openLink(detail.instagram)" class="social-redirect">
              <img src="../../assets/icons/instagram.svg" />
            </div>
            <div v-else class="social-disable">
              <img src="../../assets/icons/instagram_disable.svg" />
            </div>
            <div v-if="detail.line" @click="openLink(detail.line)" class="social-redirect">
              <img src="../../assets/icons/line.svg" />
            </div>
            <div v-else class="social-disable">
              <img src="../../assets/icons/line_disable.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="basic-tab__sp">
      <div class="basic-tab__header">
        <div class="basic-tab__left">
          <el-image
            class="basic-tab__avt"
            :src="(detail.avatar || userExample)"
            :preview-src-list="[(detail.avatar || userExample)]">
          </el-image>
        </div>
        <div class="basic-tab__right">
          <div class="d-flex justify-between items-center pb-16 basic-tab__info">
            <div>
              <span class="basic-tab__name">{{ `${detail.first_name || ''} ${detail.last_name || ''}` }}</span>
              <span class="basic-tab__age">{{ ageFormat(detail.age) }}</span>
            </div>
            <span class="basic-tab__login">{{ $t('login.last_login') + '： ' + `${detail.last_login_at || ''}` }}</span>
          </div>
        </div>
      </div>
      <div class="d-flex items-center pt-12 gap-10">
        <img src="../../assets/icons/Union.svg" />
        <span class="data-content">{{ formatAddress }}</span>
      </div>
      <div class="basic-tab__sub">
        <div class="d-flex items-center pr-80 gap-10">
          <img src="../../assets/icons/icon_phone.svg" />
          <span v-if="!detail.is_public_tel" class="view-after-matching">{{ $t('all.view_after_matching') }}</span>
          <span v-else class="data-content">{{ detail.tel }}</span>
        </div>
        <div class="d-flex items-center gap-10">
          <img src="../../assets/icons/icon_email.svg" />
          <span v-if="!detail.is_public_email" class="view-after-matching">{{ $t('all.view_after_matching') }}</span>
          <span v-else class="data-content">{{ detail.email }}</span>
        </div>
      </div>
      <div class="basic-tab__body">
        <div class="first-col">
          <div class="first-col__left left-col">
            <span class="col-title">{{ $t('my_page.image_detail') }}</span>
          </div>
          <div class="first-col__right right-col">
            <div v-for="(image, index) in listDetails" :key="index">
              <el-image
                class="basic-tab__avt"
                :src="image"
                :preview-src-list="listDetails"
              />
            </div>
          </div>
        </div>
        <div class="first-col">
          <div class="first-col__left left-col">
            <span class="col-title">{{ $t('my_page.alias_name') }}</span>
          </div>
          <div class="first-col__right right-col">
            <span>{{ detail.alias_name }}</span>
          </div>
        </div>
        <div class="first-col">
          <div class="first-col__left left-col">
            <span class="col-title">{{ $t('my_page.birth') }}</span>
          </div>
          <div v-if="!detail.is_public_age" class="first-col__right right-col">
            <span class="view-after-matching">{{ $t('all.view_after_matching') }}</span>
          </div>
          <div v-else class="first-col__right right-col">
            <span>{{ detail.birthday }}</span>
          </div>
        </div>
        <div class="first-col">
          <div class="first-col__left left-col">
            <span class="col-title">{{ $t('my_page.furi_name') }}</span>
          </div>
          <div class="first-col__right right-col">
            <span>{{ `${detail.furi_first_name || ''} ${detail.furi_last_name || ''}` }}</span>
          </div>
        </div>
        <div class="first-col">
          <div class="first-col__left left-col">
            <span class="col-title">{{ $t('my_page.gender') }}</span>
          </div>
          <div class="first-col__right right-col">
            <span>{{ detail.gender }}</span>
          </div>
        </div>
        <div class="first-col">
          <div class="first-col__left left-col">
            <span class="col-title">{{ $t('my_page.stores_SNS') }}</span>
          </div>
          <div v-if="!detail.is_public_social" class="first-col__right right-col">
            <span class="view-after-matching">{{ $t('all.view_after_matching') }}</span>
          </div>
          <div v-else class="first-col__right right-col">
            <div v-if="detail.facebook" @click="openLink(detail.facebook)" class="social-redirect">
              <img src="../../assets/icons/facebook.svg" />
            </div>
            <div v-else class="social-disable">
              <img src="../../assets/icons/facebook_disable.svg" />
            </div>
            <div v-if="detail.twitter" @click="openLink(detail.twitter)" class="social-redirect">
              <img src="../../assets/icons/twitter.svg" />
            </div>
            <div v-else class="social-disable">
              <img src="../../assets/icons/twitter_disable.svg" />
            </div>
            <div v-if="detail.instagram" @click="openLink(detail.instagram)" class="social-redirect">
              <img src="../../assets/icons/instagram.svg" />
            </div>
            <div v-else class="social-disable">
              <img src="../../assets/icons/instagram_disable.svg" />
            </div>
            <div v-if="detail.line" @click="openLink(detail.line)" class="social-redirect">
              <img src="../../assets/icons/line.svg" />
            </div>
            <div v-else class="social-disable">
              <img src="../../assets/icons/line_disable.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'

export default {
  name: 'BasicInformationTab',
  props: ['userId', 'tabIndex', 'detail'],
  data() {
    return {
      userExample: require('../../assets/icons/user-example.png')
    }
  },
  computed: {
    formatAddress() {
      const detail = {
        postal_code: _.get(this.detail.user_address, 'postal_code'),
        province_name: _.get(this.detail.user_address, 'province_name'),
        province_city_name: _.get(this.detail.user_address, 'province_city_name'),
        address: _.get(this.detail.user_address, 'address'),
        building: _.get(this.detail.user_address, 'building')
      }
      const address = detail.province_name ? `${detail.postal_code ? `〒${this.postalCodeFormat(detail.postal_code)}` : ''} ${detail.province_name}${detail.province_city_name || ''}${detail.address}${detail.building || ''}` : ''
      return address
    },
    listDetails() {
      const listDetails = []
      let listCount = 0
      if (this.detail.avatar_details) {
        this.detail.avatar_details.forEach((element) => {
          listDetails.push(element.url)
          listCount++
        })
      }
      for (let i = 0; i < (3 - listCount); i++) {
        listDetails.push(this.userExample)
      }
      return listDetails
    }
  },
  methods: {
    openLink(link) {
      if (link) {
        window.open(link, '_blank').focus()
      }
    },
    ageFormat(age) {
      return age ? `(${age}歳)` : ''
    },
    postalCodeFormat(num) {
      if (num) {
        const format = num.toString().replace(/-/g, '')
        return format.toString().slice(0, 3) + '-' + format.toString().slice(3)
      }
      return ''
    }
  }
}
</script>

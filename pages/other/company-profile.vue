<template>
  <div class="profile">
    <div class="breadcrumb">
      <span class="breadcrumb-previous cursor-pointer" @click="$router.push('/')">{{ $t('my_page.top_page') }}</span>
      <img class="breadcrumb-arrow" src="../../assets/icons/breadcrumb-arrow.svg" />
      <span class="breadcrumb-current">{{ $t('company_profile.company_profile') }}</span>
    </div>
    <div class="profile-table">
      <div class="profile-col" v-for="(item, index) in info" :key="index">
        <div class="profile-left">{{ item.title }}</div>
        <div :class="index === 0 ? 'profile-right' : 'profile-right'">
          <div v-if="item.type === 'link'" class="profile-content d-flex flex-col">
            <a :href="item.content">{{ item.content }}</a>
          </div>
          <div v-else class="profile-content d-flex flex-col">
            <span>{{ item.content }}</span>
            <span v-if="item.content2">{{ item.content2 }}</span>
          </div>
          <div v-if="item.icon && item.description" class="d-flex items-center pt-12 cursor-pointer w-fit link-text" @click="openMap">
            <img class="icon-destination hide-hover" src="../../assets/icons/destination.svg" />
            <img class="icon-destination show-hover" src="../../assets/icons/destination-hover.svg" />
            <img class="icon-destination show-focus" src="../../assets/icons/destination-focus.svg" />
            <span class="profile-destination">{{ item.description }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyProfile',
  data() {
    return {
      info: [
        {
          title: this.$t('company_profile.company_name'),
          content: 'VAMPS Hair Design'
        },
        {
          title: this.$t('company_profile.company_ceo'),
          content: '山田一郎'
        },
        {
          title: this.$t('my_page.establish'),
          content: '2017年8月'
        },
        {
          title: this.$t('job.work_type'),
          content: '〒105-0001 東京都虎ノ門一丁目１２−３ 〇〇マンション１０１号',
          icon: require('../../assets/icons/destination.svg'),
          description: this.$t('schedule.open_google_map')
        },
        {
          title: this.$t('my_page.phone'),
          content: '03-11111-2222 （受付時間：11:00～21:00 月～金)'
        },
        {
          title: this.$t('company_profile.fax_number'),
          content: '03-0000-0000'
        },
        {
          title: 'E-mail',
          content: 'info@vamps.jp'
        },
        {
          title: this.$t('page.home'),
          content: 'http://vamps.jp/',
          type: 'link'
        },
        {
          title: this.$t('my_page.business_content'),
          content: 'WEBサイトの開発及び運営',
          content2: '求人広告の代理業務'
        }
      ],
      href: 'https://www.google.com/maps/place/1-chome-12+Toranomon,+Minato+City,+Tokyo+105-0001'
    }
  },
  methods: {
    openMap() {
      window.open(this.href, '_blank').focus()
    }
  }
}
</script>

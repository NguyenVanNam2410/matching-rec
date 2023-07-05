<template>
  <div class="top-item item-pc">
    <div class="d-flex flex-col top-item-left">
      <div class="pb-16">
        <el-image
          class="basic-tab__avt"
          :src="(item.avatar || userExample)"
          :preview-src-list="[(item.avatar || userExample)]">
        </el-image>
        <span class="top-last-login">{{ formatLastLogin(item.last_login_at) }}</span>
      </div>
      <div>
        <div class="d-flex justify-between g-14">
          <el-button v-if="!item.is_favorite" class="job-favourite relative border-red" type="secondary" @click="postFavourite(item.id, item.is_favorite)">
            <img class="img-btn" src="../../assets/icons/top-heart.svg" />
            <span class="pl-30">{{ $t('home.job_favorite') }}</span>
          </el-button>
          <el-button v-else class="job-favourite not-favourite relative border-red" type="secondary" @click="postFavourite(item.id, item.is_favorite)">
            <img class="img-btn" src="../../assets/icons/top-heart-white.svg" />
            <span class="pl-30">{{ $t('home.job_favorite') }}</span>
          </el-button>
          <el-button class="job-chat relative" @click="chatUser(item.id)">
            <img class="img-btn hide-hover" src="../../assets/icons/top-message.svg" />
            <img class="img-btn show-focus" src="../../assets/icons/top-message-focus.png" />
            <span class="pl-30">{{ $t('my_page.chat') }}</span>
          </el-button>
        </div>
      </div>
    </div>
    <div class="top-item__right">
      <div class="d-flex justify-between">
        <div>
          <span class="top-name">{{ `${item.first_name || ''} ${item.last_name || ''}` }}</span>
          <span class="top-age">{{ formatAge(item.age) }}</span>
        </div>
        <el-button type="danger" @click="$router.push(`/user-details/${item.id}`)">{{ $t('home.view_job_detail') }}</el-button>
      </div>
      <div class="d-flex list-icon">
        <div class="d-flex items-center">
          <img src="../../assets/icons/address.svg" />
          <span class="top-detail">{{ item.user_address }}</span>
        </div>
        <div class="d-flex items-center">
          <img src="../../assets/icons/phone.svg" />
          <span v-if="!item.is_public_tel" class="view-after-matching">{{ $t('all.view_after_matching') }}</span>
          <span v-else class="top-detail">{{ item.tel }}</span>
        </div>
        <div class="d-flex items-center">
          <img src="../../assets/icons/mail.svg" />
          <span v-if="!item.is_public_email" class="view-after-matching">{{ $t('all.view_after_matching') }}</span>
          <span v-else class="top-detail">{{ item.email }}</span>
        </div>
      </div>
      <div class="top-table">
        <div class="top-col d-flex">
          <div class="top-first">{{ $t('desired_condition.position') }}</div>
          <div class="top-second show-dot-text">{{ item.job_types }}</div>
        </div>
        <div class="top-col d-flex">
          <div class="top-first">{{ $t('desired_condition.salary') }}</div>
          <div class="top-second show-dot-text">{{ item.salary }}</div>
        </div>
        <div class="top-col d-flex">
          <div class="top-first">{{ $t('desired_condition.experience') }}</div>
          <div class="top-second show-dot-text">{{ item.job_experiences }}</div>
        </div>
        <div class="top-col d-flex">
          <div class="top-first">{{ $t('desired_condition.location') }}</div>
          <div class="top-second show-dot-text">{{ item.address }}</div>
        </div>
        <div class="top-col d-flex">
          <div class="top-first">{{ $t('desired_condition.type') }}</div>
          <div class="top-second show-dot-text">{{ item.work_types }}</div>
        </div>
        <div class="top-col d-flex">
          <div class="top-first">{{ $t('desired_condition.features') }}</div>
          <div class="top-second show-dot-text">{{ item.job_features }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ItemApplicationElement',
  props: ['item', 'listStores'],
  data() {
    return {
      userExample: require('../../assets/images/user.png')
    }
  },
  methods: {
    formatAge(age) {
      return age ? (`(${age}` + this.$t('common.age') + `)`) : ''
    },
    formatLastLogin(time) {
      return `${this.$t('login.last_login')}: ${time || ''}`
    },
    postFavourite(id, status) {
      this.$emit('postLike', { id, status })
    },
    chatUser(id) {
      if (!this.listStores.length) {
        this.$confirm(this.$t('content.CON_023'), {
          confirmButtonText: this.$t('confirm_modal.yes'),
          cancelButtonText: this.$t('confirm_modal.no'),
          type: 'warning'
        })
          .then(_ => {
            this.$router.push('/register-store')
          })
          .catch(_ => {})
      } else {
        this.$router.push(`/other/chat?user_id=${id}`)
      }
    }
  }
}
</script>

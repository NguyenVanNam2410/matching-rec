<template>
  <div class="user-item-element top-item" @click="$router.push(`/user-details/${item.id}`)">
    <div class="user-item__left">
      <img class="basic-tab__avt" :src="(item.avatar || userExample)" />
    </div>
    <div class="top-item__right user-item__right">
      <div class="user-info">
        <div class="d-flex items-center">
          <span class="top-name">{{ `${item.first_name || ''} ${item.last_name || ''}` }}</span>
          <span class="top-age">{{ formatAge(item.age) }}</span>
        </div>
        <div class="image-right">
          <img v-if="!item.is_favorite" src="../../assets/icons/top-heart.svg" @click.stop="postFavourite(item.id, item.is_favorite)" />
          <img v-else src="../../assets/icons/top-heart-red.svg" @click.stop="postFavourite(item.id, item.is_favorite)" />
          <img src="../../assets/icons/top-message.svg" @click.stop="chatUser(item.id)" />
        </div>
      </div>
      <div class="pt-6 pb-8 d-flex">
        <img src="../../assets/icons/address.svg" />
        <span class="top-detail">{{ item.user_address }}</span>
      </div>
      <div class="d-flex pb-8 pr-100">
        <img src="../../assets/icons/phone.svg" />
        <span v-if="!item.is_public_tel" class="view-after-matching">{{ $t('all.view_after_matching') }}</span>
        <span v-else class="top-detail">{{ item.tel }}</span>
      </div>
      <div class="d-flex">
        <img src="../../assets/icons/mail.svg" />
        <span v-if="!item.is_public_email" class="view-after-matching">{{ $t('all.view_after_matching') }}</span>
        <span v-else class="top-detail">{{ item.email }}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserItemElement',
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

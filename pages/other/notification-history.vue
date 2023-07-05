<template>
  <div class="notification">
    <div class="notification-pc">
      <div class="breadcrumb">
        <span class="breadcrumb-previous cursor-pointer" @click="$router.push('/')">{{ $t('my_page.top_page') }}</span>
        <img class="breadcrumb-arrow" src="../../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-current">{{ $t('page.notification_history') }}</span>
      </div>
      <div v-if="notifications.length" class="notification-table">
        <div
          v-for="(item, index) in notifications"
          :key="index"
          :class="['notification-col', { 'notification-status': item.be_read === 0 }]"
        >
          <div class="notification-first">
            <div class="notification-info">
              <div v-if="item.be_read === 0" class="notification-unread">{{ $t('my_page.unread') }}</div>
              <span :class="['notification-title', { 'notification-read' : item.be_read !== 0 }]" @click="updateRead(item, index)">{{ item.title }}</span>
            </div>
            <div class="notification-date">{{ item.send_time }}</div>
          </div>
          <span :class="['notification-content', { 'notification-left': item.be_read === 1 }]">
            {{ item.content }}
          </span>
        </div>
        <div v-if="(notifications.length && total > 10)" class="notification-pagination">
          <PaginationElement :currentPage="currentPage" :lastPage="lastPage" @change="changePage" />
        </div>
      </div>
      <div v-else class="notification-empty">
        <NoDataElement :text="$t('common.no_notifications')" />
      </div>
    </div>
    <div class="notification-sp">
      <div class="notification-header">{{ $t('page.notification_history') }}</div>
      <div v-if="notifications.length" class="notification-table">
        <div
          v-for="(item, index) in notifications"
          :key="index"
          :class="['notification-col', { 'notification-status': item.be_read === 0 }]"
        >
          <div class="notification-first">
            <div v-if="item.be_read === 0" class="notification-unread">{{ $t('my_page.unread') }}</div>
            <div class="notification-info">
              <span class="notification-title" @click="updateRead(item, index)">{{ item.title }}</span>
              <span class="notification-content">{{ item.content }}</span>
              <div class="notification-date">{{ item.send_time }}</div>
            </div>
          </div>
        </div>
        <div v-if="(notifications.length && total > 10)" class="notification-pagination">
          <PaginationElement :currentPage="currentPage" :lastPage="lastPage" @change="changePage" />
        </div>
      </div>
      <div v-else class="notification-empty">
        <NoDataElement :text="$t('common.no_notifications')" />
      </div>
    </div>
  </div>
</template>
<script>
import PaginationElement from '../../components/element-ui/PaginationElement.vue'
import NoDataElement from '../../components/element-ui/NoDataElement.vue'
import {
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_ERROR,
  LIST_NOTIFY,
  COUNT_NOTIFY,
  NOTIFICATION_UPDATE_READ,
  SET_NOTIFICATIONS
} from '@/store/store.const'

export default {
  name: 'NotificationHistory',
  components: { PaginationElement, NoDataElement },
  data() {
    return {
      notifications: [],
      currentPage: 1,
      lastPage: 1,
      total: ''
    }
  },
  created() {
    this.getListNotifications()
  },
  methods: {
    getLinkNotification(notification) {
      if (notification.notice_type_id === 3) {
        return this.$router.push('/other/chat?user_id=' + notification.noti_object_ids.user_id + (notification.noti_object_ids.store_id ? `&store_id=${notification.noti_object_ids.store_id}` : ''))
      }
      if ([9].includes(notification.notice_type_id)) {
        return this.$router.push('/user-details/' + notification.noti_object_ids.user_id)
      }
      if ([10, 13, 2, 11, 12, 1].includes(notification.notice_type_id)) {
        return this.$router.push('/application/' + notification.noti_object_ids.application_id)
      }
      if ([4, 5].includes(notification.notice_type_id)) {
        return this.$router.push('/job/' + notification.noti_object_ids.job_id)
      }
    },
    async refreshCount() {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const res = await this.$store.dispatch(COUNT_NOTIFY)
        const count = res.data.count
        switch (res.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: res.messages
            })
            count > 99 ? this.$store.commit(SET_NOTIFICATIONS, '99+') : this.$store.commit(SET_NOTIFICATIONS, count)
            break
          default:
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: res.messages })
            break
        }
      } catch {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async updateRead(notification, index) {
      if (notification.be_read === 0) {
        try {
          await this.$store.commit(INDEX_SET_LOADING, true)
          const response = await this.$store.dispatch(NOTIFICATION_UPDATE_READ, notification.id)
          switch (response.status_code) {
            case 200:
              this.notifications[index].be_read = 1
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
        } catch {
          await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
        }
        await this.$store.commit(INDEX_SET_LOADING, false)
      }
      await this.refreshCount()
      await this.getLinkNotification(notification)
    },
    async getListNotifications() {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const param = `?page=${this.currentPage}`
        const res = await this.$store.dispatch(LIST_NOTIFY, param)
        const dataApi = res.data
        switch (res.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: res.messages
            })
            this.total = dataApi.total
            this.notifications = dataApi.data
            this.lastPage = dataApi.total_page
            this.currentPage = dataApi.current_page
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
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: res.messages })
            break
        }
      } catch {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    changePage(page) {
      this.currentPage = page
      this.getListNotifications()
    }
  }
}
</script>

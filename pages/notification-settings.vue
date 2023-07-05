<template>
  <div class="information">
    <div class="breadcrumb">
      <span @click="$router.push('/')" class="breadcrumb-previous cursor-pointer">{{ $t('my_page.top_page') }}</span>
      <img class="breadcrumb-arrow" src="../assets/icons/breadcrumb-arrow.svg" />
      <span class="breadcrumb-current">{{ $t('my_page.basic_information') }}</span>
    </div>
    <div class="information-table">
      <div class="show-change-notify">
          <div class="notify-content">
            <section class="notify-title">
              <span>{{ $t('my_page.change_notify') }}</span>
              <br/>
              <br/>
              <span>{{ $t('my_page.change_notify2') }}</span>
            </section>
            <div class="button-check">
              <el-checkbox v-model="formNotify.notification_method_email" :label="$t('my_page.notify_email')" size="large" @change="updateEmailNotify"></el-checkbox>
              <el-checkbox v-model="formNotify.notification_method_line" :label="$t('my_page.notify_line')" size="large" @change="changeLineNotify"></el-checkbox>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_TITLE_MENU,
  SETTING_NOTIFY,
  UPDATE_NOTIFY,
  MASTER_GET_DATA, INDEX_SET_SUCCESS
} from '../store/store.const'

export default {
  name: 'NotificationSettingsPage',
  middleware: 'auth',
  data() {
    return {
      formNotify: {
        has_line_code: false,
        notification_method_email: false,
        notification_method_line: false
      },
      query: this.$route.query,
      lineSettings: {
        client_id: '',
        callback: ''
      }
    }
  },
  async created() {
    await this.$store.commit(INDEX_SET_LOADING, true)
    await this.getMasterData()
    await this.getData()
    await this.$store.commit(INDEX_SET_LOADING, false)
    this.$store.commit(INDEX_SET_TITLE_MENU, { title: this.$t('page.my_page'), subTitle: 'My page' })
    if (this.$route.query.code) {
      await this.checkToken(this.$route.query.code)
    }
    if (this.$route.query.error) {
      await this.$store.commit(INDEX_SET_ERROR, {
        show: true,
        text: this.$t('content.EXC_001')
      })
      await this.$router.push('/notification-settings')
    }
  },
  watch: {
    'formNotify.line'(value) {
      if (value) {
        this.changeLineNotify()
      }
    }
  },
  methods: {
    async checkToken(token) {
      const data = {
        line: 1,
        line_code: token
      }
      await this.updateNotify(data)
      await this.$router.push('/notification-settings')
    },
    async updateEmailNotify(value) {
      const data = {
        email: value ? 1 : 0
      }
      await this.updateNotify(data)
    },
    async getData() {
      const dataResponse = await this.$store.dispatch(SETTING_NOTIFY, '')
      switch (dataResponse.status_code) {
        case 200:
          this.formNotify = dataResponse.data
          break
        case 500:
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: this.$t('content.EXC_001')
          })
      }
    },
    async updateNotify(data) {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataResponse = await this.$store.dispatch(UPDATE_NOTIFY, data)
      switch (dataResponse.status_code) {
        case 200:
          await this.getData()
          await this.$store.commit(INDEX_SET_SUCCESS, {
            show: true,
            text: this.$t('message.edit_success')
          })
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
            text: dataResponse.messages
          })
          if (data.email !== undefined) {
            this.formNotify.notification_method_email = !this.formNotify.notification_method_email
          } else {
            this.formNotify.notification_method_line = !this.formNotify.notification_method_line
          }
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },

    async getMasterData() {
      const dataResources = [
        'resources[line_settings]'
      ]
      const dataMasterData = await this.$store.dispatch(MASTER_GET_DATA, dataResources.join('&'))
      if (dataMasterData.status_code === 200) {
        if (dataMasterData.data.line_settings) {
          this.lineSettings = dataMasterData.data.line_settings
        }
      }
    },
    changeLineNotify() {
      if (this.formNotify.has_line_code) {
        this.updateNotify({
          line: this.formNotify.notification_method_line ? 1 : 0
        })
      } else {
        const dataNotify = [
          'response_type=code',
          'client_id=' + this.lineSettings.client_id,
          'redirect_uri=' + this.lineSettings.callback,
          'scope=notify',
          'state=NO_STATE'
        ]
        window.location.href = `https://notify-bot.line.me/oauth/authorize?${dataNotify.join('&')}`
      }
    }
  }
}
</script>

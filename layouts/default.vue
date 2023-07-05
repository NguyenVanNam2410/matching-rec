<template>
  <div>
    <div :class="!sideBarCollapsed ? 'main-page' : 'main-page-collapse'">
      <HeaderCommon />
      <NotificationBlock />
      <div class="home">
        <div v-if="!checkShowSideBar">
          <SideBar />
        </div>
        <nuxt />
      </div>
    </div>
    <FooterCommon />
    <LoadingBar />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { SET_SHOW_MESSAGE_SP } from '../store/store.const'
import LoadingBar from '../components/LoadingBar'
import HeaderCommon from '../components/layout/HeaderCommon'
import FooterCommon from '../components/layout/FooterCommon'
import SideBar from '../components/layout/SideBar'
import NotificationBlock from '../components/NotificationBlock'
import { NOTIFICATION_ANNOUNCEMENT, NOTIFICATION_SET_ANNOUNCEMENT, SET_PREVIOUS_URL } from '@/store/store.const'

export default {
  name: 'DefaultLayout',
  components: { SideBar, FooterCommon, HeaderCommon, LoadingBar, NotificationBlock },
  data() {
    return {
      footerHeight: '',
      timer: null
    }
  },
  computed: {
    ...mapState({
      sideBarCollapsed: state => state.sideBarCollapsed
    }),
    checkShowSideBar() {
      return ['/404-not-found'].includes(this.$route.path)
    }
  },
  watch: {
    '$route.path'(value) {
      if (value !== '/logout') {
        this.$store.commit(SET_PREVIOUS_URL, value)
      }
      this.$store.commit(SET_SHOW_MESSAGE_SP, false)
    }
  },
  async mounted() {
    this.getFooterHeight()
    window.addEventListener('resize', this.getFooterHeight)
    this.timer = setInterval(async() => {
      await this.getAnnoucement()
    }, 300000)
    await this.getAnnoucement()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getFooterHeight)
    clearInterval(this.timer)
  },
  methods: {
    getFooterHeight() {
      const footer = document.querySelector('.footer')
      if (footer) {
        this.footerHeight = footer.clientHeight
      }
    },
    async getAnnoucement() {
      const response = await this.$store.dispatch(NOTIFICATION_ANNOUNCEMENT)
      if (response.status_code === 200) {
        if (response.data) {
          this.$notify({
            message: response.data,
            duration: 0
          })
          await this.setAnnoucement()
        }
      }
    },
    async setAnnoucement() {
      await this.$store.dispatch(NOTIFICATION_SET_ANNOUNCEMENT)
    }
  }
}
</script>
